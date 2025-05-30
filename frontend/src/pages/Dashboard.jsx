import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';

export default function Dashboard() {
  const [stats, setStats] = useState({ routineCount: 0, journalCount: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/stats', { withCredentials: true });
        if (data.success) {
          setStats(data.stats);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        toast.error('Failed to load dashboard stats');
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Welcome, {user?.username}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="dashboard-stat animate-slide-up">
            <h3 className="text-lg font-serif text-rose-700">Routines</h3>
            <p className="text-2xl font-sans text-rose-800">{loading ? '...' : stats.routineCount}</p>
            <Link to="/routines" className="text-rose-600 hover:text-rose-700 text-sm font-sans mt-2 block">
              Manage Routines
            </Link>
          </div>
          <div className="dashboard-stat animate-slide-up">
            <h3 className="text-lg font-serif text-rose-700">Journal Entries</h3>
            <p className="text-2xl font-sans text-rose-800">{loading ? '...' : stats.journalCount}</p>
            <Link to="/journal" className="text-rose-600 hover:text-rose-700 text-sm font-sans mt-2 block">
              View Journal
            </Link>
          </div>
          <div className="dashboard-stat animate-slide-up">
            <h3 className="text-lg font-serif text-rose-700">Total Spent</h3>
            <p className="text-2xl font-sans text-rose-800">{loading ? '...' : `$${stats.totalSpent}`}</p>
            <Link to="/budget" className="text-rose-600 hover:text-rose-700 text-sm font-sans mt-2 block">
              Track Budget
            </Link>
          </div>
        </div>
        <div className="card text-center animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Explore More</h3>
          <div className="space-x-4">
            <Link to="/products" className="button-primary">
              Discover Products
            </Link>
            <Link to="/profile" className="button-secondary">
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}