import { useState } from 'react';
import { Send, Bot, X, MessageSquare } from 'lucide-react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "SYSTEM ERROR: Connection failed." }]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button - Squared & Bold */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-slate-950 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all z-50"
      >
        {open ? <X size={28} strokeWidth={3} /> : <MessageSquare size={28} strokeWidth={3} />}
      </button>

      {/* Chat Window - Hard Edges */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col z-50">
          
          {/* Header - Industrial Style */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-1.5 border border-white">
                <Bot size={18} className="text-slate-950" />
              </div>
              <span className="font-black uppercase tracking-tighter text-sm">College AI Terminal</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="h-2 w-2 bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Online</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 custom-scrollbar">
            {messages.length === 0 && (
              <div className="border-2 border-dashed border-slate-300 p-4 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Initialising Connection...</p>
                <p className="text-slate-400 text-[10px] mt-1">Ask about cutoffs, colleges, or trends.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 text-sm font-bold border-2 ${
                  m.role === 'user'
                    ? 'bg-emerald-600 border-slate-900 text-slate-950 ml-auto'
                    : 'bg-white border-slate-900 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input Area - No rounding */}
          <div className="p-3 border-t-2 border-slate-900 flex gap-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="ENTER COMMAND..."
              className="flex-1 bg-white border-2 border-slate-900 border-r-0 px-3 py-2 text-xs font-bold uppercase placeholder:text-slate-400 focus:outline-none focus:bg-emerald-50"
            />
            <button 
              onClick={sendMessage} 
              className="bg-slate-900 text-emerald-500 px-4 border-2 border-slate-900 hover:bg-emerald-600 hover:text-slate-950 transition-colors"
            >
              <Send size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}