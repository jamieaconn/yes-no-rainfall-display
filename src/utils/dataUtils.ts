
import { format } from 'date-fns';

export interface RainfallDataPoint {
  time: string | Date;
  rainfall: number;
  forecast?: number;
  level: number;
  prediction?: number;
}

export interface RainfallData {
  data: RainfallDataPoint[];
}

export const fetchRainfallData = async (): Promise<RainfallDataPoint[]> => {
  try {
    const response = await fetch('/example.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data: RainfallData = await response.json();
    
    // Convert string timestamps to Date objects
    return data.data.map(point => ({
      ...point,
      time: new Date(point.time),
    }));
  } catch (error) {
    console.error('Error fetching rainfall data:', error);
    return [];
  }
};
