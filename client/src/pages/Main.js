import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation.js';
import Home from "./Home.js"
import Map from "./Map.js"
import Profile from './Profile.js';
import Team from './Friends.js';
import Header from '../components/Header.js';
import Games from './Games.js';
import Game from './Game.js';

const Main = () => {
  return (
    <div className='scrollbar-hide'>
      <Header />
      {/* <div className="min-h-screen bg-gradient-to-br from-[#a63c07] via-[#469992] to-[#a63c07] 
        bg-[length:200%_200%] animate-gradient-x text-white font-sans p-6 flex flex-col items-center"> */}
      <div className="pt-[100px] pb-[100px] min-h-screen bg-gradient-to-br from-[#a63c07] via-[#469992] to-[#a63c07] 
        bg-[length:200%_200%] animate-gradient-x text-white font-sans px-4">
        <div className="max-w-screen-md mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:gameName" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </div>
      </div>
      <BottomNavigation />

    </div>
  );
};

export default Main;
