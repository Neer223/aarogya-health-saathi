import sys
import json
import numpy as np
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "best_random_forest_model.pkl")

try:
    model = joblib.load(model_path)
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {e}"}))
    sys.exit(1)

def main():
    try:
        input_json = sys.argv[1]
        data = json.loads(input_json)

        features = [
            data.get("Age", 0),
            data.get("Glucose level (mg/dl)", 0),
            data.get("Insulin Level (μU/mL)", 0),
            data.get("BMI", 0),
            data.get("Diabetes Pedigree", 0),
            data.get("Skin Thickness (mm)", 0)
        ]

        input_array = np.array(features).reshape(1, -1)
        prediction = model.predict(input_array)

        result = {
            "Name": data.get("Name", "Unknown"),
            "prediction": float(prediction[0])
        }

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
