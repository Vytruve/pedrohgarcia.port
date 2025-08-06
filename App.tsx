import React, { useRef, useEffect } from 'react';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import PlaygroundSection from './components/PlaygroundSection';
import BlogSection from './components/BlogSection';
import VantaBackgroundEffect from './components/VantaBackgroundEffect';

// It is expected that Lenis is loaded from a CDN in index.html
declare const Lenis: any;
// It is expected that tsParticles is loaded from a CDN in index.html
declare global {
  interface Window {
    tsParticles: any;
  }
}
// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;
declare const ScrollTrigger: any;

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  const projectsAndSkillsContainerRef = useRef<HTMLDivElement>(null);
  const blogAndResumeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling, with checks for library existence
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis();
      lenisRef.current = lenis;

      // GSAP ScrollTrigger needs to be aware of Lenis
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
      }
      
      if (typeof gsap !== 'undefined') {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }

    // Initialize tsparticles for cursor trail effect
    if (typeof window.tsParticles !== 'undefined' && window.tsParticles) {
      window.tsParticles.load({
        fullScreen: {
          enable: true,
          zIndex: 999,
        },
        particles: {
          number: { value: 0 },
          color: { value: ["#00ffff", "#ff00ff", "#ff7a00"] },
          shape: { type: "circle" },
          opacity: { value: {min: 0.3, max: 0.8} },
          size: { value: {min: 1, max: 2} },
          move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "destroy",
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "trail",
            },
          },
          modes: {
            trail: {
              delay: 0.005,
              quantity: 5,
              pause_on_stop: false,
            },
          },
        },
        background: {
          color: 'transparent',
        },
      });
    }


    return () => {
      // Cleanup
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && lenisRef.current) {
      lenisRef.current.scrollTo(ref.current, { offset: -80 }); // offset for fixed header
    }
  };

  return (
    <>
      <Header 
        onAboutClick={() => scrollTo(aboutRef)}
        onProjectsClick={() => scrollTo(projectsRef)}
        onSkillsClick={() => scrollTo(skillsRef)}
        onPlaygroundClick={() => scrollTo(playgroundRef)}
        onBlogClick={() => scrollTo(blogRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <main>
        <LandingSection onCTAClick={() => scrollTo(projectsRef)} />
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={projectsAndSkillsContainerRef} className="relative overflow-hidden">
          <VantaBackgroundEffect sectionRef={projectsAndSkillsContainerRef} darkEffect="GLOBE" />
          <div ref={projectsRef}>
            <ProjectsSection />
          </div>
          <div ref={skillsRef}>
            <SkillsSection />
          </div>
        </div>
        <div ref={blogAndResumeContainerRef} className="relative overflow-hidden">
          <VantaBackgroundEffect sectionRef={blogAndResumeContainerRef} darkEffect="DOTS" />
          <div ref={blogRef}>
            <BlogSection />
          </div>
          <ResumeSection />
        </div>
        <div ref={playgroundRef}>
          <PlaygroundSection />
        </div>
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <footer className="text-center px-4 sm:px-6 py-8 text-sm text-gray-500 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Pedro Henrique Garcia. All Rights Reserved.</p>
      <p>Criado com grandes quantidades de energia cósmica (Café), e uma pequena ajudinha de AI.</p>
      </footer>
    </>
  );
};

export default App;