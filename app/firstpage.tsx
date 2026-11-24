import {  SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { currentUser, auth } from "@clerk/nextjs/server"
import { ShieldCheck, TrendingUp, Zap, Users } from "lucide-react";
import solomFlow from "./assets/solomflow.webp"
import { Suspense } from "react"
async function AuthSection() {
    const authObg = await auth()
    const myCurrent = await currentUser()
    return    authObg.isAuthenticated && myCurrent ? (
                    <div>
                        <UserButton/>
                    </div>
                    ):(
                        <div className="md:gap-10 gap-6 flex md:ml-40">
                        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                            <button className="text-white p-4 text-lg md:text-xl bg-transparent border border-[#3b82f6] rounded-[20] md:px-10 md:py-3 border-2 shadow-cyan-300 shadow-md">Sign in</button>
                        </SignInButton>
                        <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                            <button className="text-black p-4 text-xl md:text-xl bg-green-400 border border-green-400 rounded-[20] md:px-10 md:py-3 border-2 shadow-green-400 shadow-md"> Sign Up</button>
                        </SignUpButton>
                        </div>
                    )
 }
async function FirstPage(){
  
    return(
        <div className="pt-10"
        >
            <nav className="flex items-center justify-center gap-30 md:gap-50">
               <div className="flex">  
              <img src={solomFlow.src} alt="Solom Flow Logo" className="md:w-30 w-15"/>
                <h1 className="pt-4 text-white text-2xl  md:text-4xl font-bold ">Solom <span className="text-green-500">Flow</span></h1>
                </div>
                <Suspense>
                    <AuthSection/>
                </Suspense>
            </nav>
            <div className="flex justify-center w-full pt-20">
         <h1 className="inline-block text-white text-xl p-6 m-4 md:text-2xl md:p-6 bg-transparent border border-[#3b82f6] rounded-[20] border-2 shadow-cyan-300 shadow-xl ">A powerful platform for projects and teams</h1>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 mt-25">
      
      {/* الكارد الأول: Secure & Reliable */}
      <div className="bg-[#111827]/60 backdrop-blur-md border border-cyan-500 rounded-2xl p-6 text-center flex flex-col items-center shadow-[0_0_20px_rgba(6,182,212,0.3)] border-2">
        <div className="mb-3 p-3 bg-white/5 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-1">Secure & Reliable</h3>
        <p className="text-gray-400 text-lg">Your data is always safe</p>
      </div>

      {/* الكارد الثاني: Track Progress */}
      <div className="bg-[#111827]/60 backdrop-blur-md border border-blue-500 rounded-2xl p-6 text-center flex flex-col items-center shadow-[0_0_20px_rgba(59,178,246,0.3)] border-2">
        <div className="mb-3 p-3 bg-white/5 rounded-xl">
          <TrendingUp className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-1">Track Progress</h3>
        <p className="text-gray-400 text-lg">Monitor your work easily</p>
      </div>

      {/* الكارد الثالث: Boost Productivity */}
      <div className="bg-[#111827]/60 backdrop-blur-md border border-green-500 rounded-2xl p-6 text-center flex flex-col items-center shadow-[0_0_20px_rgba(34,197,94,0.3)] border-2">
        <div className="mb-3 p-3 bg-white/5 rounded-xl">
          <Zap className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-1">Boost Productivity</h3>
        <p className="text-gray-400 text-lg">Get more done faster</p>
      </div>

      {/* الكارد الرابع: Team Collaboration */}
      <div className="bg-[#111827]/60 backdrop-blur-md border border-indigo-500 rounded-2xl p-6 text-center flex flex-col items-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border-2">
        <div className="mb-3 p-3 bg-white/5 rounded-xl">
          <Users className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-1">Team Collaboration</h3>
        <p className="text-gray-400 text-lg">Work together seamlessly</p>
      </div>

    </div>
        </div>
    )
}
export default FirstPage