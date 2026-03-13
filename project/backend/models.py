from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Workload(Base):
    __tablename__ = "workloads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    workload_type = Column(String(50))
    access_frequency = Column(Float)
    reuse_distance = Column(Float)
    temporal_locality = Column(Float)
    spatial_locality = Column(Float)
    confidence = Column(Float)

    policies = relationship("Policy", back_populates="workload")

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    workload_id = Column(Integer, ForeignKey("workloads.id"))
    predicted_policy = Column(String(50))
    hybrid_ratio = Column(String(100), nullable=True)
    confidence = Column(Float)
    explanation = Column(Text)
    latency_gain = Column(Float, default=0.0)
    throughput_gain = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    workload = relationship("Workload", back_populates="policies")

class CacheMetric(Base):
    __tablename__ = "cache_metrics"

    id = Column(Integer, primary_key=True, index=True)
    workload_id = Column(Integer)
    cache_hit_rate = Column(Float)
    cache_miss_rate = Column(Float)
    latency = Column(Float)
    energy_usage = Column(Float) # New field for Energy-Aware feature
    power_consumption = Column(Float) # New field
    created_at = Column(DateTime, default=datetime.utcnow)

class PrefetchPrediction(Base):
    __tablename__ = "prefetch_predictions"

    id = Column(Integer, primary_key=True, index=True)
    workload_id = Column(Integer)
    pattern = Column(String(255))
    predicted_next_block = Column(String(50))
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
