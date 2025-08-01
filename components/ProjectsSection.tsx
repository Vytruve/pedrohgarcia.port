import React, { useEffect, useRef, useState, useMemo } from 'react';
import { type Project } from '../types';
import { GithubIcon, LinkIcon, GitLabIcon, ArrowRightIcon, LicenseIcon } from './icons';

// It is expected that GSAP is loaded from a CDN in index.html
declare const gsap: any;

const projectsData: Project[] = [
  {
    id: 1,
    title: "Ecossistema TrackWay",
    description: "Solução completa de IA e IoT, incluindo um motor LLM offline (C++/Rust/Python/Assembly), API de inteligência, módulos robóticos (ESP32) e embarcados (Orange Pi), app mobile (C#/.NET MAUI) e suíte desktop (C++/Qt).",
    tags: ["IA", "Python", "onnx", "Pytorch","Cuda", "C", "C++", "Rust", "Embarcados", "Linux", "Social", "Pandas", "NumPy", "ARM", "ESP32" ],
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "vyAI Social Commons 1.0",
  },
  {
    id: 2,
    title: "VersEia - ERP",
    description: "O projeto mais ambicioso. Um substituto moderno e otimizado para ERPs tradicionais como o Protheus (TOTVS), focado em performance, algoritmos avançados e segurança. Escrito em C, C++, Rust e Python.",
    tags: ["C++", "Rust", "C", "Python", "ERP", "Fullstack", "Segurança", "QT", "Docker", "Kubernetes", "CI/CD", "CRUD"],
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
  },
  {
    id: 3,
    title: "Loria - RH Moderno",
    description: "ERP enterprise de alta complexidade para modernizar o setor de RH. Escrito em Rust e C++ para máxima performance, com módulo web em TypeScript/WebAssembly e infraestrutura baseada em Docker e Kubernetes.",
    tags: ["Rust", "C++", "Docker", "Kubernetes", "WebAssembly", "TypeScript", "RH", "ERP", "CI/CD", "CRUD"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
  },
  {
    id: 4,
    title: "Storia - Gestão Logística",
    description: "ERP com foco em logística, gestão de estoque e almoxarifados. Desenvolvido em C# com módulos de alta performance em C++ e Rust. Possui interface web com Blazor/WebAssembly e infraestrutura com Docker e Kubernetes.",
    tags: ["C#", "C++", "Rust", "Blazor", "WebAssembly", "Docker", "Kubernetes", "Logística", "ERP", "CI/CD", "CRUD", "XML"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-08dd6c781d9b?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
  },
  {
    id: 5,
    title: "Storia Lite",
    description: "ERP ultra escalável e simplificado para gestão de estoque. Backend em C# com otimizações em C++, e interface web/desktop de alta performance construída com TypeScript, Rust e Tauri.",
    tags: ["C#", "C++", "Rust", "TypeScript", "Tauri", "Desktop", "Logística", ".NET", "ERP", "Docker", "Kubernetes", "CI/CD", "CRUD", "XML"],
    imageUrl: "https://images.unsplash.com/photo-1606903357568-5533535959de?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
  },
  {
    id: 6,
    title: "TrackieOS",
    description: "Um sistema operacional customizado e leve, inspirado no Arch Linux. É otimizado para rodar o ecossistema Trackie com máxima performance em microcomputadores ARM.",
    tags: ["Linux", "Sistemas Operacionais", "Embarcados", "ARM", "C", "Assembly"],
    imageUrl: "https://images.unsplash.com/photo-1593435713558-a87f87455b55?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "GPL-3.0",
  },
  {
    id: 7,
    title: "Vytruve.org",
    description: "Marca criada para o lançamento e distribuição de aplicações de software, com divisões especializadas em soluções empresariais (TruveSoftware) e inteligência artificial (Vy-AI).",
    tags: ["Branding", "Startup", "IA", "Software", "Studio"],
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
  },
  {
    id: 8,
    title: "Gitph",
    description: "Uma espécie de lazy git, com menu via terminal ultra leve para programar, enviar para múltiplos repositórios, criar CI/CD e muito mais.",
    tags: ["Rust", "C++", "Python", "Shell", "PowerShell", "Git", "CI/CD", "DevOps"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "GPL-3.0",
  },
  {
    id: 9,
    title: "TrackieLLM",
    description: "Versão embarcada do Trackie, um sistema de IA com modelos Gemma e Llama, além de modelos ONNX para detecção de fala, objetos, rostos e mais, otimizado para ARM.",
    tags: ["C++", "C", "Assembly", "Python", "Rust", "Cuda", "Shell", "IA", "Embarcados", "ARM", "onnx", "YOLO"],
    imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "vyAI Social Commons 1.0",
  },
  {
    id: 10,
    title: "LognCad",
    description: "Aplicação desktop simples para autenticação de usuários (login/cadastro), desenvolvida com Kotlin e JavaFX para demonstrar a criação de interfaces gráficas.",
    tags: ["Kotlin", "Java", "JavaFX", "Gradle", "MessagePack", "Desktop", "Autenticação"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7b61b4b45b69?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "MIT",
  },
  {
    id: 11,
    title: "Bybo",
    description: "Sistema de Gerenciamento de Biblioteca desktop (GUI) moderno e elegante. Desenvolvido com Java, Kotlin, JavaFX e Maven, focado em uma arquitetura modular e uma interface de usuário rica.",
    tags: ["Kotlin", "Java", "CRUD", "Maven", "XML", "JavaFX", "MessagePack", "FXML", "Desktop"],
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "MIT",
  },
  {
    id: 12,
    title: "Calc-Java.Kotlin",
    description: "Calculadora simples de Teste em Java & Kotlin. Núcleo que roda Kotlin e Java no mesmo core usando interface gráfica via JavaFX com css, é feito para treinar lógica e estruturas.",
    tags: ["Java", "Kotlin", "JavaFX", "Desktop"],
    imageUrl: "https://images.unsplash.com/photo-1595034654354-d831365b89a6?q=80&w=800&auto=format&fit=crop",
    githubUrl: "#",
    gitlabUrl: "#",
    blogUrl: "#",
    license: "MIT",
  }
];

const categoriesData = [
  {
    emoji: '🚀',
    name: 'Projetos em Destaque',
    filters: [],
  },
  {
    emoji: '💻',
    name: 'Linguagens de Programação',
    filters: ['C', 'C++', 'Rust', 'Python', 'C#', 'Java', 'TypeScript', 'Kotlin', 'Shell', 'PowerShell'],
  },
  {
    emoji: '🧠',
    name: 'Inteligência Artificial',
    filters: ['IA', 'Machine Learning', 'Redes Neurais', 'Deep Learning', 'YOLO', 'onnx'],
  },
  {
    emoji: '📊',
    name: 'Ciência de Dados & Bancos',
    filters: ['SQL', 'PostgreSQL', 'Pandas', 'NumPy', 'Data Analysis'],
  },
  {
    emoji: '🛠️',
    name: 'Sistemas Embarcados & Hardware',
    filters: ['Embarcados', 'IoT', 'ARM', 'ESP32', 'Arduino'],
  },
  {
    emoji: '📀',
    name: 'Sistemas Operacionais & Linux',
    filters: ['Linux', 'Sistemas Operacionais', 'Kernel', 'Shell'],
  },
  {
    emoji: '🧱',
    name: 'Frameworks & UI',
    filters: ['React', 'Blazor', 'Qt', 'Tauri', 'MAUI', 'JavaFX', 'FXML', 'Desktop'],
  },
  {
    emoji: '🌐',
    name: 'Desenvolvimento Web & Fullstack',
    filters: ['Fullstack', '.NET', 'WebAssembly', 'Node.js', 'Next.js'],
  },
  {
    emoji: '📦',
    name: 'DevOps & Infraestrutura',
    filters: ['Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'GitHub Actions', 'Git', 'Gradle', 'CRUD', 'XML', 'Maven'],
  },
  {
    emoji: '🏢',
    name: 'Negócios & Gestão',
    filters: ['Startup', 'Branding', 'ERP', 'Logística', 'RH'],
  }
];

const PROJECTS_PER_PAGE = 6;

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].name);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [currentPage, setCurrentPage] = useState(0);

  const projectGridRef = useRef<HTMLDivElement>(null);
  const subFilterContainerRef = useRef<HTMLDivElement>(null);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      currentPage * PROJECTS_PER_PAGE,
      (currentPage + 1) * PROJECTS_PER_PAGE
    );
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Animation for project cards entering the view
  useEffect(() => {
    if (projectGridRef.current?.children.length) {
      gsap.fromTo(
        projectGridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1, // Small delay for DOM to update
        }
      );
    }
  }, [paginatedProjects]); // Reruns when the displayed projects change

  // Generic function to animate out, then update state
  const animateAndUpdate = (updateStateCallback: () => void) => {
    if (projectGridRef.current?.children.length) {
      gsap.to(projectGridRef.current.children, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in',
        onComplete: updateStateCallback,
      });
    } else {
      updateStateCallback();
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) return;
    
    const category = categoriesData.find(c => c.name === categoryName);
    let newFiltered = projectsData;
    if (category && category.name !== 'Projetos em Destaque') {
      newFiltered = projectsData.filter(p => p.tags.some(t => category.filters.includes(t)));
    }

    animateAndUpdate(() => {
      setActiveCategory(categoryName);
      setActiveFilter('Todos');
      setFilteredProjects(newFiltered);
      setCurrentPage(0);
    });
  };

  const handleSubFilterClick = (tag: string, categoryContext: string) => {
    if (activeFilter === tag) return;
    
    let newFiltered = projectsData;
    if (tag === 'Todos') {
      const category = categoriesData.find(c => c.name === categoryContext);
      if (category && category.name !== 'Projetos em Destaque') {
        newFiltered = projectsData.filter(p => p.tags.some(t => category.filters.includes(t)));
      }
    } else {
      newFiltered = projectsData.filter(p => p.tags.includes(tag));
    }

    animateAndUpdate(() => {
      setActiveFilter(tag);
      setFilteredProjects(newFiltered);
      setCurrentPage(0);
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages || newPage === currentPage) return;
    animateAndUpdate(() => {
      setCurrentPage(newPage);
    });
  };

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
       if (subFilterContainerRef.current) {
        gsap.fromTo(subFilterContainerRef.current.children,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out', scrollTrigger: { trigger: subFilterContainerRef.current, start: 'top 90%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);
  
  const subFilters = activeCategory 
    ? ['Todos', ...(categoriesData.find(c => c.name === activeCategory)?.filters || [])] 
    : [];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Projetos de Destaque</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categoriesData.map(category => (
                <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`p-4 rounded-lg text-center font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2 h-full shadow-md border-2 min-h-[120px] ${
                        activeCategory === category.name
                        ? 'bg-accent-cyan text-cosmic-dark border-accent-cyan shadow-accent-cyan/30 scale-105'
                        : 'bg-white dark:bg-gray-900 border-transparent hover:border-accent-cyan/50 hover:-translate-y-1'
                    }`}
                >
                   <span className="text-2xl">{category.emoji}</span>
                   <span className="text-sm leading-tight">{category.name}</span>
                </button>
            ))}
        </div>

        <div ref={subFilterContainerRef} className="flex justify-center flex-wrap gap-2 md:gap-3 mb-12 min-h-[40px]">
          {activeCategory && subFilters.length > 1 && subFilters.map(tag => (
            <button
              key={tag}
              onClick={() => handleSubFilterClick(tag, activeCategory)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === tag 
                ? 'bg-accent-cyan text-cosmic-dark shadow-md shadow-accent-cyan/30' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div ref={projectGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col overflow-hidden h-full transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="project-image w-full h-full object-cover"/>
              </div>
              <div className="p-6 flex flex-col flex-grow card-content">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 my-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Ver ao Vivo" className="text-gray-500 dark:text-gray-400 hover:text-accent-cyan transition-colors">
                        <LinkIcon className="w-6 h-6"/>
                      </a>
                    )}
                    {!project.tags.includes('ERP') && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="Código no GitHub" className="text-gray-500 dark:text-gray-400 hover:text-accent-cyan transition-colors">
                        <GithubIcon className="w-6 h-6"/>
                      </a>
                    )}
                    {project.gitlabUrl && !project.tags.includes('ERP') && (
                      <a href={project.gitlabUrl} target="_blank" rel="noopener noreferrer" title="Código no GitLab" className="text-gray-500 dark:text-gray-400 hover:text-accent-cyan transition-colors">
                        <GitLabIcon className="w-6 h-6"/>
                      </a>
                    )}
                    {project.license && (
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs" title={`Licensed under ${project.license}`}>
                            <LicenseIcon className="w-4 h-4 mr-1 fill-current" />
                            <span>{project.license}</span>
                        </div>
                    )}
                  </div>
                  {project.blogUrl && (
                    <a href={project.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-cyan-100 dark:bg-cyan-900/50 text-accent-cyan rounded-full hover:bg-cyan-200 dark:hover:bg-cyan-900/90 transition-colors shrink-0 ml-4">
                      Veja mais <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página Anterior"
            >
              <ArrowRightIcon className="w-5 h-5 transform rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages).keys()].map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageChange(pageIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === pageIndex ? 'bg-accent-cyan scale-125' : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir para a página ${pageIndex + 1}`}
                  aria-current={currentPage === pageIndex ? 'page' : undefined}
                />
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Próxima Página"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
