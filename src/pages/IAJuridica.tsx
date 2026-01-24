import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  Scale, 
  User,
  Info,
  Calendar,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIAJuridica } from '@/hooks/useIAJuridica';

export default function IAJuridica() {
  const { messages, isLoading, sendMessage, clearMessages } = useIAJuridica();
  const [input, setInput] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasAgreed, setHasAgreed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !hasAgreed || isLoading) return;
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format message content with basic markdown-like styling
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((part, j) => 
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
            <br />
          </span>
        );
      }
      // Bullet points and emojis
      if (line.startsWith('•') || line.startsWith('-') || /^[📋⏰⚖️⚠️✅❌🔹🔸💡📌]/.test(line)) {
        return <span key={i}>{line}<br /></span>;
      }
      // Numbered lists
      if (/^\d+\./.test(line)) {
        return <span key={i}>{line}<br /></span>;
      }
      return <span key={i}>{line}<br /></span>;
    });
  };

  return (
    <Layout>
      {/* Disclaimer Modal */}
      {showDisclaimer && !hasAgreed && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-foreground font-semibold">
                  Aviso Importante
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Leia com atenção antes de continuar
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground mb-6">
              <p>
                Este assistente virtual utiliza inteligência artificial para fornecer 
                <strong className="text-foreground"> informações gerais e educativas</strong> sobre 
                o Direito brasileiro.
              </p>
              <p>
                <strong className="text-foreground">O que a IA NÃO faz:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Não analisa casos concretos de forma conclusiva</li>
                <li>Não emite pareceres jurídicos</li>
                <li>Não cria estratégias processuais</li>
                <li>Não redige peças ou documentos</li>
                <li>Não garante resultados jurídicos</li>
              </ul>
              <p>
                Para uma análise completa do seu caso, recomendamos sempre 
                <strong className="text-foreground"> agendar uma consulta</strong> com um advogado habilitado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => {
                  setHasAgreed(true);
                  setShowDisclaimer(false);
                }}
              >
                Li e concordo
              </Button>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Voltar ao início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              Assistente com Inteligência Artificial
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-cream mb-4">
              IA Jurídica
            </h1>
            <p className="text-cream/70 max-w-xl mx-auto">
              Tire suas dúvidas sobre direitos e receba orientações gerais instantaneamente.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-8 bg-muted min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-800 text-sm">
                <strong>Lembre-se:</strong> A IA fornece apenas informações gerais e educativas. 
                Não substitui a consulta com um advogado para análise do seu caso específico.
              </p>
            </div>
            <Link to="/consulta">
              <Button variant="gold" size="sm">
                <Calendar className="w-4 h-4" />
                Agendar
              </Button>
            </Link>
          </div>

          {/* Chat Container */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            {/* Chat Header */}
            <div className="bg-navy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-cream font-medium">Assistente Jurídico</p>
                  <p className="text-cream/60 text-xs">
                    {isLoading ? 'Digitando...' : 'Online • Pronto para ajudar'}
                  </p>
                </div>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearMessages}
                  className="text-cream/60 hover:text-cream hover:bg-white/10"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Limpar
                </Button>
              )}
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-6">
              {/* Welcome message if no messages */}
              {messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-gold" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none p-4 bg-muted text-foreground max-w-[80%]">
                    <div className="text-sm leading-relaxed">
                      <p className="mb-3">
                        Olá! Sou o assistente jurídico virtual do escritório <strong>Dr. Danyel Ferreira Advocacia</strong>.
                      </p>
                      <p className="mb-3">
                        Posso ajudar você a entender melhor seus direitos e tirar dúvidas gerais sobre diversas áreas do Direito brasileiro:
                      </p>
                      <ul className="list-disc list-inside mb-3 space-y-1">
                        <li>Direito Civil e Contratos</li>
                        <li>Direito do Consumidor</li>
                        <li>Direito do Trabalho</li>
                        <li>Direito Previdenciário</li>
                        <li>Direito de Família</li>
                      </ul>
                      <p className="font-medium">Como posso ajudar você hoje?</p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                      <Scale className="w-5 h-5 text-gold" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-4 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-navy text-cream rounded-tr-none'
                        : 'bg-muted text-foreground rounded-tl-none'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {formatMessage(message.content)}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-cream" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-gold" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={hasAgreed ? "Digite sua dúvida jurídica..." : "Aceite os termos para continuar"}
                  disabled={!hasAgreed || isLoading}
                  className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold resize-none disabled:opacity-50"
                  rows={2}
                />
                <Button
                  variant="gold"
                  size="icon"
                  className="h-auto w-14"
                  onClick={handleSend}
                  disabled={!input.trim() || !hasAgreed || isLoading}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
