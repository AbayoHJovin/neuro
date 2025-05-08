import axios from "axios";

// Define base URL for API
const API_URL = "http:10.0.2.2:5000";

// Define types for the data
export interface BrainData {
  timestamp: string;
  value: number;
}

export interface AnalysisData {
  total: number;
  recent: BrainData[];
}

export interface MentalStateData {
  state: string;
  percentage: number;
  message: string;
}

export interface ReportData {
  total: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface HomeData {
  analyses: AnalysisData;
  reports: ReportData;
  liveData: BrainData[];
  mentalState: MentalStateData;
  recommendations: Recommendation[];
}

// Define chat history types
export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  lastMessageSnippet: string;
}

export interface ChatHistory {
  success: boolean;
  history: ChatHistoryItem[];
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatDetail {
  id: string;
  title: string;
  timestamp: string;
  lastMessageSnippet: string;
  messages: Message[];
}

export interface ChatDetailResponse {
  success: boolean;
  chat: ChatDetail;
}

// Mock data for fallback
const MOCK_DATA: HomeData = {
  analyses: {
    total: 100,
    recent: [
      { timestamp: "2025-05-05T12:00:00Z", value: 75 },
      { timestamp: "2025-05-04T12:00:00Z", value: 82 },
    ],
  },
  reports: {
    total: 100,
  },
  liveData: [
    { timestamp: "00:00", value: 10 },
    { timestamp: "01:00", value: 25 },
    { timestamp: "02:00", value: 15 },
    { timestamp: "03:00", value: 40 },
    { timestamp: "04:00", value: 35 },
    { timestamp: "05:00", value: 55 },
  ],
  mentalState: {
    state: "Relaxed",
    percentage: 85,
    message: "Your brain seems to be not tired today",
  },
  recommendations: [
    {
      id: "1",
      title: "Improve focus",
      description:
        "Your delta waves are below optimal. Try reducing screen time 1 hour before bed to improve deep sleep quality.",
      color: "#1AD598",
    },
    {
      id: "2",
      title: "Reduce stress",
      description:
        "Your delta waves are below optimal. Try reducing screen time 1 hour before bed to improve deep sleep quality.",
      color: "#FF6B6B",
    },
  ],
};

// API Service
const apiService = {
  // Get home data
  getHomeData: async (): Promise<HomeData> => {
    try {
      const response = await axios.get(`${API_URL}/api/home`);
      return response.data;
    } catch (error) {
      console.log("Error fetching home data, using mock data:", error);
      return MOCK_DATA;
    }
  },

  // Get live brain data
  getLiveBrainData: async (): Promise<BrainData[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/brain/live`);
      return response.data;
    } catch (error) {
      console.log("Error fetching live brain data, using mock data:", error);
      return MOCK_DATA.liveData;
    }
  },

  // Get chat history
  getChatHistory: async (): Promise<ChatHistoryItem[]> => {
    try {
      const response = await axios.get<ChatHistory>(
        `${API_URL}/api/chat/history`
      );
      return response.data.history;
    } catch (error) {
      console.log("Error fetching chat history:", error);
      return [];
    }
  },

  // Get specific chat by ID
  getChatById: async (chatId: string): Promise<ChatDetail | null> => {
    try {
      const response = await axios.get<ChatDetailResponse>(
        `${API_URL}/api/chat/history/${chatId}`
      );
      return response.data.chat;
    } catch (error) {
      console.log("Error fetching chat details:", error);
      return null;
    }
  },
};

export default apiService;
