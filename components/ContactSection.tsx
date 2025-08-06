import React, { useState, useRef, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, SendIcon, GitLabIcon, BrainCircuitIcon, VytruveIcon, AppleIcon, DiscordIcon } from './icons';
import { GoogleGenAI, Chat } from '@google/genai';
import VantaBackgroundEffect from './VantaBackgroundEffect';

// It is expected that anime.js is loaded from a CDN in index.html
declare const anime: any;

interface Message {
  sender: 'user' | 'orion';
  text: string;
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  // AI Assistant State
  const [messages, setMessages] = useState<Message[]>([
      { sender: 'orion', text: "Olá! Eu sou Orion, o assistente cósmico de Pedro. Como posso te ajudar a explorar seu trabalho hoje?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAiInitialized, setIsAiInitialized] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize AI Chat
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "Você é Orion, um assistente de IA prestativo e com tema cósmico no site do portfólio de Pedro Henrique Garcia. Pedro é um engenheiro de software freelancer com foco em back-end, especialista em tecnologias como Docker e Kubernetes. Como desenvolvedor poliglota, ele utiliza uma gama de linguagens: para sistemas corporativos padrão, ele favorece Java (principalmente), Kotlin e C#; para projetos de alta performance como o ecossistema TrackWay, ele utiliza Rust, C e C++. Embora o front-end não seja sua especialidade principal, ele é proficiente em TypeScript e Blazor, preferindo-os ao JavaScript. Ele é o criador do ecossistema TrackWay e da marca Vytruve.org. Responda a perguntas sobre suas habilidades, projetos e trajetória com base nestas informações. Seja conciso, profissional e amigável. Se não souber a resposta, diga que essa informação está além de sua órbita no momento.",
        },
      });
      setIsAiInitialized(true);
    } catch(e) {
        console.error("Failed to initialize Gemini AI:", e);
        setMessages(prev => [...prev, { sender: 'orion', text: 'Desculpe, meu cérebro cósmico está offline no momento.'}]);
        setIsAiInitialized(false);
    }
  }, []);

  useEffect(() => {
      // Scroll to bottom of chat only if there is more than one message
      if (messages.length > 1) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;

    const formData = new FormData(form);
    const phoneValue = formData.get('phone') as string;
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: phoneValue && phoneValue.trim() ? phoneValue : 'Não especificado',
      mymessage: formData.get('mymessage'),
      data: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/24106936/u4p2m0r/', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userInput });
      const orionMessage: Message = { sender: 'orion', text: response.text };
      setMessages(prev => [...prev, orionMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: Message = { sender: 'orion', text: "Desculpe, estou enfrentando alguma turbulência cósmica. Tente novamente mais tarde." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <VantaBackgroundEffect sectionRef={sectionRef} darkEffect="FOG" />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Entre em Contato</h2>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Form & Socials */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Mensagem Direta</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Form fields ... */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Nome</label>
                  <input type="text" id="name" name="name" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</label>
                  <input type="email" id="email" name="email" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Numero de telefone (opcional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    inputMode="numeric"
                    pattern="^\+?[0-9\s\(\)-]*$"
                    title="Por favor, insira um número de telefone válido."
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan" 
                  />
                </div>
                <div>
                  <label htmlFor="mymessage" className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea id="mymessage" name="mymessage" rows={5} required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={status === 'sending' || status === 'success'} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent-cyan text-cosmic-dark font-bold rounded-full text-lg shadow-lg shadow-accent-cyan/20 transition-colors duration-300 hover:bg-cyan-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {status === 'sending' ? 'Enviando...' : (status === 'success' ? 'Enviado!' : <>Enviar Mensagem <SendIcon /></>)}
                  </button>
                  {status === 'error' && (
                    <p className="mt-4 text-center text-red-400">
                      Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato por e-mail.
                    </p>
                  )}
                </div>
              </form>
            </div>
             <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6">...ou me encontre aqui:</h3>
                <div className="flex flex-col items-center gap-4">
                    <a href="mailto:pedro.garcia@vytruve.org" className="group inline-flex items-center gap-3 text-lg font-semibold text-accent-cyan transition-colors hover:underline">
                        <VytruveIcon className="h-6 w-6 text-white transition-colors group-hover:text-accent-cyan" />
                        pedro.garcia@vytruve.org
                    </a>
                    <a href="mailto:phgarcia2008@icloud.com" className="inline-flex items-center gap-2 text-base text-gray-300 hover:text-accent-cyan hover:underline">
                        <AppleIcon className="h-6 w-6"/>
                        phgarcia2008@icloud.com
                    </a>
                    <div className="inline-flex items-center gap-2 text-base text-gray-300" title="Discord: phkaiser13">
                        <DiscordIcon className="h-6 w-6" />
                        <span className="font-mono">phkaiser13</span>
                    </div>
                    <div className="my-4 h-px w-24 bg-gray-700"></div>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        <a href="https://github.com/phkaiser13" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <GithubIcon className="h-8 w-8 transition-colors hover:text-accent-cyan" />
                        </a>
                        <a href="https://gitlab.com/phkaiser13" target="_blank" rel="noopener noreferrer" title="GitLab">
                            <GitLabIcon className="h-8 w-8 transition-colors hover:text-accent-cyan" />
                        </a>
                        <a href="https://www.linkedin.com/in/phgarcia13/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <LinkedinIcon className="h-8 w-8 transition-colors hover:text-accent-cyan" />
                        </a>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Right Side: AI Assistant */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><BrainCircuitIcon /> Converse com meu Assistente AI</h3>
            <div className="flex-grow flex flex-col bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-700">
                <div className="ai-chat-window flex-grow mb-4 space-y-4 p-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'ai-chat-bubble-user rounded-br-none' : 'ai-chat-bubble-orion rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                           </div>
                        </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-end gap-2 justify-start">
                           <div className="max-w-xs md:max-w-md p-3 rounded-2xl ai-chat-bubble-orion rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-accent-cyan rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-accent-cyan rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-accent-cyan rounded-full animate-pulse"></span>
                                </div>
                           </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={isAiInitialized ? "Pergunte sobre meus projetos..." : "Inicializando assistente..."}
                        className="ai-chat-input flex-grow p-3 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-shadow"
                        disabled={!isAiInitialized || isLoading}
                    />
                    <button type="submit" disabled={isLoading || !userInput.trim() || !isAiInitialized} className="p-3 bg-accent-cyan text-cosmic-dark rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                        <SendIcon />
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;