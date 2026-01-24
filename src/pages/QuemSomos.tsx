import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Scale, 
  Calendar,
  ArrowRight,
  BookOpen,
  Shield
} from 'lucide-react';
import lawyerPortrait from '@/assets/lawyer-portrait.jpg';

const credentials = [
  {
    icon: GraduationCap,
    year: '2019',
    title: 'Bacharel em Direito',
    institution: 'Universidade Católica Dom Bosco (UCDB)',
  },
  {
    icon: BookOpen,
    year: '2021',
    title: 'Pós-graduação em Advocacia Cível',
    institution: 'Fundação Escola Superior do Ministério Público (FMP)',
  },
  {
    icon: BookOpen,
    year: '2022',
    title: 'Pós-graduação em Direito Penal e Processo Penal',
    institution: 'UNITER',
  },
];

const experiences = [
  {
    icon: Shield,
    title: 'Ministério Público do MS',
    description: 'Estágio no Núcleo Criminal, atuando em investigações e processos penais.',
  },
  {
    icon: Scale,
    title: 'Defensoria Pública da União',
    description: 'Estágio com atendimento à população carente e defesa de direitos fundamentais.',
  },
  {
    icon: Briefcase,
    title: 'Advocacia desde 2019',
    description: 'Experiência em escritórios tradicionais e atendimento direto ao cliente.',
  },
];

const values = [
  {
    title: 'Ética Profissional',
    description: 'Atuação pautada pelo Código de Ética da OAB e respeito ao cliente.',
  },
  {
    title: 'Atendimento Humanizado',
    description: 'Cada cliente é único e merece atenção personalizada ao seu caso.',
  },
  {
    title: 'Transparência',
    description: 'Comunicação clara sobre estratégias, custos e expectativas.',
  },
  {
    title: 'Inovação',
    description: 'Tecnologia a serviço de um atendimento mais acessível e eficiente.',
  },
];

export default function QuemSomos() {
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
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Sobre Nós
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mt-2 mb-4">
              Quem Somos
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              Conheça a trajetória, valores e compromissos do escritório 
              Danyel Ferreira – Advocacia e Consultoria Jurídica.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-gold/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-br-3xl" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={lawyerPortrait}
                  alt="Dra. Danyel Ferreira"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                O Fundador
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-6">
                Dr. Danyel Ferreira
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Advogada inscrita na OAB/MS, com formação sólida e experiência 
                  diversificada nas principais áreas do Direito. Desde o início da 
                  carreira, tem como missão tornar o acesso à justiça mais 
                  <strong className="text-foreground"> simples, humano e acessível</strong>.
                </p>
                <p>
                  Com passagens pelo Ministério Público do Mato Grosso do Sul, 
                  onde atuou no Núcleo Criminal, e pela Defensoria Pública da União, 
                  desenvolveu uma visão ampla do sistema de justiça brasileiro e 
                  um profundo compromisso com a defesa dos direitos fundamentais.
                </p>
                <p>
                  Atualmente, combina a experiência tradicional da advocacia com 
                  ferramentas tecnológicas inovadoras, oferecendo um atendimento 
                  moderno que não abre mão da qualidade técnica e do 
                  <strong className="text-foreground"> atendimento personalizado</strong>.
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <Link to="/consulta">
                  <Button variant="gold">
                    <Calendar className="w-4 h-4" />
                    Agendar Consulta
                  </Button>
                </Link>
                <Link to="/areas-atuacao">
                  <Button variant="outline">
                    Ver Áreas de Atuação
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Formação
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-4">
              Formação Acadêmica
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {credentials.map((cred, index) => (
              <div
                key={cred.title}
                className="relative flex gap-6 pb-8 last:pb-0"
              >
                {/* Timeline line */}
                {index < credentials.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-full bg-gold/20" />
                )}

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <cred.icon className="w-5 h-5 text-gold" />
                </div>

                {/* Content */}
                <div className="bg-card rounded-xl p-6 shadow-lg flex-1">
                  <span className="text-gold text-sm font-semibold">{cred.year}</span>
                  <h3 className="font-serif text-xl text-foreground font-semibold mt-1">
                    {cred.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {cred.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Trajetória
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-4">
              Experiência Profissional
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                  <exp.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-serif text-xl text-foreground font-semibold mb-2">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Nossos Princípios
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream mt-2 mb-4">
              Valores que nos guiam
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-navy-light/50 backdrop-blur-sm rounded-xl p-6 border border-cream/10"
              >
                <div className="w-2 h-2 rounded-full bg-gold mb-4" />
                <h3 className="font-serif text-lg text-cream font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
