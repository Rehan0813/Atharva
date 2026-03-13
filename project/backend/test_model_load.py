import joblib
import pandas as pd
import warnings
import os
warnings.filterwarnings("ignore")

model_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_model", "random_forest_model.pkl")
print(f"Loading {model_path}...")

try:
    model = joblib.load(model_path)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
