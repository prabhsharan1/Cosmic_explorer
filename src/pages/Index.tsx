import { useState, useEffect, useRef } from 'react';
import GameState from '../components/GameState';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      // Preload the audio
      audioRef.current.load();
    }
  }, []);

  const handleLaunchMission = async () => {
    // Start the music when launching the mission and keep it playing
    if (audioRef.current) {
      try {
        // Reset the audio to beginning and play
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        console.log('Music started successfully');
      } catch (error) {
        console.error('Failed to play audio:', error);
        // Try alternative approach
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error('Retry failed:', e));
          }
        }, 100);
      }
    }
    setGameStarted(true);
  };

  if (gameStarted) {
    return (
      <div className="transition-all duration-1000 ease-in-out">
        {/* Keep audio element available for the game */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          className="hidden"
        >
          <source src="https://github.com/prabhsharan1/RFM/raw/main/A%20Few%20Jumps%20Away%20-%20Royalty%20Free%20Music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <GameState audioRef={audioRef} />
      </div>
    );
  }

  // Generate random stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 3,
    }));
  };

  const stars = generateStars(800);
  const nebulaClouds = generateStars(25);
  const comets = generateStars(5);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Music - preload for better reliability */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="https://github.com/prabhsharan1/RFM/raw/main/A%20Few%20Jumps%20Away%20-%20Royalty%20Free%20Music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Enhanced Stars Field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Shooting Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-300 via-white to-transparent rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 15}%`,
              animation: `shootingStar ${3 + i * 1.5}s linear infinite`,
              animationDelay: `${i * 2}s`,
              boxShadow: '0 0 10px rgba(147, 197, 253, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Comet Trails */}
      <div className="absolute inset-0">
        {comets.map((comet) => (
          <div
            key={`comet-${comet.id}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-transparent rounded-full"
            style={{
              left: `${comet.x}%`,
              top: `${comet.y}%`,
              animation: `cometTrail ${15 + comet.id * 3}s linear infinite`,
              animationDelay: `${comet.twinkleDelay * 5}s`,
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
            }}
          />
        ))}
      </div>

      {/* Enhanced Nebula Clouds */}
      <div className="absolute inset-0">
        {nebulaClouds.map((cloud) => (
          <div
            key={`nebula-${cloud.id}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30 blur-xl animate-pulse"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              width: `${150 + cloud.size * 80}px`,
              height: `${150 + cloud.size * 80}px`,
              animationDelay: `${cloud.twinkleDelay}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Space Dust Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 25}s linear infinite`,
              animationDelay: `${Math.random() * 15}s`,
              boxShadow: '0 0 2px rgba(103, 232, 249, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Distant Galaxies */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`galaxy-${i}`}
            className="absolute w-32 h-32 bg-gradient-radial from-purple-600/20 via-blue-600/10 to-transparent rounded-full blur-lg animate-pulse"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDuration: `${20 + i * 5}s`,
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Enhanced Title with Multiple Glow Effects */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in relative z-10"
                style={{
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3), 0 0 90px rgba(236, 72, 153, 0.2)'
                }}>
              🚀 COSMIC EXPLORER
            </h1>
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-blue-400/20 blur-lg animate-pulse">
              🚀 COSMIC EXPLORER
            </div>
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-purple-400/15 blur-xl animate-pulse" 
                 style={{ animationDelay: '0.5s' }}>
              🚀 COSMIC EXPLORER
            </div>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in"
             style={{
               textShadow: '0 0 20px rgba(156, 163, 175, 0.5)'
             }}>
            Embark on an epic journey through our solar system!
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Mission Briefing */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/40 relative overflow-hidden shadow-lg shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2"
                    style={{ textShadow: '0 0 15px rgba(251, 191, 36, 0.5)' }}>
                  🎯 Mission Briefing
                  <span className="animate-pulse">✨</span>
                </h2>
                <div className="text-left space-y-3 text-gray-300">
                  <p>🌍 You start your journey from Earth with limited fuel</p>
                  <p>⚠️ Getting too close to the Sun will end your mission</p>
                  <p>💫 Reaching Pluto will exhaust your fuel reserves</p>
                  <p>☄️ Jupiter's asteroid belt may damage your ship</p>
                  <p>🎯 Explore wisely and manage your resources!</p>
                  <p>📚 Complete tasks to unlock space knowledge</p>
                  <p>🏆 Earn achievements for your accomplishments</p>
                </div>
              </div>
            </div>

            {/* Navigation Guide */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/40 relative overflow-hidden shadow-lg shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2"
                    style={{ textShadow: '0 0 15px rgba(96, 165, 250, 0.5)' }}>
                  🧭 Navigation Guide
                  <span className="animate-spin">🛸</span>
                </h2>
                <div className="text-left space-y-3 text-gray-300">
                  <p><span className="text-cyan-400">🖱️ Mouse Controls:</span> Click and drag to rotate the view</p>
                  <p><span className="text-cyan-400">🔍 Zoom:</span> Scroll wheel to zoom in/out</p>
                  <p><span className="text-cyan-400">🪐 Planet Selection:</span> Click on planets to view details</p>
                  <p><span className="text-cyan-400">🚀 Travel:</span> Click "Travel Here" in planet details</p>
                  <p><span className="text-cyan-400">📋 Tasks:</span> Check mission objectives in the sidebar</p>
                  <p><span className="text-cyan-400">🎮 Controls:</span> Use Mission Control panel (sidebar)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Features */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-green-500/40 relative overflow-hidden shadow-lg shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2 justify-center"
                  style={{ textShadow: '0 0 15px rgba(74, 222, 128, 0.5)' }}>
                🌟 Game Features
                <span className="animate-bounce">🌠</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-left text-gray-300">
                <div className="p-4 bg-slate-700/40 rounded-lg border border-purple-400/30 shadow-lg">
                  <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                    🎮 Interactive 3D Solar System
                    <span className="animate-pulse">🪐</span>
                  </h3>
                  <p className="text-sm">Explore realistic planets with proper colors, sizes, and orbital mechanics</p>
                </div>
                <div className="p-4 bg-slate-700/40 rounded-lg border border-blue-400/30 shadow-lg">
                  <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                    📚 Educational Content
                    <span className="animate-pulse">🔬</span>
                  </h3>
                  <p className="text-sm">Learn fascinating facts about planets, moons, and space phenomena</p>
                </div>
                <div className="p-4 bg-slate-700/40 rounded-lg border border-yellow-400/30 shadow-lg">
                  <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    🏆 Achievement System
                    <span className="animate-bounce">🎖️</span>
                  </h3>
                  <p className="text-sm">Unlock achievements for exploration, survival, and knowledge gathering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-orange-500/40 relative overflow-hidden shadow-lg shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-orange-400 flex items-center gap-2 justify-center"
                  style={{ textShadow: '0 0 15px rgba(251, 146, 60, 0.5)' }}>
                💡 Pro Tips
                <span className="animate-pulse">🚀</span>
              </h2>
              <div className="text-left space-y-2 text-gray-300">
                <p>• Plan your route carefully - fuel is limited!</p>
                <p>• Visit safer planets first to build up resources</p>
                <p>• Complete tasks to earn fuel and health bonuses</p>
                <p>• Use the sidebar to track your discoveries and progress</p>
                <p>• Try different mission levels for varied challenges</p>
                <p>• Watch your ship's health, especially near dangerous planets</p>
              </div>
            </div>
          </div>

          {/* Enhanced Launch Button */}
          <div className="relative">
            <button
              onClick={handleLaunchMission}
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl border border-cyan-400/40"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Mission 🚀
                <span className="animate-pulse">✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-full blur-sm animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(-100px) translateY(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes cometTrail {
          0% {
            transform: translateX(-200px) translateY(-200px) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(120vw) translateY(120vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-5px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
