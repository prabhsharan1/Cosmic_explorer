
import { useState } from 'react';
import { Book, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  funFact?: string;
  unlocked: boolean;
}

interface KnowledgeBankProps {
  knowledgeItems: KnowledgeItem[];
  onClose: () => void;
}

const KnowledgeBank = ({ knowledgeItems, onClose }: KnowledgeBankProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const categories = ['all', ...new Set(knowledgeItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? knowledgeItems 
    : knowledgeItems.filter(item => item.category === selectedCategory);

  const unlockedCount = knowledgeItems.filter(item => item.unlocked).length;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 border border-purple-500/50 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Book className="text-purple-400" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-purple-300">Knowledge Bank</h2>
              <p className="text-gray-400">Your collection of space discoveries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-yellow-400 font-bold">{unlockedCount}/{knowledgeItems.length}</div>
              <div className="text-xs text-gray-400">Discovered</div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Knowledge Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all ${
                item.unlocked
                  ? 'bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50'
                  : 'bg-gray-800/30 border-gray-600/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className={`font-bold ${item.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {item.unlocked ? item.title : '???'}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.unlocked ? 'bg-purple-600/30 text-purple-300' : 'bg-gray-600/30 text-gray-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
                {item.unlocked && (
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {expandedItem === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                )}
              </div>

              {item.unlocked ? (
                <div>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  
                  {expandedItem === item.id && item.funFact && (
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-blue-300 font-semibold text-sm">Fun Fact</span>
                      </div>
                      <p className="text-blue-200 text-sm">{item.funFact}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  🔒 Complete missions to unlock this knowledge
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No knowledge items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBank;
