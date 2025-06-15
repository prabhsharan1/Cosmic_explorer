
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'exploration' | 'survival' | 'knowledge' | 'efficiency' | 'special';
  condition: string;
  points: number;
  unlocked: boolean;
  dateUnlocked?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first space mission',
    icon: '🚀',
    type: 'exploration',
    condition: 'Complete first task',
    points: 50,
    unlocked: false
  },
  {
    id: 'planet-hopper',
    name: 'Planet Hopper',
    description: 'Visit 5 different planets',
    icon: '🪐',
    type: 'exploration',
    condition: 'Visit 5 planets',
    points: 200,
    unlocked: false
  },
  {
    id: 'fuel-efficient',
    name: 'Fuel Efficient',
    description: 'Complete a mission with fuel remaining',
    icon: '⛽',
    type: 'efficiency',
    condition: 'Finish with fuel > 50%',
    points: 150,
    unlocked: false
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Unlock 10 pieces of space knowledge',
    icon: '📚',
    type: 'knowledge',
    condition: 'Collect 10 knowledge items',
    points: 300,
    unlocked: false
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survive Venus\'s harsh conditions',
    icon: '🛡️',
    type: 'survival',
    condition: 'Visit Venus and survive',
    points: 250,
    unlocked: false
  },
  {
    id: 'grand-explorer',
    name: 'Grand Explorer',
    description: 'Complete the grand tour of all planets',
    icon: '🌌',
    type: 'special',
    condition: 'Visit all planets in solar system',
    points: 1000,
    unlocked: false
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete a level in under 5 minutes',
    icon: '⚡',
    type: 'efficiency',
    condition: 'Fast level completion',
    points: 200,
    unlocked: false
  },
  {
    id: 'asteroid-miner',
    name: 'Asteroid Miner',
    description: 'Successfully mine resources from asteroids',
    icon: '⛏️',
    type: 'exploration',
    condition: 'Complete asteroid mining task',
    points: 175,
    unlocked: false
  }
];
