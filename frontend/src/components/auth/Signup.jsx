import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { email, password });
      console.log('Signup successful', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-silk px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-elegant text-plum mb-6 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-mauve rounded-lg focus:outline-none focus:ring-2 focus:ring-plum"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-mauve rounded-lg focus:outline-none focus:ring-2 focus:ring-plum"
            required
          />
          <button
            type="submit"
            className="w-full bg-plum text-white py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-mauve mt-6">
          Already have an account? <Link to="/login" className="text-plum hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
