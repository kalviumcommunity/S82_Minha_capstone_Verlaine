import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';
import toast from 'react-hot-toast';

export default function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (!user) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}