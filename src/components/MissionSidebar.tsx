
import { useState } from 'react';
import { X, Target, Settings, CheckSquare, Fuel, Heart, MapPin, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface MissionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  fuel: number;
  health: number;
  visitedPlanets: string[];
  completedTasks: string[];
  availableTasks: string[];
}

const MissionSidebar = ({
  isOpen,
  onClose,
  currentLocation,
  fuel,
  health,
  visitedPlanets,
  completedTasks,
  availableTasks
}: MissionSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'status' | 'control' | 'tasks'>('status');

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-r border-purple-500/30 z-50 shadow-xl transition-all duration-700 ease-in-out">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <h2 className="text-xl font-bold text-white">Mission Center</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-purple-600/20 transition-colors duration-300"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-all duration-300 ${
            activeTab === 'status'
              ? 'border-purple-400 text-purple-400 bg-purple-900/20'
              : 'border-transparent text-gray-400 hover:text-purple-300'
          }`}
        >
          <Target className="h-4 w-4 inline mr-2" />
          Status
        </button>
        <button
          onClick={() => setActiveTab('control')}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-all duration-300 ${
            activeTab === 'control'
              ? 'border-purple-400 text-purple-400 bg-purple-900/20'
              : 'border-transparent text-gray-400 hover:text-purple-300'
          }`}
        >
          <Settings className="h-4 w-4 inline mr-2" />
          Control
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-all duration-300 ${
            activeTab === 'tasks'
              ? 'border-purple-400 text-purple-400 bg-purple-900/20'
              : 'border-transparent text-gray-400 hover:text-purple-300'
          }`}
        >
          <CheckSquare className="h-4 w-4 inline mr-2" />
          Tasks
        </button>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        {activeTab === 'status' && (
          <div className="space-y-4">
            {/* Fuel Reserves */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/30 transition-all duration-300 hover:border-yellow-400/50">
              <div className="flex items-center mb-3">
                <Fuel className="h-5 w-5 mr-2 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Fuel Reserves</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">Remaining fuel for your journey</p>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>{fuel}%</span>
                  <span>100%</span>
                </div>
                <Progress value={fuel} className="h-3" />
              </div>
            </div>

            {/* Ship Integrity */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/30 transition-all duration-300 hover:border-green-400/50">
              <div className="flex items-center mb-3">
                <Heart className="h-5 w-5 mr-2 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Ship Integrity</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">Current health status of your spacecraft</p>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>{health}%</span>
                  <span>100%</span>
                </div>
                <Progress value={health} className="h-3" />
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30 transition-all duration-300 hover:border-blue-400/50">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Current Location</h3>
              </div>
              <p className="text-blue-400 font-medium text-lg">{currentLocation}</p>
            </div>

            {/* Exploration Log */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/30 transition-all duration-300 hover:border-green-400/50">
              <h3 className="text-lg font-semibold text-white mb-3">Exploration Log</h3>
              <p className="text-gray-400 text-sm mb-3">Planets visited: {visitedPlanets.length}</p>
              <div className="flex flex-wrap gap-2">
                {visitedPlanets.map((planet, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
                    {planet}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'control' && (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Mission Control</h3>
              <div className="space-y-3">
                <div className="text-gray-300 text-sm">
                  <p className="mb-2">🎮 <strong>Controls:</strong></p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Click and drag to rotate view</li>
                    <li>• Scroll to zoom in/out</li>
                    <li>• Click planets to view details</li>
                    <li>• Use "Travel Here" to navigate</li>
                    <li>• Use "Observe" to study planets</li>
                  </ul>
                </div>
                
                <div className="text-gray-300 text-sm">
                  <p className="mb-2">⚠️ <strong>Warnings:</strong></p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Avoid getting too close to the Sun</li>
                    <li>• Manage fuel carefully</li>
                    <li>• Complete tasks for bonuses</li>
                    <li>• Jupiter's asteroid belt is dangerous</li>
                    <li>• Use observations to complete missions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">Mission Tasks</h3>
              
              {completedTasks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-green-400 font-medium mb-2">✅ Completed ({completedTasks.length})</h4>
                  <div className="space-y-2">
                    {completedTasks.map((task, index) => (
                      <div key={index} className="text-sm text-green-300 bg-green-900/20 p-3 rounded border border-green-500/30 transition-all duration-300 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTasks.length > 0 && (
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">📋 Available ({availableTasks.length})</h4>
                  <div className="space-y-2">
                    {availableTasks.map((task, index) => (
                      <div key={index} className="text-sm text-yellow-300 bg-yellow-900/20 p-3 rounded border border-yellow-500/30 transition-all duration-300">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTasks.length === 0 && completedTasks.length === 0 && (
                <p className="text-gray-400 text-sm">No tasks available at this time.</p>
              )}

              <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium mb-2">💡 How to Complete Tasks:</h4>
                <ul className="text-xs text-blue-200 space-y-1">
                  <li>• Click on planets to view details</li>
                  <li>• Use "Observe" button to study planets</li>
                  <li>• Travel to planets when possible</li>
                  <li>• Observations automatically complete relevant tasks</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionSidebar;
