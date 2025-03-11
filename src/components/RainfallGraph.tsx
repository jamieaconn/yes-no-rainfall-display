
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  const data = generateData();
  const isMobile = useIsMobile();
  const midPoint = Math.floor(data.length / 2);

  return (
    <div className="w-full h-[400px] mt-8">
      <div className="relative h-full">
        {isMobile && (
          <div className="absolute top-0 left-8 text-sm font-medium text-gray-500">
            Rainfall (mm)
          </div>
        )}
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
              formatter={(value) => [`${value?.toString().includes('.') ? Number(value).toFixed(1) : value} mm`, 'Rainfall']}
            />
            {/* First half of the line (solid) */}
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              data={data.slice(0, midPoint)}
            />
            {/* Second half of the line (dashed) */}
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#8884d8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              data={data.slice(midPoint)}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainfallGraph;
