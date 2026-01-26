import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGerarArtigo } from '@/hooks/useGerarArtigo';
import { categories } from '@/data/articles';
import { Loader2, Sparkles, Image as ImageIcon, Copy, Check, Eye } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  imagePrompt: string;
  image?: string;
}

export default function GerarArtigo() {
  const [tema, setTema] = useState('');
  const [areaJuridica, setAreaJuridica] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { gerarArtigo, gerarImagem, isGeneratingArticle, isGeneratingImage } = useGerarArtigo();

  const handleGenerate = async () => {
    if (!tema.trim()) {
      toast.error('Por favor, insira um tema para o artigo.');
      return;
    }

    const article = await gerarArtigo(tema, areaJuridica);
    if (article) {
      setGeneratedArticle({ ...article, image: undefined });
      toast.success('Artigo gerado com sucesso! 🎉');

      // Generate image automatically
      if (article.imagePrompt) {
        const imageUrl = await gerarImagem(article.imagePrompt);
        if (imageUrl) {
          setGeneratedArticle((prev) => prev ? { ...prev, image: imageUrl } : null);
          toast.success('Imagem gerada com sucesso! 🖼️');
        }
      }
    }
  };

  const handleCopyContent = () => {
    if (generatedArticle) {
      const fullContent = `# ${generatedArticle.title}\n\n${generatedArticle.content}`;
      navigator.clipboard.writeText(fullContent);
      setCopied(true);
      toast.success('Conteúdo copiado!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerateImage = async () => {
    if (generatedArticle?.imagePrompt) {
      const imageUrl = await gerarImagem(generatedArticle.imagePrompt);
      if (imageUrl) {
        setGeneratedArticle((prev) => prev ? { ...prev, image: imageUrl } : null);
        toast.success('Nova imagem gerada! 🖼️');
      }
    }
  };

  const categoriesWithoutTodos = categories.filter((c) => c !== 'Todos');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Inteligência Artificial
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mt-2 mb-4">
              Gerador de Artigos Jurídicos
            </h1>
            <p className="text-cream/70 max-w-xl mx-auto text-lg">
              Use IA para criar artigos profissionais com formatação ABNT, 
              emojis e imagens ilustrativas.
            </p>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Input Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  Configurar Artigo
                </CardTitle>
                <CardDescription>
                  Insira o tema desejado e a área do direito para gerar um artigo completo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tema">Tema do Artigo *</Label>
                  <Input
                    id="tema"
                    placeholder="Ex: Direitos do consumidor em compras parceladas"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    disabled={isGeneratingArticle}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área do Direito (opcional)</Label>
                  <Select value={areaJuridica} onValueChange={setAreaJuridica} disabled={isGeneratingArticle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área jurídica" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesWithoutTodos.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="gold"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isGeneratingArticle || !tema.trim()}
                >
                  {isGeneratingArticle ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando artigo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Gerar Artigo com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Article */}
            {generatedArticle && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-gold text-primary text-xs font-semibold rounded-full mb-2">
                        {generatedArticle.category}
                      </span>
                      <CardTitle className="font-serif text-2xl">
                        {generatedArticle.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {generatedArticle.excerpt}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? 'Código' : 'Visualizar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyContent}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copiar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image */}
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {generatedArticle.image ? (
                      <img
                        src={generatedArticle.image}
                        alt={generatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    ) : isGeneratingImage ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-gold animate-spin" />
                        <span className="ml-3 text-muted-foreground">Gerando imagem...</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        <Button variant="outline" size="sm" onClick={handleRegenerateImage}>
                          Gerar Imagem
                        </Button>
                      </div>
                    )}
                    {generatedArticle.image && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-4 right-4 bg-background/80 backdrop-blur"
                        onClick={handleRegenerateImage}
                        disabled={isGeneratingImage}
                      >
                        {isGeneratingImage ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Nova Imagem
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="border rounded-lg p-6 bg-muted/30">
                    <div className="text-xs text-muted-foreground mb-4 flex items-center gap-4">
                      <span>⏱️ {generatedArticle.readTime} de leitura</span>
                      <span>📂 {generatedArticle.category}</span>
                    </div>

                    {showPreview ? (
                      <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                        <ReactMarkdown>{generatedArticle.content}</ReactMarkdown>
                      </article>
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono bg-muted p-4 rounded-lg overflow-x-auto">
                        {generatedArticle.content}
                      </pre>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
