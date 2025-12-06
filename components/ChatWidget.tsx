import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { VendorResult, WeightState } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatWidgetProps {
  weights: WeightState;
  results: VendorResult[];
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ weights, results }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I can help you analyze your vendor selection matrix. What questions do you have?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Pass previous history (excluding the very last user message we just added locally for optimistic UI)
      const responseText = await getChatResponse(messages, userMsg, weights, results);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
    } finally {
      setLoading(false);
    }
  };

  // Adjusted right position to account for the 20 (5rem) width sidebar + spacing
  const positionClass = "right-24"; 

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${positionClass} z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-slate-700 text-slate-300 rotate-90' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-110 shadow-indigo-900/50'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 ${positionClass} w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur rounded-t-xl flex items-center gap-2">
          <Sparkles className="text-indigo-400 w-5 h-5" />
          <div>
            <h3 className="text-sm font-bold text-white">Gemini Assistant</h3>
            <div className="text-[10px] text-slate-400">Context aware • gemini-2.5-flash</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-indigo-900/50 text-indigo-300'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`text-sm p-3 rounded-2xl max-w-[80%] ${
                msg.role === 'user' 
                  ? 'bg-slate-700 text-white rounded-tr-sm' 
                  : 'bg-indigo-900/20 text-slate-200 border border-indigo-500/20 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-900/50 text-indigo-300 flex items-center justify-center shrink-0">
                 <Bot size={14} />
               </div>
               <div className="bg-indigo-900/20 p-3 rounded-2xl rounded-tl-sm border border-indigo-500/20">
                 <div className="flex gap-1 h-5 items-center">
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900 rounded-b-xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about vendors..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 disabled:opacity-50 disabled:hover:text-indigo-500 p-1"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
