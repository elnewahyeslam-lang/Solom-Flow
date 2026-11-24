import { UserProfile } from "@clerk/nextjs"
import { Suspense } from "react";
function settingsPage(){
    return(
        <div className="bg-[#0b1220] flex items-center justify-center min-h-screen mt-120 md:mt-10">
              <Suspense fallback={<div className="p-6 text-cyan-400"> Loading Settings...</div>}>
            <UserProfile path="/settings"/>
            </Suspense>
        </div>
    )
}
export default settingsPage