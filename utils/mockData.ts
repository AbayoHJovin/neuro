export interface TestResult {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  dateObject?: Date;
  attentionScore: number;
  cognitiveLead: string;
  mentalFatigue: number;
  relaxationLevel: number;
  analysis: string;
  recommendations: string[];
  waveData?: number[];
}

export const mockTestHistory: TestResult[] = [
  {
    id: "test-1",
    label: "Focused",
    description: "Strong beta waves detected. Great for cognitive tasks.",
    timestamp: "5:20 PM",
    dateObject: new Date(),
    attentionScore: 87,
    cognitiveLead: "Left Prefrontal Cortex",
    mentalFatigue: 22,
    relaxationLevel: 45,
    analysis:
      "Your brain activity shows high beta wave activity, indicating deep focus and concentration. This pattern is ideal for complex problem-solving and analytical tasks.",
    recommendations: [
      "Maintain this state for up to 90 minutes before taking a break",
      "Use this mental state for important cognitive tasks",
      "Consider simple breathing exercises to manage mental fatigue",
    ],
    waveData: [25, 30, 45, 60, 70, 75, 80, 85, 87, 85, 83, 80],
  },
  {
    id: "test-2",
    label: "Relaxed",
    description: "Alpha waves dominant. Ideal for creativity and learning.",
    timestamp: "3:15 PM",
    dateObject: new Date(),
    attentionScore: 65,
    cognitiveLead: "Right Temporal Lobe",
    mentalFatigue: 15,
    relaxationLevel: 78,
    analysis:
      "Your brain is in a relaxed, yet alert state. This alpha-dominant pattern is optimal for creative thinking, learning new information, and stress reduction.",
    recommendations: [
      "This is an excellent state for brainstorming or creative work",
      "Try activities requiring insight rather than analytical thinking",
      "Consider journaling to capture creative ideas",
    ],
    waveData: [40, 50, 62, 70, 75, 78, 76, 74, 72, 70, 68, 65],
  },
  {
    id: "test-3",
    label: "Distracted",
    description: "Theta waves with irregular patterns. Focus is fragmented.",
    timestamp: "1:45 PM",
    dateObject: new Date(),
    attentionScore: 42,
    cognitiveLead: "Multiple Regions",
    mentalFatigue: 65,
    relaxationLevel: 38,
    analysis:
      "Your neural activity shows signs of distraction and task-switching. The brain is expending energy without optimal focus, which can lead to mental fatigue.",
    recommendations: [
      "Take a 15-minute break to reset your attention",
      "Remove environmental distractions if possible",
      "Try a focused breathing exercise for 5 minutes",
    ],
    waveData: [60, 52, 45, 40, 42, 38, 35, 40, 45, 42, 38, 40],
  },
  {
    id: "test-4",
    label: "Focused",
    description: "Strong beta waves detected. Great for cognitive tasks.",
    timestamp: "11:30 AM",
    dateObject: new Date(),
    attentionScore: 79,
    cognitiveLead: "Left Prefrontal Cortex",
    mentalFatigue: 30,
    relaxationLevel: 38,
    analysis:
      "Your brain activity shows good focus with some signs of mental fatigue beginning to develop. Still in productive range but approaching optimal break time.",
    recommendations: [
      "Consider a short break in the next 15-20 minutes",
      "Try a brief mindfulness exercise to reset attention",
      "Reduce external distractions to maximize remaining focus",
    ],
    waveData: [18, 25, 38, 52, 65, 72, 77, 79, 78, 75, 70, 68],
  },
  {
    id: "test-5",
    label: "Flow State",
    description: "Optimal beta-alpha balance. Peak performance detected.",
    timestamp: "9:45 AM",
    dateObject: new Date(),
    attentionScore: 94,
    cognitiveLead: "Global Synchronization",
    mentalFatigue: 18,
    relaxationLevel: 60,
    analysis:
      "Your brain shows the signature neural pattern of 'flow state' - a perfect balance of focus and creative thinking. This is associated with peak performance and enjoyment of tasks.",
    recommendations: [
      "Continue your current activity while in this optimal state",
      "Note what conditions led to this flow state for future reference",
      "Minimize interruptions to maintain this rare optimal state",
    ],
    waveData: [45, 60, 72, 80, 85, 90, 94, 93, 92, 90, 88, 85],
  },
  {
    id: "test-6",
    label: "Meditative",
    description: "Strong alpha and theta presence. Deep relaxation detected.",
    timestamp: "8:00 AM",
    dateObject: new Date(),
    attentionScore: 50,
    cognitiveLead: "Default Mode Network",
    mentalFatigue: 10,
    relaxationLevel: 92,
    analysis:
      "Your brain activity indicates a deep meditative state with excellent stress reduction and mental recovery. This pattern is associated with enhanced wellbeing and cognitive restoration.",
    recommendations: [
      "This is an excellent state for mental recovery and stress reduction",
      "Schedule creative or complex cognitive tasks after this session",
      "Consider regular meditation to achieve this beneficial state",
    ],
    waveData: [60, 70, 80, 85, 90, 92, 93, 92, 90, 85, 80, 75],
  },
];

export const getTestById = (id: string): TestResult | undefined => {
  return mockTestHistory.find((test) => test.id === id);
};

export const getAllTests = (): TestResult[] => {
  return [...mockTestHistory];
};
