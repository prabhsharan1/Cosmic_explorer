
export interface Planet {
  name: string;
  emoji: string;
  description: string[];
  fuelCost: number;
  canTravelTo: string[];
  warning?: string;
}

export const planetData: Planet[] = [
  {
    name: 'Sun',
    emoji: '☀️',
    description: [
      'The center of our solar system.',
      'A giant ball of hot gas (mostly hydrogen and helium).',
      'Provides light and heat to all planets.'
    ],
    fuelCost: 15,
    canTravelTo: [],
    warning: 'Extremely dangerous! This will end your mission!'
  },
  {
    name: 'Mercury',
    emoji: '☿️',
    description: [
      'Closest planet to the Sun.',
      'Very hot during the day, freezing at night.',
      'Smallest planet.',
      'No atmosphere, no life — just rocks and craters.'
    ],
    fuelCost: 20,
    canTravelTo: ['Venus', 'Sun']
  },
  {
    name: 'Venus',
    emoji: '♀️',
    description: [
      'Similar in size to Earth but extremely hot (hottest planet).',
      'Thick clouds of toxic gas (mainly carbon dioxide).',
      'Surface is like a giant oven — no chance of life.'
    ],
    fuelCost: 15,
    canTravelTo: ['Mercury', 'Earth', 'Mars', 'Sun']
  },
  {
    name: 'Earth',
    emoji: '🌍',
    description: [
      'Our home!',
      'Has water, atmosphere, and life.',
      'Only planet known to support living organisms.'
    ],
    fuelCost: 0,
    canTravelTo: ['Venus', 'Mars']
  },
  {
    name: 'Mars',
    emoji: '♂️',
    description: [
      'Known as the Red Planet because of iron oxide (rust).',
      'Has the largest volcano and canyon in the solar system.',
      'Water once flowed here.',
      'Possible signs of past life — maybe microbes; future mission target for life search.'
    ],
    fuelCost: 20,
    canTravelTo: ['Earth', 'Venus', 'Jupiter']
  },
  {
    name: 'Jupiter',
    emoji: '♃',
    description: [
      'Largest planet.',
      'A gas giant made mostly of hydrogen and helium.',
      'Has a big storm (the Great Red Spot).',
      'Over 90 moons — some may have oceans (like Europa).'
    ],
    fuelCost: 30,
    canTravelTo: ['Mars', 'Saturn'],
    warning: 'Asteroid belt may damage your ship!'
  },
  {
    name: 'Saturn',
    emoji: '♄',
    description: [
      'Famous for its beautiful rings made of ice and rock.',
      'Also a gas giant.',
      'Many moons — Titan (one of them) might have life-like chemistry.'
    ],
    fuelCost: 25,
    canTravelTo: ['Jupiter', 'Uranus']
  },
  {
    name: 'Uranus',
    emoji: '♅',
    description: [
      'A gas giant with a bluish color due to methane gas.',
      'Spins on its side — unique tilt.',
      'Cold and far from the Sun.'
    ],
    fuelCost: 25,
    canTravelTo: ['Saturn', 'Neptune']
  },
  {
    name: 'Neptune',
    emoji: '♆',
    description: [
      'Farthest main planet.',
      'Dark, cold, and windy.',
      'Also blue from methane.',
      'Has strong storms and fast winds.'
    ],
    fuelCost: 25,
    canTravelTo: ['Uranus', 'Pluto']
  },
  {
    name: 'Pluto',
    emoji: '🪐',
    description: [
      'Was once the 9th planet, now a dwarf planet.',
      'Very small and far away.',
      'Has ice, mountains, and possibly a subsurface ocean.',
      'Might have some interesting chemistry, but no known life.'
    ],
    fuelCost: 30,
    canTravelTo: [],
    warning: 'This will exhaust your remaining fuel!'
  }
];
