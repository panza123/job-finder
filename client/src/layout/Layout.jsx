import React from 'react';
import Header from '../componets/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../componets/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
