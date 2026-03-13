import random

def simulate_metrics(access_frequency=0.7, temporal_locality=0.8, spatial_locality=0.5):
    # Base performance on real features
    base_hit = 0.4 + (access_frequency * 0.3) + (temporal_locality * 0.25)
    # Add subtle jitter for realism (+/- 1.5%)
    hit_rate = round(base_hit + random.uniform(-0.015, 0.015), 3)
    hit_rate = min(0.98, max(0.1, hit_rate)) # Clamp
    
    miss_rate = round(1.0 - hit_rate, 3)
    
    # Latency decreases with higher locality (better cache performance)
    base_latency = 30.0 - (temporal_locality * 15 + spatial_locality * 5)
    # Add jitter (+/- 0.8ms)
    latency = round(base_latency + random.uniform(-0.8, 0.8), 1)
    latency = max(2.0, latency) # Minimum latency floor
    
    # Energy usage fluctuates slightly but correlates with intensity
    base_energy = 1.5 + (access_frequency * 2.0)
    energy_usage = round(base_energy + random.uniform(-0.2, 0.2), 2)
    power_consumption = round(energy_usage * 10, 2)
    
    return {
        "cache_hit_rate": hit_rate,
        "cache_miss_rate": miss_rate,
        "latency": latency,
        "energy_usage": energy_usage,
        "power_consumption": power_consumption
    }
