
export interface EducationalContent {
  overview: string;
  keyFacts: string[];
  funFacts: string[];
  composition: string;
  atmosphere: string;
  moons: string;
  exploration: string[];
  compareToEarth: string;
  didYouKnow: string[];
  missionTips: string[];
}

export const educationalContent: { [key: string]: EducationalContent } = {
  Sun: {
    overview: "The Sun is a massive ball of hot gas that provides light and heat to all planets in our solar system. It's actually a star - the closest star to Earth!",
    keyFacts: [
      "Temperature: 15 million°C at the core, 5,778K at the surface",
      "Mass: 99.86% of the entire solar system",
      "Age: About 4.6 billion years old",
      "Light takes 8 minutes and 20 seconds to reach Earth"
    ],
    funFacts: [
      "The Sun is so big that 1.3 million Earths could fit inside it!",
      "Every second, the Sun converts 600 million tons of hydrogen into helium",
      "The Sun's core is 150 times denser than water",
      "Solar flares can reach temperatures of 10 million°C"
    ],
    composition: "73% hydrogen, 25% helium, 2% heavier elements",
    atmosphere: "Corona (outermost layer), Chromosphere, Photosphere",
    moons: "None - the Sun is orbited by planets",
    exploration: [
      "Parker Solar Probe (2018) - closest mission to the Sun",
      "Solar Orbiter (2020) - studying solar wind and magnetic field",
      "SOHO telescope - continuously monitoring the Sun since 1996"
    ],
    compareToEarth: "109 times wider than Earth, 333,000 times more massive",
    didYouKnow: [
      "The Sun makes a complete rotation every 25-35 days",
      "Sunspots are cooler areas that appear dark on the Sun's surface",
      "The Sun will eventually become a red giant in 5 billion years"
    ],
    missionTips: [
      "⚠️ DANGER: Getting too close to the Sun will destroy your spacecraft!",
      "Use telescopes and spectrometers from a safe distance",
      "Study solar flares and magnetic field activity"
    ]
  },
  Mercury: {
    overview: "Mercury is the smallest planet and closest to the Sun. It has extreme temperature differences and no atmosphere to protect it.",
    keyFacts: [
      "Closest planet to the Sun (57.9 million km average distance)",
      "Smallest planet in the solar system",
      "No atmosphere or moons",
      "Day length: 59 Earth days, Year: 88 Earth days"
    ],
    funFacts: [
      "Mercury has the most eccentric orbit of all planets",
      "Ice exists at Mercury's poles despite extreme heat!",
      "Mercury shrinks about 1-7 km in radius as it cools",
      "A day on Mercury is longer than its year!"
    ],
    composition: "Large iron core (75% of planet), thin silicate mantle",
    atmosphere: "Extremely thin - mostly oxygen, sodium, hydrogen",
    moons: "None",
    exploration: [
      "Mariner 10 (1974-1975) - first to visit Mercury",
      "MESSENGER (2011-2015) - orbited and mapped Mercury",
      "BepiColombo (arriving 2025) - current mission to Mercury"
    ],
    compareToEarth: "38% of Earth's size, 5.5% of Earth's mass",
    didYouKnow: [
      "Mercury experiences 800°F temperature swings!",
      "It's the second densest planet after Earth",
      "Mercury has a very weak magnetic field"
    ],
    missionTips: [
      "Use heat shields when approaching Mercury",
      "Best observed during dawn or dusk from other planets",
      "Study crater formations and temperature variations"
    ]
  },
  Venus: {
    overview: "Venus is often called Earth's 'evil twin' due to its similar size but extremely hostile environment with crushing pressure and acid rain.",
    keyFacts: [
      "Hottest planet in the solar system (462°C surface)",
      "Rotates backwards (retrograde rotation)",
      "Atmospheric pressure 92 times stronger than Earth",
      "Day longer than year (243 vs 225 Earth days)"
    ],
    funFacts: [
      "Venus rains sulfuric acid!",
      "The surface pressure could crush a human instantly",
      "Venus is the brightest planet in our sky",
      "It's sometimes called the 'Morning Star' or 'Evening Star'"
    ],
    composition: "Similar to Earth - iron core, silicate mantle and crust",
    atmosphere: "96.5% carbon dioxide, 3.5% nitrogen, sulfuric acid clouds",
    moons: "None",
    exploration: [
      "Venera missions (Soviet) - first to land on Venus",
      "Magellan (NASA) - mapped Venus using radar",
      "Venus Express (ESA) - studied atmosphere"
    ],
    compareToEarth: "95% of Earth's size, 82% of Earth's mass",
    didYouKnow: [
      "Venus has over 1,600 volcanoes!",
      "The greenhouse effect makes it hotter than Mercury",
      "Venus has phases like the Moon when viewed from Earth"
    ],
    missionTips: [
      "⚠️ Venus's atmosphere will damage your spacecraft",
      "Use radar to see through thick clouds",
      "Study the extreme greenhouse effect"
    ]
  },
  Earth: {
    overview: "Earth is our home planet - the only known planet with life. It has the perfect conditions for liquid water and a protective atmosphere.",
    keyFacts: [
      "Only known planet with life",
      "71% of surface covered by water",
      "Protective magnetic field and ozone layer",
      "One natural satellite (the Moon)"
    ],
    funFacts: [
      "Earth is the densest planet in the solar system",
      "Our planet is actually pear-shaped, not perfectly round",
      "Earth's rotation is gradually slowing down",
      "We live on tectonic plates that move 2-5 cm per year"
    ],
    composition: "Iron core, silicate mantle, thin crust with water",
    atmosphere: "78% nitrogen, 21% oxygen, 1% other gases",
    moons: "1 (The Moon)",
    exploration: [
      "International Space Station - continuous human presence",
      "Thousands of satellites studying Earth's climate",
      "Apollo missions - first to leave Earth and return"
    ],
    compareToEarth: "This is Earth! Our reference point for comparison",
    didYouKnow: [
      "Earth formed about 4.5 billion years ago",
      "The oldest rocks on Earth are 4 billion years old",
      "Earth's magnetic field protects us from solar wind"
    ],
    missionTips: [
      "Perfect for practicing observation techniques",
      "Study weather patterns and climate systems",
      "Observe city lights on the night side"
    ]
  },
  Mars: {
    overview: "Mars, the Red Planet, is our most studied neighbor. It shows evidence of ancient water and is the target for future human missions.",
    keyFacts: [
      "Known as the Red Planet due to iron oxide (rust)",
      "Has the largest volcano (Olympus Mons) and canyon (Valles Marineris)",
      "Two small moons: Phobos and Deimos",
      "Day length similar to Earth (24.6 hours)"
    ],
    funFacts: [
      "Mars has seasons like Earth due to its tilted axis",
      "Dust storms can cover the entire planet for months",
      "Mars once had a thicker atmosphere and flowing water",
      "The gravity is only 38% of Earth's"
    ],
    composition: "Iron core, basaltic mantle, thin crust",
    atmosphere: "95% carbon dioxide, thin atmosphere",
    moons: "2 (Phobos and Deimos)",
    exploration: [
      "Multiple rovers: Sojourner, Spirit, Opportunity, Curiosity, Perseverance",
      "Mars helicopter Ingenuity - first flight on another planet",
      "Future: Human missions planned for 2030s"
    ],
    compareToEarth: "53% of Earth's size, 11% of Earth's mass",
    didYouKnow: [
      "A year on Mars is 687 Earth days",
      "Mars has polar ice caps made of water and dry ice",
      "Ancient riverbeds prove water once flowed on Mars"
    ],
    missionTips: [
      "Look for signs of ancient water in rock formations",
      "Study the polar ice caps",
      "Mars is relatively safe for extended missions"
    ]
  },
  Jupiter: {
    overview: "Jupiter is the giant of our solar system - a massive gas planet that protects inner planets from asteroids and comets.",
    keyFacts: [
      "Largest planet in the solar system",
      "Has over 95 known moons",
      "Great Red Spot - a storm larger than Earth",
      "Made mostly of hydrogen and helium"
    ],
    funFacts: [
      "Jupiter could fit all other planets inside it!",
      "It has a faint ring system",
      "Jupiter acts like a 'cosmic vacuum cleaner'",
      "It radiates more heat than it receives from the Sun"
    ],
    composition: "90% hydrogen, 10% helium, small rocky core",
    atmosphere: "Hydrogen, helium, methane, ammonia",
    moons: "95+ (including Europa, Ganymede, Io, Callisto)",
    exploration: [
      "Voyager missions - first detailed images",
      "Galileo orbiter - studied Jupiter for 8 years",
      "Juno mission - currently studying Jupiter's interior"
    ],
    compareToEarth: "11 times wider, 318 times more massive",
    didYouKnow: [
      "Europa may have twice as much water as Earth's oceans",
      "Io is the most volcanically active body in the solar system",
      "Jupiter's magnetic field is 20,000 times stronger than Earth's"
    ],
    missionTips: [
      "⚠️ Asteroid belt may damage spacecraft on approach",
      "Study the Great Red Spot and atmospheric bands",
      "Investigate moons for signs of life"
    ]
  },
  Saturn: {
    overview: "Saturn is famous for its spectacular ring system and is less dense than water. It has many fascinating moons including Titan.",
    keyFacts: [
      "Famous for its prominent ring system",
      "Less dense than water - it would float!",
      "Has 146 known moons",
      "Second largest planet"
    ],
    funFacts: [
      "Saturn's rings are made of ice and rock particles",
      "Titan has lakes of liquid methane",
      "Saturn's hexagonal storm at its north pole",
      "The rings are only about 30 feet thick!"
    ],
    composition: "96% hydrogen, 3% helium, small rocky core",
    atmosphere: "Hydrogen, helium with traces of methane and ammonia",
    moons: "146+ (including Titan, Enceladus, Mimas)",
    exploration: [
      "Pioneer and Voyager flybys",
      "Cassini-Huygens mission - 13 years studying Saturn",
      "Huygens probe landed on Titan"
    ],
    compareToEarth: "9.4 times wider, 95 times more massive",
    didYouKnow: [
      "Enceladus shoots water geysers into space",
      "Titan is larger than Mercury and has a thick atmosphere",
      "Saturn's rings could span the distance from Earth to the Moon"
    ],
    missionTips: [
      "Study the ring structure and composition",
      "Investigate Titan's methane cycle",
      "Look for water on Enceladus"
    ]
  },
  Uranus: {
    overview: "Uranus is an ice giant that rotates on its side, possibly due to an ancient collision. It has a faint ring system and many moons.",
    keyFacts: [
      "Rotates on its side (98° axial tilt)",
      "Ice giant with water, methane, and ammonia",
      "Has 27 known moons",
      "Faint ring system discovered in 1977"
    ],
    funFacts: [
      "Uranus literally rolls around the Sun!",
      "Each pole gets 42 years of continuous sunlight then 42 years of darkness",
      "It's the coldest planetary atmosphere in the solar system",
      "Uranus was the first planet discovered with a telescope"
    ],
    composition: "Water, methane, ammonia ices with rocky core",
    atmosphere: "83% hydrogen, 15% helium, 2% methane",
    moons: "27 (including Miranda, Ariel, Umbriel, Titania, Oberon)",
    exploration: [
      "Voyager 2 (1986) - only spacecraft to visit Uranus",
      "Future missions being planned"
    ],
    compareToEarth: "4 times wider, 14.5 times more massive",
    didYouKnow: [
      "Uranus takes 84 Earth years to orbit the Sun",
      "The planet's blue color comes from methane in its atmosphere",
      "Miranda, one of its moons, has extreme terrain variations"
    ],
    missionTips: [
      "Study the unusual rotation and magnetic field",
      "Investigate the ring system",
      "Explore the diverse moon system"
    ]
  },
  Neptune: {
    overview: "Neptune is the windiest planet with storms reaching supersonic speeds. It's the farthest major planet and has a deep blue color.",
    keyFacts: [
      "Windiest planet (up to 2,100 km/h winds)",
      "Farthest major planet from the Sun",
      "Deep blue color from methane",
      "Has 16 known moons"
    ],
    funFacts: [
      "Neptune has the strongest winds in the solar system",
      "It takes 165 Earth years to orbit the Sun once",
      "Neptune radiates 2.6 times more energy than it receives",
      "It was discovered through mathematical predictions"
    ],
    composition: "Water, methane, ammonia ices with rocky core",
    atmosphere: "80% hydrogen, 19% helium, 1% methane",
    moons: "16 (including Triton, which orbits backwards)",
    exploration: [
      "Voyager 2 (1989) - only spacecraft to visit Neptune",
      "Future missions in planning stages"
    ],
    compareToEarth: "4 times wider, 17 times more massive",
    didYouKnow: [
      "Triton is the only large moon that orbits backwards",
      "Neptune's Great Dark Spot is a storm the size of Earth",
      "The planet completes one orbit every 165 Earth years"
    ],
    missionTips: [
      "Study the extreme weather systems",
      "Investigate Triton's retrograde orbit",
      "Measure the internal heat source"
    ]
  },
  Pluto: {
    overview: "Pluto is a dwarf planet in the Kuiper Belt with a complex relationship with its moon Charon. It was reclassified from a planet in 2006.",
    keyFacts: [
      "Reclassified as a dwarf planet in 2006",
      "Located in the Kuiper Belt",
      "Has 5 known moons",
      "Takes 248 Earth years to orbit the Sun"
    ],
    funFacts: [
      "Pluto and Charon are like a 'double planet' system",
      "It has a heart-shaped nitrogen plain called Tombaugh Regio",
      "Pluto is smaller than Earth's Moon",
      "It was discovered by a 24-year-old astronomer in 1930"
    ],
    composition: "Rocky core with water ice mantle and nitrogen surface",
    atmosphere: "Thin atmosphere of nitrogen with methane and carbon monoxide",
    moons: "5 (Charon, Styx, Nix, Kerberos, Hydra)",
    exploration: [
      "New Horizons (2015) - first and only mission to Pluto",
      "Provided detailed images and data about Pluto system"
    ],
    compareToEarth: "18% of Earth's size, 0.2% of Earth's mass",
    didYouKnow: [
      "Pluto hasn't completed one orbit since its discovery",
      "Charon is half the size of Pluto",
      "The surface has mountains made of water ice"
    ],
    missionTips: [
      "⚠️ Extremely far - will use all remaining fuel",
      "Study the Kuiper Belt environment",
      "Investigate the Pluto-Charon system dynamics"
    ]
  },
  Moon: {
    overview: "The Moon is Earth's only natural satellite and the fifth largest moon in the solar system. It influences Earth's tides and stabilizes our planet's rotation.",
    keyFacts: [
      "Earth's only natural satellite",
      "Formed about 4.5 billion years ago",
      "Influences Earth's tides",
      "Always shows the same face to Earth (tidally locked)"
    ],
    funFacts: [
      "The Moon is moving away from Earth at 3.8 cm per year",
      "Moonquakes can last up to 10 minutes",
      "The Moon has water ice at its poles",
      "12 humans have walked on the Moon"
    ],
    composition: "Small iron core, olivine and pyroxene mantle, anorthosite crust",
    atmosphere: "Extremely thin - mostly helium, neon, hydrogen",
    moons: "None (the Moon IS a moon)",
    exploration: [
      "Apollo missions (1969-1972) - 6 successful landings",
      "Luna and Chang'e missions",
      "Future: Artemis program planning return to Moon"
    ],
    compareToEarth: "27% of Earth's diameter, 1.2% of Earth's mass",
    didYouKnow: [
      "The Moon was likely formed from debris after a Mars-sized object hit Earth",
      "There's no wind or weather on the Moon",
      "The Moon's gravity is 1/6th of Earth's"
    ],
    missionTips: [
      "Perfect for practicing landing and surface operations",
      "Study lunar samples and geology",
      "Low fuel cost makes it ideal for training missions"
    ]
  }
};
