import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar'; // Fixed path
import Loader from '../components/Loader';
import BudgetTracker from '../components/Budget/BudgetTracker';

export default function Budget() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <p className="text-center text-rose-600">Please log in to view your budget.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-serif font-bold text-rose-800 text-center mb-8">
          Budget Tracker
        </h2>
        <BudgetTracker />
      </main>
    </div>
  );
}