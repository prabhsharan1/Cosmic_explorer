import { Task } from '../data/levelData';
import { CheckCircle, Clock, Target, Star, HelpCircle, Microscope, Telescope, Camera } from 'lucide-react';

interface TaskTrackerProps {
  tasks: Task[];
  onTaskComplete?: (taskId: string) => void;
}

const TaskTracker = ({ tasks, onTaskComplete }: TaskTrackerProps) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const getTaskIcon = (type: Task['type']) => {
    const icons = {
      exploration: '🚀',
      research: '🔬',
      survival: '🛡️',
      discovery: '🔍'
    };
    return icons[type];
  };

  const getTaskColor = (type: Task['type']) => {
    const colors = {
      exploration: 'text-blue-400',
      research: 'text-green-400',
      survival: 'text-red-400',
      discovery: 'text-purple-400'
    };
    return colors[type];
  };

  const getRecommendedTool = (task: Task) => {
    if (task.type === 'research') {
      if (task.description.toLowerCase().includes('atmosphere')) return 'Spectrometer';
      if (task.description.toLowerCase().includes('temperature')) return 'Telescope';
      if (task.description.toLowerCase().includes('surface')) return 'Camera';
      return 'Spectrometer';
    }
    if (task.type === 'discovery') {
      if (task.description.toLowerCase().includes('signals')) return 'Signal Detector';
      if (task.description.toLowerCase().includes('life')) return 'Telescope';
      return 'Radar Scanner';
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Target size={20} className="text-purple-400" />
          Mission Tasks
        </h3>
        <div className="text-sm text-gray-400">
          {completedTasks}/{totalTasks} Complete
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
        ></div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {tasks.map((task) => {
          const recommendedTool = getRecommendedTool(task);
          
          return (
            <div
              key={task.id}
              className={`p-3 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-green-900/30 border-green-500/50'
                  : 'bg-slate-700/50 border-gray-600/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTaskIcon(task.type)}</span>
                  <div>
                    <h4 className={`font-semibold ${task.completed ? 'text-green-400' : 'text-white'}`}>
                      {task.name}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${getTaskColor(task.type)} bg-slate-700/50`}>
                      {task.type}
                    </span>
                  </div>
                </div>
                {task.completed ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <Clock className="text-gray-400" size={20} />
                )}
              </div>

              <p className="text-sm text-gray-300 mb-2">{task.description}</p>

              {task.target && (
                <p className="text-xs text-blue-400 mb-2">Target: {task.target}</p>
              )}

              {task.requirement && (
                <p className="text-xs text-orange-400 mb-2">Requirement: {task.requirement}</p>
              )}

              {recommendedTool && !task.completed && (
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-2 mb-2">
                  <div className="flex items-start gap-2">
                    <Microscope size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-purple-300">
                      Recommended tool: <span className="font-semibold">{recommendedTool}</span>
                    </p>
                  </div>
                </div>
              )}

              {task.hint && (
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-2 mb-2">
                  <div className="flex items-start gap-2">
                    <HelpCircle size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-300">{task.hint}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-gray-400">
                  {task.reward.points && (
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400" />
                      {task.reward.points} pts
                    </span>
                  )}
                  {task.reward.fuel && (
                    <span className="text-green-400">+{task.reward.fuel}% fuel</span>
                  )}
                  {task.reward.health && (
                    <span className={task.reward.health > 0 ? 'text-green-400' : 'text-red-400'}>
                      {task.reward.health > 0 ? '+' : ''}{task.reward.health}% health
                    </span>
                  )}
                </div>
                {task.reward.knowledge && (
                  <span className="text-purple-400 text-xs">
                    +{task.reward.knowledge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskTracker;
