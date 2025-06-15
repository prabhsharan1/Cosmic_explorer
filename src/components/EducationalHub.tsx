
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Rocket, 
  Globe, 
  Telescope, 
  Target, 
  Award,
  Lightbulb,
  Brain,
  Gamepad2,
  GraduationCap
} from 'lucide-react';
import { educationalContent } from '../data/educationalContent';

interface EducationalHubProps {
  onStartMission: () => void;
  completedTasks: string[];
  visitedPlanets: string[];
}

const EducationalHub = ({ onStartMission, completedTasks, visitedPlanets }: EducationalHubProps) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('Earth');

  const learningModules = [
    {
      id: 'solar-system-basics',
      title: 'Solar System Basics',
      description: 'Learn about our solar system structure and formation',
      icon: Globe,
      difficulty: 'Beginner',
      duration: '10 min',
      topics: ['Planet Formation', 'Solar System Structure', 'Distance and Scale']
    },
    {
      id: 'planet-exploration',
      title: 'Planet Exploration',
      description: 'Discover the unique characteristics of each planet',
      icon: Telescope,
      difficulty: 'Intermediate',
      duration: '15 min',
      topics: ['Rocky vs Gas Planets', 'Atmospheres', 'Moons and Rings']
    },
    {
      id: 'space-missions',
      title: 'Space Missions',
      description: 'Learn about real space missions and exploration',
      icon: Rocket,
      difficulty: 'Advanced',
      duration: '20 min',
      topics: ['Mission Planning', 'Spacecraft Design', 'Navigation']
    },
    {
      id: 'astrobiology',
      title: 'Search for Life',
      description: 'Explore the possibility of life in our solar system',
      icon: Brain,
      difficulty: 'Advanced',
      duration: '18 min',
      topics: ['Habitable Zones', 'Extremophiles', 'Biosignatures']
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first observation', unlocked: completedTasks.length > 0 },
    { name: 'Explorer', description: 'Visit 3 different celestial bodies', unlocked: visitedPlanets.length >= 3 },
    { name: 'Scientist', description: 'Complete 5 research tasks', unlocked: completedTasks.length >= 5 },
    { name: 'Navigator', description: 'Successfully travel between planets', unlocked: visitedPlanets.length >= 2 },
    { name: 'Solar System Expert', description: 'Visit all planets', unlocked: visitedPlanets.length >= 8 }
  ];

  const planetsList = Object.keys(educationalContent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-blue-400" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solar System Educational Hub
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn about our solar system through interactive missions and comprehensive educational content
          </p>
        </header>

        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 mb-6">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen size={16} />
              Learn
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Telescope size={16} />
              Explore
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex items-center gap-2">
              <Target size={16} />
              Missions
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award size={16} />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {learningModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <Card key={module.id} className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="text-blue-400" size={24} />
                        <CardTitle className="text-white">{module.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {module.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{module.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-yellow-400">Topics Covered:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {module.topics.map((topic, index) => (
                            <li key={index}>• {topic}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="explore">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white">Select a Planet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {planetsList.map((planet) => (
                      <Button
                        key={planet}
                        variant={selectedPlanet === planet ? "default" : "outline"}
                        className={`w-full justify-start ${
                          visitedPlanets.includes(planet) ? 'bg-green-600/20 border-green-500/30' : ''
                        }`}
                        onClick={() => setSelectedPlanet(planet)}
                      >
                        {planet} {visitedPlanets.includes(planet) && '✓'}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {selectedPlanet && educationalContent[selectedPlanet] && (
                  <Card className="bg-slate-800/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Globe className="text-blue-400" size={24} />
                        {selectedPlanet}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">
                        {educationalContent[selectedPlanet].overview}
                      </p>
                      
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-2">Key Facts:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {educationalContent[selectedPlanet].keyFacts.slice(0, 4).map((fact, index) => (
                            <li key={index}>• {fact}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-green-400 font-semibold mb-2">Fun Facts:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {educationalContent[selectedPlanet].funFacts.slice(0, 3).map((fact, index) => (
                            <li key={index}>• {fact}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="missions">
            <div className="text-center mb-8">
              <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-purple-500/30 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-center gap-2">
                    <Gamepad2 className="text-blue-400" size={24} />
                    Interactive Space Missions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Embark on realistic space missions to explore our solar system. Use observation tools, 
                    navigate between planets, and complete educational objectives.
                  </p>
                  <Button
                    onClick={onStartMission}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    size="lg"
                  >
                    <Rocket className="mr-2" size={20} />
                    Start Space Mission
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">Beginner Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Earth and Moon observation</li>
                    <li>• Basic spacecraft navigation</li>
                    <li>• Introduction to space instruments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Intermediate Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Inner planet exploration</li>
                    <li>• Atmospheric analysis</li>
                    <li>• Surface composition studies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-400">Advanced Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Outer planet expeditions</li>
                    <li>• Life detection missions</li>
                    <li>• Deep space navigation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="text-yellow-400" size={24} />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-green-600/20 border border-green-500/30' 
                          : 'bg-gray-800/50 border border-gray-600/30'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        achievement.unlocked ? 'bg-green-400' : 'bg-gray-600'
                      }`} />
                      <div>
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? 'text-green-300' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="text-blue-400" size={24} />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Planets Visited</span>
                      <span className="text-blue-400">{visitedPlanets.length}/10</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(visitedPlanets.length / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Tasks Completed</span>
                      <span className="text-green-400">{completedTasks.length}/15</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedTasks.length / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <h4 className="text-blue-300 font-semibold mb-1">Next Goal</h4>
                    <p className="text-sm text-blue-200">
                      {completedTasks.length < 5 
                        ? "Complete more observation tasks to unlock advanced missions"
                        : visitedPlanets.length < 8 
                        ? "Visit more planets to become a Solar System Expert"
                        : "Congratulations! You've mastered the solar system!"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EducationalHub;
