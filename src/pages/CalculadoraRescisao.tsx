import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calculator, AlertTriangle, Phone, ArrowLeft } from 'lucide-react';

interface Verbas {
  [key: string]: number;
}

function calcularTempoTrabalhado(dataInicio: Date, dataFim: Date) {
  let anos = dataFim.getFullYear() - dataInicio.getFullYear();
  let meses = dataFim.getMonth() - dataInicio.getMonth();
  let dias = dataFim.getDate() - dataInicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(dataFim.getFullYear(), dataFim.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const totalMeses = anos * 12 + meses;

  return { anos, meses, dias, totalMeses };
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CalculadoraRescisao() {
  const [tipoRescisao, setTipoRescisao] = useState('semJustaCausa');
  const [salario, setSalario] = useState('');
  const [mediaHorasExtras, setMediaHorasExtras] = useState('');
  const [comissoes, setComissoes] = useState('');
  const [outrosAdicionais, setOutrosAdicionais] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [dataDemissao, setDataDemissao] = useState('');
  const [diasFeriasVencidas, setDiasFeriasVencidas] = useState('');
  const [saldoFGTS, setSaldoFGTS] = useState('');
  const [resultados, setResultados] = useState<Verbas | null>(null);
  const [total, setTotal] = useState(0);

  function calcular() {
    const sal = parseFloat(salario) || 0;
    const horas = parseFloat(mediaHorasExtras) || 0;
    const com = parseFloat(comissoes) || 0;
    const outros = parseFloat(outrosAdicionais) || 0;
    const ferias = parseInt(diasFeriasVencidas) || 0;
    const fgts = parseFloat(saldoFGTS) || 0;

    if (sal <= 0) { alert('Informe um salário válido.'); return; }
    if (!dataAdmissao || !dataDemissao) { alert('Informe as datas.'); return; }

    const admissao = new Date(dataAdmissao);
    const demissao = new Date(dataDemissao);
    if (demissao < admissao) { alert('Data de demissão anterior à admissão.'); return; }

    const salarioIntegrado = sal + horas + com + outros;
    const tempo = calcularTempoTrabalhado(admissao, demissao);
    const verbas: Verbas = {};

    // Saldo de salário
    verbas['Saldo de Salário'] = (salarioIntegrado / 30) * tempo.dias;

    // Aviso prévio
    if (tipoRescisao === 'semJustaCausa') {
      const anosCompletos = Math.floor(tempo.totalMeses / 12);
      const diasAvisoAdicional = Math.min(anosCompletos * 3, 60);
      verbas['Aviso Prévio Indenizado'] = (salarioIntegrado / 30) * (30 + diasAvisoAdicional);
    } else if (tipoRescisao === 'acordo') {
      verbas['Aviso Prévio (50%)'] = salarioIntegrado * 0.5;
    }

    // 13º proporcional
    const mesesPara13 = tempo.meses + (tempo.dias >= 15 ? 1 : 0);
    verbas['13º Salário Proporcional'] = (salarioIntegrado / 12) * mesesPara13;

    // Férias proporcionais
    const mesesParaFerias = tempo.meses + (tempo.dias >= 15 ? 1 : 0);
    const feriasProporcionais = (salarioIntegrado / 12) * mesesParaFerias;
    verbas['Férias Proporcionais + 1/3'] = feriasProporcionais + (feriasProporcionais / 3);

    // Férias vencidas
    if (ferias > 0) {
      const feriasVencidas = (salarioIntegrado / 30) * ferias;
      verbas['Férias Vencidas + 1/3'] = feriasVencidas + (feriasVencidas / 3);
    }

    // Multa FGTS
    if (tipoRescisao === 'semJustaCausa') {
      verbas['Multa FGTS (40%)'] = fgts * 0.40;
    } else if (tipoRescisao === 'acordo') {
      verbas['Multa FGTS (20%)'] = fgts * 0.20;
    }

    // FGTS do mês
    if (tipoRescisao !== 'pedidoDemissao') {
      verbas['FGTS do Mês (8%)'] = salarioIntegrado * 0.08;
    }

    let t = 0;
    for (const v of Object.values(verbas)) { if (v > 0) t += v; }

    setResultados(verbas);
    setTotal(t);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-navy relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <Link to="/areas-atuacao#direito-trabalho" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Áreas de Atuação
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
              <Calculator className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-cream">
                Calculadora de Verbas Rescisórias
              </h1>
              <p className="text-cream/70 mt-1">
                Descubra quanto você deve receber na rescisão do contrato de trabalho
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Info */}
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mb-8 text-sm text-muted-foreground">
            <strong className="text-primary">⚖️ Importante:</strong> Esta calculadora fornece uma estimativa. Os valores reais podem variar conforme particularidades do seu caso. Consulte um advogado para análise detalhada.
          </div>

          {/* Tipo de Rescisão */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">📋 Tipo de Demissão</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={tipoRescisao} onValueChange={setTipoRescisao} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="semJustaCausa" id="semJustaCausa" />
                  <Label htmlFor="semJustaCausa">Sem Justa Causa (pelo empregador)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pedidoDemissao" id="pedidoDemissao" />
                  <Label htmlFor="pedidoDemissao">Pedido de Demissão</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="acordo" id="acordo" />
                  <Label htmlFor="acordo">Acordo (Demissão Consensual)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Dados Salariais */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">💰 Dados Salariais</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Mensal (R$)</Label>
                <Input id="salario" type="number" step="0.01" min="0" placeholder="Ex: 3000" value={salario} onChange={e => setSalario(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horasExtras">Média Horas Extras (R$)</Label>
                <Input id="horasExtras" type="number" step="0.01" min="0" placeholder="Ex: 500" value={mediaHorasExtras} onChange={e => setMediaHorasExtras(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comissoes">Comissões Mensais (R$)</Label>
                <Input id="comissoes" type="number" step="0.01" min="0" placeholder="Ex: 800" value={comissoes} onChange={e => setComissoes(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adicionais">Outros Adicionais (R$)</Label>
                <Input id="adicionais" type="number" step="0.01" min="0" placeholder="Ex: 400" value={outrosAdicionais} onChange={e => setOutrosAdicionais(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Período */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">📅 Período Trabalhado</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admissao">Data de Admissão</Label>
                <Input id="admissao" type="date" value={dataAdmissao} onChange={e => setDataAdmissao(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demissao">Data da Demissão</Label>
                <Input id="demissao" type="date" value={dataDemissao} onChange={e => setDataDemissao(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Férias e FGTS */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">🏖️ Férias e FGTS</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feriasVencidas">Dias Férias Vencidas</Label>
                <Input id="feriasVencidas" type="number" min="0" max="30" placeholder="Ex: 30" value={diasFeriasVencidas} onChange={e => setDiasFeriasVencidas(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fgts">Saldo FGTS (R$)</Label>
                <Input id="fgts" type="number" step="0.01" min="0" placeholder="Ex: 5000" value={saldoFGTS} onChange={e => setSaldoFGTS(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Button onClick={calcular} className="w-full" size="lg">
            <Calculator className="w-5 h-5 mr-2" />
            Calcular Verbas Rescisórias
          </Button>

          {/* Resultados */}
          {resultados && (
            <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-foreground text-center">💼 Suas Verbas Rescisórias</h2>

              <div className="space-y-3">
                {Object.entries(resultados).map(([label, valor]) =>
                  valor > 0 ? (
                    <div key={label} className="flex justify-between items-center bg-card rounded-lg p-4 border border-border shadow-sm">
                      <span className="text-muted-foreground text-sm">{label}</span>
                      <span className="text-primary font-bold text-lg">{formatCurrency(valor)}</span>
                    </div>
                  ) : null
                )}
              </div>

              <div className="bg-gradient-navy rounded-xl p-6 text-center">
                <p className="text-cream/80 text-sm mb-1">VALOR TOTAL ESTIMADO</p>
                <p className="text-cream font-serif text-3xl md:text-4xl font-bold">{formatCurrency(total)}</p>
              </div>

              {/* CTA */}
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-serif text-xl text-foreground">🎯 Quer garantir todos os seus direitos?</h3>
                  <p className="text-muted-foreground text-sm">
                    Agende uma consulta com nossos especialistas em Direito Trabalhista e garanta que você receberá tudo que tem direito!
                  </p>
                  <a
                    href="https://wa.me/5567991443348?text=Olá!%20Calculei%20minhas%20verbas%20rescisórias%20e%20gostaria%20de%20uma%20orientação%20profissional."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="gold" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Falar com Advogado Agora
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 text-xs text-amber-800 leading-relaxed">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    <strong>Aviso Legal:</strong> Os valores calculados são estimativas baseadas nas informações fornecidas e na legislação trabalhista vigente. Esta ferramenta não substitui a análise de um profissional qualificado.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
