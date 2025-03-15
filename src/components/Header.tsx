
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from './shared/Container';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity duration-300 hover:opacity-80"
        >
          <span className="text-gradient font-semibold">Genius</span>
          <span className="ml-1">AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Recursos', href: 'features' },
            { name: 'Como Funciona', href: 'how-it-works' },
            { name: 'Sobre', href: 'about' }
          ].map((item) => (
            <a 
              key={item.name}
              href={`#${item.href}`}
              className="text-sm text-foreground/80 font-medium transition-all duration-300 hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/chat"
            className="relative overflow-hidden group px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-tight shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            <span className="relative z-10">Experimentar Chat</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
