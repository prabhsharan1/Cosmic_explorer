
interface StatusPanelProps {
  fuel: number;
  shipHealth: number;
  currentLocation: string;
  visitedPlanets: string[];
}

const StatusPanel = ({ fuel, shipHealth, currentLocation, visitedPlanets }: StatusPanelProps) => {
  const getFuelColor = () => {
    if (fuel > 60) return 'text-green-400';
    if (fuel > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthColor = () => {
    if (shipHealth > 70) return 'text-green-400';
    if (shipHealth > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Mission Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fuel Status */}
        <div className="text-center">
          <div className="text-3xl mb-2">⛽</div>
          <h3 className="text-lg font-semibold text-white mb-2">Fuel</h3>
          <div className={`text-2xl font-bold ${getFuelColor()}`}>{fuel}%</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                fuel > 60 ? 'bg-green-500' : fuel > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${fuel}%` }}
            ></div>
          </div>
        </div>

        {/* Ship Health */}
        <div className="text-center">
          <div className="text-3xl mb-2">🛸</div>
          <h3 className="text-lg font-semibold text-white mb-2">Ship Health</h3>
          <div className={`text-2xl font-bold ${getHealthColor()}`}>{shipHealth}%</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                shipHealth > 70 ? 'bg-green-500' : shipHealth > 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${shipHealth}%` }}
            ></div>
          </div>
        </div>

        {/* Mission Progress */}
        <div className="text-center">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="text-lg font-semibold text-white mb-2">Current Location</h3>
          <div className="text-xl font-bold text-blue-400">{currentLocation}</div>
          <div className="text-sm text-gray-400 mt-2">
            Visited: {visitedPlanets.length} planets
          </div>
        </div>
      </div>

      {/* Visited Planets */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-3">Journey Log</h4>
        <div className="flex flex-wrap gap-2">
          {visitedPlanets.map((planet, index) => (
            <span
              key={planet}
              className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-500/50"
            >
              {index + 1}. {planet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
