
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarToggleProps {
  onToggle: () => void;
}

const SidebarToggle = ({ onToggle }: SidebarToggleProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="icon"
      className="fixed top-4 left-4 z-40 bg-slate-900/80 backdrop-blur-sm border-purple-500/50 text-white hover:bg-purple-600/20 hover:border-purple-400"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default SidebarToggle;
