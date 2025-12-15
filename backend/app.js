import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
    // Try to find the python executable in the local virtual environment first

    // We are in backend/ directory. venv is typically in ../.venv or ../venv
    // Adjust these paths based on where your .venv actually is relative to app.js
    const possiblePaths = [
        path.join(process.cwd(), "..", ".venv", "Scripts", "python.exe"), // Windows venv
        path.join(process.cwd(), "..", "venv", "Scripts", "python.exe"),  // Windows venv alternate
        "python" // Fallback to global path
    ];

    let pythonCmd = "python";
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            pythonCmd = p;
            break;
        }
    }

    console.log(`Using Python executable: ${pythonCmd}`);

    const python = spawn(pythonCmd, ["model/predict.py"]); // Changed to model/predict.py assuming app.js is in backend/ and predict.py is in backend/model/ ?? 
    // WAIT. existting code said: spawn("python", ["predict.py"]);
    // File structure:
    // backend/app.js
    // backend/model/predict.py
    // The original code assumed predict.py was in the CWD (backend/). But ls showed it in backend/model/.
    // Let me double check file location. 
    // Step 4 ls backend:
    // backend/model (dir)
    // backend/app.js
    // so predict.py is in backend/model/predict.py. 
    // If running from backend/, we need "model/predict.py".

    // HOWEVER, the original code had: const python = spawn("python", ["predict.py"]);
    // This implies the previous developer might have been running it from backend/model/ OR it was just broken.
    // Given the user said "500 error", it likely was broken because it couldn't find the file OR python.
    // I will set the cwd for spawn to ensure it finds the file and dependencies (like *.pkl) correctly.

    const modelDir = path.join(process.cwd(), "model");

    const pythonProcess = spawn(pythonCmd, ["predict.py"], {
        cwd: modelDir
    });

    let output = "";
    let errorOutput = "";

    pythonProcess.stdin.write(JSON.stringify(req.body));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on("data", (err) => {
        console.error("Python stderr:", err.toString());
        errorOutput += err.toString();
    });

    pythonProcess.on("close", (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({
                success: false,
                error: "Prediction model failed",
                details: errorOutput || "Unknown error occurred"
            });
        }

        try {
            res.json(JSON.parse(output));
        } catch (e) {
            console.error("JSON Parse error:", e);
            res.status(500).json({
                success: false,
                error: "Invalid response from Python model",
                rawOutput: output,
                stderr: errorOutput
            });
        }
    });
});
app.listen(PORT, () => {
    console.log(`🩺 Backend running at http://localhost:${PORT}`);
});
