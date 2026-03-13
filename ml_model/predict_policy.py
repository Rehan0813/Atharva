import joblib
import pandas as pd

print("Loading trained model...")

model = joblib.load("ml_model/random_forest_model.pkl")

print("Model loaded successfully\n")

test_data = pd.DataFrame([
    [0.92, 0.15, 0.80, 0.75],   # frequent accesses
    [0.18, 0.91, 0.25, 0.30],   # very large reuse distance
    [0.45, 0.25, 0.93, 0.65],   # strong temporal locality
    [0.88, 0.35, 0.72, 0.55],   # high frequency accesses
    [0.30, 0.82, 0.40, 0.22],   # large reuse distance
], columns=[
    "access_frequency",
    "reuse_distance",
    "temporal_locality",
    "spatial_locality"
])
# Predict policies
predictions = model.predict(test_data)
probabilities = model.predict_proba(test_data)

print("Testing Cache Policy Predictions:\n")

for i in range(len(test_data)):
    workload = test_data.iloc[i].to_dict()
    confidence = max(probabilities[i]) * 100

    print(f"Workload {i+1}")
    print(workload)
    print("Recommended Policy:", predictions[i])
    print(f"Confidence: {confidence:.2f}%")
    print("-----------------------------------")