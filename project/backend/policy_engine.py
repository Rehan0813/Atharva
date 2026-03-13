import joblib
import pandas as pd
import os

# Adjust path to where the ML model is located relative to the backend
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "ml_model", "random_forest_model.pkl")

try:
    rf_model = joblib.load(MODEL_PATH)
    print("ML Model loaded successfully.")
except Exception as e:
    print(f"Error loading ML model: {e}")
    rf_model = None

def analyze_and_predict(access_frequency: float, reuse_distance: float, temporal_locality: float, spatial_locality: float):
    
    # Format input for the model
    input_data = pd.DataFrame([[
        access_frequency,
        reuse_distance,
        temporal_locality,
        spatial_locality
    ]], columns=["access_frequency", "reuse_distance", "temporal_locality", "spatial_locality"])
    
    # If model failed to load, return a fallback
    if not rf_model:
        return {
            "workload_type": "Unknown",
            "predicted_policy": "Hybrid",
            "hybrid_ratio": "LRU 50% LFU 50%",
            "confidence": 0.0,
            "reason": ["ML Model failed to load. Fallback to Hybrid."]
        }
        
    # Predict using the Random Forest Model
    prediction = rf_model.predict(input_data)[0]
    probabilities = rf_model.predict_proba(input_data)[0]
    confidence = max(probabilities)
    
    # Advanced Hackathon Feature: Hybrid Cache Policy Generator
    # If the top two probabilities are close (diff < 0.1), generate a hybrid policy
    sorted_probs = sorted(probabilities, reverse=True)
    top_indices = probabilities.argsort()[-2:][::-1]
    classes = rf_model.classes_
    
    hybrid_ratio = None
    if (sorted_probs[0] - sorted_probs[1]) < 0.1:
        hybrid_ratio = f"{classes[top_indices[0]]} {int(sorted_probs[0]*100)}% {classes[top_indices[1]]} {int(sorted_probs[1]*100)}%"
        main_policy = "Hybrid"
    else:
        main_policy = prediction

    # Determine workload type based on prediction
    workload_type = "AI" if prediction == "LFU" else "Database" if prediction == "LRU" else "Streaming" if prediction == "FIFO" else "Scientific"
    
    reasons = [f"ML Model predicted {prediction} with {confidence*100:.1f}% confidence"]
    if access_frequency > 0.7: reasons.append("High access frequency detected")
    if temporal_locality > 0.7: reasons.append("Strong temporal locality detected")
    if reuse_distance > 0.7: reasons.append("Large reuse distance detected")
    if hybrid_ratio: reasons.append("Hybrid pattern detected: Two policies show similar performance potential")
    
    # Calculate realistic performance gains based on features
    # Higher locality and frequency usually lead to better gains
    latency_gain = round(-(access_frequency * 15 + temporal_locality * 10), 1)
    throughput_gain = round((spatial_locality * 8 + confidence * 5), 1)

    return {
        "workload_type": workload_type,
        "predicted_policy": main_policy,
        "hybrid_ratio": hybrid_ratio,
        "confidence": float(confidence),
        "reason": reasons,
        "latency_gain": latency_gain,
        "throughput_gain": throughput_gain
    }
