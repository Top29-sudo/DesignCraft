import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Upload, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import ChatMessage from './ChatMessage';
import VideoPreview from './VideoPreview';
import MontageTimeline from './MontageTimeline';
import SuggestionChips from './SuggestionChips';
import { Message, ProjectType, SuggestionType } from '../types';
import { analyzeVideo } from '../utils/videoAnalysis';

interface ChatInterfaceProps {
  activeProject: ProjectType | null;
}

const ChatInterface = ({ activeProject }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (activeProject) {
      setMessages(activeProject.messages || []);
      setVideoUploaded(!!activeProject.videoUrl);
    } else {
      setMessages([]);
      setVideoUploaded(false);
    }
  }, [activeProject]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeProject) return;
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content: `I'll ${inputValue.toLowerCase().includes('slowmo') ? 'add a slow motion effect' : 'edit that scene'} for you. I've updated the montage plan.`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsProcessing(false);
      setSuggestions(generateSuggestions(analysisResult));
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const videoFile = acceptedFiles[0];
    if (!videoFile.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    try {
      const result = await analyzeVideo(videoFile, (progress) => {
        setUploadProgress(progress);
      });
      
      setAnalysisResult(result);
      setVideoUploaded(true);
      
      const highlights = result.scenes.filter(
        (scene: any) => scene.type === 'kill' || scene.type === 'highlight'
      );
      
      const aiMessage: Message = {
        id: `msg-${Date.now()}`,
        content: `I've analyzed your gameplay video and found several key moments:\n\n${
          highlights.map((scene: any) => 
            `• ${scene.type === 'kill' ? 'Impressive kill' : 'Highlight'} at ${formatTimestamp(scene.startTime)} (${Math.round(scene.confidence * 100)}% confidence)`
          ).join('\n')
        }\n\nWhat would you like me to do with this footage?`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages([aiMessage]);
      setSuggestions(generateSuggestions(result));
    } catch (error) {
      console.error('Error analyzing video:', error);
      alert('Error analyzing video. Please try again.');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const generateSuggestions = (analysis: any): SuggestionType[] => {
    if (!analysis) return [];
    
    const suggestions: SuggestionType[] = [];
    
    const kills = analysis.scenes.filter((scene: any) => scene.type === 'kill');
    if (kills.length > 0) {
      suggestions.push({
        id: 'suggestion-1',
        text: `Add slow-motion to the kill at ${formatTimestamp(kills[0].startTime)}`,
        action: 'add_slowmo'
      });
    }
    
    if (analysis.scenes.length > 2) {
      suggestions.push({
        id: 'suggestion-2',
        text: 'Create a montage with all highlights',
        action: 'create_montage'
      });
    }
    
    suggestions.push({
      id: 'suggestion-3',
      text: 'Add cinematic music and effects',
      action: 'add_effects'
    });
    
    return suggestions;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1
  });

  if (!activeProject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h3 className="text-xl font-medium text-gray-300 mb-2">Welcome to Emend AI</h3>
          <p className="text-gray-400 mb-6">Create a new project to start editing your gameplay videos with AI.</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
            Create New Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {videoUploaded ? (
        <VideoPreview />
      ) : (
        <div className="p-4 bg-gray-900 border-b border-gray-800">
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
              ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-indigo-500'}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 text-indigo-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-200 mb-1">
              {isDragActive ? 'Drop your video here' : 'Upload Gameplay Video'}
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-md">
              Drag and drop your video file here, or click to browse
            </p>
            {isProcessing && (
              <div className="mt-4 w-full max-w-xs">
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {uploadProgress < 100 ? 'Uploading...' : 'Analyzing video...'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {videoUploaded && analysisResult && (
        <div className="bg-gray-900 border-b border-gray-800 p-4">
          <MontageTimeline scenes={analysisResult.scenes} />
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isProcessing && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Emend AI is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        {suggestions.length > 0 && videoUploaded && (
          <SuggestionChips 
            suggestions={suggestions} 
            onSuggestionClick={(suggestion) => setInputValue(suggestion.text)} 
          />
        )}
        
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={videoUploaded ? "Type an editing instruction..." : "Upload a video to start..."}
            disabled={!videoUploaded || isProcessing}
            className="w-full bg-gray-800 text-gray-100 placeholder-gray-500 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || !videoUploaded || isProcessing}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;