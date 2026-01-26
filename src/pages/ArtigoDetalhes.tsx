import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useArticle, useArticles } from '@/hooks/useArticles';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

const handleShare = async (title: string, excerpt: string) => {
  const shareData = {
    title: title,
    text: excerpt,
    url: window.location.href,
  };

  try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  } catch (error) {
    // User cancelled or error
    if ((error as Error).name !== 'AbortError') {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  }
};

export default function ArtigoDetalhes() {
  const { id } = useParams<{ id: string }>();
  
  const { article, isLoading, error } = useArticle(id || '');
  const { articles } = useArticles();
  
  // Artigos relacionados (mesma categoria, exceto o atual)
  const relatedArticles = articles
    .filter((a) => a.category === article?.category && a.id !== article?.id)
    .slice(0, 2);

  // Get category emoji
  const categoryEmojis: Record<string, string> = {
    'Direito do Consumidor': '🛒',
    'Direito Previdenciário': '👴',
    'Direito de Família': '👨‍👩‍👧‍👦',
    'Direito do Trabalho': '💼',
    'Direito Trabalhista': '💼',
    'Direito Penal': '⚖️',
    'Direito Civil': '📜',
    'Direito Imobiliário': '🏠',
    'Direito de Trânsito': '🚗',
    'Direito das Sucessões': '📜',
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-gradient-navy min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
            <p className="text-cream/70">Carregando artigo...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-gradient-navy min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl text-cream mb-4">📄 Artigo não encontrado</h1>
            <p className="text-cream/70 mb-8">O artigo que você está procurando não existe.</p>
            <Link to="/artigos">
              <Button variant="gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para artigos
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const categoryEmoji = categoryEmojis[article.category] || '📋';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/artigos"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para artigos
            </Link>
            
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-primary text-sm font-semibold rounded-full mb-4">
              {categoryEmoji} {article.category}
            </span>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-cream/80 text-lg mb-6 italic">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-cream/70">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} de leitura
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-cream border-cream/30 hover:bg-cream/10" 
                  onClick={() => handleShare(article.title, article.excerpt)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      {article.imageUrl && article.imageUrl !== '/placeholder.svg' && (
        <section className="bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto -mt-8">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-serif text-3xl text-foreground font-bold mt-10 mb-6 pb-3 border-b border-border">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-serif text-2xl text-foreground font-semibold mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gold rounded-full inline-block" />
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif text-xl text-foreground font-medium mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 my-4 pl-0">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground flex items-start gap-2">
                      <span className="text-gold mt-1">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 my-4 pl-4">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gold pl-4 py-2 my-6 bg-muted/50 rounded-r-lg italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-foreground font-semibold">{children}</strong>
                  ),
                  hr: () => (
                    <hr className="my-8 border-border" />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>

            {/* Author/Source Section - ABNT Style */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-serif text-lg text-foreground mb-4">📚 Referências e Fonte</h3>
              <p className="text-sm text-muted-foreground italic">
                Artigo elaborado pela equipe jurídica do escritório <strong>Danyel Ferreira – Advocacia e Consultoria Jurídica</strong>. 
                O conteúdo possui caráter meramente informativo e educativo, não substituindo a consulta a um advogado para análise do caso concreto.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Data de publicação: {new Date(article.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}. 
                Acesso em: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-navy to-navy-light rounded-xl border border-gold/20 text-center">
              <h3 className="font-serif text-2xl text-cream mb-3">
                💡 Precisa de orientação jurídica?
              </h3>
              <p className="text-cream/70 mb-6 max-w-md mx-auto">
                Nossa equipe de especialistas está pronta para ajudar você com suas questões jurídicas.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/consulta">
                  <Button variant="gold" size="lg">
                    📅 Agendar Consulta
                  </Button>
                </Link>
                <Link to="/ia-juridica">
                  <Button variant="outline" size="lg" className="text-cream border-cream/30 hover:bg-cream/10">
                    🤖 Consultar IA Jurídica
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl text-foreground mb-8 flex items-center gap-2">
                📖 Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/artigos/${related.id}`}
                    className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-gold/30 transition-all group"
                  >
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded mb-3">
                      {categoryEmojis[related.category] || '📋'} {related.category}
                    </span>
                    <h3 className="font-serif text-lg text-foreground font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                      Ler artigo
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
