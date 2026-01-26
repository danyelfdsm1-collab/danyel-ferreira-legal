import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  imagePrompt: string;
}

interface UseGerarArtigoReturn {
  gerarArtigo: (tema: string, areaJuridica?: string) => Promise<GeneratedArticle | null>;
  gerarImagem: (prompt: string) => Promise<string | null>;
  isGeneratingArticle: boolean;
  isGeneratingImage: boolean;
}

export function useGerarArtigo(): UseGerarArtigoReturn {
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const gerarArtigo = async (tema: string, areaJuridica?: string): Promise<GeneratedArticle | null> => {
    setIsGeneratingArticle(true);
    try {
      const { data, error } = await supabase.functions.invoke('gerar-artigo', {
        body: { tema, areaJuridica },
      });

      if (error) {
        console.error('Error generating article:', error);
        toast.error('Erro ao gerar artigo. Tente novamente.');
        return null;
      }

      if (data?.error) {
        toast.error(data.error);
        return null;
      }

      return data.article;
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erro inesperado ao gerar artigo.');
      return null;
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  const gerarImagem = async (prompt: string): Promise<string | null> => {
    setIsGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('gerar-imagem-artigo', {
        body: { prompt },
      });

      if (error) {
        console.error('Error generating image:', error);
        toast.error('Erro ao gerar imagem. Usando placeholder.');
        return null;
      }

      if (data?.error) {
        toast.error(data.error);
        return null;
      }

      return data.imageUrl;
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erro inesperado ao gerar imagem.');
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return {
    gerarArtigo,
    gerarImagem,
    isGeneratingArticle,
    isGeneratingImage,
  };
}
