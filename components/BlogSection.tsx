import React, { useEffect, useRef } from 'react';
import { ArrowRightIcon } from './icons';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;
declare const ScrollTrigger: any;

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
    category: 'Performance',
    title: 'Por que WebAssembly é o Futuro das Aplicações Web de Alta Performance',
    excerpt: 'Explorando como o Wasm permite rodar código nativo no navegador, abrindo portas para aplicações complexas e rápidas que antes eram impossíveis.',
    link: '#',
  },
  {
    category: 'Arquitetura',
    title: 'Microsserviços com Kubernetes: Orquestrando Sistemas Complexos',
    excerpt: 'Um guia prático sobre como projeto e implanto sistemas de ERP escaláveis usando Docker e Kubernetes, garantindo resiliência e manutenibilidade.',
    link: '#',
  }
];

const BlogSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
      
      gsap.registerPlugin(ScrollTrigger);

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

          const cards = gsap.utils.toArray('.blog-card-item');
          gsap.from(cards, {
              opacity: 0,
              y: 100,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: scrollContainerRef.current,
                  start: 'top 85%',
              }
          });

      }, sectionRef);

      return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Diário de Bordo</h2>
        
        <div ref={scrollContainerRef} className="horizontal-scrollbar flex overflow-x-auto gap-8 pb-8 -mx-6 px-6">
            {blogPosts.map((post) => (
              <div key={post.title} className="blog-card-item flex-shrink-0 w-[300px] sm:w-[350px]">
                <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-700/50 p-6 transition-all duration-300 hover:border-accent-cyan/80 hover:shadow-accent-cyan/20 hover:-translate-y-1">
                    <p className="text-sm font-semibold text-accent-cyan uppercase mb-2">{post.category}</p>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{post.excerpt}</p>
                    <a href={post.link} className="mt-auto font-bold text-accent-cyan hover:underline flex items-center gap-2 self-start">
                        Ler mais <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>
              </div>
            ))}
            {/* "See all" card */}
            <div className="flex-shrink-0 w-[300px] sm:w-[350px] flex items-center justify-center">
                <button className="group w-full h-full flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-gray-600 rounded-xl transition-all duration-300 hover:border-accent-cyan hover:bg-gray-900/50">
                    <span className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">🛰️</span>
                    <span className="text-xl font-bold text-gray-300 group-hover:text-accent-cyan transition-colors">Ver Todas as Entradas</span>
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;