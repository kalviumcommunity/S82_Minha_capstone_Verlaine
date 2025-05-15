import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-rose-silk min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center animate-fade-in font-clean">
      <h1 className="text-5xl font-elegant text-plum mb-4 animate-slide-up">Verlaine</h1>
      <p className="text-lg text-rose-mauve max-w-xl mb-10 animate-slide-up delay-100">
        A poetic planner for your skin – blending self-care with elegance and intention.
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up delay-200">
        <Link
          to="/signup"
          className="bg-plum text-white px-6 py-3 rounded-full text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
        >
          Begin Your Ritual
        </Link>
        <Link
          to="/product-checker"
          className="border border-plum text-plum px-6 py-3 rounded-full text-base sm:text-lg hover:bg-rose-blush hover:text-plum hover:border-rose-dust transition-all duration-300 shadow-sm"
        >
          Check Ingredients
        </Link>
      </div>

      <div className="mt-16 text-left animate-fade-in delay-300">
        <h2 className="text-2xl font-elegant text-plum mb-4 text-center">What Awaits You</h2>
        <ul className="text-rose-mauve space-y-2 text-center">
          <li>🕊 Personalized Skincare Planner</li>
          <li>📖 Poetic Journaling Moments</li>
          <li>💸 Budget & Product Tracker</li>
          <li>🌺 Seasonal Skin Rituals</li>
          <li>🌱 Ingredient Safety Checker</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
