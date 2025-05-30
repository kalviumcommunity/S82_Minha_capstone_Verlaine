import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
import { Trash2, Edit2 } from 'lucide-react';

export default function BudgetTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    productName: '',
    amount: '',
    category: 'other',
    purchaseDate: new Date().toISOString().split('T')[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get('/api/budget', { withCredentials: true });
      setEntries(data);
    } catch (err) {
      toast.error('Failed to fetch budget entries');
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productName || !form.amount || form.amount <= 0) {
      toast.error('Please fill in all fields with valid values');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        const { data } = await axios.put(
          `/api/budget/${editingId}`,
          form,
          { withCredentials: true }
        );
        if (data.success) {
          setEntries(entries.map((entry) => (entry._id === editingId ? data.budgetEntry : entry)));
          toast.success('Budget entry updated');
        } else {
          throw new Error(data.message);
        }
      } else {
        const { data } = await axios.post(
          '/api/budget',
          form,
          { withCredentials: true }
        );
        if (data.success) {
          setEntries([data.budgetEntry, ...entries]);
          toast.success('Budget entry added');
        } else {
          throw new Error(data.message);
        }
      }
      setForm({ productName: '', amount: '', category: 'other', purchaseDate: new Date().toISOString().split('T')[0] });
      setEditingId(null);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setForm({
      productName: entry.productName,
      amount: entry.amount,
      category: entry.category,
      purchaseDate: new Date(entry.purchaseDate).toISOString().split('T')[0],
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/budget/${id}`, { withCredentials: true });
      if (data.success) {
        setEntries(entries.filter((entry) => entry._id !== id));
        toast.success('Budget entry deleted');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete budget entry');
      console.error('Delete error:', err);
    }
  };

  const totalSpent = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-blush to-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8 animate-fade-in">
          Skincare Budget Tracker
        </h2>
        <div className="card mb-8 animate-slide-up">
          <h3 className="text-xl font-serif text-rose-700 mb-4">Add/Edit Purchase</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-sans text-rose-700">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={form.productName}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                className="input-field"
                placeholder="e.g., Rosewater Cleanser"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-sans text-rose-700">
                Amount ($)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="input-field"
                placeholder="e.g., 25.99"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-sans text-rose-700">
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="select-field"
                disabled={loading}
              >
                <option value="cleanser">Cleanser</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="serum">Serum</option>
                <option value="sunscreen">Sunscreen</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-sans text-rose-700">
                Purchase Date
              </label>
              <input
                id="purchaseDate"
                type="date"
                value={form.purchaseDate}
                onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                className="input-field"
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
          <h3 className="text-xl font-serif text-rose-700 mb-4">
            Total Spent: ${totalSpent.toFixed(2)}
          </h3>
          {entries.length === 0 ? (
            <p className="text-sm font-sans text-rose-600">No entries yet. Add your first purchase!</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry._id}
                  className="flex justify-between items-center p-4 bg-rose-50 rounded-lg border border-rose-200"
                >
                  <div>
                    <p className="text-sm font-sans text-rose-800">
                      {entry.productName} ({entry.category})
                    </p>
                    <p className="text-sm font-sans text-rose-600">
                      ${entry.amount.toFixed(2)} - {new Date(entry.purchaseDate).toLocaleDateString()}
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