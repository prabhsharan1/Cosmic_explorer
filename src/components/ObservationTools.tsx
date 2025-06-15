
import { useState } from 'react';
import { Telescope, Camera, Radar, Signal, Microscope, Target, Zap, MapPin, Activity } from 'lucide-react';
import { Planet } from '../data/planetData';

interface ObservationResult {
  toolUsed: string;
  target: string;
  data: string[];
  success: boolean;
  completesTask?: string;
}

interface ObservationToolsProps {
  selectedPlanet: Planet | null;
  onObservationComplete: (result: ObservationResult) => void;
  fuel: number;
  isVisible: boolean;
  onClose: () => void;
}

const ObservationTools = ({ selectedPlanet, onObservationComplete, fuel, isVisible, onClose }: ObservationToolsProps) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isVisible || !selectedPlanet) return null;

  const tools = [
    {
      id: 'telescope',
      name: 'Telescope',
      icon: Telescope,
      description: 'Observe distant celestial objects and atmospheric conditions',
      fuelCost: 2,
      color: 'text-blue-400',
      specialFor: ['Earth', 'Moon', 'Mars', 'Jupiter']
    },
    {
      id: 'spectrometer',
      name: 'Spectrometer',
      icon: Microscope,
      description: 'Analyze atmospheric composition and surface materials',
      fuelCost: 3,
      color: 'text-green-400',
      specialFor: ['Venus', 'Mercury', 'Earth']
    },
    {
      id: 'radar',
      name: 'Radar Scanner',
      icon: Radar,
      description: 'Detect surface features and measure distances',
      fuelCost: 2,
      color: 'text-yellow-400',
      specialFor: ['Moon', 'Mars', 'Mercury']
    },
    {
      id: 'camera',
      name: 'Imaging System',
      icon: Camera,
      description: 'Capture high-resolution surface images and document features',
      fuelCost: 1,
      color: 'text-purple-400',
      specialFor: ['Earth', 'Moon', 'Mars']
    },
    {
      id: 'signal',
      name: 'Signal Detector',
      icon: Signal,
      description: 'Monitor radio signals and detect signs of activity',
      fuelCost: 2,
      color: 'text-cyan-400',
      specialFor: ['Earth', 'Mars', 'Jupiter']
    },
    {
      id: 'gravitational',
      name: 'Gravitational Sensor',
      icon: Target,
      description: 'Measure gravitational fields and orbital mechanics',
      fuelCost: 3,
      color: 'text-orange-400',
      specialFor: ['Jupiter', 'Saturn', 'Earth']
    },
    {
      id: 'radiation',
      name: 'Radiation Detector',
      icon: Zap,
      description: 'Monitor radiation levels and magnetic fields',
      fuelCost: 2,
      color: 'text-red-400',
      specialFor: ['Sun', 'Jupiter', 'Venus']
    },
    {
      id: 'surface-sampler',
      name: 'Surface Sampler',
      icon: MapPin,
      description: 'Collect and analyze surface samples (for landed missions)',
      fuelCost: 4,
      color: 'text-emerald-400',
      specialFor: ['Moon', 'Mars', 'Mercury']
    },
    {
      id: 'life-detector',
      name: 'Life Detection Scanner',
      icon: Activity,
      description: 'Search for signs of past or present life',
      fuelCost: 5,
      color: 'text-pink-400',
      specialFor: ['Mars', 'Earth', 'Europa', 'Enceladus']
    }
  ];

  const getObservationData = (toolId: string, planetName: string): { data: string[]; completesTask?: string } => {
    const observations: { [key: string]: { [key: string]: { data: string[]; completesTask?: string } } } = {
      telescope: {
        'Earth': { 
          data: ['Blue marble appearance with swirling white clouds', 'Atmospheric water vapor clearly visible', 'City lights visible on night side', 'Auroras detected at polar regions'],
          completesTask: 'Study Earth'
        },
        'Moon': { 
          data: ['Heavily cratered surface visible', 'No atmosphere detected', 'Ancient lava flows (maria) observed', 'Polar regions show potential ice deposits'],
          completesTask: 'Lunar Reconnaissance'
        },
        'Mars': { 
          data: ['Polar ice caps clearly visible', 'Dust storms observed across surface', 'Ancient river valleys detected', 'Seasonal changes in polar caps noted'],
          completesTask: 'Mars Geological Survey'
        },
        'Mercury': { 
          data: ['Heavily cratered surface similar to Moon', 'No atmosphere detected', 'Extreme temperature variations observed', 'Caloris Basin impact crater visible'],
          completesTask: 'Mercury Temperature Study'
        },
        'Venus': { 
          data: ['Thick cloud cover completely obscures surface', 'Retrograde rotation confirmed', 'Atmospheric pressure readings extremely high', 'Surface temperature exceeds 460°C'],
          completesTask: 'Venus Atmospheric Analysis'
        }
      },
      spectrometer: {
        'Earth': { 
          data: ['78% Nitrogen, 21% Oxygen atmosphere', '1% Argon and trace gases detected', 'Water vapor varies 0-4% by location', 'Ozone layer protecting surface'],
          completesTask: 'Study Earth'
        },
        'Venus': { 
          data: ['96.5% Carbon dioxide atmosphere', '3.5% Nitrogen with trace gases', 'Sulfuric acid clouds confirmed', 'Extreme greenhouse effect measured'],
          completesTask: 'Venus Atmospheric Analysis'
        },
        'Mercury': { 
          data: ['No significant atmosphere detected', 'Surface composition: Iron core, silicate mantle', 'Trace sodium and oxygen from solar wind', 'Extreme temperature readings: -173°C to 427°C'],
          completesTask: 'Mercury Temperature Study'
        }
      },
      'surface-sampler': {
        'Moon': { 
          data: ['Regolith samples collected successfully', 'Ancient impact breccias found', 'No organic compounds detected', 'Mineral composition: Anorthite, pyroxene, olivine'],
          completesTask: 'Lunar Reconnaissance'
        },
        'Mars': { 
          data: ['Iron oxide (rust) confirms red color', 'Traces of ancient water detected in minerals', 'Possible organic compounds found', 'Evidence of past flowing water confirmed'],
          completesTask: 'Mars Geological Survey'
        }
      },
      'life-detector': {
        'Mars': { 
          data: ['No current life signs detected', 'Ancient microbial fossils possible', 'Subsurface water ice confirmed', 'Methane traces suggest possible biological activity'],
          completesTask: 'Mars Geological Survey'
        },
        'Earth': { 
          data: ['Abundant life signatures detected', 'Oxygen-rich atmosphere indicates photosynthesis', 'Diverse electromagnetic signatures', 'Complex ecosystem patterns observed'],
          completesTask: 'Study Earth'
        }
      }
    };

    const result = observations[toolId]?.[planetName];
    if (result) {
      return result;
    }

    // Default observations for other tools/planets
    return {
      data: [`${toolId} scan of ${planetName} completed`, 'Data recorded for further analysis', 'Mission objectives updated'],
      completesTask: undefined
    };
  };

  const useTool = async (tool: any) => {
    if (fuel < tool.fuelCost) return;
    
    setActiveTool(tool.id);
    setIsScanning(true);

    // Simulate scanning time
    setTimeout(() => {
      const { data, completesTask } = getObservationData(tool.id, selectedPlanet.name);
      const result: ObservationResult = {
        toolUsed: tool.name,
        target: selectedPlanet.name,
        data,
        success: true,
        completesTask
      };
      
      onObservationComplete(result);
      setIsScanning(false);
      setActiveTool(null);
    }, 2000);
  };

  const getTaskSuggestions = (planetName: string) => {
    const suggestions: { [key: string]: string[] } = {
      'Earth': ['Use Telescope to study atmospheric conditions', 'Use Spectrometer to analyze atmosphere', 'Use Life Detector to confirm biosignatures'],
      'Moon': ['Use Surface Sampler to collect regolith', 'Use Telescope for surface observation', 'Use Radar Scanner for subsurface analysis'],
      'Mars': ['Use Life Detector to search for past life', 'Use Surface Sampler for geological evidence', 'Use Telescope for surface features'],
      'Venus': ['Use Spectrometer for atmospheric analysis', 'Use Telescope to study cloud patterns'],
      'Mercury': ['Use Spectrometer for temperature study', 'Use Telescope for surface observation']
    };
    return suggestions[planetName] || [];
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 border border-purple-500/50 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-300">Observation Tools</h2>
            <p className="text-gray-400">Analyzing: {selectedPlanet.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-yellow-400">Fuel: {fuel}%</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Task Suggestions */}
        <div className="mb-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-blue-300 font-semibold mb-2">Mission Suggestions for {selectedPlanet.name}</h3>
          <div className="text-sm text-blue-200 space-y-1">
            {getTaskSuggestions(selectedPlanet.name).map((suggestion, index) => (
              <p key={index}>• {suggestion}</p>
            ))}
          </div>
        </div>

        {isScanning && (
          <div className="mb-6 bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
              <span className="text-blue-300">Scanning {selectedPlanet.name} with {tools.find(t => t.id === activeTool)?.name}...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            const canAfford = fuel >= tool.fuelCost;
            const isActive = activeTool === tool.id;
            const isSpecialForPlanet = tool.specialFor.includes(selectedPlanet.name);

            return (
              <div
                key={tool.id}
                className={`p-4 rounded-lg border transition-all ${
                  canAfford && !isScanning
                    ? `bg-slate-800/50 border-gray-600/50 hover:border-purple-400/50 cursor-pointer ${
                        isSpecialForPlanet ? 'ring-2 ring-green-400/30' : ''
                      }`
                    : 'bg-gray-800/30 border-gray-600/30 cursor-not-allowed opacity-50'
                } ${isActive ? 'border-purple-400 bg-purple-900/30' : ''}`}
                onClick={() => canAfford && !isScanning && useTool(tool)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent size={24} className={tool.color} />
                  <div>
                    <h3 className="font-semibold text-white">{tool.name}</h3>
                    <p className="text-xs text-gray-400">Fuel: {tool.fuelCost}%</p>
                  </div>
                  {isSpecialForPlanet && (
                    <div className="ml-auto">
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
                        Recommended
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-300">{tool.description}</p>
                {!canAfford && (
                  <p className="text-xs text-red-400 mt-2">Insufficient fuel</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-slate-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">How to Complete Mission Tasks</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Select the right observation tool for each planet</li>
            <li>• Use recommended tools (highlighted in green) for better results</li>
            <li>• Some tasks require specific observations to complete</li>
            <li>• Travel to planets when possible to get the best data</li>
            <li>• Observations automatically complete relevant mission tasks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ObservationTools;
