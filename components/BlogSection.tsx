import React, { useEffect, useRef } from 'react';
import { QuillIcon } from './icons';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

const blogPosts = [
  {
    category: 'Deep Dive',
    title: 'Construindo um Motor de LLM Offline: Desafios com C++ e Rust',
    excerpt: 'Uma análise técnica da criação do TrackieLLM, explorando a interoperabilidade entre linguagens para IA de alta performance.',
    link: '#',
  },
  {
    category: 'Startup',
    title: 'Vytruve.org: Da Ideia à Execução de uma Marca de Tecnologia',
    excerpt: 'Os bastidores da criação da Vytruve, desde a concepção da marca até o lançamento das primeiras divisões de software, TruveSoftware e Vy-AI.',
    link: '#',
  },
  {
    category: 'Embarcados',
    title: 'O Poder do Embarcado: Unindo IA e Hardware com TrackWay',
    excerpt: 'Como o projeto TrackWay utiliza ESP32 e Orange Pi para levar inteligência artificial para o mundo físico, resolvendo problemas reais com IoT.',
    link: '#',
  },
];

const BlogSection: React.FC = () => {
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

            gsap.from(sectionRef.current?.querySelectorAll('.blog-card'), {
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
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Diário de Bordo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-transparent hover:border-accent-cyan hover:-translate-y-2 transition-all duration-300">
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm font-semibold text-accent-cyan uppercase mb-2">{post.category}</p>
                <h3 className="text-xl font-bold mb-3 flex-grow">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>
                <a href={post.link} className="mt-auto font-bold text-accent-cyan hover:underline self-start">Ler mais →</a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
            <button className="px-8 py-4 bg-transparent border-2 border-accent-cyan text-accent-cyan font-bold rounded-full text-lg transition-all duration-300 hover:bg-accent-cyan hover:text-cosmic-dark hover:shadow-lg hover:shadow-accent-cyan/30">
                Ver Todas as Entradas
            </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;