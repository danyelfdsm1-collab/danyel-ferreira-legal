import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, Loader2 } from 'lucide-react';
import { categories } from '@/data/articles';
import { useArticles } from '@/hooks/useArticles';
import { toast } from 'sonner';

export default function Artigos() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { articles, isLoading } = useArticles();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }

    setIsSubscribing(true);
    
    // Simula envio (pode ser integrado com backend futuramente)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Inscrição realizada com sucesso! 🎉', {
      description: 'Você receberá nossos artigos jurídicos em breve.',
    });
    setEmail('');
    setIsSubscribing(false);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Todos' || article.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchTerm]);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'gold' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <span className="ml-3 text-muted-foreground">Carregando artigos...</span>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl text-foreground mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Image */}
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {article.imageUrl && article.imageUrl !== '/placeholder.svg' ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/40 flex items-center justify-center">
                        <Tag className="w-12 h-12 text-gold/50" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-primary text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.createdAt).toLocaleDateString('pt-BR')}
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
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              📬 Receba nossos artigos por e-mail
            </h2>
            <p className="text-muted-foreground mb-6">
              Cadastre-se para receber conteúdo jurídico gratuito e ficar por dentro dos seus direitos.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <Button type="submit" variant="gold" disabled={isSubscribing}>
                {isSubscribing ? 'Enviando...' : 'Inscrever-se'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
