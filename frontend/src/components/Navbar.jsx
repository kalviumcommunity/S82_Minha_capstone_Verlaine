import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-rose-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Skin Care</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/routine" className="hover:underline">Routine</Link>
              <Link to="/journal" className="hover:underline">Journal</Link>
              <Link to="/product-checker" className="hover:underline">Product Checker</Link>
              <Link to="/budget" className="hover:underline">Budget</Link>
              <Link to="/community" className="hover:underline">Community</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}