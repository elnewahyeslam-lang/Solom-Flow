"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, ListTodo, Settings } from "lucide-react";
import solomFlow from "../photo/solomflow.webp"
export default function Navbar() {
  const actPath = usePathname();
  
  const Active = (path: string) => {
    return actPath === path 
      ? "bg-gradient-to-r from-[#3b82f6] to-[#0686d4] border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
      : "hover:bg-blue-400";
  };

  return (
    <aside className="bg-[#0b1220] md:min-h-screen md:p-6 flex">
      <div className=" md:mt-10 md:gap-10 md:flex  mt-25 md:ml-4 gap-30">
          <img src={solomFlow.src} alt="Solom Flow Logo" className="md:w-30 w-30 h-20 ml-10 md:ml-2"/>
        <h1 className="pt-4 text-white text-4xl font-bold">
          Solom <span className="text-green-500">Flow</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col md:mt-60 md:ml-[-100] md:gap-15 gap-8 ml-5 justify-start mt-25 ">
        
        {/* Dashboard */}
        <div className={`flex items-center gap-4 md:p-3  p-2 rounded-2xl transition-all duration-300 md:w-50 ${Active("/dashboard")}`}>
          <LayoutDashboard className="text-white md:w-10 md:h-10 w-5 h-5" />
          <Link href="/dashboard" className="text-white text-xl md:text-2xl font-medium">Dashboard</Link>
        </div>

        {/* Projects */}
        <div className={`flex items-center gap-4 md:p-3 p-2 rounded-2xl transition-all duration-300 md:w-50 ${Active("/projects")}`}>
          <FolderKanban className="text-white md:w-10 md:h-10 w-5 h-5" />
          <Link href="/projects" className="text-white  text-xl md:text-2xl font-medium">Projects</Link>
        </div>

        {/* Tasks */}
        <div className={`flex items-center gap-4 md:p-3 p-2 rounded-2xl transition-all duration-300 md:w-50 ${Active("/tasks")}`}>
          <ListTodo className="text-white md:w-10 md:h-10 w-5 h-5" />
          <Link href="/tasks" className="text-white  text-xl md:text-2xl font-medium">Tasks</Link>
        </div>

        {/* Settings */}
        <div className={`flex items-center gap-4 md:p-3 p-2 rounded-2xl transition-all duration-300 md:w-50 ${Active("/settings")}`}>
          <Settings className="text-white md:w-10 md:h-10 w-5 h-5" />
          <Link href="/settings" className="text-white  text-xl md:text-2xl font-medium">Settings</Link>
        </div>

      </div>
    </aside>
  );
}
