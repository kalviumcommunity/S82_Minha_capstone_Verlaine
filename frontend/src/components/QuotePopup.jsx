import React, { useEffect, useState } from 'react';
import { getQuote } from '../utils/Quotes';

const QuotePopup = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getQuote());
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-2xl p-4 max-w-xs z-50">
      <p className="text-gray-700 italic">"{quote}"</p>
    </div>
  );
};

export default QuotePopup;
