import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="text-center max-w-2xl animate-fade-in">
        <h1 className="text-5xl font-serif font-bold text-rose-800 mb-4">
          Welcome to Verlaine
        </h1>
        <p className="text-lg font-sans text-rose-600 mb-8">
          A poetic skincare planner to nurture your routine with elegance and care.
        </p>
        <div className="space-x-4 mb-8">
          {user ? (
            <Link to="/dashboard" className="button-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/signup" className="button-primary">
                Get Started
              </Link>
              <Link to="/login" className="button-secondary">
                Login
              </Link>
            </>
          )}
        </div>
        <div className="space-x-4">
          <Link to="/products" className="button-secondary">
            Discover Products
          </Link>
          <Link to="/community" className="button-secondary">
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
}