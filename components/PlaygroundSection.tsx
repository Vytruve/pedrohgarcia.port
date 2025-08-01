import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuitIcon } from './icons';
import VantaBackgroundEffect from './VantaBackgroundEffect';

// A simple markdown parser to convert text to basic HTML
const parseMarkdown = (text: string): string => {
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    const processLine = (line: string) => line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

    for (const line of lines) {
        if (line.startsWith('### ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h3>${processLine(line.substring(4))}</h3>`;
        } else if (line.startsWith('## ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h2>${processLine(line.substring(3))}</h2>`;
        } else if (line.startsWith('# ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h1>${processLine(line.substring(2))}</h1>`;
        } else if (line.startsWith('* ')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${processLine(line.substring(2))}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (line.trim()) {
                html += `<p>${processLine(line)}</p>`;
            }
        }
    }

    if (inList) {
        html += '</ul>';
    }

    return html;
};


const PlaygroundSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [techInput, setTechInput] = useState('Rust, WebAssembly, Three.js');
  const [idea, setIdea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!techInput.trim()) {
      setError('Por favor, insira algumas tecnologias.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdea(null);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const prompt = `Você é um gerador de ideias de projetos de software extremamente criativo para um desenvolvedor sênior. Baseado nas seguintes tecnologias: ${techInput}, gere uma ideia de projeto única e desafiadora. Descreva o conceito, as principais características e por que é interessante. Formate sua resposta em markdown.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setIdea(response.text);

    } catch (e) {
      console.error("Failed to generate idea:", e);
      setError('Ocorreu um erro ao contatar o oráculo cósmico. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const parsedIdea = idea ? parseMarkdown(idea) : '';

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <VantaBackgroundEffect sectionRef={sectionRef} darkEffect="CELLS" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Playground Cósmico</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12">
          Um espaço para experimentação. Precisa de inspiração? Deixe a IA gerar uma ideia de projeto para você.
        </p>
        
        <div className="max-w-xl mx-auto bg-white dark:bg-cosmic-dark p-8 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <BrainCircuitIcon className="text-accent-cyan w-8 h-8"/>
                <h3 className="text-2xl font-semibold">Gerador de Ideias de Projeto</h3>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="tech" className="block text-sm font-medium mb-2 text-left">Tecnologias (separadas por vírgula)</label>
                    <input 
                        type="text" 
                        id="tech" 
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    />
                </div>
                <button 
                    onClick={handleGenerate} 
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-accent-orange text-white font-bold rounded-full text-lg shadow-lg shadow-accent-orange/20 transition-all duration-300 hover:shadow-accent-orange/40 disabled:bg-gray-500 disabled:shadow-none"
                >
                    {isLoading ? 'Gerando...' : 'Gerar Ideia'}
                </button>
            </div>
        </div>

        {isLoading && (
            <div className="mt-8 text-lg text-accent-cyan animate-pulse">Consultando as estrelas...</div>
        )}

        {error && (
            <div className="mt-8 max-w-xl mx-auto p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
                {error}
            </div>
        )}

        {idea && (
            <div className="mt-8 max-w-2xl mx-auto p-6 md:p-8 bg-white dark:bg-cosmic-dark rounded-lg shadow-2xl animate-pulse-glow text-left">
                 <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: parsedIdea }}></div>
            </div>
        )}

      </div>
    </section>
  );
};

export default PlaygroundSection;