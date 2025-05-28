import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[75%] rounded-2xl p-4 ${
          isAI 
            ? 'bg-gray-800 text-gray-100' 
            : 'bg-indigo-600 text-white'
        }`}
      >
        <div className="text-sm mb-1">
          {isAI ? 'Emend AI' : 'You'}
        </div>
        <p>{message.content}</p>
        <div className="text-xs opacity-75 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;