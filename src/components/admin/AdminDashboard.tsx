import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Calendar, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  totalAppointments: number;
  pendingAppointments: number;
  totalUsers: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    publishedArticles: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, appointmentsRes, profilesRes] = await Promise.all([
          supabase.from('articles').select('id, published'),
          supabase.from('appointments').select('id, status'),
          supabase.from('profiles').select('id')
        ]);

        const articles = articlesRes.data || [];
        const appointments = appointmentsRes.data || [];
        const profiles = profilesRes.data || [];

        setStats({
          totalArticles: articles.length,
          publishedArticles: articles.filter(a => a.published).length,
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter(a => a.status === 'pendente').length,
          totalUsers: profiles.length
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Artigos',
      value: stats.totalArticles,
      subtitle: `${stats.publishedArticles} publicados`,
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Consultas',
      value: stats.totalAppointments,
      subtitle: `${stats.pendingAppointments} pendentes`,
      icon: Calendar,
      color: 'text-green-400'
    },
    {
      title: 'Usuários',
      value: stats.totalUsers,
      subtitle: 'cadastrados',
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-cream mb-2">Dashboard</h1>
        <p className="text-cream/60">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Card key={card.title} className="bg-navy-light border-navy-light/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cream/70">
                {card.title}
              </CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 bg-navy/50 rounded animate-pulse" />
              ) : (
                <>
                  <div className="text-3xl font-bold text-cream">{card.value}</div>
                  <p className="text-xs text-cream/50 mt-1">{card.subtitle}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-navy-light border-navy-light/50">
          <CardHeader>
            <CardTitle className="text-cream flex items-center gap-2">
              <Eye className="w-5 h-5 text-gold" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="/admin/artigos" 
                className="p-4 bg-navy rounded-lg hover:bg-navy/70 transition-colors text-center"
              >
                <FileText className="w-8 h-8 text-gold mx-auto mb-2" />
                <span className="text-cream text-sm">Gerenciar Artigos</span>
              </a>
              <a 
                href="/admin/consultas" 
                className="p-4 bg-navy rounded-lg hover:bg-navy/70 transition-colors text-center"
              >
                <Calendar className="w-8 h-8 text-gold mx-auto mb-2" />
                <span className="text-cream text-sm">Ver Consultas</span>
              </a>
              <a 
                href="/admin/usuarios" 
                className="p-4 bg-navy rounded-lg hover:bg-navy/70 transition-colors text-center"
              >
                <Users className="w-8 h-8 text-gold mx-auto mb-2" />
                <span className="text-cream text-sm">Listar Usuários</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
