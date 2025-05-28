import { SuggestionType } from '../types';

interface SuggestionChipsProps {
  suggestions: SuggestionType[];
  onSuggestionClick: (suggestion: SuggestionType) => void;
}

const SuggestionChips = ({ suggestions, onSuggestionClick }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {suggestions.map(suggestion => (
        <button
          key={suggestion.id}
          onClick={() => onSuggestionClick(suggestion)}
          className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-all"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;