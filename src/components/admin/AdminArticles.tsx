import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GenerateArticleDialog } from './GenerateArticleDialog';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  read_time: string;
  image_url: string | null;
  created_at: string;
}

const categories = [
  'Direito Trabalhista',
  'Direito Civil',
  'Direito Empresarial',
  'Direito de Família',
  'Direito Previdenciário',
  'Direito do Consumidor'
];

export function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    read_time: '5 min',
    image_url: ''
  });

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os artigos.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        read_time: formData.read_time,
        image_url: formData.image_url || null,
        published: editingArticle?.published ?? true
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast({ title: 'Sucesso', description: 'Artigo atualizado.' });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert(articleData);

        if (error) throw error;
        toast({ title: 'Sucesso', description: 'Artigo criado.' });
      }

      setDialogOpen(false);
      resetForm();
      fetchArticles();
    } catch (error: any) {
      console.error('Erro ao salvar artigo:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível salvar o artigo.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !article.published })
        .eq('id', article.id);

      if (error) throw error;
      
      toast({
        title: article.published ? 'Despublicado' : 'Publicado',
        description: `Artigo "${article.title}" foi ${article.published ? 'despublicado' : 'publicado'}.`
      });
      
      fetchArticles();
    } catch (error) {
      console.error('Erro ao alterar publicação:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível alterar a publicação.',
        variant: 'destructive'
      });
    }
  };

  const deleteArticle = async (article: Article) => {
    if (!confirm(`Tem certeza que deseja excluir "${article.title}"?`)) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', article.id);

      if (error) throw error;
      
      toast({ title: 'Excluído', description: 'Artigo excluído com sucesso.' });
      fetchArticles();
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o artigo.',
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      read_time: article.read_time,
      image_url: article.image_url || ''
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      read_time: '5 min',
      image_url: ''
    });
  };

  const openNewDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-cream mb-2">Artigos</h1>
          <p className="text-cream/60">Gerencie os artigos do blog jurídico</p>
        </div>
        <div className="flex gap-2">
          <GenerateArticleDialog 
            onArticleGenerated={fetchArticles} 
            existingTitles={articles.map(a => a.title)}
          />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gold" onClick={openNewDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Manual
              </Button>
            </DialogTrigger>
          <DialogContent className="bg-navy-light border-navy-light/50 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-cream">
                {editingArticle ? 'Editar Artigo' : 'Novo Artigo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-cream">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-navy border-navy-light text-cream"
                />
              </div>
              <div>
                <Label htmlFor="excerpt" className="text-cream">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={2}
                  className="bg-navy border-navy-light text-cream"
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-cream">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="bg-navy border-navy-light text-cream"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-cream">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-navy border-navy-light text-cream">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-light border-navy-light">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-cream">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="read_time" className="text-cream">Tempo de Leitura</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="5 min"
                    className="bg-navy border-navy-light text-cream"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image_url" className="text-cream">URL da Imagem (opcional)</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-navy border-navy-light text-cream"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  className="border-navy-light text-cream"
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="gold" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingArticle ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
        </div>
      ) : articles.length === 0 ? (
        <Card className="bg-navy-light border-navy-light/50">
          <CardContent className="py-12 text-center">
            <p className="text-cream/60">Nenhum artigo encontrado.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="bg-navy-light border-navy-light/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-cream truncate">
                        {article.title}
                      </h3>
                      {!article.published && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">
                          Rascunho
                        </span>
                      )}
                    </div>
                    <p className="text-cream/60 text-sm line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-cream/40">
                      <span>{article.category}</span>
                      <span>{article.read_time}</span>
                      <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(article)}
                      className="text-cream/60 hover:text-cream"
                    >
                      {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(article)}
                      className="text-cream/60 hover:text-cream"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteArticle(article)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
