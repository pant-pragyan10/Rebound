import React from 'react';
import { Dumbbell, Brain, Clock, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Header() {
  const location = useLocation();
  
  const navItemVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-black/90 backdrop-blur-md py-4 px-6 fixed w-full top-0 z-50 border-b border-red-500/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Dumbbell className="text-red-600 h-8 w-8" />
            </motion.div>
            <span className="text-white text-2xl font-bold">Rebound</span>
          </Link>
        </motion.div>
        
        <nav className="flex items-center space-x-8">
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link 
              to="/injury-detection" 
              className={`flex items-center space-x-2 text-white hover:text-red-500 transition-colors ${
                location.pathname === '/injury-detection' ? 'text-red-500' : ''
              }`}
            >
              <Brain className="h-5 w-5" />
              <span>Injury Detection</span>
            </Link>
          </motion.div>
          
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link 
              to="/fitness-chat" 
              className={`flex items-center space-x-2 text-white hover:text-red-500 transition-colors ${
                location.pathname === '/fitness-chat' ? 'text-red-500' : ''
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Fitness Chat</span>
            </Link>
          </motion.div>
          
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link 
              to="/recovery-prediction" 
              className={`flex items-center space-x-2 text-white hover:text-red-500 transition-colors ${
                location.pathname === '/recovery-prediction' ? 'text-red-500' : ''
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Recovery Prediction</span>
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}