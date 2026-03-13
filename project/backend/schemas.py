from pydantic import BaseModel
from typing import List, Optional
import datetime

class WorkloadInput(BaseModel):
    access_frequency: float
    reuse_distance: float
    temporal_locality: float
    spatial_locality: float

class PolicyResponse(BaseModel):
    workload_type: str
    predicted_policy: str
    hybrid_ratio: Optional[str] = None
    confidence: float
    reason: List[str]
    latency_gain: float
    throughput_gain: float
    created_at: Optional[str] = None

class DashboardMetricsResponse(BaseModel):
    cache_hit_rate: float
    cache_miss_rate: float
    latency: float
    energy_usage: Optional[float] = 0.0
    power_consumption: Optional[float] = 0.0

class PolicyHistoryItem(BaseModel):
    workload_type: str
    policy: str
    timestamp: str

class ExplainableOutput(BaseModel):
    policy: str
    confidence: float
    reason: List[str]
