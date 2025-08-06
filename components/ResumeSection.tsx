import React, { useRef } from 'react';
import { DownloadIcon } from './icons';

const ResumeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-cosmic-dark/30 backdrop-blur-md">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Currículo</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 mb-10">
          Interessado em mais detalhes sobre minha experiência, formação e projetos? Baixe meu currículo completo para uma visão aprofundada.
        </p>
        <a
          href="Curriculum.pdf"
          download="Curriculo-Pedro-Henrique-Garcia.pdf"
          title="Baixar Currículo"
          className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-accent-cyan text-cosmic-dark font-bold rounded-full text-lg md:text-xl shadow-lg shadow-accent-cyan/20 transition-all duration-300 hover:bg-cyan-300 hover:shadow-accent-cyan/40 transform hover:-translate-y-1"
        >
          <DownloadIcon />
          Baixar Currículo
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;