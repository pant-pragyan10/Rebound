import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InjuryDetection } from './components/InjuryDetection';
import { FitnessChat } from './components/FitnessChat';
import { RecoveryPrediction } from './components/RecoveryPrediction';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/injury-detection" element={<InjuryDetection />} />
          <Route path="/fitness-chat" element={<FitnessChat />} />
          <Route path="/recovery-prediction" element={<RecoveryPrediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;