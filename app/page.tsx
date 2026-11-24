import FirstPage from "./firstpage";
import Pudlic from "./pudlic";
import bgImage from "./assets/bgsolomflow2.webp"
export default function Home() {
  return (
    <>
    <div   style={{backgroundImage:`url(${bgImage.src})`}}
    className="bg-center bg-cover min-h-screen bg-fixed"
    >
    <FirstPage/>
    <Pudlic/>
    </div>
    </>
  )}