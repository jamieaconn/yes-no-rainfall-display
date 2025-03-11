
import RainfallGraph from '@/components/RainfallGraph';

const Index = () => {
  // For demo purposes, we'll randomly decide Yes or No
  const decision = Math.random() > 0.5 ? "Yes" : "No";

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="space-y-12">
        {/* Yes/No Section */}
        <div className="flex justify-center items-center">
          <h1 className="text-8xl font-bold text-gray-800">
            {decision}
          </h1>
        </div>

        {/* Rainfall Graph Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Hourly Rainfall</h2>
          <RainfallGraph />
        </div>
      </div>
    </div>
  );
};

export default Index;
