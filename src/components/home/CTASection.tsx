import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Shield } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-navy rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Atendimento Seguro e Confidencial
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
              Pronto para resolver sua{' '}
              <span className="text-gold">questão jurídica</span>?
            </h2>

            <p className="text-cream/70 text-lg mb-10 max-w-2xl mx-auto">
              Agende agora sua consulta virtual com nossos advogados especializados. 
              Atendimento por vídeo, áudio ou chat, no horário que preferir.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consulta">
                <Button variant="hero" className="w-full sm:w-auto">
                  <Calendar className="w-5 h-5" />
                  Agendar Consulta Virtual
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="heroOutline" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5" />
                  Falar Conosco
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-cream/10">
              {[
                'Advogados habilitados OAB',
                'Sigilo profissional garantido',
                'Pagamento seguro',
                'Conformidade LGPD',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-cream/60 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
