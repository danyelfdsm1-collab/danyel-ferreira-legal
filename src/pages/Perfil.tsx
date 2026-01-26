import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { User, Phone, Mail, Save, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AppointmentsList } from '@/components/profile/AppointmentsList';

const perfilSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato: (XX) XXXXX-XXXX').optional().or(z.literal('')),
});

type FormErrors = Partial<Record<keyof z.infer<typeof perfilSchema>, string>>;

const Perfil = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, phone')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Erro ao carregar perfil',
            description: 'Não foi possível carregar seus dados.',
            variant: 'destructive',
          });
          return;
        }

        if (data) {
          setFormData({
            name: data.name || '',
            phone: data.phone || '',
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setFetching(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id, toast]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers.length ? `(${numbers}` : '';
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = perfilSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!user?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name.trim(),
          phone: formData.phone || null,
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: 'Erro ao salvar',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Also update user metadata
      await supabase.auth.updateUser({
        data: {
          name: formData.name.trim(),
          phone: formData.phone || null,
        }
      });

      toast({
        title: 'Perfil atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro inesperado',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetching) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <Card className="border-gold/20 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gold" />
              </div>
              <CardTitle className="text-2xl font-serif text-primary">
                Meu Perfil
              </CardTitle>
              <CardDescription>
                Visualize e edite suas informações pessoais
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email (read-only) */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" />
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    O e-mail não pode ser alterado
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    Nome Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Account Info */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Conta criada em:</strong>{' '}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Salvando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Alterações
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Appointments Section */}
          {user?.id && (
            <div className="mt-8">
              <AppointmentsList userId={user.id} />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Perfil;
