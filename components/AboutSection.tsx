import React, { useEffect, useRef } from 'react';
import VantaBackgroundEffect from './VantaBackgroundEffect';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-in', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32">
      <VantaBackgroundEffect sectionRef={sectionRef} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-base md:text-lg">
            <h2 className="animate-in text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-magenta">
              Sobre Mim
            </h2>
            <p className="animate-in max-w-prose">
              Olá! Sou Pedro, um Engenheiro de Software freelancer com foco em back-end. Como um desenvolvedor poliglota, minha filosofia é usar a ferramenta certa para cada desafio, seja combinando C# com Python para automações ou orquestrando microsserviços com Docker e Kubernetes, tecnologias que domino.
            </p>
            <p className="animate-in max-w-prose">
              Para sistemas corporativos, minha base é sólida em Java, Kotlin e C#. No entanto, minha paixão por performance me leva a usar Rust e C/C++ em projetos onde cada nanossegundo conta, como no desenvolvimento do ecossistema TrackWay, buscando sempre um código limpo e de máximo desempenho.
            </p>
            <p className="animate-in max-w-prose">
             Embora meu coração seja back-end, a IA tem sido uma grande aliada na minha evolução em front-end. Prefiro a robustez do TypeScript e a eficiência do Blazor, utilizando-os para criar interfaces modernas. Estou sempre pronto para explorar novas tecnologias e transformar ideias em realidade. Para qualquer dúvida, sinta-se à vontade para conversar com meu assistente de IA!
            </p>
          </div>
          <div>
            <h3 className="animate-in text-3xl font-bold mb-8 text-left lg:text-center">Minha Jornada</h3>
            <div className="animate-in timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-bold text-lg">Início da Programação</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2018</p>
                <p className="mt-1">Aventura inicial no mundo do código, criando minha primeira aplicação em Python aos 10 anos e mods para jogos em Java.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-bold text-lg">Foco em Sistemas de Baixo Nível</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2020</p>
                <p className="mt-1">Durante a pandemia, a busca por performance me levou a mergulhar em linguagens como C e Rust.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-bold text-lg">Formação Técnica</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2022 - Presente</p>
                <p className="mt-1">Cursando o último ano do Ensino Médio, com formação em Almoxarifado e cursando Suporte Técnico em TI pelo SENAI.</p>
              </div>
               <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-bold text-lg">Idealização do Ecossistema TrackWay</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2024 - Presente</p>
                <p className="mt-1">Desenvolvimento de um ecossistema completo de IA e IoT, e fundação da Vytruve.org para lançar soluções de software.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;