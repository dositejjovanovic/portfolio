import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Currently from "@/components/Currently";
import Story from "@/components/Story";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import DesignMedia from "@/components/DesignMedia";
import Achievements from "@/components/Achievements";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return <main id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground"><div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-glow/10 blur-[160px]" /><div className="pointer-events-none absolute right-[-200px] top-[40%] h-[400px] w-[400px] rounded-full bg-glow/10 blur-[140px]" /><div className="pointer-events-none absolute bottom-[10%] left-[-200px] h-[350px] w-[350px] rounded-full bg-glow/10 blur-[140px]" /><CursorGlow /><Navbar /><Hero /><About /><Currently /><Story /><Journey /><Projects /><DesignMedia /><Achievements /><Blog /><Contact /><Footer /></main>;
}
