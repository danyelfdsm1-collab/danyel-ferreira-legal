import { Layout } from '@/components/layout/Layout';
import { Scale, Shield } from 'lucide-react';

export default function PoliticaPrivacidade() {
  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
                Política de Privacidade
              </h1>
              <p className="text-navy/60">
                Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  1. Introdução
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  O escritório Danyel Ferreira Advocacia & Consultoria está comprometido com a proteção da privacidade e dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  2. Dados Coletados
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Podemos coletar os seguintes tipos de dados pessoais:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li><strong>Dados de identificação:</strong> nome completo, e-mail, telefone</li>
                  <li><strong>Dados de acesso:</strong> informações de login, histórico de navegação no site</li>
                  <li><strong>Dados de consulta:</strong> informações fornecidas ao agendar consultas ou usar a IA Jurídica</li>
                  <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo utilizado</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  3. Finalidade do Tratamento
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Utilizamos seus dados pessoais para:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Gerenciar sua conta e fornecer os serviços solicitados</li>
                  <li>Agendar e realizar consultas jurídicas</li>
                  <li>Fornecer orientações através da IA Jurídica</li>
                  <li>Enviar comunicações relevantes sobre nossos serviços</li>
                  <li>Melhorar a experiência do usuário em nosso site</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  4. Base Legal
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  O tratamento de dados pessoais é realizado com base no consentimento do titular, na execução de contrato, no cumprimento de obrigação legal ou no legítimo interesse do controlador, conforme previsto na Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  5. Compartilhamento de Dados
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Seus dados pessoais poderão ser compartilhados com:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Prestadores de serviços que auxiliam na operação do site</li>
                  <li>Autoridades públicas, quando exigido por lei</li>
                  <li>Parceiros tecnológicos para funcionamento da IA Jurídica</li>
                </ul>
                <p className="text-navy/70 leading-relaxed mt-4">
                  Não vendemos ou alugamos seus dados pessoais a terceiros.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  6. Segurança dos Dados
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, controles de acesso e monitoramento contínuo de segurança.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  7. Retenção de Dados
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Dados de consultas jurídicas são mantidos pelo prazo prescricional aplicável.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  8. Seus Direitos
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Conforme a LGPD, você tem direito a:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar anonimização, bloqueio ou eliminação de dados</li>
                  <li>Revogar o consentimento a qualquer momento</li>
                  <li>Solicitar a portabilidade dos dados</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  9. Cookies
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  10. Contato do Encarregado (DPO)
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados, entre em contato com nosso Encarregado de Proteção de Dados pelo e-mail: <a href="mailto:advdanyelferreira@gmail.com" className="text-gold hover:underline">advdanyelferreira@gmail.com</a>
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
