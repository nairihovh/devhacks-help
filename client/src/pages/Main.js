import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation.js';
import Home from "./Home.js"
import Map from "./Map.js"
import Game from "./Game.js"
import Profile from './Profile.js';
import Header from '../components/Header.js';

const Main = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#a63c07] via-[#469992] to-[#a63c07] 
      bg-[length:200%_200%] animate-gradient-x text-white font-sans p-6 flex flex-col items-center">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/game" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNavigation />
    </div>

    </>
  );
};

export default Main;
