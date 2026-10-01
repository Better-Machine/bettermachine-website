import { Header } from "@bm/ui/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Projects } from "@/components/Projects";
import { Agents } from "@/components/Agents";
import { StudioBlog } from "@/components/StudioBlog";
import { Footer } from "@bm/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Manifesto />
      <Projects />
      <Agents />
      <StudioBlog />
      <Footer />
    </main>
  );
}
