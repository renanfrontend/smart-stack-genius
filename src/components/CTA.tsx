
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './shared/Container';

const CTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light/30 via-transparent to-accent/20"></div>
      
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Experience the future of AI assistance
          </h2>
          
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Enhance your productivity with our intelligent AI agent. Start a conversation now and discover how it can transform your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/chat"
              className="relative overflow-hidden group w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground text-base font-medium tracking-tight shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
            >
              <span className="relative z-10">Start Chatting</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
            
            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-foreground/20 bg-background/50 text-foreground text-base font-medium tracking-tight transition-all duration-300 hover:bg-foreground/5 active:scale-[0.98]"
            >
              Learn More
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
