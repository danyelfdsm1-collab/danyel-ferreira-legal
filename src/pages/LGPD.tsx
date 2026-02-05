import { Layout } from '@/components/layout/Layout';
import { Scale, Lock } from 'lucide-react';

export default function LGPD() {
  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
                LGPD
              </h1>
              <p className="text-navy/60">
                Lei Geral de Proteção de Dados Pessoais
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  O que é a LGPD?
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) é a legislação brasileira que regulamenta o tratamento de dados pessoais por pessoas físicas e jurídicas, com o objetivo de proteger a privacidade e os direitos fundamentais de liberdade das pessoas.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Nosso Compromisso
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  O escritório Danyel Ferreira Advocacia & Consultoria está plenamente adequado à LGPD, implementando medidas técnicas e organizacionais para garantir a proteção dos dados pessoais de clientes, colaboradores e usuários do site.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Seus Direitos como Titular de Dados
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  A LGPD garante a você, titular dos dados, os seguintes direitos:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Confirmação e Acesso</h3>
                    <p className="text-navy/70 text-sm">
                      Saber se seus dados são tratados e ter acesso a eles.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Correção</h3>
                    <p className="text-navy/70 text-sm">
                      Corrigir dados incompletos, inexatos ou desatualizados.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Anonimização e Eliminação</h3>
                    <p className="text-navy/70 text-sm">
                      Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Portabilidade</h3>
                    <p className="text-navy/70 text-sm">
                      Solicitar a portabilidade dos dados a outro fornecedor.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Informação</h3>
                    <p className="text-navy/70 text-sm">
                      Ser informado sobre com quem seus dados são compartilhados.
                    </p>
                  </div>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <h3 className="font-semibold text-navy mb-2">Revogação</h3>
                    <p className="text-navy/70 text-sm">
                      Revogar o consentimento a qualquer momento.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Como Exercer Seus Direitos
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Para exercer qualquer um dos seus direitos como titular de dados, você pode:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Enviar e-mail para: <a href="mailto:advdanyelferreira@gmail.com" className="text-gold hover:underline">advdanyelferreira@gmail.com</a></li>
                  <li>Entrar em contato pelo WhatsApp: (67) 99144-3348</li>
                  <li>Utilizar a área do perfil no site para gerenciar seus dados</li>
                </ul>
                <p className="text-navy/70 leading-relaxed mt-4">
                  Responderemos sua solicitação em até 15 dias, conforme previsto na LGPD.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Medidas de Segurança
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Implementamos as seguintes medidas para proteger seus dados:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controle de acesso restrito a dados pessoais</li>
                  <li>Monitoramento e auditoria de acessos</li>
                  <li>Treinamento da equipe sobre proteção de dados</li>
                  <li>Políticas de segurança da informação</li>
                  <li>Backup regular e plano de recuperação de dados</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Tratamento de Dados na IA Jurídica
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  As informações fornecidas à ferramenta de IA Jurídica são tratadas de forma segura e não são utilizadas para treinar modelos de inteligência artificial. Os dados das consultas são armazenados apenas para fins de melhoria do serviço e podem ser excluídos mediante solicitação do usuário.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Encarregado de Proteção de Dados (DPO)
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Para questões relacionadas à proteção de dados pessoais, nosso Encarregado de Proteção de Dados (DPO) pode ser contatado através do e-mail: <a href="mailto:advdanyelferreira@gmail.com" className="text-gold hover:underline">advdanyelferreira@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  Autoridade Nacional de Proteção de Dados
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Caso entenda que o tratamento de seus dados pessoais viola a LGPD, você tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD):
                </p>
                <a 
                  href="https://www.gov.br/anpd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg hover:bg-gold/20 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Acessar site da ANPD
                </a>
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
