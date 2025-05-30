import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import QuotePopup from './components/QuotePopup';
import RequireAuth from './components/RequireAuth';
import ToastProvider from './components/ToastProvider';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Journal = lazy(() => import('./components/Journal/Journal'));
const RoutineTracker = lazy(() => import('./components/Routines/RoutineTracker'));
const ProductChecker = lazy(() => import('./components/Products/ProductChecker'));
const Budget = lazy(() => import('./pages/Budget'));
const Community = lazy(() => import('./pages/Community'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream">
          <Navbar />
          <main className="container mx-auto px-4">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<RequireAuth />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/routine" element={<RoutineTracker />} />
                  <Route path="/product-checker" element={<ProductChecker />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/community" element={<Community />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <QuotePopup />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}