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

// Chat API endpoint to handle user messages
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  try{
  if (!message) {
    return res.status(400).json({
      success: false,
      message: "No message provided",
    });
  }

  // Log received message
  console.log("Received message:", message);

  // Sample responses based on message content
  let aiResponse = "";

  if (message.toLowerCase().includes("eeg")) {
    aiResponse =
      "EEG (Electroencephalography) is a method to record electrical activity of the brain. It's commonly used to diagnose and monitor neurological conditions and to understand brain function in research settings.";
  } else if (message.toLowerCase().includes("mental health")) {
    aiResponse =
      "Mental health refers to cognitive, behavioral, and emotional well-being. It affects how we think, feel, and behave, and also determines how we handle stress, relate to others, and make choices.";
  } else if (message.toLowerCase().includes("stress")) {
    aiResponse =
      "Stress is your body's reaction to pressure from a certain situation or event. It can be a physical, mental, or emotional strain causing bodily or mental tension.";
  } else {
    aiResponse =
      "I'm your NeuroLab AI assistant. I'm here to help you with understanding brain function, mental health, and cognitive science. How can I assist you today?";
  }

  // Return the AI response with a slight delay to simulate processing
  setTimeout(() => {
    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  }, 800);
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the message",
    });
  }
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
