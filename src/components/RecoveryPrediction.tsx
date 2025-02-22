import React, { useState } from 'react';
import { Clock, Activity, User, Calendar, Dumbbell, History, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function RecoveryPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    injury: '',
    severity: '',
    fitnessLevel: '',
    previousInjuries: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would normally make the API call to the prediction model
    console.log('Form submitted:', formData);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-red-500/10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 mb-8"
          >
            <Clock className="text-red-500 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Recovery Time Prediction</h2>
          </motion.div>

          <motion.form 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-white mb-2 font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                Age
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl p-4 border border-red-500/20 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                placeholder="Enter your age"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white mb-2 font-medium flex items-center">
                <Activity className="h-5 w-5 mr-2 text-red-500" />
                Type of Injury
              </label>
              <motion.select
                whileTap={{ scale: 0.98 }}
                value={formData.injury}
                onChange={(e) => setFormData({...formData, injury: e.target.value})}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl p-4 border border-red-500/20 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
              >
                <option value="">Select injury type</option>
                <option value="sprain">Sprain</option>
                <option value="strain">Strain</option>
                <option value="fracture">Fracture</option>
                <option value="dislocation">Dislocation</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white mb-2 font-medium flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Injury Severity
              </label>
              <motion.select
                whileTap={{ scale: 0.98 }}
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value})}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl p-4 border border-red-500/20 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
              >
                <option value="">Select severity</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white mb-2 font-medium flex items-center">
                <Dumbbell className="h-5 w-5 mr-2 text-red-500" />
                Fitness Level
              </label>
              <motion.select
                whileTap={{ scale: 0.98 }}
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({...formData, fitnessLevel: e.target.value})}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl p-4 border border-red-500/20 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
              >
                <option value="">Select fitness level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="elite">Elite</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white mb-2 font-medium flex items-center">
                <History className="h-5 w-5 mr-2 text-red-500" />
                Previous Injuries
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={formData.previousInjuries}
                onChange={(e) => setFormData({...formData, previousInjuries: e.target.value})}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl p-4 border border-red-500/20 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                placeholder="Describe any previous injuries..."
                rows={4}
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center space-x-2 font-medium text-lg"
            >
              <Activity className="h-5 w-5" />
              <span>Predict Recovery Time</span>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}