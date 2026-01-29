import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Scale, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().trim().email('E-mail inválido').max(255)
});

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`
      });

      if (error) {
        toast({
          title: 'Erro ao enviar e-mail',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setEmailSent(true);
        toast({
          title: 'E-mail enviado!',
          description: 'Verifique sua caixa de entrada.'
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

  if (emailSent) {
    return (
      <Layout>
        <section className="min-h-screen pt-32 pb-20 bg-gradient-navy flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="font-serif text-3xl text-cream mb-4">
                E-mail enviado!
              </h1>
              <p className="text-cream/70 mb-8">
                Enviamos um link de recuperação para <strong className="text-gold">{email}</strong>. 
                Verifique sua caixa de entrada e spam.
              </p>
              <div className="space-y-4">
                <Button
                  variant="gold"
                  onClick={() => setEmailSent(false)}
                  className="w-full"
                >
                  Enviar novamente
                </Button>
                <Link to="/login">
                  <Button variant="goldOutline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao login
                  </Button>
                </Link>
              </div>
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
                Recuperar senha
              </h1>
              <p className="text-cream/70">
                Digite seu e-mail para receber o link de recuperação
              </p>
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl shadow-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className={`w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                        error ? 'ring-2 ring-destructive' : 'focus:ring-gold'
                      }`}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-destructive text-sm mt-1">{error}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-gold hover:underline font-medium inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
