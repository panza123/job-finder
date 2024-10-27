import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import Loading from '../lib/Loading';

// Create a context
export const AuthContext = createContext(null);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state initialized to null
  const [loading, setLoading] = useState(true); // Loading state to indicate fetching status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/users/profile'); // Await the API response
        setUser(res.data); // Set the user data from response
        
      } catch (err) {
        toast.error(err?.response?.data?.data || 'Failed to fetch profile'); // Error handling
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchProfile(); // Call the fetchProfile function
  }, []); // Run once on mount

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading ? <Loading/> : children} {/* Show loading state */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
