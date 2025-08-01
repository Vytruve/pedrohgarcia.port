import React, { useState, useRef, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, SendIcon, GitLabIcon, BrainCircuitIcon } from './icons';
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
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize AI Chat
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "Você é Orion, um assistente de IA prestativo e com tema cósmico no site do portfólio de Pedro Henrique Garcia. Pedro é um jovem desenvolvedor prodígio, apaixonado por sistemas de baixo nível (Rust, C/C++), IA e sistemas embarcados. Ele é o criador do ecossistema TrackWay e da marca Vytruve.org. Responda a perguntas sobre suas habilidades, projetos e trajetória com base nas informações do site. Seja conciso, profissional e amigável. Se não souber a resposta, diga que essa informação está além de sua órbita no momento.",
        },
      });
    } catch(e) {
        console.error("Failed to initialize Gemini AI:", e);
        setMessages(prev => [...prev, { sender: 'orion', text: 'Desculpe, meu cérebro cósmico está offline no momento.'}]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
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
                  <input type="text" id="name" name="name" required className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</label>
                  <input type="email" id="email" name="email" required className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea id="message" name="message" rows={5} required className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent-cyan text-cosmic-dark font-bold rounded-full text-lg shadow-lg shadow-accent-cyan/20 transition-colors duration-300 hover:bg-cyan-300 disabled:bg-gray-400">
                    {status === 'sending' ? 'Enviando...' : (status === 'success' ? 'Enviado!' : <>Enviar Mensagem <SendIcon /></>)}
                  </button>
                </div>
              </form>
            </div>
             <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6">...ou me encontre aqui:</h3>
                <div className="flex flex-col items-center gap-2">
                    <a href="mailto:phgarcia2008@icloud.com" className="text-lg text-accent-cyan hover:underline">
                        phgarcia2008@icloud.com
                    </a>
                    <a href="mailto:pedro.garcia@vytruve.org" className="text-lg text-accent-cyan hover:underline">
                        pedro.garcia@vytruve.org
                    </a>
                </div>
                <div className="flex justify-center space-x-8 mt-6">
                  <a href="https://github.com/phkaiser13" target="_blank" rel="noopener noreferrer" title="GitHub"><GithubIcon className="w-8 h-8 hover:text-accent-cyan transition-colors" /></a>
                  <a href="https://gitlab.com/phkaiser13" target="_blank" rel="noopener noreferrer" title="GitLab"><GitLabIcon className="w-8 h-8 hover:text-accent-cyan transition-colors" /></a>
                  <a href="https://www.linkedin.com/in/phgarcia13/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><LinkedinIcon className="w-8 h-8 hover:text-accent-cyan transition-colors" /></a>
                </div>
            </div>
          </div>
          
          {/* Right Side: AI Assistant */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><BrainCircuitIcon /> Converse com meu Assistente AI</h3>
            <div className="flex-grow flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-300 dark:border-gray-700">
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
                        placeholder="Pergunte sobre meus projetos..."
                        className="ai-chat-input flex-grow p-3 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-shadow"
                        disabled={!chatRef.current}
                    />
                    <button type="submit" disabled={isLoading || !userInput.trim()} className="p-3 bg-accent-cyan text-cosmic-dark rounded-full disabled:bg-gray-500 transition-colors">
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