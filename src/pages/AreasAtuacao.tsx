import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Gavel, 
  FileText, 
  ShoppingBag, 
  Briefcase, 
  Heart, 
  Users,
  MessageSquare,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const areas = [
  {
    id: 'direito-penal',
    icon: Gavel,
    title: 'Direito Penal',
    description: 'Atuação em defesa criminal, garantindo seus direitos constitucionais em todas as fases do processo.',
    examples: [
      'Defesa em inquéritos policiais',
      'Habeas corpus',
      'Recursos criminais',
      'Execução penal',
      'Júri popular',
    ],
    note: 'Em matéria penal, a IA apenas informa sobre direitos básicos do cidadão, sem orientação prática sobre casos específicos.',
    color: 'from-red-500/20 to-red-600/10',
  },
  {
    id: 'direito-civil',
    icon: FileText,
    title: 'Direito Civil',
    description: 'Assessoria completa em questões patrimoniais, contratuais e de responsabilidade civil.',
    examples: [
      'Contratos e obrigações',
      'Responsabilidade civil',
      'Cobranças judiciais',
      'Ações indenizatórias',
      'Direito imobiliário',
    ],
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    id: 'direito-consumidor',
    icon: ShoppingBag,
    title: 'Direito do Consumidor',
    description: 'Defesa dos seus direitos nas relações de consumo, contra abusos e práticas ilegais.',
    examples: [
      'Vícios de produtos e serviços',
      'Cobranças indevidas',
      'Negativação indevida',
      'Problemas com compras online',
      'Cancelamentos e reembolsos',
    ],
    color: 'from-green-500/20 to-green-600/10',
  },
  {
    id: 'direito-trabalho',
    icon: Briefcase,
    title: 'Direito do Trabalho',
    description: 'Proteção dos direitos do trabalhador e assessoria em relações empregatícias.',
    examples: [
      'Reclamações trabalhistas',
      'Rescisões contratuais',
      'Horas extras e adicionais',
      'Assédio moral e sexual',
      'Acidentes de trabalho',
    ],
    color: 'from-orange-500/20 to-orange-600/10',
  },
  {
    id: 'direito-previdenciario',
    icon: Heart,
    title: 'Direito Previdenciário',
    description: 'Auxílio na obtenção e revisão de benefícios junto ao INSS e à Previdência.',
    examples: [
      'Aposentadorias',
      'Auxílio-doença',
      'Pensão por morte',
      'BPC/LOAS',
      'Revisão de benefícios',
    ],
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    id: 'familia-sucessoes',
    icon: Users,
    title: 'Família e Sucessões',
    description: 'Acompanhamento sensível em questões familiares e planejamento sucessório.',
    examples: [
      'Divórcio judicial e extrajudicial',
      'Guarda de filhos',
      'Pensão alimentícia',
      'Inventário e partilha',
      'Testamentos',
    ],
    color: 'from-pink-500/20 to-pink-600/10',
  },
];

export default function AreasAtuacao() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Expertise Jurídica
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mt-2 mb-4">
              Áreas de Atuação
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              Atuação especializada nas principais áreas do Direito, 
              com atendimento personalizado para cada situação.
            </p>
          </div>
        </div>
      </section>

      {/* Areas List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {areas.map((area, index) => (
              <div
                key={area.id}
                id={area.id}
                className={`bg-gradient-to-br ${area.color} rounded-2xl p-8 border border-border scroll-mt-32`}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Header */}
                  <div className="lg:col-span-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center shrink-0">
                        <area.icon className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl text-foreground font-semibold">
                          {area.title}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="lg:col-span-1">
                    <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                      Exemplos de atuação
                    </h3>
                    <ul className="space-y-2">
                      {area.examples.map((example) => (
                        <li key={example} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      {area.note && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-xs">
                              {area.note}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <Link to="/ia-juridica" className="block">
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4" />
                          Tirar dúvida com IA
                        </Button>
                      </Link>
                      
                      <Link to="/consulta" className="block">
                        <Button variant="gold" className="w-full justify-start">
                          <Calendar className="w-4 h-4" />
                          Agendar Consulta
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Não encontrou sua área?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Entre em contato conosco. Podemos indicar um especialista parceiro 
            ou avaliar se podemos ajudar no seu caso.
          </p>
          <Link to="/contato">
            <Button variant="default" size="lg">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
