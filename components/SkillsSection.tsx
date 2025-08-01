import React, { useEffect, useRef } from 'react';
import { type SkillCategory } from '../types';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

const skillsData: SkillCategory[] = [
  {
    title: 'Linguagens de Programação',
    skills: [
      { name: 'C/C++', proficiency: 0 },
      { name: 'Rust', proficiency: 0 },
      { name: 'Python', proficiency: 0 },
      { name: 'Java', proficiency: 0 },
      { name: 'C#', proficiency: 0 },
      { name: 'SQL', proficiency: 0 },
      { name: 'Assembly', proficiency: 0 },
    ],
  },
  {
    title: 'Desenvolvimento de Aplicações',
    skills: [
      { name: 'Mobile (Android/iOS)', proficiency: 0 },
      { name: 'Desktop (MAUI/Qt)', proficiency: 0 },
      { name: 'Cloud Apps', proficiency: 0 },
      { name: 'Banco de Dados', proficiency: 0 },
      { name: '.NET Ecosystem', proficiency: 0 },
      { name: 'XML/XAML', proficiency: 0 },
    ],
  },
  {
    title: 'Sistemas & Infraestrutura',
    skills: [
      { name: 'Linux', proficiency: 0 },
      { name: 'Docker', proficiency: 0 },
      { name: 'Git', proficiency: 0 },
      { name: 'Arquitetura de TI', proficiency: 0 },
      { name: 'Segurança da Informação', proficiency: 0 },
      { name: 'Robótica', proficiency: 0 },
    ],
  },
  {
    title: 'Gestão & Conceitos',
    skills: [
      { name: 'Desenvolvimento de Software', proficiency: 0 },
      { name: 'Gestão da Informação', proficiency: 0 },
      { name: 'Inteligência Artificial', proficiency: 0 },
      { name: 'Sistemas Embarcados', proficiency: 0 },
      { name: 'Manutenção e Reparo', proficiency: 0 },
      { name: 'Gestão de Conteúdo', proficiency: 0 },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelector('h2'), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(sectionRef.current?.querySelectorAll('.skill-card'), {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.grid'),
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-cosmic-light/30 dark:bg-cosmic-dark/30 backdrop-blur-md">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Matriz de Habilidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((category) => (
            <div key={category.title} className="skill-card bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-transparent hover:border-accent-cyan transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-accent-cyan">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill.name} className="bg-gray-200 dark:bg-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;