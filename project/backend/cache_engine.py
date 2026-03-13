import random

def simulate_metrics():
    hit_rate = round(random.uniform(0.70, 0.95), 2)
    miss_rate = round(1.0 - hit_rate, 2)
    latency = round(random.uniform(5.0, 25.0), 1)
    
    # Energy-Aware Features
    energy_usage = round(random.uniform(1.2, 5.0), 2) # in Watts/Joule
    power_consumption = round(random.uniform(10.0, 50.0), 2) # in mW
    
    return {
        "cache_hit_rate": hit_rate,
        "cache_miss_rate": miss_rate,
        "latency": latency,
        "energy_usage": energy_usage,
        "power_consumption": power_consumption
    }
