import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Video, 
  Mic, 
  MessageSquare, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import lawyerPortrait from '@/assets/lawyer-portrait.jpg';

const practiceAreas = [
  { id: 'civil', name: 'Direito Civil' },
  { id: 'consumidor', name: 'Direito do Consumidor' },
  { id: 'trabalho', name: 'Direito do Trabalho' },
  { id: 'previdenciario', name: 'Direito Previdenciário' },
  { id: 'familia', name: 'Direito de Família' },
  { id: 'penal', name: 'Direito Penal' },
];

const lawyers = [
  {
    id: 'danyel',
    name: 'Dra. Danyel Ferreira',
    specialty: 'Direito Penal e Civil',
    image: lawyerPortrait,
    available: true,
  },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const modalityOptions = [
  { id: 'video', name: 'Vídeo', icon: Video, description: 'Consulta por videoconferência' },
  { id: 'audio', name: 'Áudio', icon: Mic, description: 'Consulta por chamada de voz' },
  { id: 'chat', name: 'Chat', icon: MessageSquare, description: 'Consulta por mensagens' },
];

export default function Consulta() {
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [isLoggedIn] = useState(false);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates.slice(0, 10);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedArea !== '';
      case 2: return selectedLawyer !== '';
      case 3: return selectedDate !== '' && selectedTime !== '';
      case 4: return selectedModality !== '';
      default: return false;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-navy">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Consulta Virtual
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-cream mt-2 mb-4">
              Agende sua Consulta
            </h1>
            <p className="text-cream/70 max-w-xl mx-auto">
              Atendimento personalizado por vídeo, áudio ou chat com advogados especializados.
            </p>
          </div>
        </div>
      </section>

      {/* Login Check */}
      {!isLoggedIn && (
        <section className="py-8 bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">
                    Faça login para agendar
                  </p>
                  <p className="text-amber-700 text-sm">
                    É necessário ter uma conta para prosseguir com o agendamento.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="gold">Criar Conta</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Steps */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {[
              { num: 1, label: 'Área' },
              { num: 2, label: 'Advogado' },
              { num: 3, label: 'Data/Hora' },
              { num: 4, label: 'Modalidade' },
              { num: 5, label: 'Confirmação' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                      step >= s.num
                        ? 'bg-gold text-navy'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < 4 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      step > s.num ? 'bg-gold' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            {/* Step 1: Area Selection */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Selecione a área do Direito
                </h2>
                <p className="text-muted-foreground mb-6">
                  Escolha a área relacionada à sua questão jurídica.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {practiceAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedArea === area.id
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <span className="font-medium text-foreground">{area.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Lawyer Selection */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Escolha o advogado
                </h2>
                <p className="text-muted-foreground mb-6">
                  Selecione o profissional para sua consulta.
                </p>
                
                <div className="space-y-4">
                  {lawyers.map((lawyer) => (
                    <button
                      key={lawyer.id}
                      onClick={() => setSelectedLawyer(lawyer.id)}
                      className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all ${
                        selectedLawyer === lawyer.id
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{lawyer.name}</p>
                        <p className="text-sm text-muted-foreground">{lawyer.specialty}</p>
                      </div>
                      {lawyer.available && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Disponível
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date/Time Selection */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Escolha data e horário
                </h2>
                <p className="text-muted-foreground mb-6">
                  Selecione o melhor momento para sua consulta.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {generateDates().map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date.toISOString())}
                        className={`flex-shrink-0 p-3 rounded-lg border-2 text-center transition-all ${
                          selectedDate === date.toISOString()
                            ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-gold/50'
                        }`}
                      >
                        <span className="text-sm text-foreground capitalize">
                          {formatDate(date)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border-2 text-sm transition-all ${
                          selectedTime === time
                            ? 'border-gold bg-gold/5 text-foreground'
                            : 'border-border hover:border-gold/50 text-muted-foreground'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Modality Selection */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Escolha a modalidade
                </h2>
                <p className="text-muted-foreground mb-6">
                  Como você prefere realizar a consulta?
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  {modalityOptions.map((modality) => (
                    <button
                      key={modality.id}
                      onClick={() => setSelectedModality(modality.id)}
                      className={`p-6 rounded-xl border-2 text-center transition-all ${
                        selectedModality === modality.id
                          ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <modality.icon className={`w-8 h-8 mx-auto mb-3 ${
                        selectedModality === modality.id ? 'text-gold' : 'text-muted-foreground'
                      }`} />
                      <p className="font-medium text-foreground">{modality.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{modality.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="animate-fade-in text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Confirme seu agendamento
                </h2>
                
                <div className="bg-muted rounded-xl p-6 text-left max-w-md mx-auto my-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Área:</span>
                      <span className="font-medium text-foreground">
                        {practiceAreas.find(a => a.id === selectedArea)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Advogado:</span>
                      <span className="font-medium text-foreground">
                        {lawyers.find(l => l.id === selectedLawyer)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium text-foreground">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-medium text-foreground">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modalidade:</span>
                      <span className="font-medium text-foreground">
                        {modalityOptions.find(m => m.id === selectedModality)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left mb-6 max-w-md mx-auto">
                  <div className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-xs">
                      A consulta não garante resultado jurídico. O atendimento tem caráter 
                      informativo e orientativo, cabendo ao cliente decidir sobre o patrocínio da causa.
                    </p>
                  </div>
                </div>

                {!isLoggedIn ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Faça login ou crie uma conta para confirmar o agendamento.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Link to="/login">
                        <Button variant="outline">Entrar</Button>
                      </Link>
                      <Link to="/cadastro">
                        <Button variant="gold">Criar Conta</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Button variant="gold" size="lg">
                    Confirmar Agendamento
                  </Button>
                )}
              </div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  variant="gold"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
