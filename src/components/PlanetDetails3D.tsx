
import { useState } from 'react';
import { Planet } from '../data/planetData';
import { moonData } from '../data/moonData';
import { ChevronDown, ChevronUp, Rocket, AlertTriangle, Info, Satellite } from 'lucide-react';

interface PlanetDetails3DProps {
  planet: Planet;
  onTravel: (planet: Planet) => void;
  canAfford: boolean;
  onClose: () => void;
}

const PlanetDetails3D = ({ planet, onTravel, canAfford, onClose }: PlanetDetails3DProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showMoons, setShowMoons] = useState(false);

  const moons = moonData[planet.name] || [];

  const getPlanetIcon = (name: string) => {
    const icons: { [key: string]: string } = {
      'Sun': '☀️',
      'Mercury': '☿️',
      'Venus': '♀️',
      'Earth': '🌍',
      'Mars': '♂️',
      'Jupiter': '♃',
      'Saturn': '♄',
      'Uranus': '♅',
      'Neptune': '♆',
      'Pluto': '🪐'
    };
    return icons[name] || '🪐';
  };

  const getPlanetFacts = (name: string) => {
    const facts: { [key: string]: string[] } = {
      'Sun': [
        'Surface temperature: 5,778K (5,505°C)',
        'Core temperature: 15 million°C',
        'Mass: 99.86% of the solar system',
        'Light takes 8 minutes to reach Earth'
      ],
      'Mercury': [
        'Day length: 59 Earth days',
        'Year length: 88 Earth days',
        'No atmosphere or moons',
        'Temperature range: -173°C to 427°C'
      ],
      'Venus': [
        'Rotates backwards (retrograde)',
        'One day longer than one year',
        'Surface pressure: 90x Earth',
        'Rains sulfuric acid'
      ],
      'Earth': [
        'Only known planet with life',
        '71% covered by water',
        'One natural satellite (Moon)',
        'Magnetic field protects from radiation'
      ],
      'Mars': [
        'Home to Olympus Mons (largest volcano)',
        'Polar ice caps of water and CO2',
        'Day length similar to Earth (24.6 hours)',
        'Two small moons: Phobos and Deimos'
      ],
      'Jupiter': [
        'Could fit all other planets inside it',
        'Great Red Spot is a giant storm',
        'Has 95 known moons',
        'Made mostly of hydrogen and helium'
      ],
      'Saturn': [
        'Less dense than water',
        'Rings made of ice and rock particles',
        'Has 146 known moons',
        'Titan has lakes of liquid methane'
      ],
      'Uranus': [
        'Tilted 98° on its side',
        'Has faint rings',
        'Coldest planetary atmosphere',
        'Day lasts 17 Earth hours'
      ],
      'Neptune': [
        'Windiest planet (up to 2,100 km/h)',
        'Takes 165 Earth years to orbit Sun',
        'Has 16 known moons',
        'Triton orbits backwards'
      ],
      'Pluto': [
        'Smaller than Earth\'s Moon',
        'Has 5 known moons',
        'Heart-shaped nitrogen plain',
        'Sometimes closer to Sun than Neptune'
      ]
    };
    return facts[name] || [];
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-purple-500/50 rounded-xl p-6 max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{getPlanetIcon(planet.name)}</span>
          <div>
            <h3 className="text-2xl font-bold text-white">{planet.name}</h3>
            <p className="text-purple-300">Watch the planets orbit the Sun in real-time!</p>
            {moons.length > 0 && (
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Satellite size={14} />
                {moons.length} moon{moons.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-400 mb-2">
              <Info size={18} />
              Description
            </h4>
            <div className="space-y-1 text-sm text-gray-300">
              {planet.description.map((desc, index) => (
                <p key={index}>• {desc}</p>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Quick Facts</h4>
            <div className="space-y-1 text-sm text-gray-300">
              {getPlanetFacts(planet.name).slice(0, 3).map((fact, index) => (
                <p key={index}>• {fact}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Moons Section */}
        {moons.length > 0 && (
          <div className="bg-slate-800/50 rounded-lg p-4">
            <button
              onClick={() => setShowMoons(!showMoons)}
              className="flex items-center gap-2 text-lg font-semibold text-cyan-400 mb-2 hover:text-cyan-300 transition-colors"
            >
              <Satellite size={18} />
              Moons ({moons.length})
              {showMoons ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showMoons && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {moons.map((moon, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{moon.emoji}</span>
                      <h5 className="font-semibold text-white">{moon.name}</h5>
                    </div>
                    <p className="text-xs text-gray-300">{moon.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? 'Show Less' : 'Learn More'}
        </button>

        {expanded && (
          <div className="bg-slate-800/50 rounded-lg p-4 animate-fade-in">
            <h4 className="text-lg font-semibold text-green-400 mb-2">Additional Facts</h4>
            <div className="space-y-1 text-sm text-gray-300">
              {getPlanetFacts(planet.name).slice(3).map((fact, index) => (
                <p key={index}>• {fact}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-600">
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 font-semibold">Fuel Cost: {planet.fuelCost}%</span>
            {planet.warning && (
              <div className="flex items-center gap-1 text-red-400 text-sm">
                <AlertTriangle size={16} />
                <span>Danger</span>
              </div>
            )}
          </div>

          <button
            onClick={() => onTravel(planet)}
            disabled={!canAfford}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
              canAfford
                ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Rocket size={16} />
            {canAfford ? `Travel to ${planet.name}` : 'Insufficient Fuel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetails3D;
