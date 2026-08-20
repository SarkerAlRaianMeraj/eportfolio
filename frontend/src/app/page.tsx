import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <FadeIn>
        <About />
      </FadeIn>
      <Skills />
      <Projects />
      <Research />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
