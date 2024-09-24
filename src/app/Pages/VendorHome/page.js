"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const VendorHomePage = () => {
  const router = useRouter();

  const goToVendorSubmission = () => {
    router.push('/Pages/VendorSubmission');
  };

  const goToAddMenuItems = () => {
    router.push('/Pages/VendorPage');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100">
      <NavBar />

      <main className="flex-grow container mx-auto text-center py-10 px-8">
        <h1 className="text-5xl text-red-700 font-bold mb-6 tracking-wide">
          Welcome, Vendor!
        </h1>

        <p className="text-orange-700 mb-10 text-lg">
          Manage your restaurant, add menu items, and more!
        </p>

        <div className="flex justify-center gap-8 mb-12">
          <button
            onClick={goToVendorSubmission}
            className="bg-red-500 text-white hover:bg-red-600 px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-transform transform hover:scale-110"
          >
            Submit Restaurant
          </button>

          <button
            onClick={goToAddMenuItems}
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-transform transform hover:scale-110"
          >
            Add Menu Items
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorHomePage;
