import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Client } from '@gradio/client';

export function FitnessChat() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm your AI fitness assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { type: 'user', text: input }]);

    try {
      const client = await Client.connect('atharvbindal/fitness_chatbot');
      const result = await client.predict('/predict', {
        user_query: input.trim(),
      });

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: result.data,
        },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-red-500/10 h-[calc(100vh-120px)] flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 mb-6"
          >
            <Bot className="text-red-500 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Fitness Assistant</h2>
          </motion.div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-800">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 flex items-start space-x-2 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                        : 'bg-gray-800/50 backdrop-blur-sm text-gray-200'
                    }`}
                  >
                    {message.type === 'bot' ? (
                      <Bot className="h-5 w-5 text-red-500 mt-1" />
                    ) : (
                      <User className="h-5 w-5 text-white mt-1" />
                    )}
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-2"
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your fitness journey..."
              className="flex-1 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500/20"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className={`bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
