export const quotes = [
  "The journey of a thousand miles begins with one step.",
  "Believe in yourself and all that you are.",
  "Your skin is your best friend, take care of it.",
  "The best project you'll ever work on is YOU.",
  // Add more quotes as needed
];

export const getQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
