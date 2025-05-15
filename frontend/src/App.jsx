import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import RoutineTracker from './components/RoutineTracker';
import Journal from './components/Journal';
import ProductChecker from './components/ProductChecker';
import QuotePopup from './components/QuotePopup';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/routine" element={<RoutineTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/product-checker" element={<ProductChecker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <QuotePopup />
      </div>
    </Router>
  );
};

export default App;
