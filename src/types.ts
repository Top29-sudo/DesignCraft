export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface EditAction {
  intent: string;
  start: string;
  end: string;
  effects: string[];
}

export interface ProjectType {
  id: string;
  name: string;
  createdAt: Date;
  lastModified: Date;
  videoUrl?: string;
  messages: Message[];
  editPlan?: EditAction[];
}

export interface SuggestionType {
  id: string;
  text: string;
  action: string;
}