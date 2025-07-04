import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation.js';

const Main = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#7A2F0D] via-[#A84718] to-[#01332F] text-white font-sans p-6 flex flex-col items-center">
      <Routes>
        {/* {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
      <BottomNavigation />
    </div>
    </>
  );
};

export default Main;
