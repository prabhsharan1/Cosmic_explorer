
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Planet {
  name: string;
  color: string;
  size: number;
  distance: number;
  description?: string;
  facts?: string[];
  moons?: number;
  temperature?: string;
  atmosphere?: string;
}

interface PlanetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: Planet | null;
  onTravel: () => void;
  canTravel: boolean;
  onObserve?: () => void;
}

const PlanetDetailsModal = ({ isOpen, onClose, planet, onTravel, canTravel, onObserve }: PlanetDetailsModalProps) => {
  if (!planet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-sm border-purple-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: planet.color }}
            />
            {planet.name}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {planet.description || `Explore the ${planet.name} and discover its secrets.`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Distance from Sun:</span>
              <p className="text-blue-400">{planet.distance} AU</p>
            </div>
            <div>
              <span className="text-gray-400">Size:</span>
              <p className="text-green-400">{planet.size}x Earth</p>
            </div>
            {planet.moons && (
              <div>
                <span className="text-gray-400">Moons:</span>
                <p className="text-yellow-400">{planet.moons}</p>
              </div>
            )}
            {planet.temperature && (
              <div>
                <span className="text-gray-400">Temperature:</span>
                <p className="text-orange-400">{planet.temperature}</p>
              </div>
            )}
          </div>

          {planet.atmosphere && (
            <div>
              <span className="text-gray-400 text-sm">Atmosphere:</span>
              <p className="text-cyan-400 text-sm">{planet.atmosphere}</p>
            </div>
          )}

          {planet.facts && planet.facts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Interesting Facts:</h4>
              <div className="space-y-1">
                {planet.facts.slice(0, 3).map((fact, index) => (
                  <p key={index} className="text-xs text-gray-400">• {fact}</p>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={onTravel}
              disabled={!canTravel}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {canTravel ? "Travel Here" : "Cannot Travel"}
            </Button>
            {onObserve && (
              <Button 
                onClick={onObserve}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Observe
              </Button>
            )}
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanetDetailsModal;
