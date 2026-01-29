import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Scale, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

export default function RedefinirSenha() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let isValidSessionSet = false;
    
    // Configurar listener PRIMEIRO - CRÍTICO para capturar PASSWORD_RECOVERY
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        
        if (event === 'PASSWORD_RECOVERY') {
          isValidSessionSet = true;
          setIsValidSession(true);
        } else if (event === 'SIGNED_IN' && session && !isValidSessionSet) {
          // Também aceita SIGNED_IN após recovery
          isValidSessionSet = true;
          setIsValidSession(true);
        }
      }
    );

    // Verificar se há tokens na URL (fragmento hash)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hasRecoveryToken = hashParams.get('type') === 'recovery' || 
                             hashParams.get('access_token');

    if (hasRecoveryToken) {
      // Dar tempo para o Supabase processar os tokens
      const timeout = setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (!isValidSessionSet) {
            if (session) {
              setIsValidSession(true);
            } else {
              setIsValidSession(false);
            }
          }
        });
      }, 3000);

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    }

    // Sem tokens na URL, verificar sessão existente
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        // Aguardar um pouco antes de invalidar
        setTimeout(() => {
          if (!isValidSessionSet) {
            setIsValidSession(false);
          }
        }, 2000);
      }
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'password') fieldErrors.password = err.message;
        if (err.path[0] === 'confirmPassword') fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast({
          title: 'Erro ao redefinir senha',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setIsSuccess(true);
        toast({
          title: 'Senha redefinida!',
          description: 'Sua senha foi alterada com sucesso.'
        });
      }
    } catch (err) {
      toast({
        title: 'Erro inesperado',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isValidSession === null) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-20 bg-gradient-navy flex items-center justify-center">
          <div className="text-cream">Verificando...</div>
        </section>
      </Layout>
    );
  }

  // Invalid session
  if (!isValidSession) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-20 bg-gradient-navy flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
                <Scale className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="font-serif text-3xl text-cream mb-4">
                Link inválido ou expirado
              </h1>
              <p className="text-cream/70 mb-8">
                O link de recuperação é inválido ou já expirou. 
                Solicite um novo link de recuperação.
              </p>
              <Link to="/recuperar-senha">
                <Button variant="gold" className="w-full">
                  Solicitar novo link
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-20 bg-gradient-navy flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="font-serif text-3xl text-cream mb-4">
                Senha redefinida!
              </h1>
              <p className="text-cream/70 mb-8">
                Sua senha foi alterada com sucesso. 
                Você já pode acessar sua conta.
              </p>
              <Button variant="gold" className="w-full" onClick={() => navigate('/')}>
                Ir para a página inicial
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-20 bg-gradient-navy flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-3xl text-cream mb-2">
                Redefinir senha
              </h1>
              <p className="text-cream/70">
                Digite sua nova senha
              </p>
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl shadow-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                        errors.password ? 'ring-2 ring-destructive' : 'focus:ring-gold'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                        errors.confirmPassword ? 'ring-2 ring-destructive' : 'focus:ring-gold'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar nova senha'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
