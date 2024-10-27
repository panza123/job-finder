import React, { useContext, useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axiosInstance.post('/users/signup', { name, email, password });
      setUser(res.data); // Set the user in context after successful signup
      setLoading(false); 
      navigate('/');
      toast.success('Account created successfully');
    } catch (e) {
      setLoading(false); 
      toast.error(e?.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-md transition-colors ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="text-blue-500">Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
