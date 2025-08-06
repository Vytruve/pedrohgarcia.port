import React, { useEffect, useRef } from 'react';
import ThreeCanvas from './ThreeCanvas';
import { ArrowDownIcon } from './icons';

// It is expected that anime.js is loaded from a CDN in index.html
declare const anime: any;
// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

interface LandingSectionProps {
  onCTAClick: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onCTAClick }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined') {
      // Animate title letters
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.textContent = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'inline-block';
          if (char === ' ') span.style.width = '0.5em';
          titleRef.current?.appendChild(span);
        });
        
        gsap.fromTo(titleRef.current.children, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.05, 
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }
      
      // Animate subtitle and CTA
      gsap.fromTo([subtitleRef.current, ctaRef.current], 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          stagger: 0.2,
          delay: 1.5
        }
      );
    }
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof anime !== 'undefined') {
      anime({
        targets: e.currentTarget,
        scale: [1, 1.05],
        duration: 800,
        elasticity: 400
      });
    }
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof anime !== 'undefined') {
      anime({
        targets: e.currentTarget,
        scale: [1.05, 1],
        duration: 600,
        elasticity: 300
      });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
      <ThreeCanvas />
      <div className="relative z-10 p-6 space-y-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide text-text-dark">
          Pedro Henrique Garcia
        </h1>
        <h2 ref={subtitleRef} className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 font-light">
          Engenheiro de Software Back-end e especialista em sistemas de alta performance. Como freelancer poliglota, transformo ideias complexas em soluções robustas com Rust, Java, C# e mais.
        </h2>
        <button 
          ref={ctaRef}
          onClick={onCTAClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="px-8 py-4 bg-accent-cyan text-cosmic-dark font-bold rounded-full text-lg shadow-lg shadow-accent-cyan/20 transition-transform duration-300 hover:shadow-accent-cyan/40"
        >
          Explore Meus Projetos
        </button>
      </div>
      <div className="absolute bottom-8 z-10">
        <div className="animate-scroll-down">
          <ArrowDownIcon />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;