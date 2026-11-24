"use client";
import { useState, useEffect } from "react";
import { FolderKanban, CheckSquare} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
export default function DashboardPage() {
  const {user} = useUser()
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

   useEffect(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      setTotalProjects(savedProjects.length);



      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTotalTasks(savedTasks.length);
    } catch (error) {
      console.error("Error loading data from localStorage", error);
    }
  }, []);


  return (
    <div className="md:p-8 space-y-8 text-white md:min-h-screen md:ml-20 md:mt-1 mt-100">
      <div className="flex justify-end md:mr-20">
        <UserButton/>
      </div>
      {/* 1. كارت الترحيب العلوي */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-transparent border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          Welcome back, {user?.firstName || "User"}! <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's a quick overview of your SaaS status today.
        </p>
      </div>

      {/* 2. شبكة الكروت الأربعة للإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/* كارت Total Projects */}
        <div className="p-6 rounded-3xl bg-[#0b1220]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-400/50 transition-all flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-medium">Total Projects</h3>
            <p className="text-3xl font-extrabold text-white">{totalProjects}</p>
            <span className="text-xs text-cyan-400">All workspaces</span>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        {/* كارت Total Tasks */}
        <div className="p-6 rounded-3xl bg-[#0b1220]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-400/50 transition-all flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-medium">Total Tasks</h3>
            <p className="text-3xl font-extrabold text-white">{totalTasks}</p>
            <span className="text-xs text-cyan-400">Registered tasks</span>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

<div className="mt-15 p-6 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-transparent">
  <div>
    <h4 className="text-white font-bold text-lg mb-1">🚀 Daily Productivity Tip</h4>
    <p className="text-gray-400 text-sm">
      Organize your tasks regularly and prioritize your projects to work smarter and achieve more.
    </p>
  </div>
  <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl text-xs font-semibold border border-cyan-500/30">
    Solom Flow v1.0
  </div>
</div>

    </div>
  );
}
