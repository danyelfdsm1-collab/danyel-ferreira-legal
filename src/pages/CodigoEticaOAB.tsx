import { Layout } from '@/components/layout/Layout';
import { Scale, BookOpen } from 'lucide-react';

export default function CodigoEticaOAB() {
  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
                Código de Ética da OAB
              </h1>
              <p className="text-navy/60">
                Nosso compromisso com a ética profissional
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Compromisso Ético
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  O escritório Danyel Ferreira Advocacia & Consultoria atua em estrita conformidade com o Código de Ética e Disciplina da Ordem dos Advogados do Brasil (OAB), garantindo aos clientes um atendimento pautado pela honestidade, transparência e respeito aos princípios da advocacia.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Princípios Fundamentais
                </h2>
                <div className="space-y-4">
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Independência Profissional</h3>
                    <p className="text-navy/70 text-sm">
                      Atuamos com total independência técnica, livre de qualquer subordinação que possa comprometer a defesa dos interesses do cliente.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Sigilo Profissional</h3>
                    <p className="text-navy/70 text-sm">
                      Todas as informações compartilhadas pelo cliente são tratadas com absoluto sigilo, conforme determina o art. 35 do Código de Ética da OAB.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Lealdade e Verdade</h3>
                    <p className="text-navy/70 text-sm">
                      Mantemos relação de lealdade com o cliente, informando sempre a verdade sobre as chances de êxito e os riscos envolvidos em cada caso.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Diligência e Zelo</h3>
                    <p className="text-navy/70 text-sm">
                      Tratamos cada caso com a máxima diligência e zelo, empregando os melhores esforços na defesa dos direitos do cliente.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Publicidade na Advocacia
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Este site segue as diretrizes do Provimento nº 205/2021 do Conselho Federal da OAB sobre publicidade na advocacia:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Conteúdo informativo sem caráter mercantilista</li>
                  <li>Não captação indevida de clientela</li>
                  <li>Respeito à dignidade da advocacia</li>
                  <li>Informações verdadeiras e verificáveis</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Uso de Tecnologia
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  A utilização da ferramenta de IA Jurídica neste site está em conformidade com as diretrizes da OAB sobre o uso de tecnologia na advocacia. A ferramenta oferece orientações gerais e não substitui a atuação do advogado, servindo apenas como apoio informativo ao cidadão.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Honorários
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Os honorários advocatícios são fixados com observância da Tabela de Honorários da OAB/MS e das disposições do Código de Ética, sendo sempre apresentados de forma clara e transparente ao cliente antes da contratação dos serviços.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Documento Oficial
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  O Código de Ética e Disciplina da OAB completo pode ser consultado no site oficial da Ordem dos Advogados do Brasil:
                </p>
                <a 
                  href="https://www.oab.org.br/publicacoes/codigodeetica" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg hover:bg-gold/20 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Acessar Código de Ética da OAB
                </a>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Canal de Denúncias
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Caso identifique qualquer conduta que viole o Código de Ética da OAB, você pode reportar diretamente à Seccional da OAB do seu estado ou entrar em contato conosco pelo e-mail: <a href="mailto:advdanyelferreira@gmail.com" className="text-gold hover:underline">advdanyelferreira@gmail.com</a>
                </p>
              </section>

              <div className="pt-8 border-t border-navy/10">
                <div className="flex items-center gap-3 text-navy/50">
                  <Scale className="w-5 h-5" />
                  <span className="text-sm">
                    Danyel Ferreira Advocacia & Consultoria - OAB/MS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
