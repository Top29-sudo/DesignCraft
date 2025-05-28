import { useState } from 'react';
import { Link } from 'react-router-dom';
import { packages } from '../data/packages';
import PackageCard from '../components/packages/PackageCard';
import { useRegionPricing } from '../hooks/useRegionPricing';

const PackagesPage = () => {
  const { isLoading: isLoadingRegion } = useRegionPricing();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  
  const filteredPackages = selectedTier 
    ? packages.filter(pkg => pkg.tier === selectedTier)
    : packages;
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Service Packages</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              From simple websites to complex web applications, we offer a range of packages to meet your needs and budget.
            </p>
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filter by tier */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedTier(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${!selectedTier 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              All Packages
            </button>
            <button
              onClick={() => setSelectedTier('starter')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedTier === 'starter' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              Starter ($100-$500)
            </button>
            <button
              onClick={() => setSelectedTier('advanced')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedTier === 'advanced' 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              Advanced ($501-$2,500)
            </button>
            <button
              onClick={() => setSelectedTier('premium')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedTier === 'premium' 
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              Premium ($2,501-$15,000)
            </button>
          </div>
          
          {/* Loading state */}
          {isLoadingRegion && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading packages...</p>
            </div>
          )}
          
          {/* Packages grid */}
          {!isLoadingRegion && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map(pkg => (
                  <PackageCard key={pkg.id} packageData={pkg} />
                ))}
              </div>
              
              {filteredPackages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No packages found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Custom Requirements Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Something Custom?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Don't see exactly what you're looking for? We specialize in custom solutions tailored to your specific needs.
            </p>
            <Link to="/contact" className="btn-primary">
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;