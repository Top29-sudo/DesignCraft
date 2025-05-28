import { ProjectType, SuggestionType } from '../types';

export const generateMockProjects = (count: number): ProjectType[] => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    return {
      id: `project-${i}`,
      name: `Gameplay Montage ${i + 1}`,
      createdAt: new Date(date),
      lastModified: new Date(date),
      messages: i === 0 ? generateMockMessages() : [],
      videoUrl: i === 0 ? 'mock-url' : undefined,
    };
  });
};

export const generateMockMessages = () => {
  return [
    {
      id: 'msg-1',
      content: "I've analyzed your gameplay video. I found several impressive kill moments and potential highlight sequences. What would you like me to do with this footage?",
      sender: 'ai' as const,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 'msg-2',
      content: "Create a montage with the best kills and add some dramatic music",
      sender: 'user' as const,
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: 'msg-3',
      content: "I'll create a montage focusing on your best kills with dramatic music. I've identified 4 impressive kill sequences at 01:23, 02:15, 03:45, and 05:12. I've prepared a montage plan with slow-motion effects on the critical moments and smooth transitions.",
      sender: 'ai' as const,
      timestamp: new Date(Date.now() - 2400000)
    }
  ];
};

export const generateMockSuggestions = (): SuggestionType[] => {
  return [
    {
      id: 'suggestion-1',
      text: 'Add slow-motion to the headshot at 02:15',
      action: 'add_slowmo'
    },
    {
      id: 'suggestion-2',
      text: 'Use dramatic music for the final sequence',
      action: 'add_music'
    },
    {
      id: 'suggestion-3',
      text: 'Add zoom effect to all headshots',
      action: 'add_zoom'
    },
    {
      id: 'suggestion-4',
      text: 'Create cinematic intro',
      action: 'add_intro'
    }
  ];
};