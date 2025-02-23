import React, { useState } from 'react';
import { Activity, User, Calendar, Dumbbell, AlertCircle, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { Client } from "@gradio/client";

export function RecoveryPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    injuryType: '',
    severity: '',
    guidedRecoveryTraining: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Connecting to API...");
      const client = await Client.connect("Shinichi876/rec_new");
      const result = await client.predict("/predict", {
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        gender: formData.gender,
        injury_type: formData.injuryType,
        severity: formData.severity,
        guided_recovery_training: formData.guidedRecoveryTraining
      });
      console.log("API Response:", result.data);
      setPrediction(result.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error processing the request.");
    }
    setIsLoading(false);
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
          <motion.div className="flex items-center space-x-3 mb-8">
            <HeartPulse className="text-red-500 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Recovery Time Prediction</h2>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-6">
            <motion.div>
              <label className="block text-white mb-2 font-medium">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
                placeholder="Enter your age"
              />
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
                placeholder="Enter your weight"
              />
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
                placeholder="Enter your height"
              />
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Injury Type</label>
              <select
                value={formData.injuryType}
                onChange={(e) => setFormData({...formData, injuryType: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
              >
                <option value="">Select injury type</option>
                <option value="cervical spine dislocation">Cervical Spine Dislocation</option>
                <option value="cervical spine fracture">Cervical Spine Fracture</option>
                <option value="chest flail">Chest Flail</option>
                <option value="chest hemothorax">Chest Hemothorax</option>
                <option value="chest pneumothorax">Chest Pneumothorax</option>
                <option value="knee damage">Knee Damage</option>
                <option value="pelvis fracture">Pelvis Fracture</option>
              </select>
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </motion.div>

            <motion.div>
              <label className="block text-white mb-2 font-medium">Guided Recovery Training</label>
              <select
                value={formData.guidedRecoveryTraining}
                onChange={(e) => setFormData({...formData, guidedRecoveryTraining: e.target.value})}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </motion.div>

            <motion.button type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl">
              {isLoading ? "Predicting..." : "Predict Recovery Time"}
            </motion.button>
          </motion.form>

          {prediction && (
            <div className="mt-6 bg-gray-800 p-4 rounded-xl text-white">
              <h3 className="text-xl font-bold">Predicted Recovery Time</h3>
              <p>{prediction}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
