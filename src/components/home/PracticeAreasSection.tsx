import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Gavel, 
  FileText, 
  ShoppingBag, 
  Briefcase, 
  Heart, 
  Users,
  ArrowRight 
} from 'lucide-react';

const areas = [
  {
    icon: Gavel,
    title: 'Direito Penal',
    description: 'Defesa criminal, habeas corpus, recursos e acompanhamento processual.',
    color: 'from-red-500/20 to-red-600/10',
  },
  {
    icon: FileText,
    title: 'Direito Civil',
    description: 'Contratos, responsabilidade civil, cobranças e ações indenizatórias.',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    icon: ShoppingBag,
    title: 'Direito do Consumidor',
    description: 'Defesa do consumidor, recalls, vícios de produto e serviço.',
    color: 'from-green-500/20 to-green-600/10',
  },
  {
    icon: Briefcase,
    title: 'Direito do Trabalho',
    description: 'Reclamações trabalhistas, rescisões, acordos e direitos do trabalhador.',
    color: 'from-orange-500/20 to-orange-600/10',
  },
  {
    icon: Heart,
    title: 'Direito Previdenciário',
    description: 'Aposentadorias, benefícios do INSS, revisões e recursos administrativos.',
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    icon: Users,
    title: 'Família e Sucessões',
    description: 'Divórcio, guarda, pensão alimentícia, inventário e testamentos.',
    color: 'from-pink-500/20 to-pink-600/10',
  },
];

export function PracticeAreasSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Expertise Jurídica
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-4">
            Áreas de Atuação
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Atuação especializada nas principais áreas do Direito, 
            com atendimento personalizado para cada caso.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {areas.map((area) => (
            <Link
              key={area.title}
              to={`/areas-atuacao#${area.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className={`relative rounded-xl p-6 border border-border bg-gradient-to-br ${area.color} hover:shadow-lg transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <area.icon className="w-6 h-6 text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-foreground font-semibold mb-2 group-hover:text-navy transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {area.description}
                </p>

                {/* Link indicator */}
                <div className="flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/areas-atuacao">
            <Button variant="default" size="lg">
              Ver todas as áreas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
