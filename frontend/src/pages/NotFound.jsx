import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 animate-fade-in">
      <div className="card text-center">
        <h1 className="text-4xl font-serif font-bold text-rose-800 mb-4">404 - Not Found</h1>
        <p className="text-rose-600 font-sans mb-6">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn-primary" aria-label="Go home">Go Home</Link>
      </div>
    </div>
  );
}