'use client';

import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-10 h-10 text-emerald-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">Samobi Carbon Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Botão Voltar */}
        <div className="mb-6">
          <Link href="/aceite-legal">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* Conteúdo */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-2xl">Política de Privacidade e Proteção de Dados</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1. Introdução</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Samobi Carbon está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2. Dados Coletados</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>2.1. Dados de Cadastro:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Nome completo</li>
                <li>Email</li>
                <li>CPF ou CNPJ</li>
                <li>Telefone</li>
                <li>Endereço (cidade e estado)</li>
                <li>Tipo de usuário (Pessoa Física ou Jurídica)</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 mt-4">
                <strong>2.2. Dados de Atividade Sustentável:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Quilometragem rodada em veículos elétricos/híbridos</li>
                <li>Energia gerada por sistemas solares (kWh)</li>
                <li>Energia fornecida em eletropostos (kWh)</li>
                <li>Módulo principal de impacto escolhido</li>
                <li>Volume mensal estimado de atividade</li>
                <li>Objetivo com a plataforma</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 mt-4">
                <strong>2.3. Dados de Navegação:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Endereço IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas acessadas</li>
                <li>Tempo de permanência</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">3. Finalidade do Tratamento de Dados</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Utilizamos seus dados pessoais para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Criar e gerenciar sua conta na plataforma</li>
                <li>Calcular o CO₂ evitado e gerar créditos de carbono</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Gerar relatórios de impacto ambiental personalizados</li>
                <li>Intermediar a venda de créditos de carbono para empresas</li>
                <li>Enviar comunicações sobre sua conta e serviços</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">4. Base Legal para Tratamento</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais da LGPD:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Consentimento:</strong> Você consente expressamente com o tratamento de seus dados ao aceitar esta Política</li>
                <li><strong>Execução de contrato:</strong> Necessário para fornecer os serviços contratados</li>
                <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços e prevenir fraudes</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Para atender requisitos fiscais e regulatórios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">5. Compartilhamento de Dados</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Seus dados pessoais podem ser compartilhados com:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Empresas compradoras de créditos:</strong> Apenas dados agregados e anonimizados sobre os créditos de carbono</li>
                <li><strong>Processadores de pagamento:</strong> Para processar transações financeiras</li>
                <li><strong>Provedores de serviços:</strong> Que auxiliam na operação da plataforma (hospedagem, análise de dados, etc.)</li>
                <li><strong>Autoridades competentes:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                <strong>Importante:</strong> Nunca vendemos seus dados pessoais para terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6. Armazenamento e Segurança</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>6.1. Medidas de Segurança:</strong> Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares</li>
                <li>Auditorias de segurança periódicas</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                <strong>6.2. Período de Retenção:</strong> Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Após esse período, os dados são anonimizados ou excluídos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">7. Seus Direitos (LGPD)</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                <li><strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> De dados desnecessários, excessivos ou tratados em desconformidade</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e interoperável</li>
                <li><strong>Eliminação:</strong> Dos dados tratados com base no consentimento</li>
                <li><strong>Informação:</strong> Sobre compartilhamento de dados com terceiros</li>
                <li><strong>Revogação do consentimento:</strong> A qualquer momento</li>
                <li><strong>Oposição:</strong> Ao tratamento realizado com base em legítimo interesse</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Para exercer seus direitos, entre em contato através do email: <strong>privacidade@samobicarbon.com.br</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">8. Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">9. Transferência Internacional de Dados</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Alguns de nossos provedores de serviços podem estar localizados fora do Brasil. Nesses casos, garantimos que medidas adequadas de proteção sejam implementadas conforme exigido pela LGPD.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">10. Menores de Idade</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados de menores sem o consentimento dos pais ou responsáveis legais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">11. Alterações nesta Política</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através de email ou aviso na plataforma. A data da última atualização será sempre indicada no topo deste documento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">12. Encarregado de Dados (DPO)</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Para questões relacionadas à proteção de dados pessoais, você pode entrar em contato com nosso Encarregado de Dados:
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                <strong>Email:</strong> dpo@samobicarbon.com.br<br />
                <strong>Endereço:</strong> [Endereço completo da empresa]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">13. Contato</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato:
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                <strong>Email:</strong> privacidade@samobicarbon.com.br<br />
                <strong>Telefone:</strong> [Telefone de contato]
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Botão Voltar Inferior */}
        <div className="mt-6">
          <Link href="/aceite-legal">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Aceite Legal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
