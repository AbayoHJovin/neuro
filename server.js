const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock analytics data
const analyticsData = {
  attentionScore: 72,
  cognitiveLoad: 65,
  mentalFatigue: 28,
  relaxationLevel: 42,
  confidence: 85,
  stateDistribution: {
    focused: 45,
    relaxed: 25,
    neutral: 20,
    distracted: 10,
  },
  recommendations: [
    "Consider short breaks every 25 minutes to maintain optimal focus levels.",
    "The subject shows good attention patterns but may benefit from mindfulness exercises to reduce cognitive load.",
    "Hydration and proper posture could improve sustained attention duration.",
  ],
  timeSeriesData: [
    { time: "0 min", value: 30 },
    { time: "1 min", value: 45 },
    { time: "2 min", value: 65 },
    { time: "3 min", value: 55 },
    { time: "4 min", value: 70 },
    { time: "5 min", value: 85 },
  ],
};

// API route to serve analytics data
app.get("/api/analytics", (req, res) => {
  // Simulate a delay to show loading state
  setTimeout(() => {
    res.json(analyticsData);
  }, 1000);
});

// Signup route from previous implementation
app.post("/api/signup", (req, res) => {
  const { fullName, email, password } = req.body;

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // In a real app, you would save this data to a database
  console.log("User signup:", { fullName, email });

  // Return success response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: { id: "user_" + Date.now(), fullName, email },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
