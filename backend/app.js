import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root
app.get("/", (req, res) => {
  res.send("Backend is running on Render!");
});

// Predict route
app.post("/predict", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  const { Age, BMI, "Glucose level (mg/dl)": glucose, "Insulin Level (μU/mL)": insulin } = data;

  let prediction = "Low Risk";
  if (glucose > 125 || insulin > 100 || BMI > 30 || Age > 50) {
    prediction = "High Risk";
  }

  res.json({
    Name: data.Name || "Unknown",
    prediction,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
