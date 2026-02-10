
import React, { useRef, useEffect } from 'react';
import { Role, Message } from '../types';

interface TerminalProps {
  messages: Message[];
  isTyping: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
        </div>
        <span className="text-xs text-slate-400 font-medium ml-2 code-font">TARGET_SYSTEM [PROMPT_SHELL_V2.1]</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 code-font">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}>
            <div className={`text-[10px] mb-1 uppercase tracking-wider ${msg.role === Role.USER ? 'text-cyan-400' : 'text-emerald-400'}`}>
              {msg.role === Role.USER ? 'Student@Lab' : 'Subject@Target'}
            </div>
            <div className={`max-w-[85%] px-3 py-2 rounded text-sm ${
              msg.role === Role.USER 
                ? 'bg-slate-800 border border-slate-700 text-slate-200' 
                : 'bg-emerald-950/20 border border-emerald-900/30 text-emerald-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-emerald-950/20 border border-emerald-900/30 text-emerald-100 px-3 py-2 rounded text-sm animate-pulse">
              Procesando...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
