import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layout/Layout';
import Home from './pages/Home';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import FindJob from './pages/FindJob';
import PostJob from './pages/PostJob';
import Blog from './pages/Blog';
import ProfilePage from './pages/ProfilePage';
import { AuthContext } from './context/AuthProvider';
import JobDetails from './pages/JobDetails';
import EditPage from './pages/EditPage';

export const App = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: user ? <Home /> : <Navigate to="/signup" replace />,
        },
        {
          path: '/signup',
          element: !user ? <SignUp /> : <Navigate to="/" replace />,
        },
        {
          path: '/login',
          element: !user ? <Login /> : <Navigate to="/" replace />,
        },
        {
          path: '/find-job',
          element: user ? <FindJob /> : <Navigate to="/signup" replace />,
        },
        {
          path: '/post-job',
          element: user ? <PostJob /> : <Navigate to="/signup" replace />,
        },
        {
          path: '/blog',
          element: <Blog />,  // Blog is accessible to all users
        },
        {
          path: '/profile',
          element: user ? <ProfilePage /> : <Navigate to="/signup" replace />,
        },
        {
          path: '/job/detail/:id', // Updated to include job ID
          element: user ? <JobDetails /> : <Navigate to="/signup" replace />,
        },
        {
          path:"edit-page/:id",
          element: user ? <EditPage/> : <Navigate to="/signup" replace />,  
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
