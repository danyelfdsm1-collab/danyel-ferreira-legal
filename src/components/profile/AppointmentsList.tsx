import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Mic, MessageSquare, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  practice_area: string;
  lawyer: string;
  appointment_date: string;
  appointment_time: string;
  modality: string;
  status: string;
  created_at: string;
}

interface AppointmentsListProps {
  userId: string;
}

const modalityIcons: Record<string, typeof Video> = {
  video: Video,
  audio: Mic,
  chat: MessageSquare,
};

const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
  concluido: 'bg-blue-100 text-blue-800',
};

const statusLabels: Record<string, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  concluido: 'Concluído',
};

export function AppointmentsList({ userId }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', userId)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        toast({
          title: 'Erro ao carregar agendamentos',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setAppointments(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  const handleCancelAppointment = async (appointmentId: string) => {
    setCancellingId(appointmentId);

    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelado' })
        .eq('id', appointmentId);

      if (error) {
        toast({
          title: 'Erro ao cancelar',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Agendamento cancelado',
        description: 'Sua consulta foi cancelada com sucesso.',
      });

      fetchAppointments();
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Erro inesperado',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setCancellingId(null);
    }
  };

  const canCancel = (appointment: Appointment) => {
    if (appointment.status === 'cancelado' || appointment.status === 'concluido') {
      return false;
    }
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Card className="border-gold/20">
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Carregando agendamentos...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gold/20">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-primary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold" />
          Meus Agendamentos
        </CardTitle>
        <CardDescription>
          Visualize e gerencie suas consultas agendadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Você ainda não possui agendamentos.</p>
            <Button variant="link" className="text-gold" asChild>
              <a href="/consulta">Agendar uma consulta</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const ModalityIcon = modalityIcons[appointment.modality] || Video;
              
              return (
                <div
                  key={appointment.id}
                  className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[appointment.status]}>
                          {statusLabels[appointment.status]}
                        </Badge>
                        <span className="text-sm font-medium text-foreground">
                          {appointment.practice_area}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {appointment.lawyer}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(appointment.appointment_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.appointment_time}
                        </span>
                        <span className="flex items-center gap-1">
                          <ModalityIcon className="w-4 h-4" />
                          {appointment.modality === 'video' && 'Vídeo'}
                          {appointment.modality === 'audio' && 'Áudio'}
                          {appointment.modality === 'chat' && 'Chat'}
                        </span>
                      </div>
                    </div>

                    {canCancel(appointment) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        disabled={cancellingId === appointment.id}
                      >
                        {cancellingId === appointment.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-1" />
                            Cancelar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
