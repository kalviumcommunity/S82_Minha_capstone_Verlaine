import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
import { Trash2, Edit2 } from 'lucide-react';

export default function Journal() {
  const [routines, setRoutines] = useState([]);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ routine: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoutines = async () => {
    try {
      const { data } = await axios.get('/api/routine', { withCredentials: true });
      setRoutines(data);
      if (data.length > 0) setForm((prev) => ({ ...prev, routine: data[0]._id }));
    } catch (err) {
      toast.error('Failed to fetch routines');
      console.error('Fetch routines error:', err);
    }
  };

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get('/api/journals', { withCredentials: true });
      setEntries(data);
    } catch (err) {
      toast.error('Failed to fetch journal entries');
      console.error('Fetch entries error:', err);
    }
  };

  useEffect(() => {
    fetchRoutines();
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.routine || !form.content) {
      toast.error('Please select a routine and add content');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        const { data } = await axios.put(
          `/api/journals/${editingId}`,
          { content: form.content },
          { withCredentials: true }
        );
        if (data.success) {
          setEntries(entries.map((entry) => (entry._id === editingId ? data.journalEntry : entry)));
          toast.success('Journal entry updated');
        } else {
          throw new Error(data.message);
        }
      } else {
        const { data } = await axios.post(
          '/api/journals',
          form,
          { withCredentials: true }
        );
        if (data.success) {
          setEntries([data.journalEntry, ...entries]);
          toast.success('Journal entry added');
        } else {
          throw new Error(data.message);
        }
      }
      setForm({ routine: routines[0]?._id || '', content: '' });
      setEditingId(null);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setForm({ routine: entry.routine._id, content: entry.content });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/journals/${id}`, { withCredentials: true });
      if (data.success) {
        setEntries(entries.filter((entry) => entry._id !== id));
        toast.success('Journal entry deleted');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete journal entry');
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Your Skincare Journal
        </h2>
        <div className="card mb-8 animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Add/Edit Journal Entry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="routine" className="block text-sm font-sans text-rose-700">
                Routine
              </label>
              <select
                id="routine"
                value={form.routine}
                onChange={(e) => setForm({ ...form, routine: e.target.value })}
                className="select-field"
                disabled={loading || editingId}
              >
                {routines.map((routine) => (
                  <option key={routine._id} value={routine._id}>
                    {routine.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-sans text-rose-700">
                Notes
              </label>
              <textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="input-field"
                rows="4"
                placeholder="How did your skin feel today?"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="button-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingId ? 'Update Entry' : 'Add Entry'}
            </button>
          </form>
        </div>
        <div className="card animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Your Journal Entries</h3>
          {entries.length === 0 ? (
            <p className="text-sm font-sans text-rose-600">No entries yet. Add your first journal entry!</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry._id}
                  className="flex justify-between items-start p-4 bg-rose-50 rounded-lg border border-rose-200"
                >
                  <div>
                    <p className="text-sm font-sans text-rose-800">
                      Routine: {entry.routine?.name}
                    </p>
                    <p className="text-sm font-sans text-rose-600 whitespace-pre-wrap">
                      {entry.content}
                    </p>
                    <p className="text-xs font-sans text-rose-600">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="button-icon"
                      aria-label="Edit entry"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="button-icon"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}