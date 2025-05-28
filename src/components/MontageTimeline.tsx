import { useState } from 'react';
import { Clock, Zap, CameraOff, Music, Send } from 'lucide-react';

const mockTimelineItems = [
  { id: 1, type: 'highlight_kill', start: '00:01:23', end: '00:01:28', effects: ['zoom', 'slowmo'] },
  { id: 2, type: 'transition', start: '00:01:28', end: '00:01:30', effects: ['fade'] },
  { id: 3, type: 'highlight_kill', start: '00:02:15', end: '00:02:20', effects: ['shake', 'zoom'] },
  { id: 4, type: 'cinematic', start: '00:03:45', end: '00:03:55', effects: ['music_sync'] },
];

const MontageTimeline = () => {
  const [timelineItems, setTimelineItems] = useState(mockTimelineItems);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'highlight_kill':
        return <Zap className="h-4 w-4 text-red-400" />;
      case 'transition':
        return <CameraOff className="h-4 w-4 text-blue-400" />;
      case 'cinematic':
        return <Music className="h-4 w-4 text-purple-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'highlight_kill':
        return 'border-red-500/30 bg-red-900/20';
      case 'transition':
        return 'border-blue-500/30 bg-blue-900/20';
      case 'cinematic':
        return 'border-purple-500/30 bg-purple-900/20';
      default:
        return 'border-gray-700 bg-gray-800/50';
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">Montage Plan</h3>
        <button className="flex items-center space-x-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md transition-all">
          <Send className="h-3 w-3" />
          <span>Send to Editor</span>
        </button>
      </div>
      
      <div className="relative pb-2">
        <div className="absolute left-0 right-0 h-1 bg-gray-800 top-5"></div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {timelineItems.map((item) => (
            <div 
              key={item.id}
              className={`flex-shrink-0 border rounded-md p-2 ${getItemColor(item.type)}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {getItemIcon(item.type)}
                <span className="text-xs font-medium">
                  {item.type.replace('_', ' ')}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {item.start} - {item.end}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.effects.map((effect, i) => (
                  <span 
                    key={i}
                    className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MontageTimeline;