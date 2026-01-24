import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, UserPlus, ChevronDown } from 'lucide-react';
import lawyerPortrait from '@/assets/lawyer-portrait.webp';

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gold accent line */}
      <div className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-gold to-transparent" />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <span className="text-gold text-sm font-medium tracking-wide">
                Advocacia Digital & Presencial
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6">
              Atendimento jurídico{' '}
              <span className="text-gradient-gold">moderno</span>,{' '}
              <span className="text-gold">humano</span> e acessível
            </h1>
            
            <p className="text-cream/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Conectamos você ao suporte jurídico que precisa. Tire dúvidas com nossa 
              IA educativa ou agende uma consulta com advogados especializados.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/ia-juridica">
                <Button variant="hero" className="w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" />
                  Falar com IA Jurídica
                </Button>
              </Link>
              <Link to="/consulta">
                <Button variant="heroOutline" className="w-full sm:w-auto">
                  <Calendar className="w-5 h-5" />
                  Agendar Consulta
                </Button>
              </Link>
            </div>

            <Link 
              to="/cadastro"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors group"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">Criar minha conta gratuitamente</span>
              <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Portrait */}
          <div className="relative flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-br-3xl" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={lawyerPortrait}
                  alt="Dra. Danyel Ferreira - Advogada"
                  className="w-72 md:w-80 lg:w-96 h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                
                {/* Name badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-navy/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-serif text-xl text-cream font-semibold">
                    Dr. Danyel Ferreira
                  </p>
                  <p className="text-gold text-sm">
                    OAB/MS • Especialista em Direito Penal e Civil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 hover:text-gold transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
