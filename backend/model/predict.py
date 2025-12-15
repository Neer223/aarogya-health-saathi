#!/usr/bin/env python3

import sys
import json
import os
import joblib
import pandas as pd
import numpy as np
import traceback

# --------------------------------------------------
# Paths
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "rfmodelfinal.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
ENCODERS_PATH = os.path.join(BASE_DIR, "label_encoders.pkl")

# --------------------------------------------------
# Load artifacts (fail fast if missing)
# --------------------------------------------------
try:
    rf_model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    label_encoders = joblib.load(ENCODERS_PATH)
except Exception as e:
    print(json.dumps({
        "success": False,
        "error": "Failed to load model artifacts",
        "details": str(e)
    }))
    sys.exit(1)

# --------------------------------------------------
# Utilities
# --------------------------------------------------
def get_risk_category(risk_percent: float) -> str:
    if risk_percent < 30:
        return "Low Risk"
    elif risk_percent < 50:
        return "Pre-Diabetic"
    return "Diabetic"

def read_stdin_json() -> dict:
    raw = sys.stdin.read().strip()
    if not raw:
        raise ValueError("No input received from stdin")
    return json.loads(raw)

def validate_input(data: dict) -> None:
    required_fields = [
        "gender",
        "age",
        "hypertension",
        "heart_disease",
        "smoking_history",
        "bmi",
        "HbA1c_level",
        "blood_glucose_level"
    ]

    missing = [f for f in required_fields if f not in data]
    if missing:
        raise KeyError(f"Missing required fields: {missing}")

# --------------------------------------------------
# Main
# --------------------------------------------------
def main():
    try:
        # ---------- Read & validate input ----------
        input_data = read_stdin_json()
        validate_input(input_data)

        # ---------- Create DataFrame ----------
        person_df = pd.DataFrame([{
            "gender": input_data["gender"],
            "age": input_data["age"],
            "hypertension": input_data["hypertension"],
            "heart_disease": input_data["heart_disease"],
            "smoking_history": input_data["smoking_history"],
            "bmi": input_data["bmi"],
            "HbA1c_level": input_data["HbA1c_level"],
            "blood_glucose_level": input_data["blood_glucose_level"]
        }])

        # ---------- Encode categorical features ----------
        for col, encoder in label_encoders.items():
            if col in person_df.columns:
                try:
                    person_df[col] = encoder.transform(person_df[col])
                except ValueError:
                    # Handle unseen category safely
                    person_df[col] = encoder.transform(
                        [encoder.classes_[0]]
                    )[0]

        # ---------- Enforce feature order ----------
        if hasattr(scaler, "feature_names_in_"):
            person_df = person_df[scaler.feature_names_in_]

        # ---------- Type safety ----------
        person_df = person_df.astype(float)

        # ---------- Scale ----------
        person_scaled = scaler.transform(person_df)

        # ---------- Predict ----------
        probability = rf_model.predict_proba(person_scaled)[0, 1]
        risk_percent = round(float(probability * 100), 2)
        risk_percent = max(0.0, min(100.0, risk_percent))

        response = {
            "success": True,
            "risk_percentage": risk_percent,
            "risk_category": get_risk_category(risk_percent)
        }

        print(json.dumps(response))

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc()
        }))
        sys.exit(1)

# --------------------------------------------------
# Entry point
# --------------------------------------------------
if __name__ == "__main__":
    main()
