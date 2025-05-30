import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const fetchRoutines = async () => {
    try {
      const { data } = await axios.get('/api/routine', { withCredentials: true });
      setRoutines(data);
    } catch (err) {
      toast.error('Failed to fetch routines');
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Please enter a routine name');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/routine/create',
        form,
        { withCredentials: true }
      );
      if (data.success) {
        setRoutines([...routines, data.routine]);
        setForm({ name: '' });
        toast.success('Routine created');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create routine');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Your Skincare Routines
        </h2>
        <div className="card mb-8 animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Create a Routine</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-sans text-rose-700">
                Routine Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="e.g., Morning Glow"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="button-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Create Routine'}
            </button>
          </form>
        </div>
        <div className="card animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Your Routines</h3>
          {routines.length === 0 ? (
            <p className="text-sm font-sans text-rose-600">No routines yet. Create your first one!</p>
          ) : (
            <ul className="space-y-4">
              {routines.map((routine) => (
                <li
                  key={routine._id}
                  className="p-4 bg-rose-50 rounded-lg border border-rose-200"
                >
                  <p className="text-sm font-sans text-rose-800">{routine.name}</p>
                  <p className="text-xs font-sans text-rose-600">
                    Created: {new Date(routine.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}