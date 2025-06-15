
export const calculateFuelCost = (from: string, to: string): number => {
  // Simple fuel cost calculation based on distance between planets
  const distances: { [key: string]: number } = {
    'Sun': 0,
    'Mercury': 3,
    'Venus': 4.5,
    'Earth': 6,
    'Mars': 8,
    'Jupiter': 12,
    'Saturn': 16,
    'Uranus': 20,
    'Neptune': 24,
    'Pluto': 28,
    'Moon': 6.1 // Slightly further than Earth
  };
  
  const fromDistance = distances[from] || 0;
  const toDistance = distances[to] || 0;
  const fuelCost = Math.abs(toDistance - fromDistance) * 5;
  
  return Math.max(fuelCost, 10); // Minimum fuel cost of 10
};

export const getRandomTask = (visitedPlanets: string[], completedTasks: string[]): string | null => {
  const allTasks = [
    'Study Earth',
    'Lunar Reconnaissance',
    'Mars Geological Survey',
    'Mercury Temperature Study',
    'Venus Atmospheric Analysis',
    'Collect mineral samples from Mars',
    'Study Jupiter\'s Great Red Spot',
    'Analyze Saturn\'s rings',
    'Investigate Uranus\' magnetic field',
    'Explore Neptune\'s storms',
    'Search for water on Europa',
    'Map Venus\' surface features',
    'Study Mercury\'s solar wind interaction'
  ];
  
  const availableTasks = allTasks.filter(task => !completedTasks.includes(task));
  
  if (availableTasks.length === 0) return null;
  
  return availableTasks[Math.floor(Math.random() * availableTasks.length)];
};

export const checkTaskCompletion = (planetName: string, currentTasks: string[]): [boolean, string | null] => {
  const taskCompletionMap: { [key: string]: string[] } = {
    'Earth': ['Study Earth'],
    'Moon': ['Lunar Reconnaissance'],
    'Mars': ['Collect mineral samples from Mars', 'Mars Geological Survey'],
    'Jupiter': ['Study Jupiter\'s Great Red Spot'],
    'Saturn': ['Analyze Saturn\'s rings'],
    'Uranus': ['Investigate Uranus\' magnetic field'],
    'Neptune': ['Explore Neptune\'s storms'],
    'Venus': ['Map Venus\' surface features', 'Venus Atmospheric Analysis'],
    'Mercury': ['Study Mercury\'s solar wind interaction', 'Mercury Temperature Study']
  };
  
  const completableTasks = taskCompletionMap[planetName] || [];
  
  for (const task of completableTasks) {
    if (currentTasks.includes(task)) {
      return [true, task];
    }
  }
  
  return [false, null];
};
