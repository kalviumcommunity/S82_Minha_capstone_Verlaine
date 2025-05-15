import React, { useState } from 'react';
import FileUpload from './fileUpload'; 
import { Search } from 'lucide-react';

const ProductChecker = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const searchIngredients = () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    
    setResults([
      { ingredient: 'Aloe Vera', safe: true, notes: 'Soothing and hydrating' },
      { ingredient: 'Fragrance', safe: false, notes: 'May cause irritation in sensitive skin' },
    ]);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-rose-blush rounded-3xl shadow-xl animate-fade-in">
      <h2 className="text-4xl font-elegant text-plum mb-8 text-center animate-slide-up">
        Ingredient Safety Checker
      </h2>

      {/* Search Input with Icon and Choose Image Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-8 animate-fade-in gap-4">
        {/* Input with icon inside */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter ingredient or product name..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-mauve bg-white text-plum placeholder-mauve/70 focus:outline-none focus:ring-2 focus:ring-gold transition"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchIngredients()}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mauve" size={20} />
        </div>

        {/* Choose Image Button */}
        <button
          onClick={() => setShowUpload(prev => !prev)}
          className="px-5 py-3 bg-gold text-plum font-semibold rounded-full shadow hover:bg-gold/90 transition"
        >
          {showUpload ? 'Hide Image' : 'Choose Image'}
        </button>
      </div>

      {/* Conditional Upload UI */}
      {showUpload && (
        <div className="mb-6 animate-slide-up">
          <FileUpload />
        </div>
      )}

      {/* Results */}
      {results ? (
        <div className="space-y-4 animate-fade-in">
          {results.map(({ ingredient, safe, notes }, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border shadow-md transition-all duration-200 ${
                safe
                  ? 'border-green-400 bg-green-50 text-green-800'
                  : 'border-red-400 bg-red-50 text-red-800'
              }`}
            >
              <p className="font-semibold text-lg">{ingredient}</p>
              <p className="mt-1">{notes}</p>
              <p className="italic text-sm mt-1">
                {safe ? 'Safe for most skin types' : 'Use with caution'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-mauve italic mt-6 animate-fade-in">
          Search ingredients to check their safety and suitability for your skin.
        </p>
      )}
    </div>
  );
};

export default ProductChecker;
