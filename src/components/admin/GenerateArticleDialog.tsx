import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GenerateArticleDialogProps {
  onArticleGenerated: () => void;
  existingTitles: string[];
}

const TEMAS_POR_AREA: Record<string, string[]> = {
  'Direito Trabalhista': [
    'Direitos trabalhistas em home office',
    'Rescisão de contrato de trabalho: direitos do empregado',
    'Acidentes de trabalho: responsabilidades e indenizações',
    'Assédio moral no trabalho: como provar e agir',
    'FGTS: saque e direitos do trabalhador',
    'Férias trabalhistas: cálculo e direitos',
    'Horas extras: limites e pagamentos',
    'Aviso prévio: regras e indenização',
  ],
  'Direito Civil': [
    'Indenização por danos morais: quando é cabível',
    'Dívidas prescritas: quando não precisa mais pagar',
    'Seguro de vida: quando a seguradora deve pagar',
    'Responsabilidade civil por acidentes',
    'Contratos: elementos essenciais e validade',
    'Obrigações e responsabilidade contratual',
  ],
  'Direito de Família': [
    'Divórcio consensual: passo a passo completo',
    'Guarda compartilhada: como funciona na prática',
    'Pensão alimentícia: cálculo e revisão',
    'União estável: direitos e deveres',
    'Divórcio litigioso: quando é necessário',
    'Adoção: processo e requisitos legais',
    'Alienação parental: identificação e medidas',
  ],
  'Direito Imobiliário': [
    'Direitos do inquilino: o que a lei garante',
    'Usucapião: como adquirir propriedade pelo tempo',
    'Contrato de aluguel: cláusulas essenciais',
    'Despejo: prazos e procedimentos legais',
    'Compra e venda de imóveis: cuidados jurídicos',
    'Condomínio: direitos e deveres dos moradores',
  ],
  'Direito Previdenciário': [
    'Aposentadoria especial: quem tem direito',
    'Pensão por morte: requisitos e beneficiários',
    'Aposentadoria por invalidez: requisitos atuais',
    'Aposentadoria rural: regras específicas',
    'Auxílio-doença: como solicitar',
    'BPC/LOAS: requisitos e como pedir',
  ],
  'Direito do Consumidor': [
    'Direito do consumidor em compras online',
    'Direitos do passageiro aéreo',
    'Cobrança indevida: direitos do consumidor',
    'Produto com defeito: troca e reembolso',
    'Propaganda enganosa: como agir',
    'Negativação indevida: danos morais',
  ],
  'Direito das Sucessões': [
    'Herança: ordem de sucessão e direitos',
    'Inventário: judicial vs extrajudicial',
    'Testamento: tipos e como fazer',
    'Partilha de bens: como funciona',
    'Renúncia de herança: quando é possível',
  ],
  'Direito de Trânsito': [
    'Como recorrer de multas de trânsito',
    'Suspensão da CNH: como evitar',
    'Acidentes de trânsito: responsabilidades',
    'Pontos na carteira: como funciona',
  ],
};

export function GenerateArticleDialog({ onArticleGenerated, existingTitles }: GenerateArticleDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedTema, setSelectedTema] = useState<string>('');
  const [customTema, setCustomTema] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [availableTemas, setAvailableTemas] = useState<string[]>([]);
  const { toast } = useToast();

  // Filtrar temas que já existem como artigos
  useEffect(() => {
    if (selectedArea && TEMAS_POR_AREA[selectedArea]) {
      const temasDisponiveis = TEMAS_POR_AREA[selectedArea].filter(tema => {
        // Verificar se tema já existe (comparação parcial case-insensitive)
        return !existingTitles.some(titulo => 
          titulo.toLowerCase().includes(tema.toLowerCase()) ||
          tema.toLowerCase().includes(titulo.toLowerCase().slice(0, 30))
        );
      });
      setAvailableTemas(temasDisponiveis);
      setSelectedTema('');
    } else {
      setAvailableTemas([]);
    }
  }, [selectedArea, existingTitles]);

  const handleGenerate = async () => {
    const tema = selectedTema === 'custom' ? customTema : selectedTema;
    
    if (!tema) {
      toast({
        title: 'Erro',
        description: 'Selecione ou digite um tema para o artigo.',
        variant: 'destructive'
      });
      return;
    }

    // Verificar duplicata para tema customizado
    if (selectedTema === 'custom') {
      const isDuplicate = existingTitles.some(titulo => 
        titulo.toLowerCase().includes(customTema.toLowerCase()) ||
        customTema.toLowerCase().includes(titulo.toLowerCase().slice(0, 30))
      );
      if (isDuplicate) {
        toast({
          title: 'Tema já existe',
          description: 'Já existe um artigo com tema similar. Escolha outro tema.',
          variant: 'destructive'
        });
        return;
      }
    }

    setGenerating(true);

    try {
      // Gerar artigo
      const { data: articleData, error: articleError } = await supabase.functions.invoke('gerar-artigo', {
        body: { tema, areaJuridica: selectedArea },
      });

      if (articleError) throw articleError;
      if (articleData?.error) throw new Error(articleData.error);

      const article = articleData.article;

      // Gerar imagem
      let imageUrl = null;
      if (article.imagePrompt) {
        setGeneratingImage(true);
        try {
          const { data: imageData, error: imageError } = await supabase.functions.invoke('gerar-imagem-artigo', {
            body: { prompt: article.imagePrompt },
          });

          if (!imageError && imageData?.imageUrl) {
            imageUrl = imageData.imageUrl;
          }
        } catch (imgErr) {
          console.warn('Erro ao gerar imagem:', imgErr);
        }
        setGeneratingImage(false);
      }

      // Salvar no banco
      const { error: insertError } = await supabase
        .from('articles')
        .insert({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category || selectedArea,
          read_time: article.readTime || '5 min',
          image_url: imageUrl,
          published: true,
        });

      if (insertError) throw insertError;

      toast({
        title: 'Artigo gerado com sucesso!',
        description: `"${article.title}" foi criado e publicado.`,
      });

      setOpen(false);
      resetForm();
      onArticleGenerated();

    } catch (error: any) {
      console.error('Erro ao gerar artigo:', error);
      toast({
        title: 'Erro ao gerar artigo',
        description: error.message || 'Tente novamente em alguns minutos.',
        variant: 'destructive'
      });
    } finally {
      setGenerating(false);
      setGeneratingImage(false);
    }
  };

  const resetForm = () => {
    setSelectedArea('');
    setSelectedTema('');
    setCustomTema('');
  };

  const areas = Object.keys(TEMAS_POR_AREA);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="goldOutline">
          <Sparkles className="w-4 h-4 mr-2" />
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-navy-light border-navy-light/50 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-cream flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Gerar Artigo com IA
          </DialogTitle>
          <DialogDescription className="text-cream/60">
            O artigo será gerado seguindo as normas ABNT e o Código de Ética da OAB, 
            com citação obrigatória de fontes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="area" className="text-cream">Área de Atuação</Label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="bg-navy border-navy-light text-cream mt-1">
                <SelectValue placeholder="Selecione a área..." />
              </SelectTrigger>
              <SelectContent className="bg-navy-light border-navy-light">
                {areas.map((area) => (
                  <SelectItem key={area} value={area} className="text-cream">
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedArea && (
            <div>
              <Label htmlFor="tema" className="text-cream">Tema do Artigo</Label>
              {availableTemas.length === 0 ? (
                <Alert className="mt-2 bg-yellow-500/10 border-yellow-500/30">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-200">
                    Todos os temas sugeridos já possuem artigos. Digite um tema personalizado.
                  </AlertDescription>
                </Alert>
              ) : null}
              <Select value={selectedTema} onValueChange={setSelectedTema}>
                <SelectTrigger className="bg-navy border-navy-light text-cream mt-1">
                  <SelectValue placeholder="Selecione um tema..." />
                </SelectTrigger>
                <SelectContent className="bg-navy-light border-navy-light max-h-60">
                  {availableTemas.map((tema) => (
                    <SelectItem key={tema} value={tema} className="text-cream">
                      {tema}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom" className="text-gold">
                    ✏️ Digitar tema personalizado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedTema === 'custom' && (
            <div>
              <Label htmlFor="customTema" className="text-cream">Tema Personalizado</Label>
              <Input
                id="customTema"
                value={customTema}
                onChange={(e) => setCustomTema(e.target.value)}
                placeholder="Ex: Direitos do trabalhador temporário"
                className="bg-navy border-navy-light text-cream mt-1"
              />
            </div>
          )}

          <Alert className="bg-primary/5 border-primary/20">
            <AlertCircle className="h-4 w-4 text-gold" />
            <AlertDescription className="text-cream/80 text-sm">
              <strong>Conformidade garantida:</strong> O artigo seguirá normas ABNT, 
              respeitará o Código de Ética da OAB e incluirá citação de todas as fontes utilizadas.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={generating}
              className="border-navy-light text-cream"
            >
              Cancelar
            </Button>
            <Button
              variant="gold"
              onClick={handleGenerate}
              disabled={generating || (!selectedTema || (selectedTema === 'custom' && !customTema))}
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {generatingImage ? 'Gerando imagem...' : 'Gerando artigo...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Artigo
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
