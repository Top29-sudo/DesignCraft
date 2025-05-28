import { useState } from 'react';
import { faqs } from '../data/faqs';
import FaqAccordion from '../components/faq/FaqAccordion';

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState<'general' | 'technical' | 'billing' | undefined>(undefined);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about our services, process, and policies.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory(undefined)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeCategory === undefined 
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                All Questions
              </button>
              <button
                onClick={() => setActiveCategory('general')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeCategory === 'general' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                General
              </button>
              <button
                onClick={() => setActiveCategory('technical')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeCategory === 'technical' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                Technical
              </button>
              <button
                onClick={() => setActiveCategory('billing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeCategory === 'billing' 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                Billing
              </button>
            </div>
            
            {/* FAQs */}
            <FaqAccordion faqItems={faqs} category={activeCategory} />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@designcraft.dev" className="btn-primary">
                Email Support
              </a>
              <a href="/contact" className="btn-outline">
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;