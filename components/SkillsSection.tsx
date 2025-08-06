import React, { useEffect, useRef, useState } from 'react';
import { type SkillCategory, type Skill } from '../types';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

const skillsData: SkillCategory[] = [
  {
    title: 'Linguagens',
    skills: [
      { name: 'Rust', proficiency: 5, description: 'Minha linguagem preferida para projetos que exigem performance e segurança de memória. Acredito que o futuro do software de baixo nível está aqui, e é por isso que a uso no núcleo de projetos como Loria e TrackieLLM/TrackieALink.' },
      { name: 'C/C++', proficiency: 4, description: 'As ferramentas clássicas para performance máxima. C/C++ são indispensáveis para interagir com hardware legado e otimizações extremas em projetos como o VersEia. C classico é inegavel em pontos como o kernel do TrackieOS e os nucleos do TrackieLLM/LINK, VerseIA e outros.' },
      { name: 'Java', proficiency: 5, description: 'Robusto, maduro e com um ecossistema gigantesco. É minha escolha principal para sistemas corporativos complexos e aplicações Android. Sua versatilidade e estabilidade são incomparáveis para o mundo enterprise.' },
      { name: 'C#', proficiency: 4, description: 'A resposta da Microsoft ao Java, e uma excelente resposta. Adoro a sintaxe e o poder do ecossistema .NET. Uso-o para construir ERPs como o Storia e explorar o Blazor para interfaces web ricas, é a tipica linguagem que eu não aprendi, mas vindo de anos de C e java, eu meio que ja sabia usar, depois de me familiarizar com o dotnet, eu a uso constantemente.' },
      { name: 'Python', proficiency: 4, description: 'Não é minha linguagem principal para back-ends robustos, mas é impossível viver sem ela. Quando vejo um sistema complexo em C++, sempre penso: "Isso precisa de uma automação". Aí entra o Python, perfeito para scripts, IA e ciência de dados.' },
      { name: 'TypeScript', proficiency: 3, description: 'JavaScript com superpoderes. Nunca pensei que fosse usar, é muito longe da minha "area", mas sua sintaxe fez-me aproximar, agora eu a uso nos módulos web de alguns sistemas e nesse portfólio!' },
      { name: 'Kotlin', proficiency: 3, description: 'A evolução moderna do Java. Excelente para desenvolvimento Android e para criar back-ends concisos e seguros. Gosto da sua interoperabilidade e sintaxe limpa.' },
    ],
  },
  {
    title: 'Sistemas & Infra',
    skills: [
      { name: 'Docker', proficiency: 5, description: 'Containerização é fundamental. Docker simplifica o desenvolvimento e a implantação de forma incrível, garantindo que meus ambientes sejam consistentes da minha máquina para a produção.' },
      { name: 'Kubernetes', proficiency: 4, description: 'Para orquestrar os containers, o Kubernetes é o rei. Essencial para escalar aplicações como os ERPs que desenvolvo, garantindo alta disponibilidade e gerenciamento eficiente de microsserviços.' },
      { name: 'Linux', proficiency: 5, description: 'O sistema operacional que é a base de quase tudo que construo. Do desenvolvimento do TrackieOS à administração de servidores, meu conhecimento em Linux é a espinha dorsal da minha infraestrutura.' },
      { name: 'CI/CD', proficiency: 4, description: 'Automatizar é vida. Configuro pipelines de CI/CD para garantir que cada commit seja testado e integrado, acelerando o ciclo de desenvolvimento e mantendo a qualidade do código.' },
      { name: 'Sistemas Embarcados', proficiency: 4, description: 'Levar o software para o mundo físico é um desafio fascinante. Tenho experiência com ESP32 e plataformas ARM, otimizando código para rodar com recursos limitados de hardware.' },
    ],
  },
  {
    title: 'Frameworks & Dev',
    skills: [
      { name: '.NET', proficiency: 4, description: 'Um ecossistema poderoso e completo. Uso o .NET para construir desde APIs robustas até aplicações web com Blazor, aproveitando sua performance e vasta biblioteca de recursos.' },
      { name: 'WebAssembly', proficiency: 3, description: 'O futuro da performance na web. Adoro a possibilidade de rodar código C++, Rust ou C# no navegador, abrindo portas para aplicações web que antes eram impensáveis.' },
      { name: 'React', proficiency: 3, description: 'A biblioteca padrão para construir interfaces de usuário dinâmicas. Uso React com TypeScript para criar front-ends reativos e componentizados, como este portfólio.' },
      { name: 'Desktop (Tauri/MAUI)', proficiency: 3, description: 'Aplicações desktop ainda são relevantes. Com Tauri, posso usar Rust para criar apps leves e performáticos, enquanto o MAUI oferece uma solução poderosa no ecossistema .NET.' },
    ],
  },
  {
    title: 'IA & Dados',
    skills: [
      { name: 'Inteligência Artificial', proficiency: 4, description: 'Minha grande paixão atual. Desde LLMs embarcados no Trackie até algoritmos de otimização nos ERPs, vejo a IA como a próxima fronteira para resolver problemas complexos de forma inovadora.' },
      { name: 'Machine Learning', proficiency: 4, description: 'O campo prático da IA. Tenho experiência com modelos de visão computacional (YOLO), processamento de linguagem natural e sistemas de recomendação, aplicando-os para criar soluções inteligentes e contextuais.' },
      { name: 'PyTorch', proficiency: 3, description: 'Meu framework de deep learning de escolha. Sua flexibilidade e a sensação "pythônica" tornam a experimentação e a construção de modelos complexos uma tarefa muito mais intuitiva.' },
      { name: 'Banco de Dados', proficiency: 4, description: 'Os dados são o coração de qualquer sistema. Tenho sólida experiência com bancos relacionais como PostgreSQL e NoSQL, projetando esquemas eficientes e otimizando consultas.' },
    ],
  },
];


const SkillCard = ({ category, onSkillHover, selectedSkillName }: { category: SkillCategory, onSkillHover: (skill: Skill) => void, selectedSkillName: string }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10 h-full">
    <h3 className="text-xl font-bold text-accent-cyan mb-4">{category.title}</h3>
    <div className="flex flex-wrap gap-2">
      {category.skills.map(skill => (
        <button
          key={skill.name}
          onMouseEnter={() => onSkillHover(skill)}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-200 border ${selectedSkillName === skill.name ? 'bg-accent-cyan text-cosmic-dark border-transparent' : 'bg-gray-700/50 text-gray-300 border-transparent hover:bg-gray-600/50 hover:border-gray-500'}`}
        >
          {skill.name}
        </button>
      ))}
    </div>
  </div>
);

const ProficiencyBar = ({ level }: { level: number }) => (
    <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i < level ? 'bg-accent-cyan' : 'bg-gray-600'}`}></div>
        ))}
    </div>
);


const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skillsData[0].skills[0]);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const handleSkillHover = (skill: Skill) => {
    if (selectedSkill.name === skill.name) return;

    if (infoPanelRef.current && typeof gsap !== 'undefined') {
        gsap.timeline()
            .to(infoPanelRef.current, { opacity: 0, y: 10, duration: 0.15, ease: 'power2.in' })
            .add(() => setSelectedSkill(skill))
            .to(infoPanelRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
    } else {
        setSelectedSkill(skill);
    }
  };

  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll('.gsap-fade-in'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-cosmic-dark/30 backdrop-blur-md">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="gsap-fade-in text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-magenta">
          Constelação de Competências
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="gsap-fade-in lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map(category => (
                    <SkillCard 
                        key={category.title} 
                        category={category} 
                        onSkillHover={handleSkillHover}
                        selectedSkillName={selectedSkill.name}
                    />
                ))}
            </div>

            <div className="gsap-fade-in lg:col-span-1 lg:sticky lg:top-28">
                {selectedSkill && (
                    <div ref={infoPanelRef} className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-2xl shadow-black/30">
                        <h3 className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</h3>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-400 mb-2">Nível de Proficiência</p>
                            <ProficiencyBar level={selectedSkill.proficiency} />
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed h-48 overflow-y-auto">
                            {selectedSkill.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;