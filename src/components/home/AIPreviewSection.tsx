import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, AlertTriangle, ArrowRight } from 'lucide-react';

export function AIPreviewSection() {
  const [question, setQuestion] = useState('');

  return (
    <section className="py-20 bg-gradient-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Assistente Jurídico com IA
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
              Tire suas dúvidas jurídicas{' '}
              <span className="text-gold">24 horas por dia</span>
            </h2>

            <p className="text-cream/70 text-lg leading-relaxed mb-6">
              Nossa inteligência artificial foi desenvolvida para ajudar você a 
              entender seus direitos de forma simples e acessível. Faça perguntas 
              sobre qualquer área do Direito e receba orientações gerais instantaneamente.
            </p>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-200 text-sm font-medium mb-1">
                    Aviso Importante
                  </p>
                  <p className="text-amber-200/70 text-sm">
                    A IA fornece apenas informações gerais e educativas. 
                    Não substitui a consulta com um advogado para análise do seu caso específico.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/ia-juridica">
              <Button variant="gold" size="lg">
                Acessar IA Jurídica
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Chat Preview */}
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
            {/* Chat Header */}
            <div className="bg-navy p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-cream font-medium">Assistente Jurídico</p>
                <p className="text-cream/60 text-xs">Online • Pronto para ajudar</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4 bg-muted/30">
              {/* Bot message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-gold" />
                </div>
                <div className="bg-card rounded-lg rounded-tl-none p-4 shadow-sm max-w-[80%]">
                  <p className="text-foreground text-sm">
                    Olá! Sou o assistente jurídico da Dra. Danyel Ferreira. 
                    Posso ajudar você a entender seus direitos e tirar dúvidas gerais sobre o Direito brasileiro. 
                    Como posso ajudar hoje?
                  </p>
                </div>
              </div>

              {/* User message example */}
              <div className="flex gap-3 justify-end">
                <div className="bg-navy rounded-lg rounded-tr-none p-4 shadow-sm max-w-[80%]">
                  <p className="text-cream text-sm">
                    Quais são meus direitos se meu voo for cancelado?
                  </p>
                </div>
              </div>

              {/* Bot response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-gold" />
                </div>
                <div className="bg-card rounded-lg rounded-tl-none p-4 shadow-sm max-w-[80%]">
                  <p className="text-foreground text-sm">
                    De acordo com a ANAC e o Código de Defesa do Consumidor, você tem direito a: 
                    reacomodação em outro voo, reembolso integral, ou execução do serviço por outra modalidade...
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Digite sua dúvida jurídica..."
                  className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Link to="/ia-juridica">
                  <Button variant="gold" size="icon" className="h-12 w-12">
                    <Send className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
