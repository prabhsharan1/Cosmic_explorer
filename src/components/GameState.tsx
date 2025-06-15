import React, { useState, useEffect, useRef, useCallback } from 'react';
import SolarSystem3D from './SolarSystem3D';
import PlanetDetailsModal from './PlanetDetailsModal';
import ObservationTools from './ObservationTools';
import { planetData } from '../data/planetData';
import { calculateFuelCost, getRandomTask, checkTaskCompletion } from '../utils/gameLogic';
import { useToast } from './ui/use-toast';
import MissionSidebar from './MissionSidebar';
import SidebarToggle from './SidebarToggle';
import EducationalPanel from './EducationalPanel';

const GameState = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const [currentLocation, setCurrentLocation] = useState('Earth');
  const [visitedPlanets, setVisitedPlanets] = useState(['Earth']);
  const [fuel, setFuel] = useState(100);
  const [health, setHealth] = useState(100);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showPlanetDetails, setShowPlanetDetails] = useState(false);
  const [showObservationTools, setShowObservationTools] = useState(false);
  const [currentTasks, setCurrentTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [travelingTo, setTravelingTo] = useState<string | undefined>(undefined);
  const [showEducationalPanel, setShowEducationalPanel] = useState(false);
  const [educationalPlanet, setEducationalPlanet] = useState<string>('');

  const { toast } = useToast();

  // Initialize with some sample tasks
  useEffect(() => {
    const initialTasks = [
      'Study Earth',
      'Lunar Reconnaissance', 
      'Mars Geological Survey'
    ];
    setCurrentTasks(initialTasks);
  }, []);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setShowPlanetDetails(true);
    // Show educational panel when a planet is selected
    setEducationalPlanet(planet.name);
    setShowEducationalPanel(true);
  };

  const handleMoonClick = () => {
    const moonPlanet = {
      name: 'Moon',
      color: '#C0C0C0',
      size: 0.27,
      distance: 6.1,
      description: 'Earth\'s natural satellite',
      facts: ['The Moon is Earth\'s only natural satellite', 'It influences Earth\'s tides'],
      temperature: '-173°C to 127°C'
    };
    handlePlanetClick(moonPlanet);
  };

  const handleObservationComplete = (result) => {
    console.log('Observation completed:', result);
    
    // Check if this observation completes a task
    if (result.completesTask && currentTasks.includes(result.completesTask)) {
      setCompletedTasks(prev => [...prev, result.completesTask]);
      setCurrentTasks(prev => prev.filter(task => task !== result.completesTask));
      setFuel(prevFuel => Math.min(100, prevFuel + 10));
      setHealth(prevHealth => Math.min(100, prevHealth + 5));
      
      toast({
        title: "Task Completed!",
        description: `You've completed "${result.completesTask}" and earned bonuses!`,
      });
    }

    // Add new task if we have less than 3
    if (currentTasks.length < 3 && completedTasks.length < 8) {
      const newTask = getRandomTask(visitedPlanets, [...completedTasks, result.completesTask || '']);
      if (newTask && !currentTasks.includes(newTask)) {
        setCurrentTasks(prevTasks => [...prevTasks, newTask]);
        toast({
          title: "New Mission!",
          description: `A new task has been assigned.`,
        });
      }
    }

    setShowObservationTools(false);
  };

  const handleTravel = useCallback(() => {
    if (!selectedPlanet || selectedPlanet.name === currentLocation) return;

    const fuelCost = calculateFuelCost(currentLocation, selectedPlanet.name);
    if (fuel - fuelCost < 0) {
      toast({
        title: "Not enough fuel!",
        description: "You need more fuel to travel to this planet.",
        variant: "destructive",
      });
      return;
    }

    // Start travel animation
    setTravelingTo(selectedPlanet.name);
    setShowPlanetDetails(false);

    // Complete travel after animation
    setTimeout(() => {
      setFuel(prevFuel => prevFuel - fuelCost);
      setVisitedPlanets(prevVisited => [...prevVisited, selectedPlanet.name]);
      setCurrentLocation(selectedPlanet.name);
      setTravelingTo(undefined);

      // Task Completion Check
      const [completed, task] = checkTaskCompletion(selectedPlanet.name, currentTasks);
      if (completed && task) {
        setCompletedTasks(prev => [...prev, task]);
        setCurrentTasks(prev => prev.filter(t => t !== task));
        setFuel(prevFuel => Math.min(100, prevFuel + 10));
        setHealth(prevHealth => Math.min(100, prevHealth + 5));
        toast({
          title: "Task Completed!",
          description: `You've completed a task and earned a bonus!`,
        });
      }

      // Trigger new task
      if (completedTasks.length < 5 && currentTasks.length < 3) {
        const newTask = getRandomTask(visitedPlanets, completedTasks);
        if (newTask && !currentTasks.includes(newTask)) {
          setCurrentTasks(prevTasks => [...prevTasks, newTask]);
          toast({
            title: "New Task!",
            description: `A new mission task has been assigned.`,
          });
        }
      }

      // Random events
      if (selectedPlanet.name === 'Jupiter' && Math.random() < 0.3) {
        setHealth(prevHealth => Math.max(0, prevHealth - 15));
        toast({
          title: "Ship Damaged!",
          description: "You've encountered an asteroid field near Jupiter and sustained damage.",
          variant: "destructive",
        });
      }
      if (selectedPlanet.name === 'Sun') {
        setHealth(0);
        toast({
          title: "Mission Failed!",
          description: "You got too close to the sun and your ship melted.",
          variant: "destructive",
        });
      }
      if (selectedPlanet.name === 'Pluto' && fuel < 20) {
        setFuel(0);
        toast({
          title: "Mission Failed!",
          description: "You ran out of fuel near Pluto and are now stranded.",
          variant: "destructive",
        });
      }
    }, 3000); // 3 second delay to match animation
  }, [selectedPlanet, fuel, currentLocation, currentTasks, completedTasks, visitedPlanets, toast]);

  useEffect(() => {
    if (health <= 0) {
      toast({
        title: "Game Over!",
        description: "Your ship has been destroyed. Better luck next time!",
        variant: "destructive",
      });
      audioRef.current?.pause();
    }
  }, [health, toast, audioRef]);

  // Check if we can travel to selected planet
  const canTravel = selectedPlanet && 
    selectedPlanet.name !== currentLocation && 
    fuel >= calculateFuelCost(currentLocation, selectedPlanet.name) &&
    (selectedPlanet.name === 'Moon' || // Moon is always accessible from any location
     planetData.find(p => p.name === currentLocation)?.canTravelTo?.includes(selectedPlanet.name));

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-hidden transition-all duration-700 ease-in-out">
      {/* Sidebar Toggle Button */}
      <SidebarToggle onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mission Sidebar with all information */}
      <MissionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLocation={currentLocation}
        fuel={fuel}
        health={health}
        visitedPlanets={visitedPlanets}
        completedTasks={completedTasks}
        availableTasks={currentTasks}
      />

      {/* Main 3D Solar System - now takes full screen */}
      <div className={`transition-all duration-700 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <SolarSystem3D
          currentLocation={currentLocation}
          visitedPlanets={visitedPlanets}
          onPlanetClick={handlePlanetClick}
          fuel={fuel}
          onMoonClick={handleMoonClick}
          travelingTo={travelingTo}
        />
      </div>

      <PlanetDetailsModal
        isOpen={showPlanetDetails}
        onClose={() => {
          setShowPlanetDetails(false);
          setShowEducationalPanel(false);
        }}
        planet={selectedPlanet}
        onTravel={handleTravel}
        canTravel={canTravel}
        onObserve={() => {
          setShowPlanetDetails(false);
          setShowObservationTools(true);
        }}
      />

      <ObservationTools
        selectedPlanet={selectedPlanet}
        onObservationComplete={handleObservationComplete}
        fuel={fuel}
        isVisible={showObservationTools}
        onClose={() => setShowObservationTools(false)}
      />

      <EducationalPanel
        planetName={educationalPlanet}
        isVisible={showEducationalPanel}
        onClose={() => setShowEducationalPanel(false)}
      />
    </div>
  );
};

export default GameState;
