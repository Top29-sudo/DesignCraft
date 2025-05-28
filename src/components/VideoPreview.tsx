import { Play, Pause, Volume2, SkipForward, SkipBack } from 'lucide-react';
import { useState } from 'react';

const VideoPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-black border-b border-gray-800 relative">
      <div className="aspect-video max-h-[200px] bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg" 
          alt="Video thumbnail" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            className="bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center space-x-2 text-gray-300">
          <button className="hover:text-white">
            <SkipBack className="h-4 w-4" />
          </button>
          <button className="hover:text-white">
            <SkipForward className="h-4 w-4" />
          </button>
          <span className="text-xs">00:45 / 02:13</span>
        </div>
        <div className="mx-2 flex-1">
          <div className="h-1 bg-gray-700 rounded-full">
            <div className="h-full w-1/3 bg-indigo-500 rounded-full"></div>
          </div>
        </div>
        <button className="text-gray-300 hover:text-white">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;