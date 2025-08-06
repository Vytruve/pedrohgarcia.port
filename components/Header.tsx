import React, { useState, useEffect } from 'react';
import { AnimatedMenuIcon } from './icons';

interface HeaderProps {
  onAboutClick: () => void;
  onProjectsClick: () => void;
  onSkillsClick: () => void;
  onPlaygroundClick: () => void;
  onBlogClick: () => void;
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onProjectsClick, onSkillsClick, onPlaygroundClick, onBlogClick, onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      <button onClick={() => { onAboutClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Sobre</button>
      <button onClick={() => { onProjectsClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Projetos</button>
      <button onClick={() => { onSkillsClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Habilidades</button>
      <button onClick={() => { onBlogClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Blog</button>
      <button onClick={() => { onPlaygroundClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Playground</button>
      <button onClick={() => { onContactClick(); setIsMenuOpen(false); }} className="hover:text-accent-cyan transition-colors">Contato</button>
    </>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cosmic-dark/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-magenta hover:opacity-80 transition-opacity">
            P.H.G.
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            <AnimatedMenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-cosmic-dark py-4">
          <div className="flex flex-col items-center space-y-4">
            {navLinks}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;