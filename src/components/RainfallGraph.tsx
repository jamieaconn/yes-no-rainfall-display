
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

// Generate sample data for the past 3 days with hourly readings
const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 72; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
    data.push({
      time: time,
      rainfall: Math.random() * 10, // Random rainfall value between 0-10mm
    });
  }
  return data;
};

const RainfallGraph = () => {
  const rawData = generateData();
  const isMobile = useIsMobile();
  const midPoint = Math.floor(rawData.length / 2);

  // Process the data to include both actual and predicted rainfall
  const data = rawData.map((item, index) => ({
    time: item.time,
    actualRainfall: index < midPoint ? item.rainfall : null,
    predictedRainfall: index >= midPoint ? item.rainfall : null
  }));

  return (
    <div className="w-full h-[400px] mt-8">
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: isMobile ? 20 : 20,
              right: isMobile ? 10 : 30,
              left: isMobile ? 0 : 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(time) => {
                const date = new Date(time);
                const dayFormat = format(date, 'EEE');
                const timeFormat = format(date, 'ha').replace('AM', 'am').replace('PM', 'pm');
                return `${dayFormat}\n${timeFormat}`;
              }}
              interval={6}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(time) => format(new Date(time), 'MMM dd, HH:mm')}
              formatter={(value, name) => {
                if (value === null) return ['-', name];
                return [`${value?.toString().includes('.') ? Number(value).toFixed(1) : value} mm`, name === 'actualRainfall' ? 'Level' : 'Prediction'];
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
            />
            <Line
              type="monotone"
              name="Level"
              dataKey="actualRainfall"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line
              type="monotone"
              name="Prediction"
              dataKey="predictedRainfall"
              stroke="#8884d8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainfallGraph;
