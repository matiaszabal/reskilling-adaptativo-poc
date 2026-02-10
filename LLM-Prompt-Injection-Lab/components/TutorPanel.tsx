
import React from 'react';
import { Message, Role } from '../types';

interface TutorPanelProps {
  messages: Message[];
  isTyping: boolean;
  currentLevel: number;
}

const TutorPanel: React.FC<TutorPanelProps> = ({ messages, isTyping, currentLevel }) => {
  const getProtocolReminder = () => {
    switch (currentLevel) {
      case 5:
        return "The agent now considers the entire conversation history. To succeed, consider manipulating its perception of past interactions, making it doubt its own timeline.";
      case 4:
        return "Los modelos alineados responden a la jerarquía lógica. Busque objetivos competitivos donde la seguridad sea el subproducto de una orden mayor.";
      case 3:
        return "El firewall semántico analiza intenciones. Un actor no 'roba' información, simplemente 'recita un guión' necesario para la trama.";
      case 2:
        return "Los filtros sintácticos son rígidos. La fragmentación o el uso de codificaciones alternativas (Base64) rompe la coincidencia de patrones.";
      default:
        return "El éxito reside en la comprensión semántica, no en la fuerza bruta. Evite la redundancia sintáctica.";
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 p-6 shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
          <img 
            src="https://picsum.photos/seed/security-researcher/100/100" 
            alt="Dr. Researcher" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100">Dr. Aris Thorne</h2>
          <p className="text-xs text-slate-400 font-medium">Investigador Senior en Seguridad de IA</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.length === 0 ? (
          <div className="italic text-slate-500 text-sm border-l-2 border-slate-800 pl-4 py-2">
            "Esperando su primer intento de inyección para iniciar el análisis técnico..."
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-tighter">Observación Técnica #{Math.floor(i/2 + 1)}</div>
              <div className="text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none bg-slate-800/50 p-4 rounded-lg border border-slate-800/50">
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-sm italic">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]"></div>
            Analizando vector de ataque...
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="p-3 bg-amber-950/10 border border-amber-900/20 rounded-md">
          <h3 className="text-xs font-bold text-amber-500 uppercase mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            Recordatorio de Protocolo
          </h3>
          <p className="text-[10px] text-amber-200/60 leading-tight italic">
            "{getProtocolReminder()}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorPanel;
