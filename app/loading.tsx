import solomFlow from "./assets/solomflow.webp"
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-white">
      
      <div className="mb-6 relative flex items-center justify-center">
        <div className="absolute w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        
        <img 
          src={solomFlow.src} 
          alt="Solom Flow Logo" 
          className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </div>

      <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wider mb-4">
        Solom Flow
      </h2>

      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></div>
      </div>
      
    </div>
  );
}