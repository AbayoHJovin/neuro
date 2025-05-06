import apiService, { BrainData, HomeData } from "@/services/api";
import { useEffect, useState } from "react";

export default function useBrainData() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [liveData, setLiveData] = useState<BrainData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const data = await apiService.getHomeData();
      setHomeData(data);
      setLiveData(data.liveData);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();

    // Simulate live data updates with random variations
    const interval = setInterval(() => {
      if (homeData && homeData.liveData.length > 0) {
        // Generate new value that varies slightly from the last one
        const lastValue = liveData[liveData.length - 1].value;
        // Random change between -5 and +5, but keep within 10-100 range
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(10, Math.min(100, lastValue + change));

        // Create a new data point
        const newDataPoint = {
          timestamp: new Date().toISOString(),
          value: newValue,
        };

        // Update liveData by removing oldest and adding newest
        setLiveData((prev) => [...prev.slice(1), newDataPoint]);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [homeData, liveData]);

  // Return everything needed by components
  return {
    loading,
    refreshing,
    homeData,
    liveData,
    error,
    onRefresh,
    fetchData,
  };
}
