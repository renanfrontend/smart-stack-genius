
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/shared/Container';
import ChatInterface from '@/components/chat/ChatInterface';
import AnimatedGradient from '@/components/ui/AnimatedGradient';

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedGradient />
      
      <header className="glass border-b border-border/30 py-4 sticky top-0 z-50 shadow-sm">
        <Container className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-medium tracking-tight transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-gradient font-semibold">Assistente</span>
            <span className="ml-1">Inteligente</span>
          </Link>
          
          <div className="flex items-center">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Voltar para Início
            </Link>
          </div>
        </Container>
      </header>
      
      <main className="flex-1 py-6">
        <Container>
          <div className="max-w-5xl mx-auto glass-card overflow-hidden">
            <div className="border-b border-border/30 px-6 py-4">
              <h1 className="text-xl font-semibold">Assistente Inteligente</h1>
              <p className="text-sm text-foreground/70">
                Faça perguntas, peça para gerar textos, imagens ou músicas com base em suas descrições
              </p>
            </div>
            
            <ChatInterface className="h-[calc(100vh-240px)]" />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default ChatPage;
