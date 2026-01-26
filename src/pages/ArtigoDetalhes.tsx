import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from 'lucide-react';

export default function ArtigoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '0', 10);
  
  const article = articles.find((a) => a.id === articleId);
  
  // Artigos relacionados (mesma categoria, exceto o atual)
  const relatedArticles = articles
    .filter((a) => a.category === article?.category && a.id !== articleId)
    .slice(0, 2);

  if (!article) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-gradient-navy min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl text-cream mb-4">Artigo não encontrado</h1>
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
            
            <span className="inline-block px-3 py-1 bg-gold text-primary text-xs font-semibold rounded-full mb-4">
              {article.category}
            </span>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-cream/70">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('pt-BR', {
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
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                // Verifica se é um título (começa com **)
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={index} className="font-serif text-2xl text-foreground font-semibold mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h2>
                  );
                }
                
                // Verifica se contém sublistas (começa com -)
                if (paragraph.includes('\n-')) {
                  const lines = paragraph.split('\n');
                  const title = lines[0];
                  const items = lines.slice(1).filter((line) => line.startsWith('-'));
                  
                  return (
                    <div key={index} className="my-4">
                      {title && (
                        <p className="text-muted-foreground mb-2">{title}</p>
                      )}
                      <ul className="list-disc list-inside space-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item.replace(/^- /, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                
                // Verifica se é uma lista numerada (começa com número)
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split('\n').filter((line) => line.trim());
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                      {items.map((item, i) => {
                        const match = item.match(/^\d+\.\s*\*\*(.+?)\*\*:?\s*(.*)/);
                        if (match) {
                          return (
                            <li key={i} className="text-muted-foreground">
                              <strong className="text-foreground">{match[1]}</strong>
                              {match[2] && `: ${match[2]}`}
                            </li>
                          );
                        }
                        return (
                          <li key={i} className="text-muted-foreground">
                            {item.replace(/^\d+\.\s*/, '')}
                          </li>
                        );
                      })}
                    </ol>
                  );
                }
                
                // Parágrafo normal
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* CTA */}
            <div className="mt-12 p-8 bg-muted rounded-xl border border-border">
              <h3 className="font-serif text-xl text-foreground mb-2">
                Precisa de orientação jurídica?
              </h3>
              <p className="text-muted-foreground mb-4">
                Nossa equipe está pronta para ajudar você com suas questões jurídicas.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/consulta">
                  <Button variant="gold">Agendar Consulta</Button>
                </Link>
                <Link to="/ia-juridica">
                  <Button variant="outline">Consultar IA Jurídica</Button>
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
              <h2 className="font-serif text-2xl text-foreground mb-8">
                Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/artigos/${related.id}`}
                    className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group"
                  >
                    <span className="inline-block px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded mb-3">
                      {related.category}
                    </span>
                    <h3 className="font-serif text-lg text-foreground font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
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
