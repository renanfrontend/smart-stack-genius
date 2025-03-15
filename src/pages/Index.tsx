
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Header from '@/components/Header';
import CTA from '@/components/CTA';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import ChatInterface from '@/components/chat/ChatInterface';
import useTypingEffect from '@/hooks/useTypingEffect';

const Index = () => {
  const { displayedText } = useTypingEffect({
    text: "Intelligent assistant powered by AI",
    speed: 50,
    delay: 500
  });

  useEffect(() => {
    // Animate elements on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedGradient />
      <Header />
      
      {/* Hero Section */}
      <Section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-brand-light text-brand rounded-full mb-8 animate-fade-in">
              Cutting-edge AI Technology
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-down">
              <span>Your Personalized</span>
              <br />
              <span className="text-gradient font-extrabold">AI Agent</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 min-h-[2em] animate-fade-in">
              {displayedText}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up">
              <Link
                to="/chat"
                className="relative overflow-hidden group px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
              >
                <span className="relative z-10">Try AI Chat</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
              
              <a
                href="#features"
                className="px-6 py-3 rounded-lg border border-foreground/20 bg-background/50 text-foreground font-medium transition-all duration-300 hover:bg-foreground/5 active:scale-[0.98]"
              >
                Learn More
              </a>
            </div>
            
            <div className="w-full max-w-3xl mx-auto glass-card p-1 sm:p-2 shadow-lg animate-fade-in-up animate-delay-200">
              <ChatInterface className="h-[400px] rounded-xl" />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Features Section */}
      <Section id="features" className="py-20 bg-secondary/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 animate-on-scroll">
              Intelligent Features
            </h2>
            <p className="text-lg text-foreground/80 animate-on-scroll">
              Our AI agent comes with a variety of powerful features designed to enhance your productivity and simplify your workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Conversations",
                description: "Engage in fluid, human-like conversations with our advanced language processing."
              },
              {
                title: "Task Automation",
                description: "Let the AI handle repetitive tasks while you focus on what matters most."
              },
              {
                title: "Smart Assistance",
                description: "Get personalized recommendations and assistance based on your preferences."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 transition-all duration-300 hover:shadow-lg animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-light text-brand flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* How It Works Section */}
      <Section id="how-it-works" className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 animate-on-scroll">
              How It Works
            </h2>
            <p className="text-lg text-foreground/80 animate-on-scroll">
              Our AI agent processes your requests intelligently to provide the most helpful responses.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block"></div>
            
            {[
              {
                title: "Input Your Request",
                description: "Start a conversation with the AI by typing your question or request in natural language."
              },
              {
                title: "Processing & Analysis",
                description: "Our advanced AI processes your input, analyzing context and intent to generate the most relevant response."
              },
              {
                title: "Intelligent Response",
                description: "Receive a thoughtful, helpful response tailored to your specific needs and continue the conversation."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row items-center gap-6 mb-12 animate-on-scroll"
              >
                <div className="md:w-1/2 md:text-right md:pr-8">
                  {index % 2 === 0 && (
                    <>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </>
                  )}
                </div>
                
                <div className="relative z-10 w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold shrink-0">
                  {index + 1}
                </div>
                
                <div className="md:w-1/2 md:text-left md:pl-8">
                  {index % 2 === 1 && (
                    <>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* About Section */}
      <Section id="about" className="py-20 bg-secondary/50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 animate-on-scroll">
                About AI Agent
              </h2>
              <p className="text-lg text-foreground/80 mb-6 animate-on-scroll">
                Our AI Agent is designed with a focus on simplicity, elegance, and functionality. We've crafted an intuitive experience that feels natural and responsive.
              </p>
              <p className="text-lg text-foreground/80 mb-6 animate-on-scroll">
                With state-of-the-art natural language processing, our AI understands context and provides relevant, helpful responses to your queries.
              </p>
              <div className="animate-on-scroll">
                <Link
                  to="/chat"
                  className="relative overflow-hidden group inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
                >
                  <span className="relative z-10">Start Chatting</span>
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Link>
              </div>
            </div>
            
            <div className="glass-card p-6 animate-on-scroll">
              <ChatInterface className="h-[400px]" />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* CTA Section */}
      <CTA />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/70 mb-4 md:mb-0">
              © {new Date().getFullYear()} AI Agent. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
