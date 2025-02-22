import React, { useState } from 'react';
import { Upload, AlertCircle, ImageIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Client } from '@gradio/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const injuryTypes = {
  spine: ['Herniated Disc', 'Scoliosis', 'Spinal Stenosis'],
  knee: ['ACL Tear', 'Meniscus Tear', 'Patella Fracture'],
};

export function InjuryDetection() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isFetchingSolution, setIsFetchingSolution] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setPrediction('Analyzing...');
    setSolution(null);
    setIsFetchingSolution(false);

    try {
      let client;
      if (selectedType === 'knee') {
        client = await Client.connect('Shinichi876/knee_osteoarthritis');
      } else {
        client = await Client.connect('Shinichi876/spineinjury');
      }

      const result = await client.predict('/predict', {
        img: file,
      });

      setPrediction(result.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Error processing the image.');
    }
  };

  const fetchSolution = async () => {
    if (!prediction) return;
    setIsFetchingSolution(true);

    try {
      const genAI = new GoogleGenerativeAI(
        'AIzaSyD7v1jYNAHyaJUTuwLIkCfDq-KNb4YgMsA'
      );
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `The following is the result of an injury detection model: "${prediction}". Give one short paragraph explanation and another paragraph for a solution. Don't use markdown.`;
      const result = await model.generateContent(prompt);

      if (result?.response?.text) {
        setSolution(result.response.text);
      } else {
        setSolution('No explanation available.');
      }
    } catch (error) {
      console.error('Error fetching explanation from Gemini API:', error);
      setSolution('An error occurred while fetching the explanation.');
    }
    setIsFetchingSolution(false);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPrediction(null);
    setSolution(null);
    setIsFetchingSolution(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-red-500/10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white mb-6 flex items-center"
          >
            <ImageIcon className="mr-2 text-red-500" />
            Injury Detection
          </motion.h2>

          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">
                Select Injury Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-red-500/20"
              >
                <option value="">Select type</option>
                {Object.keys(injuryTypes).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <motion.div className="mt-8">
              <label className="block w-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <motion.div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-red-500 transition-colors bg-gray-800/20">
                  <Upload className="mx-auto h-12 w-12 text-red-500 mb-4" />
                  <p className="text-white text-lg font-medium">
                    Upload your medical image
                  </p>
                  <p className="text-gray-400 mt-2">
                    Drag and drop or click to select
                  </p>
                </motion.div>
              </label>
            </motion.div>

            {selectedImage && (
              <motion.div className="mt-6 space-y-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full h-auto rounded-xl shadow-lg"
                />
                {prediction && (
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20">
                    <h3 className="text-white font-semibold text-lg">
                      Analysis Result
                    </h3>
                    <p className="text-gray-300">{prediction}</p>
                    <button
                      onClick={fetchSolution}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                    >
                      {isFetchingSolution
                        ? 'Getting Explanation & Solution...'
                        : 'Get Explanation & Solution'}
                    </button>
                    {solution && (
                      <p className="text-gray-300 mt-4">{solution}</p>
                    )}
                  </div>
                )}
                <button
                  onClick={handleClearImage}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  <Trash2 className="mr-2" /> Clear Image
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
