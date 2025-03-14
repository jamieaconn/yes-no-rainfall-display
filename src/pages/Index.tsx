
import RainfallGraph from '@/components/RainfallGraph';

const Index = () => {
  return (
    <div className="min-h-screen p-2 md:p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-center items-center">
          <h1 className="text-7xl md:text-9xl font-bold text-gray-800 text-center">
            NO
          </h1>
        </div>

        {/* Rainfall Graph Card */}
        <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg">
          <RainfallGraph />
        </div>
        
        {/* Information Panel */}
        <div className="flex flex-row overflow-x-auto gap-4 pb-2">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Current Level</h3>
            <p className="text-xl md:text-3xl font-bold text-blue-500">0.48m</p>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Last 24h Rainfall</h3>
            <p className="text-xl md:text-3xl font-bold text-black">14.2mm</p>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg flex-shrink-0 min-w-[120px] w-1/3">
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Prediction Peak</h3>
            <p className="text-xl md:text-3xl font-bold text-blue-500">1.3m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
