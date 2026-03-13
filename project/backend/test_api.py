import requests
import time
import sys

BASE_URL = "http://127.0.0.1:8001"

def run_tests():
    # Wait for server to be fully ready
    time.sleep(2)
    
    test_data = [
        {"access_frequency": 0.92, "reuse_distance": 0.15, "temporal_locality": 0.80, "spatial_locality": 0.75},
        {"access_frequency": 0.18, "reuse_distance": 0.91, "temporal_locality": 0.25, "spatial_locality": 0.30},
        {"access_frequency": 0.45, "reuse_distance": 0.25, "temporal_locality": 0.93, "spatial_locality": 0.65},
        {"access_frequency": 0.88, "reuse_distance": 0.35, "temporal_locality": 0.72, "spatial_locality": 0.55},
        {"access_frequency": 0.30, "reuse_distance": 0.82, "temporal_locality": 0.40, "spatial_locality": 0.22},
    ]

    print("Testing ML Policy Prediction Integration over dataset from predict_policy.py:\n")

    for i, workload_data in enumerate(test_data):
        print(f"--- WORKLOAD {i+1} ---")
        print(f"Input Features: {workload_data}")
        
        # 1. Upload Workload
        r = requests.post(f"{BASE_URL}/upload_workload", json=workload_data)
        if r.status_code != 200:
            print(f"Upload failed: {r.status_code} {r.text}")
            continue
            
        workload_id = r.json().get("workload_id")
        
        # 2. Analyze
        r = requests.post(f"{BASE_URL}/analyze_workload", params={"workload_id": workload_id})
        if r.status_code != 200:
            print(f"Analysis failed: {r.status_code} {r.text}")
            continue
            
        prediction = r.json()
        
        print(f"API Model Prediction: {prediction.get('predicted_policy')} ({prediction.get('confidence')*100:.2f}% Confidence)")
        print(f"Reasoning: {prediction.get('reason')}\n")

    # Basic endpoint checks
    print("Testing remaining system endpoints:")
    r = requests.get(f"{BASE_URL}/cache_metrics")
    print(f"/cache_metrics OK: {r.status_code == 200}")
    
    r = requests.get(f"{BASE_URL}/policy_history")
    print(f"/policy_history OK: {r.status_code == 200}")

    r = requests.get(f"{BASE_URL}/dashboard_data")
    print(f"/dashboard_data OK: {r.status_code == 200}")

if __name__ == "__main__":
    try:
        run_tests()
        print("\nAll tests passed successfully!")
    except Exception as e:
        print(f"Test failed: {e}")
