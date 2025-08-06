import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuitIcon } from './icons';
import VantaBackgroundEffect from './VantaBackgroundEffect';

const createNotebookHtml = (markdownContent: string): string => {
    const css = `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: #1e1e1e;
        color: #d4d4d4;
        margin: 0;
        padding: 2rem;
        line-height: 1.6;
      }
      .notebook { max-width: 800px; margin: auto; }
      .cell { border: 1px solid #444; border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; background-color: #252526; }
      .cell-content { padding: 1rem 1.5rem; }
      .markdown-cell h1, .markdown-cell h2, .markdown-cell h3 {
        border-bottom: 1px solid #555;
        padding-bottom: 0.5rem;
        margin-top: 0;
        color: #569cd6;
        font-weight: 600;
      }
      .markdown-cell h1 { font-size: 2rem; }
      .markdown-cell h2 { font-size: 1.7rem; }
      .markdown-cell h3 { font-size: 1.4rem; }
      .markdown-cell a { color: #569cd6; text-decoration: none; }
      .markdown-cell a:hover { text-decoration: underline; }
      .markdown-cell ul { padding-left: 20px; }
      .markdown-cell li { margin-bottom: 0.5rem; }
      .markdown-cell strong { color: #4ec9b0; font-weight: 600; }
      .markdown-cell em { font-style: italic; color: #c586c0; }
      .code-cell .cell-content { padding: 0; }
      pre {
        background-color: #1e1e1e;
        padding: 1rem;
        margin: 0;
        border-radius: 0;
        overflow-x: auto;
        font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
        border-top: 1px solid #444;
      }
      code {
          font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
      }
      .lang-tag {
        background-color: #444;
        color: #ccc;
        padding: 0.2rem 0.6rem;
        font-size: 0.8rem;
        border-bottom-right-radius: 5px;
        display: inline-block;
      }
      .notebook-header { text-align: center; margin-bottom: 2rem; }
      .notebook-header h1 { font-size: 2.5rem; background: linear-gradient(90deg, #00ffff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #444; color: #888; font-style: italic; }
    `;

    const parseMarkdownForNotebook = (text: string): string => {
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
                if (!inList) { html += '<ul>'; inList = true; }
                html += `<li>${processLine(line.substring(2))}</li>`;
            } else {
                if (inList) { html += '</ul>'; inList = false; }
                if (line.trim()) { html += `<p>${processLine(line)}</p>`; }
            }
        }
        if (inList) { html += '</ul>'; }
        return html;
    };

    let bodyHtml = '<div class="notebook-header"><h1>Ideia de Projeto Cósmico</h1></div><div class="notebook">';
    const parts = markdownContent.split(/(```[\s\S]*?```)/g);

    parts.forEach(part => {
        if (part.startsWith('```')) {
            const lang = part.match(/^```(\w+)?\n/)?.[1] || 'code';
            const code = part.replace(/^```\w*\n/, '').replace(/```$/, '');
            bodyHtml += `
              <div class="cell code-cell">
                <div class="cell-content">
                  <div class="lang-tag">${lang}</div>
                  <pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                </div>
              </div>`;
        } else {
            const html = parseMarkdownForNotebook(part);
            if (html.trim()) {
                bodyHtml += `<div class="cell markdown-cell"><div class="cell-content">${html}</div></div>`;
            }
        }
    });

    bodyHtml += `</div><footer>Gerado pelo Playground Cósmico de Pedro Henrique Garcia &copy; ${new Date().getFullYear()}</footer>`;

    return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ideia de Projeto Cósmico</title><style>${css}</style></head><body>${bodyHtml}</body></html>`;
};


const PlaygroundSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [techInput, setTechInput] = useState('Rust, WebAssembly, Three.js');
  const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const isCancelledRef = useRef(false);

  const handleGenerate = async () => {
    if (!techInput.trim()) {
      setError('Por favor, insira algumas tecnologias.');
      setStatus('error');
      return;
    }

    setStatus('generating');
    setError(null);
    isCancelledRef.current = false;
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const prompt = `Você é um gerador de ideias de projetos de software extremamente criativo para um desenvolvedor sênior. Baseado nas seguintes tecnologias: ${techInput}, gere uma ideia de projeto única e desafiadora. Estruture sua resposta como um notebook, usando markdown. Inclua as seguintes seções usando títulos de nível 3 (###): Conceito, Principais Características, Arquitetura Sugerida. Para cada tecnologia mencionada, inclua um pequeno bloco de código de exemplo (usando blocos de código markdown como \`\`\`rust) para ilustrar seu uso no projeto. Mantenha os exemplos de código curtos e focados.`;
        
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
        });

        let fullText = '';
        for await (const chunk of responseStream) {
            if (isCancelledRef.current) {
                console.log("Generation stopped by user.");
                setStatus('idle');
                return;
            }
            fullText += chunk.text;
        }

        if (isCancelledRef.current) return;

        const htmlContent = createNotebookHtml(fullText);
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ideia-de-projeto.html');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setStatus('completed');

    } catch (e) {
      console.error("Failed to generate idea:", e);
      setError('Ocorreu um erro ao contatar o oráculo cósmico. Tente novamente.');
      setStatus('error');
    }
  };

  const handleStop = () => {
    isCancelledRef.current = true;
  };

  const getButtonText = () => {
    switch (status) {
        case 'generating': return 'Gerando...';
        case 'completed': return 'Gerar Nova Ideia';
        case 'error': return 'Tentar Novamente';
        default: return 'Gerar Ideia';
    }
  };

  const handleButtonClick = () => {
    if (status === 'idle' || status === 'completed' || status === 'error') {
        handleGenerate();
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <VantaBackgroundEffect sectionRef={sectionRef} darkEffect="CELLS" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Playground Cósmico</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 mb-12">
          Um espaço para experimentação. Precisa de inspiração? Deixe a IA gerar uma ideia de projeto para você.
        </p>
        
        <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
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
                        disabled={status === 'generating'}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={handleButtonClick} 
                        disabled={status === 'generating'}
                        className="w-full px-8 py-4 bg-accent-orange text-white font-bold rounded-full text-lg shadow-lg shadow-accent-orange/20 transition-all duration-300 hover:shadow-accent-orange/40 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-wait"
                    >
                        {getButtonText()}
                    </button>
                    {status === 'generating' && (
                        <button 
                            onClick={handleStop} 
                            className="w-full sm:w-auto px-6 py-4 bg-red-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-red-700 transition-all"
                        >
                            Parar
                        </button>
                    )}
                </div>
            </div>
        </div>

        {status === 'completed' && (
            <div className="mt-8 max-w-xl mx-auto p-4 bg-green-900/50 border border-green-500 text-green-200 rounded-lg">
                <p><strong>Download iniciado!</strong></p>
                <p>Abra o arquivo <code>ideia-de-projeto.html</code> em seu navegador para ver o resultado.</p>
            </div>
        )}

        {status === 'error' && (
            <div className="mt-8 max-w-xl mx-auto p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
                {error}
            </div>
        )}

      </div>
    </section>
  );
};

export default PlaygroundSection;