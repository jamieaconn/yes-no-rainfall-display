
import { useState } from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, addHours } from 'date-fns';

// Generate sample data for 3 days with hourly readings
const generateData = () => {
  const data = [];
  // Start from Thursday 00:00
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 2); // Set to Thursday
  
  // Generate 72 hours of data (3 days)
  for (let i = 0; i < 72; i++) {
    const time = addHours(startDate, i);
    const isFuture = i > 36; // Data after Friday 12:00 is future prediction
    
    // Generate more realistic rainfall patterns
    let rainfall = 0;
    if (Math.random() > 0.7) {
      rainfall = Math.random() * 1.2; // Random rainfall value up to 1.2
    }
    
    // Create rainfall patterns like in the image
    if (i > 8 && i < 24) {
      rainfall = Math.random() > 0.5 ? Math.random() * 1.2 : 0; // More rain on Thursday morning
    }
    
    if (i > 48 && i < 60) {
      rainfall = Math.random() > 0.4 ? Math.random() * 1 : 0; // More rain on Friday evening
    }
    
    // Water level calculation
    let level = 0.3; // Base level
    
    // Rising water level based on previous rainfall
    if (i > 12) { 
      level = 0.3 + Math.min(1.2, data.slice(Math.max(0, i-12), i)
        .reduce((sum, item) => sum + item.rainfall * 0.1, 0));
    }
    
    // Future forecast rainfall (gray bars)
    let forecast = 0;
    if (isFuture) {
      forecast = Math.random() > 0.7 ? Math.random() * 1.1 : 0;
      if (i > 60) {
        forecast = Math.random() > 0.5 ? Math.random() * 0.5 : 0; // Less forecast rain on Saturday
      }
    }
    
    // Generate prediction data (dotted line)
    let prediction = null;
    if (i >= 24) { // Start prediction from Thursday 12:00
      prediction = level;
      
      // Make prediction rise and fall based on forecast
      if (isFuture) {
        const upcomingRain = data.slice(Math.max(0, i-6), i)
          .reduce((sum, item) => sum + (item.forecast || 0) * 0.3, 0);
        prediction = level + upcomingRain;
        
        if (i >= 58 && i <= 64) {
          prediction = Math.min(1.4, prediction + 0.3); // Peak around Saturday 00:00
        }
        if (i > 64) {
          prediction = Math.max(0.7, prediction - 0.1); // Decline after Saturday 00:00
        }
      }
    }
    
    data.push({
      time,
      rainfall: isFuture ? 0 : rainfall, // Only show actual rainfall, not future
      forecast: isFuture ? forecast : 0, // Only show forecast in future
      level: isFuture ? null : level, // Only show level for current/past
      prediction // Show prediction from Thursday 12:00 onwards
    });
  }
  
  return data;
};

const CustomLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-2 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-black"></div>
        <span className="text-sm">Rain</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-400"></div>
        <span className="text-sm">Forecast</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-[2px] bg-blue-500"></div>
        <span className="text-sm">Level</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-[2px] border-blue-500 border-t-2 border-dashed"></div>
        <span className="text-sm">Prediction</span>
      </div>
    </div>
  );
};

const RainfallGraph = () => {
  const [data] = useState(generateData);

  return (
    <div className="w-full">
      <CustomLegend />
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tickFormatter={(time) => {
                const date = new Date(time);
                const hours = date.getHours();
                if (hours === 0 || hours === 12) {
                  return format(date, 'EEE HH:mm');
                }
                return hours === 6 || hours === 18 ? format(date, 'HH:mm') : '';
              }}
              height={60}
              interval={4}
            />
            <YAxis 
              domain={[0, 2.5]}
              ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5]}
            />
            <Tooltip
              labelFormatter={(time) => format(new Date(time), 'EEE dd MMM, HH:mm')}
              formatter={(value, name) => {
                if (name === 'rainfall' || name === 'forecast') {
                  return [value ? `${Number(value).toFixed(2)} mm` : '0 mm', name === 'rainfall' ? 'Rain' : 'Forecast'];
                }
                if (name === 'level' || name === 'prediction') {
                  return [value ? `${Number(value).toFixed(2)} m` : '-', name === 'level' ? 'Level' : 'Prediction'];
                }
                return [value, name];
              }}
            />
            
            {/* Rain bars (black) */}
            <Bar 
              dataKey="rainfall" 
              fill="#000000"
              barSize={2}
            />
            
            {/* Forecast bars (gray) */}
            <Bar 
              dataKey="forecast" 
              fill="#C8C8C9"
              barSize={2}
            />
            
            {/* Level line (solid blue) */}
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            
            {/* Prediction line (dashed blue) */}
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#3B82F6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainfallGraph;
