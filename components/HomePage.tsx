import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Currently from "@/components/Currently";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InternationalExperience from "@/components/InternationalExperience";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Story from "@/components/Story";
import type { Locale } from "@/data/locale";

export default function HomePage({ locale }: { locale: Locale }) {
  return <main id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground">
    <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-glow/10 blur-[160px]" />
    <div className="pointer-events-none absolute right-[-200px] top-[40%] h-[400px] w-[400px] rounded-full bg-glow/10 blur-[140px]" />
    <div className="pointer-events-none absolute bottom-[10%] left-[-200px] h-[350px] w-[350px] rounded-full bg-glow/10 blur-[140px]" />
    <CursorGlow />
    <Hero locale={locale} /><About locale={locale} /><Currently locale={locale} /><Story locale={locale} />
    <Journey locale={locale} /><InternationalExperience locale={locale} /><Projects locale={locale} />
    <Achievements locale={locale} /><Blog locale={locale} /><Contact locale={locale} /><Footer locale={locale} />
  </main>;
}
