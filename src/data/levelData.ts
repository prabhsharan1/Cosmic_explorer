
export interface Task {
  id: string;
  name: string;
  description: string;
  type: 'exploration' | 'research' | 'survival' | 'discovery';
  target?: string;
  requirement?: string;
  hint?: string;
  reward: {
    fuel?: number;
    health?: number;
    points: number;
    knowledge?: string;
  };
  completed: boolean;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  tasks: Task[];
  unlockCondition?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  backgroundInfo: string;
  educationalContent: string[];
  tips: string[];
  warnings: string[];
  estimatedDuration: string;
}

export const levels: Level[] = [
  {
    id: 'earth-orbit',
    name: 'Earth Orbit Mission',
    description: 'Learn the basics of space travel and prepare for your first interplanetary journey.',
    objectives: [
      'Complete pre-flight systems check',
      'Navigate to the Moon for practice',
      'Study Earth from space'
    ],
    tasks: [
      {
        id: 'earth-study',
        name: 'Study Earth',
        description: 'Observe Earth from space and document atmospheric conditions',
        type: 'research',
        target: 'Earth',
        hint: 'Click on Earth in the 3D view to select it, then use the observation tools',
        reward: { points: 50, knowledge: 'Earth Atmosphere' },
        completed: false
      },
      {
        id: 'moon-visit',
        name: 'Lunar Reconnaissance',
        description: 'Travel to the Moon and collect surface samples',
        type: 'exploration',
        target: 'Moon',
        hint: 'The Moon is close to Earth - perfect for practicing navigation controls',
        reward: { fuel: 10, points: 100, knowledge: 'Lunar Geology' },
        completed: false
      }
    ],
    unlockCondition: 'Start of game',
    isUnlocked: true,
    isCompleted: false,
    backgroundInfo: 'Earth orbit is humanity\'s first step into space. From here, astronauts can observe our beautiful blue planet and prepare for longer journeys.',
    educationalContent: [
      'Earth is the only known planet with life in our solar system',
      'The International Space Station orbits Earth at approximately 408 km altitude',
      'Earth\'s atmosphere protects us from harmful solar radiation'
    ],
    tips: [
      'Use mouse to rotate the view and scroll to zoom in/out',
      'Click on planets to see detailed information',
      'Start with closer targets like the Moon to get familiar with controls',
      'Check your fuel levels regularly in the status panel'
    ],
    warnings: [
      'Don\'t venture too far from Earth until you complete the basic tasks',
      'Always monitor your ship\'s health and fuel status'
    ],
    estimatedDuration: '5-10 minutes'
  },
  {
    id: 'inner-planets',
    name: 'Inner Solar System Explorer',
    description: 'Explore the rocky planets closest to the Sun: Mercury, Venus, and Mars.',
    objectives: [
      'Visit all inner planets',
      'Survive Venus\'s extreme conditions',
      'Search for signs of past life on Mars'
    ],
    tasks: [
      {
        id: 'mercury-scan',
        name: 'Mercury Temperature Study',
        description: 'Measure temperature variations on Mercury\'s surface',
        type: 'research',
        target: 'Mercury',
        hint: 'Mercury is the closest planet to the Sun - expect extreme temperatures!',
        reward: { points: 150, knowledge: 'Extreme Temperatures' },
        completed: false
      },
      {
        id: 'venus-atmosphere',
        name: 'Venus Atmospheric Analysis',
        description: 'Study Venus\'s thick atmosphere while avoiding damage',
        type: 'survival',
        target: 'Venus',
        hint: 'Venus has a toxic atmosphere - this mission will damage your ship but provides valuable data',
        reward: { health: -20, points: 200, knowledge: 'Greenhouse Effect' },
        completed: false
      },
      {
        id: 'mars-geology',
        name: 'Mars Geological Survey',
        description: 'Search for evidence of ancient water on Mars',
        type: 'discovery',
        target: 'Mars',
        hint: 'Mars is known as the Red Planet - look for signs of ancient riverbeds and polar ice caps',
        reward: { points: 250, knowledge: 'Martian History' },
        completed: false
      }
    ],
    unlockCondition: 'Complete Earth Orbit Mission',
    isUnlocked: false,
    isCompleted: false,
    backgroundInfo: 'The inner planets are rocky worlds with diverse environments, from Mercury\'s extreme temperatures to Mars\'s ancient riverbeds.',
    educationalContent: [
      'Mercury has the most extreme temperature variations in the solar system (-173°C to 427°C)',
      'Venus is the hottest planet due to its runaway greenhouse effect (462°C surface temperature)',
      'Mars shows evidence of ancient flowing water and possible past life'
    ],
    tips: [
      'Plan your route carefully - fuel becomes more important on longer journeys',
      'Complete easier tasks first to build up resources',
      'Venus will damage your ship, so make sure you have enough health before visiting',
      'Mars is a safer destination compared to Mercury and Venus'
    ],
    warnings: [
      'Mercury\'s extreme proximity to the Sun makes it dangerous',
      'Venus\'s atmosphere is highly corrosive and will damage your ship',
      'Don\'t attempt this mission if your health is below 50%'
    ],
    estimatedDuration: '15-20 minutes'
  },
  {
    id: 'asteroid-belt',
    name: 'Asteroid Belt Navigation',
    description: 'Navigate through the dangerous asteroid belt between Mars and Jupiter.',
    objectives: [
      'Successfully navigate the asteroid belt',
      'Mine resources from asteroids',
      'Avoid ship damage from collisions'
    ],
    tasks: [
      {
        id: 'asteroid-mining',
        name: 'Resource Collection',
        description: 'Collect valuable minerals from asteroids',
        type: 'exploration',
        requirement: 'Navigate asteroid belt safely',
        hint: 'Look for the asteroid belt between Mars and Jupiter - approach carefully to avoid collisions',
        reward: { fuel: 30, points: 300, knowledge: 'Asteroid Composition' },
        completed: false
      },
      {
        id: 'navigation-challenge',
        name: 'Safe Passage',
        description: 'Navigate through the asteroid belt without taking damage',
        type: 'survival',
        hint: 'Move slowly and carefully through the asteroid field - patience is key',
        reward: { health: 10, points: 200 },
        completed: false
      }
    ],
    unlockCondition: 'Complete Inner Solar System Explorer',
    isUnlocked: false,
    isCompleted: false,
    backgroundInfo: 'The asteroid belt contains remnants from the solar system\'s formation, offering insights into our cosmic origins.',
    educationalContent: [
      'Most asteroids are found between Mars and Jupiter',
      'Asteroids are leftover building blocks from planet formation 4.6 billion years ago',
      'Some asteroids contain valuable metals like platinum and rare earth elements'
    ],
    tips: [
      'Approach the asteroid belt slowly to avoid collisions',
      'Look for larger asteroids that are easier to navigate around',
      'This mission provides valuable fuel resources for future journeys',
      'Use the 3D view to carefully plan your path through the asteroids'
    ],
    warnings: [
      'Collisions with asteroids will damage your ship',
      'Don\'t rush through the asteroid field',
      'Make sure you have sufficient health before attempting this mission'
    ],
    estimatedDuration: '10-15 minutes'
  },
  {
    id: 'gas-giants',
    name: 'Gas Giant Expedition',
    description: 'Explore the massive gas giants Jupiter and Saturn with their fascinating moons.',
    objectives: [
      'Study Jupiter\'s Great Red Spot',
      'Explore Saturn\'s ring system',
      'Investigate moons for signs of life'
    ],
    tasks: [
      {
        id: 'jupiter-storm',
        name: 'Storm Analysis',
        description: 'Study Jupiter\'s Great Red Spot storm system',
        type: 'research',
        target: 'Jupiter',
        hint: 'Jupiter\'s Great Red Spot is a massive storm - observe it from a safe distance',
        reward: { points: 400, knowledge: 'Planetary Storms' },
        completed: false
      },
      {
        id: 'saturn-rings',
        name: 'Ring Composition Study',
        description: 'Analyze the composition of Saturn\'s rings',
        type: 'research',
        target: 'Saturn',
        hint: 'Saturn\'s rings are made of ice and rock - you can see them clearly in the 3D view',
        reward: { points: 350, knowledge: 'Ring Dynamics' },
        completed: false
      },
      {
        id: 'moon-life-search',
        name: 'Life Detection',
        description: 'Search for signs of life on Jupiter and Saturn\'s moons',
        type: 'discovery',
        hint: 'Focus on Europa (Jupiter) and Enceladus (Saturn) - they may have subsurface oceans',
        reward: { points: 500, knowledge: 'Astrobiology' },
        completed: false
      }
    ],
    unlockCondition: 'Complete Asteroid Belt Navigation',
    isUnlocked: false,
    isCompleted: false,
    backgroundInfo: 'Gas giants are massive worlds with complex moon systems that may harbor conditions suitable for life.',
    educationalContent: [
      'Jupiter\'s Great Red Spot is a storm larger than Earth that has raged for centuries',
      'Saturn\'s rings are made of countless ice and rock particles',
      'Europa (Jupiter\'s moon) and Enceladus (Saturn\'s moon) may have subsurface oceans'
    ],
    tips: [
      'Gas giants are far from the Sun - ensure you have enough fuel for the journey',
      'Study the moons as well as the planets themselves',
      'Jupiter and Saturn are much larger than the inner planets',
      'This mission provides high point rewards for successful completion'
    ],
    warnings: [
      'These planets are very far from Earth - fuel management is critical',
      'Don\'t attempt without completing previous missions for fuel bonuses',
      'The journey takes significant time and resources'
    ],
    estimatedDuration: '20-25 minutes'
  },
  {
    id: 'outer-frontier',
    name: 'Outer Frontier Mission',
    description: 'Journey to the edge of the solar system, exploring Uranus, Neptune, and beyond.',
    objectives: [
      'Reach the ice giants Uranus and Neptune',
      'Study the Kuiper Belt',
      'Complete the grand tour of the solar system'
    ],
    tasks: [
      {
        id: 'ice-giant-study',
        name: 'Ice Giant Research',
        description: 'Study the unique properties of Uranus and Neptune',
        type: 'research',
        hint: 'Uranus rotates on its side, while Neptune has the fastest winds in the solar system',
        reward: { points: 600, knowledge: 'Ice Giant Composition' },
        completed: false
      },
      {
        id: 'kuiper-exploration',
        name: 'Kuiper Belt Survey',
        description: 'Explore the distant Kuiper Belt region',
        type: 'exploration',
        hint: 'The Kuiper Belt is beyond Neptune - it contains Pluto and many other icy objects',
        reward: { points: 750, knowledge: 'Solar System Edge' },
        completed: false
      },
      {
        id: 'grand-tour',
        name: 'Solar System Grand Tour',
        description: 'Successfully visit all major planetary bodies',
        type: 'discovery',
        requirement: 'Visit all planets',
        hint: 'Complete all previous missions first - this is the ultimate challenge!',
        reward: { points: 1000, knowledge: 'Master Explorer' },
        completed: false
      }
    ],
    unlockCondition: 'Complete Gas Giant Expedition',
    isUnlocked: false,
    isCompleted: false,
    backgroundInfo: 'The outer solar system holds many mysteries, from tilted ice giants to the vast Kuiper Belt of icy objects.',
    educationalContent: [
      'Uranus rotates on its side (98° axial tilt) due to an ancient collision',
      'Neptune has winds reaching up to 2,100 km/h - the fastest in the solar system',
      'The Kuiper Belt contains thousands of icy objects including dwarf planets like Pluto'
    ],
    tips: [
      'This is the most challenging mission - complete all previous levels first',
      'Ensure maximum fuel and health before attempting',
      'The rewards are substantial for completing this final frontier',
      'Take time to appreciate the journey to the edge of our solar system'
    ],
    warnings: [
      'Extreme distance from Earth - fuel will be completely depleted',
      'Only attempt when fully prepared with maximum resources',
      'This mission represents the limits of current space exploration'
    ],
    estimatedDuration: '30+ minutes'
  }
];
