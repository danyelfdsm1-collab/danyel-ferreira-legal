import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            phone
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'E-mail já cadastrado',
            description: 'Este e-mail já possui uma conta. Tente fazer login.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Erro no cadastro',
            description: error.message,
            variant: 'destructive'
          });
        }
        return { error };
      }

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você foi conectado automaticamente.',
      });

      return { data, error: null };
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro inesperado',
        description: err.message,
        variant: 'destructive'
      });
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Credenciais inválidas',
            description: 'E-mail ou senha incorretos. Verifique e tente novamente.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Erro no login',
            description: error.message,
            variant: 'destructive'
          });
        }
        return { error };
      }

      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo de volta.',
      });

      return { data, error: null };
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro inesperado',
        description: err.message,
        variant: 'destructive'
      });
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: 'Erro ao sair',
          description: error.message,
          variant: 'destructive'
        });
        return { error };
      }

      toast({
        title: 'Até logo!',
        description: 'Você saiu da sua conta.',
      });

      return { error: null };
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro inesperado',
        description: err.message,
        variant: 'destructive'
      });
      return { error: err };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!session
  };
}
