import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { articles as staticArticles } from '@/data/articles';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl: string | null;
  createdAt: string;
}

interface UseArticlesReturn {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseArticleReturn {
  article: Article | null;
  isLoading: boolean;
  error: string | null;
}

// Converter artigos estáticos para o formato do banco
const convertStaticArticles = (): Article[] => {
  return staticArticles.map((article) => ({
    id: String(article.id),
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    readTime: article.readTime,
    imageUrl: article.image,
    createdAt: article.date,
  }));
};

export function useArticles(): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching articles:', fetchError);
        throw fetchError;
      }

      if (data && data.length > 0) {
        const dbArticles: Article[] = data.map((article) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          readTime: article.read_time,
          imageUrl: article.image_url,
          createdAt: article.created_at,
        }));
        
        // Combinar artigos do banco com estáticos (banco primeiro)
        const staticConverted = convertStaticArticles();
        setArticles([...dbArticles, ...staticConverted]);
      } else {
        // Fallback para artigos estáticos se banco vazio
        setArticles(convertStaticArticles());
      }
    } catch (err) {
      console.error('Error:', err);
      // Fallback para artigos estáticos em caso de erro
      setArticles(convertStaticArticles());
      setError('Erro ao carregar artigos do servidor');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchArticles,
  };
}

export function useArticle(id: string): UseArticleReturn {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);

      // Primeiro tentar buscar do banco de dados
      try {
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setArticle({
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            readTime: data.read_time,
            imageUrl: data.image_url,
            createdAt: data.created_at,
          });
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error fetching from DB:', err);
      }

      // Fallback: buscar nos artigos estáticos
      const staticArticle = staticArticles.find((a) => String(a.id) === id);
      if (staticArticle) {
        setArticle({
          id: String(staticArticle.id),
          title: staticArticle.title,
          excerpt: staticArticle.excerpt,
          content: staticArticle.content,
          category: staticArticle.category,
          readTime: staticArticle.readTime,
          imageUrl: staticArticle.image,
          createdAt: staticArticle.date,
        });
      } else {
        setError('Artigo não encontrado');
      }

      setIsLoading(false);
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return {
    article,
    isLoading,
    error,
  };
}
