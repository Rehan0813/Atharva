import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

print("Loading dataset...")

data = pd.read_csv("dataset/processed_dataset/cache_dataset.csv")

print("Dataset loaded successfully")
print("Total rows:", len(data))

X = data.drop("best_policy", axis=1)
y = data["best_policy"]

print("Splitting dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training Random Forest model...")

model = RandomForestClassifier(
    n_estimators=400,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model training complete")

predictions = model.predict(X_test)

print("\nModel Accuracy:")
print(accuracy_score(y_test, predictions))

print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

joblib.dump(model, "ml_model/random_forest_model.pkl")

print("\nModel saved to ml_model/random_forest_model.pkl")