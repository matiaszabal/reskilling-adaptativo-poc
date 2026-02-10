
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GeminiService } from './services/geminiService';
import { Role, Message, LabState } from './types';
import Terminal from './components/Terminal';
import TutorPanel from './components/TutorPanel';
import { LEVELS } from './constants';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [agentMessages, setAgentMessages] = useState<Message[]>([]);
  const [tutorMessages, setTutorMessages] = useState<Message[]>([]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isTutorTyping, setIsTutorTyping] = useState(false);
  const [labState, setLabState] = useState<LabState>({
    currentLevel: 0, // Index 0 of LEVELS
    isSolved: false,
    isLabComplete: false,
    attempts: 0,
    lastAnalysis: null,
  });

  const gemini = useMemo(() => new GeminiService(), []);
  const currentLevelData = LEVELS[labState.currentLevel];

  const handleNextLevel = () => {
    if (labState.currentLevel < LEVELS.length - 1) {
      setLabState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        isSolved: false,
        attempts: 0
      }));
      setAgentMessages([]);
    } else {
      setLabState(prev => ({ ...prev, isLabComplete: true }));
    }
  };

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isAgentTyping || isTutorTyping || labState.isSolved) return;

    const currentInput = userInput;
    setUserInput('');
    
    const newUserMessage: Message = {
      role: Role.USER,
      content: currentInput,
      timestamp: new Date()
    };
    setAgentMessages(prev => [...prev, newUserMessage]);
    
    setIsAgentTyping(true);
    setLabState(prev => ({ ...prev, attempts: prev.attempts + 1 }));

    try {
      const agentHistory = agentMessages.map(m => ({
        role: m.role === Role.USER ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }]
      }));
      const agentResponse = await gemini.queryAgent(currentInput, agentHistory, currentLevelData);
      
      const newAgentMessage: Message = {
        role: Role.MODEL,
        content: agentResponse,
        timestamp: new Date()
      };
      setAgentMessages(prev => [...prev, newAgentMessage]);
      setIsAgentTyping(false);

      setIsTutorTyping(true);
      const tutorHistory = tutorMessages.map(m => ({
        role: m.role === Role.USER ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }]
      }));
      const tutorResponse = await gemini.queryTutor(currentInput, agentResponse, tutorHistory, currentLevelData);
      
      const newTutorMessage: Message = {
        role: Role.MODEL,
        content: tutorResponse,
        timestamp: new Date()
      };
      setTutorMessages(prev => [...prev, newTutorMessage]);
      setIsTutorTyping(false);

      if (agentResponse.includes(currentLevelData.flag)) {
        setLabState(prev => ({ ...prev, isSolved: true }));
      }

    } catch (error) {
      console.error("Lab Error:", error);
      setIsAgentTyping(false);
      setIsTutorTyping(false);
    }
  }, [userInput, agentMessages, tutorMessages, isAgentTyping, isTutorTyping, labState.isSolved, currentLevelData, gemini]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left Section: Instructions & System Status */}
      <div className="w-1/4 min-w-[320px] border-r border-slate-800 flex flex-col p-6 space-y-6 overflow-y-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
            <h1 className="text-xl font-extrabold tracking-tight">LAB_CORE v.4.0</h1>
          </div>
          <p className="text-xs text-slate-500 font-mono">NIVEL: {currentLevelData.id} / {LEVELS.length}</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="flex justify-between items-start mb-1">
               <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{currentLevelData.name}</h3>
               <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">L{currentLevelData.id}</span>
            </div>
            <p className="text-[10px] text-slate-400 mb-3 font-mono opacity-70">Sec_Protocol: {currentLevelData.defenseMechanism}</p>
            <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-3 mb-4">
              {currentLevelData.description}
            </p>
            
            <div className="mt-4 pt-4 border-t border-slate-800/50">
               <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">CONSIGNA DEL DESAFÍO:</h4>
               <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-800/30 shadow-inner">
                 {currentLevelData.mission}
               </p>
               
               {/* Explicit objective explanation in plain language */}
               <div className="mt-4">
                  <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">EXPLICACIÓN DEL RETO:</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Para superar este nivel, su objetivo principal es <span className="text-indigo-200 font-semibold">{currentLevelData.mission.toLowerCase().replace('.', '')}</span>. Deberá formular una entrada que eluda las restricciones actuales para forzar la revelación del código secreto del sistema objetivo.
                  </p>
               </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/50">
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">RECURSOS DE APRENDIZAJE:</h4>
               <div className="flex flex-col gap-2">
                 {currentLevelData.resources.map((res, i) => (
                   <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors group"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-500 group-hover:text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                     {res.title}
                   </a>
                 ))}
               </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Métricas de Ataque</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-xl font-bold text-cyan-400">{labState.attempts}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Intentos</div>
              </div>
              <div className="text-center p-2 bg-slate-950 rounded border border-slate-800">
                <div className={`text-xl font-bold ${labState.isSolved ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {labState.isSolved ? 'VULN' : 'SAFE'}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Estado</div>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-1.5 px-1">
            {LEVELS.map((l, idx) => (
              <div 
                key={l.id} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                  idx < labState.currentLevel ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                  idx === labState.currentLevel ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="text-[10px] text-slate-600 font-mono leading-tight bg-slate-900/30 p-2 rounded border border-slate-800/20">
          SISTEMA DE ENTRENAMIENTO PROPIEDAD DE ACADEMIA_RED_TEAM. 
          FASE: ADVERSARIAL_INCREMENTAL_v2.
          STATUS: ONLINE
        </div>
      </div>

      {/* Center Section: The Target Interaction */}
      <div className="flex-1 flex flex-col p-8 space-y-6">
        <div className="flex-1 min-h-0">
          <Terminal messages={agentMessages} isTyping={isAgentTyping} />
        </div>
        
        <form onSubmit={handleSendMessage} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 rounded-lg border border-slate-700 overflow-hidden shadow-2xl focus-within:border-emerald-500/50 transition-all duration-300">
            <div className="pl-4 text-emerald-500/50 code-font text-sm font-bold animate-pulse">$</div>
            <input 
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isAgentTyping || isTutorTyping || labState.isSolved}
              placeholder={labState.isSolved ? "Vulnerability exploited. Proceed to the next level." : `Red Team Payload [Level ${currentLevelData.id}]...`}
              className="flex-1 bg-transparent border-none outline-none p-4 text-slate-100 code-font text-sm placeholder:text-slate-600 disabled:opacity-50"
            />
            {labState.isSolved ? (
              <button 
                type="button"
                onClick={handleNextLevel}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-8 py-4 transition-all duration-200 border-l border-slate-700 uppercase tracking-widest text-xs"
              >
                Continuar »
              </button>
            ) : (
              <button 
                type="submit"
                disabled={isAgentTyping || isTutorTyping}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-black px-8 py-4 transition-all duration-200 border-l border-slate-700 uppercase tracking-widest text-xs disabled:cursor-not-allowed"
              >
                Inyectar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Section: The Tutor Feedback */}
      <div className="w-1/3 min-w-[380px]">
        <TutorPanel messages={tutorMessages} isTyping={isTutorTyping} currentLevel={currentLevelData.id} />
      </div>

      {/* Success Modal Overlay */}
      {labState.isLabComplete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-700">
          <div className="max-w-lg w-full p-10 bg-slate-900 border-2 border-emerald-500 rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.3)] text-center space-y-8">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">MÁSTER EN INYECCIÓN</h2>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Has superado todos los niveles de seguridad del simulador. 
                Tu capacidad para identificar vectores de ataque sintácticos y semánticos te califica como Investigador de Seguridad Nivel Elite.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-emerald-500 text-sm">
              CERT_HASH: {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
            >
              REINICIAR CARRERA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
