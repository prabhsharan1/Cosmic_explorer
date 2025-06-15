
import React, { useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import GameState from './components/GameState';
import EducationalHub from './components/EducationalHub';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen">
          <audio ref={audioRef} loop>
            <source src="/space-ambient.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/game" element={<GameState audioRef={audioRef} />} />
            <Route 
              path="/learn" 
              element={
                <EducationalHub 
                  onStartMission={() => window.location.href = '/game'}
                  completedTasks={[]} // We'll need to make this persistent later
                  visitedPlanets={[]} // We'll need to make this persistent later
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
