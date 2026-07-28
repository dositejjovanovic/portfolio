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
import { getPublicBlogPosts } from "@/lib/content/public-blog";
import { getPublicProjectGroups } from "@/lib/content/public-projects";
import { getPublicHomeContent } from "@/lib/content/public-home";

export default async function HomePage({ locale }: { locale: Locale }) {
  const [posts, projects, home] = await Promise.all([getPublicBlogPosts(), getPublicProjectGroups(locale), getPublicHomeContent(locale)]);
  return <main id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground">
    <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-glow/10 blur-[160px]" />
    <div className="pointer-events-none absolute right-[-200px] top-[40%] h-[400px] w-[400px] rounded-full bg-glow/10 blur-[140px]" />
    <div className="pointer-events-none absolute bottom-[10%] left-[-200px] h-[350px] w-[350px] rounded-full bg-glow/10 blur-[140px]" />
    <CursorGlow />
    <Hero locale={locale} content={home.hero} /><About locale={locale} content={home.about} /><Currently locale={locale} items={home.currently.items} /><Story locale={locale} content={home.story} />
    <Journey locale={locale} entries={home.journey} /><InternationalExperience locale={locale} entries={home.international} /><Projects locale={locale} mainProjects={projects.main} smallerProjects={projects.smaller} />
    <Achievements locale={locale} items={home.awards} /><Blog locale={locale} posts={posts} /><Contact locale={locale} content={home.contact} /><Footer locale={locale} note={home.footer.note} />
  </main>;
}
