import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am the Honda Genius. Ask me anything about the City 5th Gen.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await sendMessageToGemini(input);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`fixed bottom-8 right-8 z-50 group cursor-pointer ${isOpen ? 'hidden' : 'block'}`}
      >
        {/* Chrome Badge Container */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center border-[3px] border-white/80 relative overflow-hidden transition-transform duration-300 group-hover:scale-110">
           
           {/* Metallic Sheen Effect */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-20" />
           
           {/* Real Honda Logo */}
           <img 
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/1200px-Honda.svg.png" 
             alt="Honda Assistant"
             className="w-10 h-10 object-contain relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] opacity-90"
           />
        </div>
        
        {/* Floating Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-[10px] font-display text-white tracking-widest whitespace-nowrap">
            ASSISTANT
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/1200px-Honda.svg.png" 
                    alt="Honda Logo" 
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display text-white font-bold tracking-wider text-sm">HONDA GENIUS</h3>
                  <span className="text-[10px] text-neon-blue flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"/>
                    ONLINE
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neon-blue text-black font-medium rounded-tr-sm' 
                      : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about mileage, safety, features..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-neon-blue text-black rounded-lg disabled:opacity-0 disabled:scale-75 hover:scale-105 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};