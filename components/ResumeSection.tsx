import React, { useRef } from 'react';
import { DownloadIcon } from './icons';

// It is expected that anime.js is loaded from a CDN in index.html
declare const anime: any;

const ResumeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
    
  const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      translateY: -5,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-cosmic-light/30 dark:bg-cosmic-dark/30 backdrop-blur-md">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Currículo</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10">
          Interessado em mais detalhes sobre minha experiência, formação e projetos? Baixe meu currículo completo para uma visão aprofundada.
        </p>
        <a
          href="/Curriculum.pdf"
          download
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-accent-orange text-white font-bold rounded-full text-lg md:text-xl shadow-lg shadow-accent-orange/20 transition-all duration-300 hover:shadow-accent-orange/40"
        >
          <DownloadIcon />
          Baixar Currículo em PDF
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;