import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar, User, Clock, Video, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Appointment {
  id: string;
  practice_area: string;
  lawyer: string;
  appointment_date: string;
  appointment_time: string;
  modality: string;
  status: string;
  user_id: string;
  created_at: string;
  profile?: {
    name: string;
    phone: string | null;
  };
}

const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-500/20 text-yellow-400',
  confirmado: 'bg-green-500/20 text-green-400',
  cancelado: 'bg-red-500/20 text-red-400',
  concluido: 'bg-blue-500/20 text-blue-400'
};

export function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false });

      if (filter !== 'todos') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch profiles for each appointment
      const appointmentsWithProfiles = await Promise.all(
        (data || []).map(async (apt) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, phone')
            .eq('user_id', apt.user_id)
            .maybeSingle();
          
          return { ...apt, profile: profile || undefined };
        })
      );

      setAppointments(appointmentsWithProfiles);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as consultas.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const updateStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;
      
      toast({ title: 'Sucesso', description: 'Status atualizado.' });
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status.',
        variant: 'destructive'
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-cream mb-2">Consultas</h1>
          <p className="text-cream/60">Gerencie os agendamentos de consultas</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40 bg-navy border-navy-light text-cream">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-navy-light border-navy-light">
            <SelectItem value="todos" className="text-cream">Todos</SelectItem>
            <SelectItem value="pendente" className="text-cream">Pendentes</SelectItem>
            <SelectItem value="confirmado" className="text-cream">Confirmados</SelectItem>
            <SelectItem value="concluido" className="text-cream">Concluídos</SelectItem>
            <SelectItem value="cancelado" className="text-cream">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
        </div>
      ) : appointments.length === 0 ? (
        <Card className="bg-navy-light border-navy-light/50">
          <CardContent className="py-12 text-center">
            <p className="text-cream/60">Nenhuma consulta encontrada.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="bg-navy-light border-navy-light/50">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-gold" />
                      <span className="text-cream font-medium">
                        {apt.profile?.name || 'Usuário não encontrado'}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded ${statusColors[apt.status] || 'bg-gray-500/20 text-gray-400'}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-cream/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(apt.appointment_date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {apt.appointment_time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        {apt.modality}
                      </div>
                      <div>
                        {apt.practice_area}
                      </div>
                    </div>
                    {apt.profile?.phone && (
                      <p className="text-xs text-cream/40 mt-2">Tel: {apt.profile.phone}</p>
                    )}
                  </div>
                  
                  {apt.status === 'pendente' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(apt.id, 'confirmado')}
                        className="border-green-500 text-green-400 hover:bg-green-500/10"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(apt.id, 'cancelado')}
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                  
                  {apt.status === 'confirmado' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(apt.id, 'concluido')}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Marcar Concluída
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
