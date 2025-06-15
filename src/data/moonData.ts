
export interface Moon {
  name: string;
  emoji: string;
  description: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
}

export interface PlanetMoons {
  [planetName: string]: Moon[];
}

export const moonData: PlanetMoons = {
  'Earth': [
    {
      name: 'Moon',
      emoji: '🌙',
      description: 'Earth\'s only natural satellite',
      orbitRadius: 0.8,
      orbitSpeed: 2,
      size: 0.15,
      color: '#C0C0C0'
    }
  ],
  'Mars': [
    {
      name: 'Phobos',
      emoji: '🥔',
      description: 'Potato-shaped, innermost moon',
      orbitRadius: 0.6,
      orbitSpeed: 4,
      size: 0.05,
      color: '#8B4513'
    },
    {
      name: 'Deimos',
      emoji: '🥔',
      description: 'Potato-shaped, outermost moon',
      orbitRadius: 0.9,
      orbitSpeed: 2.5,
      size: 0.03,
      color: '#A0522D'
    }
  ],
  'Jupiter': [
    {
      name: 'Io',
      emoji: '🌋',
      description: 'Volcanic moon with sulfur eruptions',
      orbitRadius: 2.2,
      orbitSpeed: 3.5,
      size: 0.2,
      color: '#FFFF99'
    },
    {
      name: 'Europa',
      emoji: '🧊',
      description: 'Ice-covered moon with subsurface ocean',
      orbitRadius: 2.8,
      orbitSpeed: 2.8,
      size: 0.18,
      color: '#B0E0E6'
    },
    {
      name: 'Ganymede',
      emoji: '🌕',
      description: 'Largest moon in the solar system',
      orbitRadius: 3.5,
      orbitSpeed: 2.2,
      size: 0.25,
      color: '#696969'
    },
    {
      name: 'Callisto',
      emoji: '🌑',
      description: 'Heavily cratered ice and rock moon',
      orbitRadius: 4.2,
      orbitSpeed: 1.8,
      size: 0.22,
      color: '#2F4F4F'
    }
  ],
  'Saturn': [
    {
      name: 'Titan',
      emoji: '🟤',
      description: 'Moon with thick atmosphere and methane lakes',
      orbitRadius: 2.5,
      orbitSpeed: 2.5,
      size: 0.23,
      color: '#CD853F'
    },
    {
      name: 'Enceladus',
      emoji: '💎',
      description: 'Ice moon with geysers',
      orbitRadius: 1.8,
      orbitSpeed: 3.2,
      size: 0.12,
      color: '#F0F8FF'
    },
    {
      name: 'Mimas',
      emoji: '🌑',
      description: 'Death Star-like appearance',
      orbitRadius: 1.4,
      orbitSpeed: 4.1,
      size: 0.08,
      color: '#708090'
    }
  ],
  'Uranus': [
    {
      name: 'Titania',
      emoji: '🌕',
      description: 'Largest moon of Uranus',
      orbitRadius: 1.8,
      orbitSpeed: 2.1,
      size: 0.16,
      color: '#B0C4DE'
    },
    {
      name: 'Oberon',
      emoji: '🌑',
      description: 'Second largest moon',
      orbitRadius: 2.2,
      orbitSpeed: 1.8,
      size: 0.15,
      color: '#778899'
    },
    {
      name: 'Miranda',
      emoji: '🌘',
      description: 'Bizarre patchwork moon',
      orbitRadius: 1.2,
      orbitSpeed: 3.5,
      size: 0.08,
      color: '#4682B4'
    }
  ],
  'Neptune': [
    {
      name: 'Triton',
      emoji: '🔵',
      description: 'Largest moon, orbits backward',
      orbitRadius: 1.8,
      orbitSpeed: -1.5, // Negative for retrograde orbit
      size: 0.18,
      color: '#4169E1'
    },
    {
      name: 'Nereid',
      emoji: '🌑',
      description: 'Irregular, highly eccentric orbit',
      orbitRadius: 3.2,
      orbitSpeed: 0.8,
      size: 0.06,
      color: '#191970'
    }
  ],
  'Pluto': [
    {
      name: 'Charon',
      emoji: '🌕',
      description: 'Almost half the size of Pluto',
      orbitRadius: 0.6,
      orbitSpeed: 2.8,
      size: 0.1,
      color: '#696969'
    },
    {
      name: 'Nix',
      emoji: '🌑',
      description: 'Small irregular moon',
      orbitRadius: 1.2,
      orbitSpeed: 1.2,
      size: 0.03,
      color: '#A9A9A9'
    }
  ]
};
