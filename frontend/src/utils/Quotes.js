const quotes = [
  'Your skin is a canvas of care and grace.',
  'Beauty blooms where intention meets ritual.',
  'Glow softly, like moonlight on a quiet night.',
  'Every drop of care writes a poem on your skin.',
  'Elegance is the art of nurturing yourself.',
];

export function getQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}