import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth'; // Update import

export default function Profile() {
  const [form, setForm] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email) {
      toast.error('All fields are required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/users/${user.id}`,
        form,
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Profile updated successfully');
        window.location.reload(); // Refresh to update user context
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Update failed');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/users/${user.id}`,
        { withCredentials: true }
      );
      if (data.success) {
        logout();
        toast.success('Account deleted successfully');
        navigate('/');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Delete failed');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Your Profile
        </h2>
        <div className="card animate-slide-up">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-sans text-rose-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input-field"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-sans text-rose-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="button-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="button-secondary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}