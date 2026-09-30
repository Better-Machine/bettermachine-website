import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ProjectsServer } from "@/components/ProjectsServer";
import { Agents } from "@/components/Agents";
import { StudioBlog } from "@/components/StudioBlog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Manifesto />
      <ProjectsServer />
      <Agents />
      <StudioBlog />
      <Footer />
    </main>
  );
}
