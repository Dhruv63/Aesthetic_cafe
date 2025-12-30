import React, { useState, useRef, useEffect } from 'react';
import { askCocoaAssistant } from '../services/aiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AskCocoa: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can tell you about our menu, ingredients, or coffee trends. Ask me anything!' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await askCocoaAssistant(userMsg);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text,
        sources: response.sources
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the kitchen right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-dark-brown text-cream rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-beige overflow-hidden"
          >
            <div className="p-4 bg-beige border-b border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white font-bold">C</div>
              <div>
                <h3 className="font-bold text-dark-brown">Ask Cocoa</h3>
                <p className="text-xs text-dark-brown/60">Powered by Gemini Search</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-terracotta text-white rounded-tr-none' 
                        : 'bg-white text-dark-brown border border-beige rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Render Search Sources if present */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500 max-w-[85%]">
                      <p className="font-semibold mb-1">Sources:</p>
                      <ul className="space-y-1">
                        {msg.sources.map((source, sIdx) => (
                          <li key={sIdx}>
                             <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-terracotta underline hover:text-dark-brown truncate block">
                               {source.title || source.url}
                             </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                 <div className="flex items-center gap-1 p-2">
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-beige">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our coffee..."
                  className="flex-1 p-2 rounded-lg bg-cream border border-beige focus:outline-none focus:border-terracotta text-sm"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="p-2 bg-dark-brown text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskCocoa;