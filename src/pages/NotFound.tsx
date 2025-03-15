
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Container from "@/components/shared/Container";
import AnimatedGradient from "@/components/ui/AnimatedGradient";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Erro: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedGradient />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <Container className="max-w-lg">
          <div className="glass-card p-8 text-center">
            <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
            <p className="text-xl text-foreground/70 mb-8">
              Ops! A página que você está procurando não existe.
            </p>
            <Link 
              to="/" 
              className="relative overflow-hidden group inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
            >
              <span className="relative z-10">Voltar para Início</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NotFound;
