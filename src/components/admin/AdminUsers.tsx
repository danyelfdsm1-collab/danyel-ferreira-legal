import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User, Phone, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  created_at: string;
}

export function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os usuários.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-cream mb-2">Usuários</h1>
        <p className="text-cream/60">Lista de usuários cadastrados na plataforma</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
        </div>
      ) : users.length === 0 ? (
        <Card className="bg-navy-light border-navy-light/50">
          <CardContent className="py-12 text-center">
            <p className="text-cream/60">Nenhum usuário encontrado.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="bg-navy-light border-navy-light/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-cream font-medium truncate">{user.name}</h3>
                    {user.phone && (
                      <div className="flex items-center gap-1 text-sm text-cream/60 mt-1">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-cream/40 mt-2">
                      <Calendar className="w-3 h-3" />
                      Cadastrado em {formatDate(user.created_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 text-center text-cream/40 text-sm">
        Total: {users.length} usuário{users.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
