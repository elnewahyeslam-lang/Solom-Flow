"use client"
import landinaPage from "./assets/Landingpage.png"
import formLogin from "./assets/formlogin.png"
import Dashboard from "./assets/Dashboard solom.png"
import pageProjects from "./assets/pageprojects.png"
import pageTasks from "./assets/pagetasks.png"
import pageSettings from "./assets/pagesettings.png"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
function Pudlic(){
      useEffect(()=>{
      AOS.init({
        duration:800,
        once:true
      })
      AOS.refresh()
    },[])
    return(
        <div className="min-h-screen">
        {/* How It Works / Walkthrough Section */}
<section className="max-w-6xl mx-auto px-6 py-20 text-white">
  {/* عنوان السيكشن */}
  <div  className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
      How Solom Flow Works
    </h2>
    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
      Get started in minutes. Follow these simple steps to manage your projects and boost your daily productivity.
    </p>
  </div>

  {/* الخطوات */}
  <div className="space-y-20">
    
    {/* الخطوة الأولى: تسجيل الدخول */}
    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-cyan-500/5 ">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 01
        </span>
        <h3 className="text-2xl font-bold"> Explore the Platform</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Start on the main landing page to discover Solom Flow's core features, then click Sign In or Sign Up at the top to begin.
        </p>
      </div>
      <div className="flex-1 w-full">
        {/* حط مسار صورة تسجيل الدخول هنا مكان الـ src */}
        <img 
          src={landinaPage.src} 
          alt="Sign In Step" 
          className="w-full rounded-2xl border border-cyan-500/30 shadow-xl object-cover"
        />
      </div>
    </div>
    {/* شكل فورم الدخول */}
    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-cyan-500/5">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 02
        </span>
        <h3 className="text-2xl font-bold"> Quick & Secure Login</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
         Enter your details or sign in effortlessly with one click using your Google account to access your private workspace.
        </p>
      </div>
      <div className="flex-1 w-full">
        {/* حط مسار صورة تسجيل الدخول هنا مكان الـ src */}
        <img 
          src={formLogin.src} 
          alt="Sign In Step" 
          className="w-full rounded-2xl border border-cyan-500/30 shadow-xl object-cover"
        />
      </div>
    </div>

    {/*الداشبوردل*/}
    <div data-aos="fade-up" className="flex flex-col md:flex-row-reverse items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-emerald-500/5">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 03
        </span>
        <h3 className="text-2xl font-bold"> Monitor Everything from Dashboard</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
         Get an instant overview of your total projects, registered tasks, and daily productivity tips all in one clean dashboard
        </p>
      </div>
      <div className="flex-1 w-full">
        {/* حط مسار صورة الداشبورد هنا مكان الـ src */}
        <img 
          src={Dashboard.src}
          alt="Dashboard Overview" 
          className="w-full rounded-2xl border border-emerald-500/30 shadow-xl object-cover"
        />
      </div>
    </div>

    {/* ا المشاريع والمهام */}
    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-cyan-500/5">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 04
        </span>
        <h3 className="text-2xl font-bold">Organize Projects </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
         Create, organize, and track all your active workspaces and projects seamlessly in one dedicated place.
        </p>
      </div>
      <div className="flex-1 w-full">
        <img 
          src={pageProjects.src}
          alt="Projects and Tasks" 
          className="w-full rounded-2xl border border-cyan-500/30 shadow-xl object-cover"
        />
      </div>
    </div>
    {/* صفحة ال Tasks */}
    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-cyan-500/5">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 05
        </span>
        <h3 className="text-2xl font-bold"> Track & Filter Your Tasks </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
         Stay on top of your daily work by adding new tasks and filtering them easily by status (To Do, In Progress, or Completed).
        </p>
      </div>
      <div className="flex-1 w-full">
        {/* حط مسار صورة المشاريع أو المهام هنا مكان الـ src */}
        <img 
          src={pageTasks.src}
          alt="Projects and Tasks" 
          className="w-full rounded-2xl border border-cyan-500/30 shadow-xl object-cover"
        />
      </div>
    </div>

    <div data-aos="fade-up" className="flex flex-col md:flex-row-reverse items-center gap-10 bg-[#0b1220]/80 p-8 rounded-3xl border border-cyan-500 shadow-lg shadow-emerald-500/5">
      <div className="flex-1 space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
          STEP 06
        </span>
        <h3 className="text-2xl font-bold"> Customize Your Settings</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
        Manage your account preferences, update your profile details, and tailor your workspace settings to fit your workflow.
        </p>
      </div>
      <div className="flex-1 w-full">
        {/* حط مسار صورة الداشبورد هنا مكان الـ src */}
        <img 
          src={pageSettings.src}
          alt="Dashboard Overview" 
          className="w-full rounded-2xl border border-emerald-500/30 shadow-xl object-cover"
        />
      </div>
    </div>
  </div>
</section>
</div>
    )
}
export default Pudlic