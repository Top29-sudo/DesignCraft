import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../../types';

interface FaqAccordionProps {
  faqItems: FAQItem[];
  category?: 'general' | 'technical' | 'billing' | undefined;
}

const FaqAccordion = ({ faqItems, category }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Filter items by category if provided
  const filteredItems = category 
    ? faqItems.filter(item => item.category === category)
    : faqItems;
  
  return (
    <div className="space-y-4">
      {filteredItems.map((item, index) => (
        <div 
          key={index} 
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">{item.question}</h3>
            <span className="ml-4 flex-shrink-0 text-gray-500 dark:text-gray-400">
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4 md:p-6 pt-0 text-gray-600 dark:text-gray-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
      
      {filteredItems.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No FAQ items found for this category.
        </p>
      )}
    </div>
  );
};

export default FaqAccordion;