import { UserPlus, MessageSquare, Calendar, Scale } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastro rápido e gratuito para acessar todos os recursos da plataforma.',
  },
  {
    icon: MessageSquare,
    title: 'Tire suas dúvidas',
    description: 'Use nossa IA para entender seus direitos e receber orientações gerais.',
  },
  {
    icon: Calendar,
    title: 'Agende uma consulta',
    description: 'Escolha o advogado, área de atuação e horário que melhor se adapte a você.',
  },
  {
    icon: Scale,
    title: 'Resolva sua questão',
    description: 'Receba atendimento profissional e acompanhe seu caso pelo painel do usuário.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Como Funciona
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2 mb-4">
            Seu caminho para a solução jurídica
          </h2>
          <p className="text-graphite-light max-w-2xl mx-auto">
            Simplificamos o acesso à justiça com tecnologia e atendimento humanizado.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gold text-navy font-bold text-sm flex items-center justify-center shadow-gold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                <step.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-navy font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-graphite-light text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-gold/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
