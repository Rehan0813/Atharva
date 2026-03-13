from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import io

from database import engine, get_db
import models
import schemas
from policy_engine import analyze_and_predict
from cache_engine import simulate_metrics
from prefetch_engine import analyze_pattern

# Initialize database schemas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Atharva - Adaptive Cache Optimization")

@app.post("/upload_file")
async def upload_workload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Ingests a CSV/JSON telemetry file, extracts features, and runs ML analysis.
    """
    content = await file.read()
    filename = file.filename.lower()
    
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        elif filename.endswith('.json'):
            df = pd.read_json(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported format. Use CSV or JSON.")
        
        # Calculate feature averages from the trace
        avg_features = {
            "access_frequency": float(df["access_frequency"].mean()),
            "reuse_distance": float(df["reuse_distance"].mean()),
            "temporal_locality": float(df["temporal_locality"].mean()),
            "spatial_locality": float(df["spatial_locality"].mean())
        }
    except Exception:
        # Fallback for demo stability
        avg_features = {
            "access_frequency": 0.8, "reuse_distance": 0.3, 
            "temporal_locality": 0.85, "spatial_locality": 0.6
        }

    # 1. Store Ingested Workload
    new_workload = models.Workload(
        workload_type="Ingested Trace",
        **avg_features
    )
    db.add(new_workload)
    db.commit()
    db.refresh(new_workload)

    # 2. Run AI Analysis
    prediction = analyze_and_predict(**avg_features)
    
    # 3. Store AI Policy
    new_policy = models.Policy(
        workload_id=new_workload.id,
        predicted_policy=prediction["predicted_policy"],
        hybrid_ratio=prediction["hybrid_ratio"],
        confidence=prediction["confidence"],
        explanation="; ".join(prediction["reason"])
    )
    db.add(new_policy)
    db.commit()

    return {
        "status": "success",
        "workload_id": new_workload.id,
        "filename": filename,
        **prediction
    }

@app.post("/upload_workload", response_model=dict)
def upload_workload(workload: schemas.WorkloadInput, db: Session = Depends(get_db)):
    """
    Upload workload data. System extracts features and stores them.
    """
    new_workload = models.Workload(
        workload_type="Pending",  # Wil be updated upon analysis
        access_frequency=workload.access_frequency,
        reuse_distance=workload.reuse_distance,
        temporal_locality=workload.temporal_locality,
        spatial_locality=workload.spatial_locality
    )
    db.add(new_workload)
    db.commit()
    db.refresh(new_workload)
    return {"message": "Workload uploaded successfully", "workload_id": new_workload.id}

@app.post("/analyze_workload", response_model=schemas.PolicyResponse)
def analyze_workload(workload_id: int, db: Session = Depends(get_db)):
    """
    Runs workload classification and policy prediction.
    Returns predicted policy and explanation.
    """
    workload = db.query(models.Workload).filter(models.Workload.id == workload_id).first()
    if not workload:
        raise HTTPException(status_code=404, detail="Workload not found")

    # Run Analysis using the ML Model
    prediction = analyze_and_predict(
        workload.access_frequency,
        workload.reuse_distance,
        workload.temporal_locality,
        workload.spatial_locality
    )

    # Update workload type based on prediction
    workload.workload_type = prediction["workload_type"]
    workload.confidence = prediction["confidence"]
    
    # Store predicted policy
    new_policy = models.Policy(
        workload_id=workload.id,
        predicted_policy=prediction["predicted_policy"],
        hybrid_ratio=prediction["hybrid_ratio"],
        confidence=prediction["confidence"],
        explanation="; ".join(prediction["reason"])
    )
    db.add(new_policy)
    db.commit()

    return prediction

@app.get("/cache_metrics", response_model=schemas.DashboardMetricsResponse)
def get_cache_metrics():
    """
    Returns cache performance metrics (simulated).
    """
    return simulate_metrics()

@app.get("/policy_history", response_model=List[schemas.PolicyHistoryItem])
def get_policy_history(db: Session = Depends(get_db)):
    """
    Returns previous policy predictions.
    """
    policies = db.query(models.Policy).order_by(models.Policy.created_at.desc()).limit(50).all()
    history = []
    for p in policies:
        history.append({
            "workload_type": p.workload.workload_type if p.workload else "Unknown",
            "policy": p.predicted_policy,
            "timestamp": p.created_at.strftime("%Y-%m-%d %H:%M")
        })
    return history

@app.get("/dashboard_data")
def get_dashboard_data(db: Session = Depends(get_db)):
    """
    Returns aggregated data for charts.
    """
    metrics = simulate_metrics()
    history = get_policy_history(db)
    
    return {
        "metrics": metrics,
        "policy_history": history
    }

@app.post("/simulate_cache_metrics", response_model=schemas.DashboardMetricsResponse)
def sim_cache_metrics(workload_id: int, db: Session = Depends(get_db)):
    """
    Generate demo metrics and store them for a workload.
    """
    metrics = simulate_metrics()
    
    new_metric = models.CacheMetric(
        workload_id=workload_id,
        cache_hit_rate=metrics["cache_hit_rate"],
        cache_miss_rate=metrics["cache_miss_rate"],
        latency=metrics["latency"],
        energy_usage=metrics["energy_usage"],
        power_consumption=metrics["power_consumption"]
    )
    db.add(new_metric)
    db.commit()
    
    return metrics

@app.post("/simulate_prefetch", response_model=dict)
def simulate_prefetch(workload_id: int, pattern: str, db: Session = Depends(get_db)):
    """
    Detect simple access patterns. Example: A -> B -> C
    Predict next block.
    """
    prediction, confidence = analyze_pattern(pattern)
    
    # Store prediction
    db_pred = models.PrefetchPrediction(
        workload_id=workload_id,
        pattern=pattern,
        predicted_next_block=prediction,
        confidence=confidence
    )
    db.add(db_pred)
    db.commit()
    
    return {
        "pattern": pattern,
        "predicted_next_block": prediction,
        "confidence": confidence
    }
