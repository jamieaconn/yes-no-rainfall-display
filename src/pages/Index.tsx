
import RainfallGraph from '@/components/RainfallGraph';

const Index = () => {
  return (
    <div className="min-h-screen p-2 md:p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rainfall and Water Level Monitor
          </h1>
        </div>

        {/* Rainfall Graph Card */}
        <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Rainfall, Water Level and Predictions</h2>
          <RainfallGraph />
        </div>
        
        {/* Information Panel - Updated to show cards side-by-side on mobile */}
        <div className="flex flex-row overflow-x-auto gap-4 pb-2">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Current Level</h3>
            <p className="text-xl md:text-3xl font-bold text-blue-500">0.48m</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Updated 10 minutes ago</p>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Last 24h Rainfall</h3>
            <p className="text-xl md:text-3xl font-bold text-black">14.2mm</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Intensity: Moderate</p>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Prediction Peak</h3>
            <p className="text-xl md:text-3xl font-bold text-blue-500">1.3m</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Expected Sat 00:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
