const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Enable CORS for all routes with specific configuration for mobile app
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8081",
      "exp://*",
      "https://*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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

// Mock chat history data
const chatHistoryData = [
  {
    id: "1",
    title: "Understanding EEG Patterns",
    timestamp: "2023-12-15T14:30:00Z",
    lastMessageSnippet:
      "In research settings, EEG helps understand brain function and cognitive processes.",
    messages: [
      {
        id: "m1",
        text: "Can you explain how EEG works?",
        isUser: true,
        timestamp: "2:30 PM",
      },
      {
        id: "m2",
        text: "EEG (Electroencephalography) is a method to record electrical activity of the brain. It's commonly used to diagnose and monitor neurological conditions.",
        isUser: false,
        timestamp: "2:31 PM",
      },
      {
        id: "m3",
        text: "What kind of patterns should I look for?",
        isUser: true,
        timestamp: "2:33 PM",
      },
      {
        id: "m4",
        text: "The procedure involves placing electrodes on the scalp to detect electrical signals produced by brain cell activity. It can help identify seizures, sleep disorders, and other brain abnormalities. In research settings, EEG helps understand brain function and cognitive processes.",
        isUser: false,
        timestamp: "2:34 PM",
      },
    ],
  },
  {
    id: "2",
    title: "Stress Management Techniques",
    timestamp: "2023-12-16T09:15:00Z",
    lastMessageSnippet:
      "Managing stress through mindfulness, exercise, and proper rest is important for overall well-being.",
    messages: [
      {
        id: "m1",
        text: "I've been feeling really stressed lately. Any advice?",
        isUser: true,
        timestamp: "9:15 AM",
      },
      {
        id: "m2",
        text: "Stress is your body's reaction to pressure from a certain situation or event. It can manifest as physical, mental, or emotional strain causing bodily or mental tension.",
        isUser: false,
        timestamp: "9:16 AM",
      },
      {
        id: "m3",
        text: "How can I manage it better?",
        isUser: true,
        timestamp: "9:18 AM",
      },
      {
        id: "m4",
        text: "Short-term stress can sometimes be beneficial, helping you stay focused and alert. However, chronic stress can have negative effects on your health. Managing stress through mindfulness, exercise, and proper rest is important for overall well-being.",
        isUser: false,
        timestamp: "9:19 AM",
      },
    ],
  },
  {
    id: "3",
    title: "Mental Health Basics",
    timestamp: "2023-12-17T16:45:00Z",
    lastMessageSnippet:
      "Regular exercise, healthy eating, and adequate sleep all contribute to better mental health.",
    messages: [
      {
        id: "m1",
        text: "What are the basics of good mental health?",
        isUser: true,
        timestamp: "4:45 PM",
      },
      {
        id: "m2",
        text: "Mental health refers to cognitive, behavioral, and emotional well-being. It affects how we think, feel, and behave, and determines how we handle stress.",
        isUser: false,
        timestamp: "4:46 PM",
      },
      {
        id: "m3",
        text: "What can I do to improve my mental health?",
        isUser: true,
        timestamp: "4:48 PM",
      },
      {
        id: "m4",
        text: "Good mental health is not just the absence of mental health problems. It's about maintaining a positive state of mind and taking care of your psychological well-being. Regular exercise, healthy eating, and adequate sleep all contribute to better mental health.",
        isUser: false,
        timestamp: "4:49 PM",
      },
    ],
  },
];

// Mock user profile data
let userProfile = {
  fullName: "Dushimire Aine",
  email: "ainedushimire@gmail.com",
  profilePicture: "https://randomuser.me/api/portraits/men/36.jpg",
};

// API route to get chat history
app.get("/api/chat/history", (req, res) => {
  // Return just the metadata for the history list
  const historySummaries = chatHistoryData.map(
    ({ id, title, timestamp, lastMessageSnippet }) => ({
      id,
      title,
      timestamp,
      lastMessageSnippet,
    })
  );

  res.json({
    success: true,
    history: historySummaries,
  });
});

// API route to get a specific chat by ID
app.get("/api/chat/history/:id", (req, res) => {
  const chatId = req.params.id;
  const chat = chatHistoryData.find((chat) => chat.id === chatId);

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }

  res.json({
    success: true,
    chat,
  });
});

// API route to serve analytics data
app.get("/api/analytics", (req, res) => {
  // Simulate a delay to show loading state
  setTimeout(() => {
    res.json(analyticsData);
  }, 1000);
});

// Chat API endpoint to handle user messages with streaming chunks
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "No message provided",
    });
  }

  // Log received message
  console.log("Received message:", message);

  // Sample responses based on message content with chunks
  let responseChunks = [];

  if (message.toLowerCase().includes("eeg")) {
    responseChunks = [
      "EEG (Electroencephalography) is a method to record electrical activity of the brain.",
      "It's commonly used to diagnose and monitor neurological conditions.",
      "The procedure involves placing electrodes on the scalp to detect the electrical signals produced by brain cell activity.",
      "It can help identify seizures, sleep disorders, and other brain abnormalities.",
      "In research settings, EEG helps understand brain function and cognitive processes.",
    ];
  } else if (message.toLowerCase().includes("mental health")) {
    responseChunks = [
      "Mental health refers to cognitive, behavioral, and emotional well-being.",
      "It affects how we think, feel, and behave, and determines how we handle stress.",
      "Good mental health is not just the absence of mental health problems.",
      "It's about maintaining a positive state of mind and taking care of your psychological well-being.",
      "Regular exercise, healthy eating, and adequate sleep all contribute to better mental health.",
    ];
  } else if (message.toLowerCase().includes("stress")) {
    responseChunks = [
      "Stress is your body's reaction to pressure from a certain situation or event.",
      "It can manifest as physical, mental, or emotional strain causing bodily or mental tension.",
      "Short-term stress can sometimes be beneficial, helping you stay focused and alert.",
      "However, chronic stress can have negative effects on your health.",
      "Managing stress through mindfulness, exercise, and proper rest is important for overall well-being.",
    ];
  } else {
    responseChunks = [
      "I'm your NeuroLab AI assistant.",
      "I specialize in topics related to brain function, mental health, and cognitive science.",
      "You can ask me questions about neurological conditions, brain activity, or mental wellness practices.",
      "I'm designed to provide helpful information based on current scientific understanding.",
      "How can I assist you with your specific questions or concerns today?",
    ];
  }

  // Return the AI response with chunks for the frontend to display
  res.json({
    success: true,
    responseChunks: responseChunks,
    timestamp: new Date().toISOString(),
  });
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

// API endpoint for profile update
app.post("/api/update", (req, res) => {
  const { fullName, email, profilePicture } = req.body;

  // Validate inputs
  if (!fullName && !email && !profilePicture) {
    return res.status(400).json({
      success: false,
      message: "No update data provided",
    });
  }

  // In a real app, validate and save to database
  if (fullName) userProfile.fullName = fullName;
  if (email) userProfile.email = email;
  if (profilePicture) userProfile.profilePicture = profilePicture;

  // Simulate potential failure (1 in 10 chance)
  const shouldFail = Math.random() < 0.1;
  if (shouldFail) {
    return res.status(500).json({
      success: false,
      message: "Update failed. Please try again.",
    });
  }

  // Return success response
  res.json({
    success: true,
    message: "Your profile has been updated successfully.",
    profile: userProfile,
  });
});

// API endpoint to get user profile
app.get("/api/profile", (req, res) => {
  res.json({
    success: true,
    profile: userProfile,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
