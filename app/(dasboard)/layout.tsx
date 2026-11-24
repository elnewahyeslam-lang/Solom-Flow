
import { Suspense } from "react";
import Navbar from "./navbar/page";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b1220]">
      <div className="md:w-80 fixed md:top-0 md:left-0 md:h-full border-r border-cyan-500/20 bg-[#0b1220] md:z-50 w-full">
      <Suspense fallback={<div className="p-6 text-cyan-400"> Loading...</div>}>
        <Navbar />
      </Suspense>  
      </div>
      <main className="flex-1 md:ml-64 p-8 text-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
