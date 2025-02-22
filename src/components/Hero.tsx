import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h1 className="text-8xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
              Rebound
            </h1>
            <p className="text-3xl text-red-500 font-light">
              From setback to comeback with AI
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            <motion.a 
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 font-semibold text-lg"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </div>
  );
}