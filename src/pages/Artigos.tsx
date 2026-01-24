import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Conheça seus direitos como consumidor em compras online',
    excerpt: 'Entenda as garantias legais e o que fazer quando algo dá errado em suas compras pela internet.',
    category: 'Direito do Consumidor',
    date: '2024-01-22',
    readTime: '5 min',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'INSS: Como funciona a aposentadoria por tempo de contribuição',
    excerpt: 'Tudo o que você precisa saber sobre regras de transição, cálculos e documentação necessária.',
    category: 'Direito Previdenciário',
    date: '2024-01-20',
    readTime: '8 min',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Pensão alimentícia: quem tem direito e como solicitar',
    excerpt: 'Saiba quais são os critérios legais e os passos para requerer ou revisar pensão alimentícia.',
    category: 'Direito de Família',
    date: '2024-01-18',
    readTime: '6 min',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Rescisão trabalhista: entenda todas as verbas devidas',
    excerpt: 'Conheça seus direitos ao ser demitido e aprenda a conferir se recebeu tudo corretamente.',
    category: 'Direito do Trabalho',
    date: '2024-01-15',
    readTime: '7 min',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'O que fazer se você for vítima de um crime: passo a passo',
    excerpt: 'Orientações importantes sobre como agir e quais órgãos procurar em situações de crime.',
    category: 'Direito Penal',
    date: '2024-01-12',
    readTime: '6 min',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Contratos de aluguel: cláusulas essenciais e cuidados',
    excerpt: 'Aprenda a identificar os principais pontos de atenção antes de assinar um contrato de locação.',
    category: 'Direito Civil',
    date: '2024-01-10',
    readTime: '5 min',
    image: '/placeholder.svg',
  },
];

const categories = [
  'Todos',
  'Direito do Consumidor',
  'Direito Previdenciário',
  'Direito de Família',
  'Direito do Trabalho',
  'Direito Penal',
  'Direito Civil',
];

export default function Artigos() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Blog Jurídico
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mt-2 mb-4">
              Artigos Jurídicos
            </h1>
            <p className="text-cream/70 max-w-xl mx-auto text-lg">
              Conteúdo educativo sobre direitos e legislação brasileira, 
              escrito em linguagem acessível para todos.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.slice(0, 4).map((cat) => (
                <Button
                  key={cat}
                  variant={cat === 'Todos' ? 'gold' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/40 flex items-center justify-center">
                    <Tag className="w-12 h-12 text-gold/50" />
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-primary text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl text-foreground font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/artigos/${article.id}`}
                    className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                  >
                    Ler artigo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Receba nossos artigos por e-mail
            </h2>
            <p className="text-muted-foreground mb-6">
              Cadastre-se para receber conteúdo jurídico gratuito e ficar por dentro dos seus direitos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button variant="gold">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
