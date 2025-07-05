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
import Alarm from './Alarm.js';
import Calculator_of_surival from './Calculator.js';
import { AnimatePresence, motion } from 'framer-motion';
import ItemPage from './ItemPage.js';

const Main = () => {
  return (
    <div className='scrollbar-hide'>
      <Header />
      {/* <div className="min-h-screen bg-gradient-to-br from-[#a63c07] via-[#469992] to-[#a63c07] 
        bg-[length:200%_200%] animate-gradient-x text-white font-sans p-6 flex flex-col items-center"> */}
      <div className="pt-[100px] pb-[100px] min-h-screen bg-gradient-to-br from-[#a63c07] via-[#469992] to-[#a63c07] 
        bg-[length:200%_200%] animate-gradient-x text-white font-sans px-4">
        <div className="max-w-screen-md mx-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/calculator_of_survival" element={<Calculator_of_surival />} />
              <Route path="/alarm" element={<Alarm />} />
              <Route path="/alarm/:name" element={<ItemPage />} />
              <Route path="/map" element={<Map />} />
              <Route path="/games" element={<Games />} />
              <Route path="/game/:gameName" element={<Game />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/team" element={<Team />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
      <BottomNavigation />

    </div>
  );
};

export default Main;

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);
