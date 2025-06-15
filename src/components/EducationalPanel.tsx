
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen, Lightbulb, Target, Telescope, X, ChevronDown, ChevronUp } from 'lucide-react';
import { educationalContent } from '../data/educationalContent';

interface EducationalPanelProps {
  planetName: string;
  isVisible: boolean;
  onClose: () => void;
}

const EducationalPanel = ({ planetName, isVisible, onClose }: EducationalPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || !educationalContent[planetName]) return null;

  const content = educationalContent[planetName];

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] bg-slate-900/95 backdrop-blur-sm border border-blue-500/50 rounded-xl shadow-2xl z-40 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/30">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-400" size={20} />
          <h3 className="text-lg font-bold text-white">Learning About {planetName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[70vh]' : 'max-h-32'} overflow-y-auto`}>
        <div className="p-4">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {content.overview}
          </p>

          {isExpanded && (
            <Tabs defaultValue="facts" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                <TabsTrigger value="facts" className="text-xs">Facts</TabsTrigger>
                <TabsTrigger value="science" className="text-xs">Science</TabsTrigger>
                <TabsTrigger value="explore" className="text-xs">Explore</TabsTrigger>
                <TabsTrigger value="mission" className="text-xs">Mission</TabsTrigger>
              </TabsList>

              <TabsContent value="facts" className="mt-4 space-y-3">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-yellow-400 mb-2">
                    <Target size={14} />
                    Key Facts
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {content.keyFacts.map((fact, index) => (
                      <li key={index}>• {fact}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-2">
                    <Lightbulb size={14} />
                    Did You Know?
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {content.didYouKnow.slice(0, 3).map((fact, index) => (
                      <li key={index}>• {fact}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="science" className="mt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-1">Composition</h4>
                  <p className="text-xs text-gray-300">{content.composition}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-1">Atmosphere</h4>
                  <p className="text-xs text-gray-300">{content.atmosphere}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">Moons</h4>
                  <p className="text-xs text-gray-300">{content.moons}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-orange-400 mb-1">Size Comparison</h4>
                  <p className="text-xs text-gray-300">{content.compareToEarth}</p>
                </div>
              </TabsContent>

              <TabsContent value="explore" className="mt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-pink-400 mb-2">Fun Facts</h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {content.funFacts.map((fact, index) => (
                      <li key={index}>• {fact}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-indigo-400 mb-2">Space Missions</h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {content.exploration.map((mission, index) => (
                      <li key={index}>• {mission}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="mission" className="mt-4 space-y-3">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-2">
                    <Telescope size={14} />
                    Mission Tips
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {content.missionTips.map((tip, index) => (
                      <li key={index} className={tip.includes('⚠️') ? 'text-red-300' : ''}>
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-blue-300 mb-1">Educational Objective</h5>
                  <p className="text-xs text-blue-200">
                    Use the observation tools to study {planetName} and complete mission tasks to advance your understanding of this celestial body.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {!isExpanded && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 text-center">
            Click ↑ to expand and learn more about {planetName}
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationalPanel;
