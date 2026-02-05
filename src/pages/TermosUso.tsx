import { Layout } from '@/components/layout/Layout';
import { Scale, FileText } from 'lucide-react';

export default function TermosUso() {
  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <FileText className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
                Termos de Uso
              </h1>
              <p className="text-navy/60">
                Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Ao acessar e utilizar o site do escritório Danyel Ferreira Advocacia & Consultoria, você concorda em cumprir e estar sujeito aos presentes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  2. Descrição dos Serviços
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  Este site oferece informações sobre os serviços jurídicos prestados pelo escritório, incluindo:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Informações sobre áreas de atuação</li>
                  <li>Agendamento de consultas virtuais</li>
                  <li>Acesso à ferramenta de IA Jurídica para orientações preliminares</li>
                  <li>Artigos e conteúdos informativos sobre temas jurídicos</li>
                  <li>Canais de contato com o escritório</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  3. Natureza das Informações
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  As informações disponibilizadas neste site, incluindo as respostas da IA Jurídica, têm caráter meramente informativo e educacional. <strong>Não constituem consultoria jurídica</strong> nem estabelecem relação advogado-cliente. Para orientação jurídica específica sobre seu caso, é necessário agendar uma consulta formal.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  4. Cadastro de Usuário
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Para utilizar determinados serviços, como agendamento de consultas e acesso à IA Jurídica, é necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  5. Uso Adequado
                </h2>
                <p className="text-navy/70 leading-relaxed mb-4">
                  O usuário compromete-se a:
                </p>
                <ul className="list-disc list-inside text-navy/70 space-y-2 ml-4">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Não utilizar o site para fins ilegais ou não autorizados</li>
                  <li>Não tentar acessar áreas restritas do sistema</li>
                  <li>Não reproduzir ou distribuir conteúdos sem autorização</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  6. Propriedade Intelectual
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Todo o conteúdo deste site, incluindo textos, imagens, logotipos e artigos, é protegido por direitos autorais e pertence ao escritório Danyel Ferreira Advocacia ou a seus licenciadores. A reprodução não autorizada é proibida.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  7. Limitação de Responsabilidade
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  O escritório não se responsabiliza por decisões tomadas com base exclusivamente nas informações deste site ou nas respostas da IA Jurídica. O uso dessas ferramentas não substitui a consulta com um advogado habilitado.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  8. Modificações dos Termos
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-4">
                  9. Contato
                </h2>
                <p className="text-navy/70 leading-relaxed">
                  Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: <a href="mailto:advdanyelferreira@gmail.com" className="text-gold hover:underline">advdanyelferreira@gmail.com</a>
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
