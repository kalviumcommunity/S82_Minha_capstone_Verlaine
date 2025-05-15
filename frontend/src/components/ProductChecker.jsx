import React, { useState } from 'react';

const ProductChecker = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  // Dummy search function (replace with real API)
  const searchIngredients = () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    // Dummy result data example
    setResults([
      { ingredient: 'Aloe Vera', safe: true, notes: 'Soothing and hydrating' },
      { ingredient: 'Fragrance', safe: false, notes: 'May cause irritation in sensitive skin' },
    ]);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-rose-blush rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-elegant text-plum mb-6">Ingredient Safety Checker</h2>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          className="flex-grow px-4 py-3 rounded-lg border border-mauve focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Enter ingredient or product name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchIngredients()}
        />
        <button
          onClick={searchIngredients}
          className="bg-plum text-ivory px-6 py-3 rounded-full font-semibold hover:bg-plum/90 transition"
        >
          Search
        </button>
      </div>

      {results && (
        <div className="space-y-4">
          {results.map(({ ingredient, safe, notes }, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border shadow-sm ${
                safe ? 'border-green-400 bg-green-50 text-green-700' : 'border-red-400 bg-red-50 text-red-700'
              }`}
            >
              <p className="font-semibold">{ingredient}</p>
              <p>{notes}</p>
              <p className="italic text-sm">{safe ? 'Safe for most skin types' : 'Use with caution'}</p>
            </div>
          ))}
        </div>
      )}

      {!results && <p className="text-mauve italic">Search ingredients to check their safety and suitability for your skin.</p>}
    </div>
  );
};

export default ProductChecker;
