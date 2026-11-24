"use client";
import { useState,useEffect } from "react";
import {Plus,X,CheckSquare,Calendar,Trash2,Search,} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  date: string;
  completed: boolean;
}

export default function TasksPage() {
  // قائمة المهام (تبدأ فاضية عشان تشتغل ديناميكياً)
    const [tasks, setTasks] = useState<Task[]>(()=>{
      if (typeof window !== "undefined"){
        const saved = localStorage.getItem("tasks")
        return saved ? JSON.parse(saved) : []
      }
      return []
    });
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // حقول الفورم الجديدة
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Completed">("To Do");

  // دالة إضافة مهمة جديدة
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      description: description || "No additional description.",
      status,
      priority,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      completed: status === "Completed",
    };

    setTasks([newTask, ...tasks]);

    // تصفير الفورم وقفل المودل
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("To Do");
    setIsModalOpen(false);
  };

  // دالة تبديل حالة الإنجاز (Checkbox)
  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          return {
            ...task,
            completed: nextCompleted,
            status: nextCompleted ? "Completed" : "In Progress",
          };
        }
        return task;
      })
    );
  };

  // دالة حذف مهمة
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // فلترة المهام حسب الـ Tabs وحسب البحث
  const filteredTasks = tasks.filter((task) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "To Do" && task.status === "To Do") ||
      (activeTab === "In Progress" && task.status === "In Progress") ||
      (activeTab === "Completed" && task.status === "Completed");

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });
    useEffect(()=>{
       localStorage.setItem("tasks",JSON.stringify(tasks))
  
    },[tasks])

  return (
    <div className="p-8 space-y-8 text-white min-h-screen md:ml-20 md:mt-1 mt-80  ml-10">
      {/* 1. الهيدر العلوي */}
      <div className="flex items-center gap-4 ">
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <CheckSquare className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-gray-400 text-sm">
            Manage and track your daily workflow efficiently.
          </p>
        </div>
      </div>

      {/* 2. شريط التصفية (Tabs) وزرار إضافة مهمة */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* الـ Tabs */}
        <div className="flex items-center gap-2 bg-[#070b14] p-1.5 rounded-2xl border border-cyan-500/30 w-full lg:w-auto overflow-x-auto">
          {["All", "To Do", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === tab
                  ? "bg-cyan-400 text-[#0b1220] font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* زرار New Task */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full lg:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#0b1220] font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" /> New Task
        </button>
      </div>

      {/* شريط البحث السريع */}
      <div className="relative w-full">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#070b14]/90 text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
        />
      </div>

      {/* 3. قائمة المهام الديناميكية */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-cyan-500/30 bg-[#0b1220]/40">
          <p className="text-gray-400 mb-4">No tasks found. Create your first task now!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/40 hover:bg-cyan-500/20 transition-all"
          >
            + Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0b1220]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-400/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* الجزء الأيمن: الـ Checkbox والعنوان */}
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="w-5 h-5 rounded-lg accent-cyan-400 cursor-pointer bg-[#070b14] border-cyan-500/50"
                />
                <div className="space-y-1">
                  <h3
                    className={`text-sm sm:text-base font-bold transition-all ${
                      task.completed ? "line-through text-gray-500" : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">{task.description}</p>
                </div>
              </div>

              {/* الجزء الأيسر: الأولوية، التاريخ، الحالة، وحذف */}
              <div className="flex items-center flex-wrap gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* شارة الأولوية */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    task.priority === "High"
                      ? "bg-red-500/10 text-red-400 border-red-500/30"
                      : task.priority === "Medium"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  {task.priority}
                </span>

                {/* التاريخ */}
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  {task.date}
                </span>

                {/* شارة الحالة */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium border ${
                    task.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : task.status === "In Progress"
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                  }`}
                >
                  {task.status}
                </span>

                {/* زر الحذف */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. نافذة Modal إضافة مهمة جديدة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-[#0b1220] border-2 border-cyan-400/50 rounded-3xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(34,211,238,0.3)] space-y-5">
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
              <h2 className="text-xl font-bold text-cyan-400">Add New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              {/* اسم المهمة */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Design Landing Page"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                />
              </div>

              {/* وصف المهمة */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief details about the task..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                />
              </div>

              {/* الأولوية */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* الحالة */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#0b1220] font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:opacity-90 cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
