import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Node backend running (no Python)");
});

// ✅ Predict route (dummy logic for now)
app.post("/predict", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  // Example simple prediction logic (you can replace with real logic)
  const { Age, BMI, "Glucose level (mg/dl)": glucose, "Insulin Level (μU/mL)": insulin } = data;

  // Very basic dummy rule (replace with your trained model logic later)
  let prediction = "Low Risk";
  if (glucose > 125 || insulin > 100 || BMI > 30 || Age > 50) {
    prediction = "High Risk";
  }

  // Return a JSON response
  res.json({
    Name: data.Name || "Unknown",
    prediction,
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Node backend running on http://localhost:${PORT}`);
});
