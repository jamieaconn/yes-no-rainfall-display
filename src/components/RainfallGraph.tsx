
import { useState, useEffect } from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { fetchRainfallData } from '@/utils/dataUtils';

const CustomLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-black"></div>
        <span>Rain</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-gray-400"></div>
        <span>Forecast</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-[2px] bg-blue-500"></div>
        <span>Level</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-[2px] border-blue-500 border-t-2 border-dashed"></div>
        <span>Prediction</span>
      </div>
    </div>
  );
};

const RainfallGraph = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const rainfallData = await fetchRainfallData();
        setData(rainfallData);
        setError(null);
      } catch (err) {
        console.error('Error loading rainfall data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="w-full h-[400px] flex items-center justify-center">Loading data...</div>;
  }

  if (error) {
    return <div className="w-full h-[400px] flex items-center justify-center text-red-500">Error loading data: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="w-full h-[400px] flex items-center justify-center">No data available</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full h-[400px] mb-[-15px]">
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
      <CustomLegend />
    </div>
  );
};

export default RainfallGraph;
