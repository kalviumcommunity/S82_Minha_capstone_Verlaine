import React, { useState } from 'react';

const defaultSteps = [
  'Cleanser',
  'Toner',
  'Serum',
  'Moisturizer',
  'Sunscreen',
];

const RoutineTracker = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (step) => {
    setCompletedSteps(prev =>
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-rose-blush rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-elegant text-plum mb-6">Daily Routine Tracker</h2>
      <p className="text-mauve mb-6">Track your daily skincare steps and build your ritual.</p>

      <ul className="space-y-4">
        {defaultSteps.map((step) => (
          <li key={step} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={completedSteps.includes(step)}
              onChange={() => toggleStep(step)}
              id={`step-${step}`}
              className="w-5 h-5 text-plum border-plum rounded focus:ring-gold"
            />
            <label htmlFor={`step-${step}`} className={`cursor-pointer select-none text-plum font-semibold ${completedSteps.includes(step) ? 'line-through text-mauve' : ''}`}>
              {step}
            </label>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-plum font-semibold">
        Routine completion: {Math.round((completedSteps.length / defaultSteps.length) * 100)}%
      </p>
    </div>
  );
};

export default RoutineTracker;
