import { useState, useEffect } from 'react';
import { getQuote } from '../utils/quotes';

export default function QuotePopup() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getQuote());
  }, []);

  return (
    <div className="fixed bottom-4 right-4 card max-w-xs animate-slide-up">
      <p className="text-rose-600 font-serif italic">"{quote}"</p>
    </div>
  );
}