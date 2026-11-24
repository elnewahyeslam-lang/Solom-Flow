"use client";
import { useEffect, useState } from "react";
import {Plus,X,FolderKanban, Calendar,Trash2,Search,ImagePlus,MoreVertical} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  status: "Active" | "In Progress" | "Completed";
  date: string;
  tasksCount: number;
  image?: string;
}

export default function ProjectsPage() {
  // القائمة فاضية في الأول عشان كل حاجة تبقى ديناميكية من إضافتك
  const [projects, setProjects] = useState<Project[]>(()=>{
    if (typeof window !== "undefined"){
      const saved = localStorage.getItem("projects")
      return saved ? JSON.parse(saved) : []
    }
    return []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // بيانات الفورم الديناميكية
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "In Progress" | "Completed">("Active");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // دالة اختيار الصورة من الجهاز وعرضها فوراً
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  // دالة إضافة المشروع للقائمة
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject: Project = {
      id: Date.now(),
      title,
      description: description || "A modern platform for managing projects.",
      status,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      tasksCount: 0,
      image: imagePreview || undefined,
    };

    setProjects([newProject, ...projects]);

    // تصفير الفورم وقفل المودل
    setTitle("");
    setDescription("");
    setStatus("Active");
    setImagePreview(null);
    setIsModalOpen(false);
  };

  // دالة حذف مشروع
  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // فلترة المشاريع بالبحث
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(()=>{
     localStorage.setItem("projects",JSON.stringify(projects))

  },[projects])
 
  return (
    <div className="p-8 space-y-8 text-white min-h-screen md:mt-1 mt-100">
      {/* 1. الهيدر العلوي */}
      <div className="flex items-center gap-4 ml-20">
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <FolderKanban className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-gray-400 text-sm">
            Manage and organize your projects effectively.
          </p>
        </div>
      </div>

      {/* 2. شريط البحث وزرار إضافة مشروع */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between ml-20">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#070b14]/90 text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#0b1220] font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" /> New Project
        </button>
      </div>

      {/* 3. عرض المشاريع أو رسالة لو لسه مفيش مشاريع */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-cyan-500/30 bg-[#0b1220]/40 ml-20">
          <p className="text-gray-400 mb-4">No projects yet. Start by creating your first one!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/40 hover:bg-cyan-500/20 transition-all"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-[#0b1220]/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.1)] hover:border-cyan-400/60 transition-all flex flex-col justify-between space-y-5"
            >
              {/* الجزء العلوي: الصورة + العنوان والوصف + الحالة */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* مربع الصورة أو الأيقونة */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderKanban className="w-8 h-8 text-cyan-400" />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* شارة الحالة */}
                    <div className="pt-1">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                          project.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : project.status === "In Progress"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                            : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.status === "Active"
                              ? "bg-emerald-400"
                              : project.status === "In Progress"
                              ? "bg-cyan-400"
                              : "bg-purple-400"
                          }`}
                        />
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* الجزء الأوسط: التاريخ وعدد المهام */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-cyan-500/15">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Created: {project.date}
                </span>
           
              {/* الجزء السفلي: أزرار التحكم */}
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                   </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. نافذة إضافة المشروع (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-[#0b1220] border-2 border-cyan-400/50 rounded-3xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(34,211,238,0.3)] space-y-5">
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
              <h2 className="text-xl font-bold text-cyan-400">Add New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              {/* رفع الصورة */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Project Logo / Image</label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-cyan-500/40 rounded-2xl cursor-pointer bg-[#070b14] hover:border-cyan-400 transition-all overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImagePlus className="w-7 h-7 text-cyan-400 mb-1" />
                      <span className="text-xs">Click to upload image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* اسم المشروع */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Solom Flow SaaS"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                />
              </div>

              {/* وصف المشروع */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                />
              </div>

              {/* حالة المشروع */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070b14] text-white border border-cyan-500/40 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#0b1220] font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:opacity-90"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
