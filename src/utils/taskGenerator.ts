
interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  target?: string;
  type: 'exploration' | 'survival' | 'research';
  points: number;
}

const taskTemplates = {
  easy: [
    { type: 'exploration', title: 'Explore Venus', description: 'Travel to Venus and study its atmosphere', target: 'Venus', points: 50 },
    { type: 'exploration', title: 'Visit Mars', description: 'Journey to Mars and examine its surface', target: 'Mars', points: 50 },
    { type: 'survival', title: 'Fuel Management', description: 'Complete a mission with over 30% fuel remaining', points: 50 },
  ],
  medium: [
    { type: 'exploration', title: 'Jupiter Mission', description: 'Navigate to Jupiter despite asteroid risks', target: 'Jupiter', points: 100 },
    { type: 'research', title: 'Gas Giant Study', description: 'Study the composition of Saturn', target: 'Saturn', points: 100 },
    { type: 'survival', title: 'Deep Space Travel', description: 'Travel beyond Mars safely', points: 100 },
  ],
  hard: [
    { type: 'exploration', title: 'Outer Planets', description: 'Reach Uranus or Neptune', target: 'Uranus', points: 200 },
    { type: 'exploration', title: 'Pluto Quest', description: 'Complete the ultimate journey to Pluto', target: 'Pluto', points: 200 },
    { type: 'survival', title: 'Resource Master', description: 'Visit 5 planets in one mission', points: 200 },
  ]
};

export const generateTasks = (difficulty: 'easy' | 'medium' | 'hard', count: number): Task[] => {
  const templates = taskTemplates[difficulty];
  const tasks: Task[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    tasks.push({
      id: `task-${Date.now()}-${i}`,
      title: template.title,
      description: template.description,
      difficulty,
      target: template.target,
      type: template.type as 'exploration' | 'survival' | 'research',
      points: template.points
    });
  }
  
  return tasks;
};
