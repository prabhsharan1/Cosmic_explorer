import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, Line } from '@react-three/drei';
import { useState, useRef, useMemo, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
import { planetData } from '../data/planetData';
import { moonData } from '../data/moonData';

interface Planet3DProps {
  planet: any;
  position: [number, number, number];
  scale: number;
  color: string;
  onClick: () => void;
  isCurrentLocation: boolean;
  canTravel: boolean;
  time: number;
}

const Moon3D = ({ moon, planetPosition, time, onClick, canTravel }: { moon: any; planetPosition: [number, number, number]; time: number; onClick?: () => void; canTravel?: boolean }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const moonX = planetPosition[0] + Math.cos(time * moon.orbitSpeed * 0.01) * moon.orbitRadius;
  const moonZ = planetPosition[2] + Math.sin(time * moon.orbitSpeed * 0.01) * moon.orbitRadius;
  
  return (
    <>
      {/* Moon orbit line */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2;
          return new Vector3(
            planetPosition[0] + Math.cos(angle) * moon.orbitRadius,
            planetPosition[1],
            planetPosition[2] + Math.sin(angle) * moon.orbitRadius
          );
        })}
        color="#666666"
        lineWidth={0.5}
        transparent
        opacity={0.2}
      />
      
      {/* Moon */}
      <mesh
        ref={meshRef}
        position={[moonX, planetPosition[1], moonZ]}
        scale={hovered && onClick ? moon.size * 1.2 : moon.size}
        onClick={onClick}
        onPointerOver={() => onClick && setHovered(true)}
        onPointerOut={() => onClick && setHovered(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={onClick && hovered ? '#ffffff' : moon.color}
          emissive={onClick && hovered ? '#666666' : '#000000'}
          emissiveIntensity={onClick && hovered ? 0.2 : 0}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Show Moon label when hovered and clickable */}
      {onClick && hovered && (
        <Text
          position={[moonX, planetPosition[1] + moon.size * 2, moonZ]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {moon.name}
        </Text>
      )}
    </>
  );
};

const GalaxyBackground = () => {
  const galaxyParticles = useMemo(() => {
    const particles = [];
    
    // Create multiple spiral arms with varying density
    const numArms = 6;
    const particlesPerArm = 3000;
    
    for (let arm = 0; arm < numArms; arm++) {
      for (let i = 0; i < particlesPerArm; i++) {
        // Create logarithmic spiral arms
        const t = i / particlesPerArm;
        const radius = 50 + t * 800; // Extended range for more realistic galaxy
        const spiralTightness = 0.8;
        const angle = (arm * 2 * Math.PI / numArms) + (t * Math.PI * 8 * spiralTightness);
        
        // Add some randomness to make it look more natural
        const radiusVariation = (Math.random() - 0.5) * radius * 0.3;
        const angleVariation = (Math.random() - 0.5) * 0.8;
        
        const finalRadius = radius + radiusVariation;
        const finalAngle = angle + angleVariation;
        
        const x = Math.cos(finalAngle) * finalRadius;
        const z = Math.sin(finalAngle) * finalRadius;
        
        // Create galactic disk thickness with bulge in center
        const diskHeight = Math.max(5, 30 * Math.exp(-finalRadius / 200));
        const y = (Math.random() - 0.5) * diskHeight;
        
        // Brightness decreases with distance from center and varies along arms
        const distanceFromCenter = Math.sqrt(x * x + z * z);
        const baseBrightness = Math.max(0.05, Math.exp(-distanceFromCenter / 300));
        const armBrightness = 0.3 + 0.7 * Math.exp(-Math.pow((i % 200) - 100, 2) / 5000);
        const brightness = baseBrightness * armBrightness;
        
        // Vary star sizes and colors
        const size = 0.1 + Math.random() * 0.8;
        const temperature = 0.3 + Math.random() * 0.7; // For color variation
        
        particles.push({ 
          x, y, z, 
          brightness, 
          size,
          temperature,
          twinkle: Math.random() * 2
        });
      }
    }
    
    // Add central galactic bulge
    for (let i = 0; i < 1000; i++) {
      const radius = Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * Math.max(2, 20 * Math.exp(-radius / 40));
      
      const brightness = Math.max(0.2, 1 - radius / 80);
      particles.push({ 
        x, y, z, 
        brightness: brightness * 1.5, 
        size: 0.2 + Math.random() * 0.6,
        temperature: 0.7 + Math.random() * 0.3,
        twinkle: Math.random()
      });
    }
    
    return particles;
  }, []);

  return (
    <>
      {galaxyParticles.map((particle, i) => {
        // Color based on temperature (blue = hot, red = cool)
        const color = particle.temperature > 0.7 ? '#AACCFF' : 
                     particle.temperature > 0.4 ? '#FFFFFF' : '#FFCCAA';
        
        return (
          <mesh
            key={`galaxy-${i}`}
            position={[particle.x, particle.y, particle.z]}
            scale={particle.size}
          >
            <sphereGeometry args={[0.15, 4, 4]} />
            <meshBasicMaterial 
              color={color}
              transparent 
              opacity={particle.brightness * (0.6 + 0.4 * Math.sin(particle.twinkle * Date.now() * 0.001))}
            />
          </mesh>
        );
      })}
      
      {/* Add some distant galaxy clusters */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`distant-galaxy-${i}`}
          position={[
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 2000
          ]}
          scale={20 + Math.random() * 40}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color="#6644AA"
            transparent 
            opacity={0.1 + Math.random() * 0.1}
          />
        </mesh>
      ))}
    </>
  );
};

const ZoomWarning = ({ distance }: { distance: number }) => {
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    if (distance > 80) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [distance]);

  if (!showWarning) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-red-900/90 border-2 border-red-500 rounded-lg p-6 text-center animate-pulse">
      <div className="text-red-300 text-xl font-bold mb-2">⚠️ GALACTIC BOUNDARY ⚠️</div>
      <div className="text-white">
        You cannot exit the galaxy!
        <br />
        <span className="text-red-300">The solar system remains unexplored...</span>
      </div>
      <div className="text-sm text-gray-300 mt-2">
        Return to continue your mission within our solar system
      </div>
    </div>
  );
};

const CameraController = ({ onDistanceChange, targetPosition, isAnimating }: { 
  onDistanceChange: (distance: number) => void; 
  targetPosition?: [number, number, number];
  isAnimating: boolean;
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useFrame(() => {
    if (controlsRef.current) {
      const distance = camera.position.length();
      onDistanceChange(distance);
      
      // Animate camera to target position if traveling
      if (isAnimating && targetPosition) {
        camera.position.lerp(new Vector3(...targetPosition), 0.05);
        if (controlsRef.current.target) {
          controlsRef.current.target.lerp(new Vector3(targetPosition[0], 0, targetPosition[2]), 0.05);
        }
      }
      
      // Stricter limit to prevent leaving galaxy view
      if (distance > 90) {
        camera.position.normalize().multiplyScalar(90);
      }
      
      // Limit zoom in to prevent going inside the sun
      if (distance < 3) {
        camera.position.normalize().multiplyScalar(3);
      }
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={true} 
      enableZoom={true} 
      enableRotate={true}
      minDistance={3}
      maxDistance={90}
      autoRotate={false}
      autoRotateSpeed={0.5}
      dampingFactor={0.1}
      enableDamping={true}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      panSpeed={0.8}
      keyPanSpeed={7.0}
      screenSpacePanning={false}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      enabled={!isAnimating} // Disable controls during animation
    />
  );
};

const OrbitingPlanet = ({ planet, planetConfig, onClick, isCurrentLocation, canTravel, time, currentLocation, onMoonClick }: any) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate orbital position
  const orbitSpeed = planetConfig.distance * 0.0001; // Slower for outer planets
  const angle = time * orbitSpeed;
  const x = Math.cos(angle) * planetConfig.distance;
  const z = Math.sin(angle) * planetConfig.distance;
  const position: [number, number, number] = [x, 0, z];

  const moons = moonData[planet.name] || [];

  // Get realistic planet color
  const getPlanetColor = () => {
    if (isCurrentLocation) return '#00ff00'; // Green for current location
    return planetConfig.color; // Use realistic color
  };

  return (
    <>
      {/* Planet */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          position={position}
          scale={hovered ? planetConfig.scale * 1.2 : planetConfig.scale}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          rotation={[0, time * 0.02, 0]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={getPlanetColor()}
            emissive={hovered ? planetConfig.color : planet.name === 'Sun' ? '#FDB813' : '#000000'}
            emissiveIntensity={planet.name === 'Sun' ? 0.8 : hovered ? 0.2 : 0}
            roughness={planet.name === 'Sun' ? 0.1 : 0.7}
            metalness={planet.name === 'Sun' ? 0.8 : 0.1}
          />
        </mesh>
        
        {(hovered || isCurrentLocation) && (
          <Text
            position={[position[0], position[1] + planetConfig.scale * 1.5, position[2]]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {planet.name}
          </Text>
        )}
        
        {/* Add rings for Saturn */}
        {planet.name === 'Saturn' && (
          <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planetConfig.scale * 1.2, planetConfig.scale * 1.8, 32]} />
            <meshStandardMaterial color="#C7A26B" transparent opacity={0.7} />
          </mesh>
        )}

        {/* Add rings for Uranus */}
        {planet.name === 'Uranus' && (
          <mesh position={position} rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[planetConfig.scale * 1.1, planetConfig.scale * 1.4, 16]} />
            <meshStandardMaterial color="#4A90E2" transparent opacity={0.4} />
          </mesh>
        )}
      </Float>

      {/* Moons - make Earth's Moon clickable when on Earth */}
      {moons.map((moon, index) => (
        <Moon3D
          key={`${planet.name}-${moon.name}-${index}`}
          moon={moon}
          planetPosition={position}
          time={time}
          onClick={planet.name === 'Earth' && moon.name === 'Moon' && currentLocation === 'Earth' ? () => onMoonClick() : undefined}
          canTravel={planet.name === 'Earth' && moon.name === 'Moon' && currentLocation === 'Earth'}
        />
      ))}
    </>
  );
};

const AnimatedSolarSystem = ({ currentLocation, visitedPlanets, onPlanetClick, fuel, onMoonClick, targetPlanet }: any) => {
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta * 60; // Increased speed multiplier from 20 to 60 for smoother movement
  });

  // Realistic planet colors and configurations
  const planetPositions: { [key: string]: { position: [number, number, number]; scale: number; color: string; distance: number } } = {
    'Sun': { position: [0, 0, 0], scale: 2, color: '#FDB813', distance: 0 },
    'Mercury': { position: [3, 0, 0], scale: 0.3, color: '#8C7853', distance: 3 },
    'Venus': { position: [4.5, 0, 0], scale: 0.4, color: '#FFC649', distance: 4.5 },
    'Earth': { position: [6, 0, 0], scale: 0.5, color: '#6B93D6', distance: 6 },
    'Mars': { position: [8, 0, 0], scale: 0.4, color: '#CD5C5C', distance: 8 },
    'Jupiter': { position: [12, 0, 0], scale: 1.5, color: '#D8CA9D', distance: 12 },
    'Saturn': { position: [16, 0, 0], scale: 1.2, color: '#FAD5A5', distance: 16 },
    'Uranus': { position: [20, 0, 0], scale: 0.8, color: '#4FD0E7', distance: 20 },
    'Neptune': { position: [24, 0, 0], scale: 0.8, color: '#4B70DD', distance: 24 },
    'Pluto': { position: [28, 0, 0], scale: 0.2, color: '#B08C7D', distance: 28 }
  };

  const getCurrentPlanet = () => {
    return planetData.find(p => p.name === currentLocation);
  };

  const canTravelToPlanet = (planet: any) => {
    const current = getCurrentPlanet();
    if (!current) return false;
    return current.canTravelTo.includes(planet.name) && 
           fuel >= planet.fuelCost;
  };

  // Calculate target position for animation
  const getTargetPosition = () => {
    if (!targetPlanet) return undefined;
    
    const config = planetPositions[targetPlanet];
    if (!config) return undefined;
    
    // Calculate orbital position
    const orbitSpeed = config.distance * 0.0001;
    const angle = timeRef.current * orbitSpeed;
    const x = Math.cos(angle) * config.distance;
    const z = Math.sin(angle) * config.distance;
    
    // Position camera slightly above and behind the planet
    return [x + 3, 2, z + 3] as [number, number, number];
  };

  return (
    <>
      {/* Realistic Galaxy Background */}
      <GalaxyBackground />
      
      {/* Enhanced Background Stars */}
      <Stars radius={200} depth={120} count={15000} factor={10} saturation={0} fade speed={1} />
      
      {/* Milky Way Core Glow */}
      <mesh position={[0, 0, -300]} scale={100}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#FFE4B5" 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {/* Sun (stationary) */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          position={[0, 0, 0]}
          scale={currentLocation === 'Sun' ? 2.2 : 2}
          onClick={() => onPlanetClick(planetData.find(p => p.name === 'Sun'))}
          rotation={[0, timeRef.current * 0.02, 0]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={currentLocation === 'Sun' ? '#00ff00' : '#FDB813'}
            emissive="#FDB813"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Orbiting Planets */}
      {planetData.filter(p => p.name !== 'Sun').map((planet) => {
        const config = planetPositions[planet.name];
        if (!config) return null;
        
        return (
          <OrbitingPlanet
            key={planet.name}
            planet={planet}
            planetConfig={config}
            onClick={() => onPlanetClick(planet)}
            isCurrentLocation={currentLocation === planet.name}
            canTravel={canTravelToPlanet(planet)}
            time={timeRef.current}
            currentLocation={currentLocation}
            onMoonClick={onMoonClick}
          />
        );
      })}
    </>
  );
};

const OrbitalLine = ({ radius, segments = 64, opacity = 0.3 }: { radius: number; segments?: number; opacity?: number }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius, segments]);

  return (
    <Line
      points={points}
      color="#888888"
      lineWidth={2}
      transparent
      opacity={opacity}
    />
  );
};

interface SolarSystem3DProps {
  currentLocation: string;
  visitedPlanets: string[];
  onPlanetClick: (planet: any) => void;
  fuel: number;
  onMoonClick: () => void;
  travelingTo?: string;
}

const SolarSystem3D = ({ currentLocation, visitedPlanets, onPlanetClick, fuel, onMoonClick, travelingTo }: SolarSystem3DProps) => {
  const [cameraDistance, setCameraDistance] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle travel animation
  useEffect(() => {
    if (travelingTo) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 3000); // 3 second animation
      
      return () => clearTimeout(timer);
    }
  }, [travelingTo]);
  
  // Create Moon planet object for travel
  const moonAsPlanet = {
    name: 'Moon',
    emoji: '🌙',
    description: ['Earth\'s only natural satellite', 'No atmosphere, low gravity', 'Covered in craters and ancient lava flows'],
    canTravelTo: ['Earth'],
    fuelCost: 15,
    warning: 'No atmosphere - suit up!'
  };

  const handleMoonClick = () => {
    onPlanetClick(moonAsPlanet);
  };

  // Define planet orbital distances for the orbital lines
  const orbitalDistances = [3, 4.5, 6, 8, 12, 16, 20, 24, 28]; // Mercury through Pluto

  // Create asteroid belt particles
  const asteroidBeltParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 9.5 + Math.random() * 1.5; // Between Mars and Jupiter
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.3;
      particles.push([x, y, z]);
    }
    return particles;
  }, []);

  // Create Kuiper Belt particles (beyond Neptune)
  const kuiperBeltParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 5; // Beyond Neptune
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.8;
      particles.push([x, y, z]);
    }
    return particles;
  }, []);

  return (
    <div className="h-screen w-full bg-black relative">
      <ZoomWarning distance={cameraDistance} />
      {isAnimating && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-900/90 border-2 border-blue-500 rounded-lg p-4 text-center animate-pulse">
          <div className="text-blue-300 text-lg font-bold">🚀 TRAVELING TO {travelingTo?.toUpperCase()}</div>
        </div>
      )}
      <Canvas 
        camera={{ position: [10, 5, 10], fov: 75 }}
        style={{ background: 'radial-gradient(circle at center, #000428 0%, #004e92 50%, #000000 100%)' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={6} color="#FDB813" />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="white" />
        
        {/* Enhanced Orbital Lines */}
        {orbitalDistances.map((distance, index) => (
          <OrbitalLine key={`orbit-${index}`} radius={distance} opacity={0.3} />
        ))}
        
        {/* Animated Solar System */}
        <AnimatedSolarSystem
          currentLocation={currentLocation}
          visitedPlanets={visitedPlanets}
          onPlanetClick={onPlanetClick}
          fuel={fuel}
          onMoonClick={handleMoonClick}
          targetPlanet={travelingTo}
        />
        
        {/* Asteroid Belt */}
        {asteroidBeltParticles.map((position, i) => (
          <mesh
            key={`asteroid-${i}`}
            position={position as [number, number, number]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            scale={0.01 + Math.random() * 0.02}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#8C7853" roughness={0.9} />
          </mesh>
        ))}

        {/* Kuiper Belt */}
        {kuiperBeltParticles.map((position, i) => (
          <mesh
            key={`kuiper-${i}`}
            position={position as [number, number, number]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            scale={0.005 + Math.random() * 0.015}
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#B08C7D" roughness={0.8} />
          </mesh>
        ))}

        {/* Enhanced Comets with Trails */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 30 + Math.random() * 15;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 3;
          
          return (
            <Float key={`comet-${i}`} speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh position={[x, y, z]} scale={0.08}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshStandardMaterial color="#E6E6FA" emissive="#4169E1" emissiveIntensity={0.6} />
              </mesh>
              {/* Enhanced comet tail */}
              <mesh position={[x - 1.2, y, z]} scale={[4, 0.2, 0.2]} rotation={[0, 0, Math.PI / 4]}>
                <coneGeometry args={[0.1, 4, 8]} />
                <meshStandardMaterial color="#E6E6FA" transparent opacity={0.7} emissive="#9370DB" emissiveIntensity={0.3} />
              </mesh>
            </Float>
          );
        })}
        
        <CameraController 
          onDistanceChange={setCameraDistance} 
          targetPosition={undefined}
          isAnimating={isAnimating}
        />
      </Canvas>
    </div>
  );
};

export default SolarSystem3D;
