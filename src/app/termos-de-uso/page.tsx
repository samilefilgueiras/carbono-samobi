'use client';

import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermosDeUsoPage() {
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
            Termos de Uso
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
            <CardTitle className="text-2xl">Termos e Condições de Uso</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ao acessar e utilizar o Samobi Carbon Hub, você concorda em cumprir e estar vinculado aos presentes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2. Descrição do Serviço</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                O Samobi Carbon Hub é uma plataforma que permite aos usuários:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Calcular e monitorar o CO₂ evitado através de mobilidade elétrica, energia solar ou operação de eletropostos</li>
                <li>Gerar créditos internos de carbono baseados em suas atividades sustentáveis</li>
                <li>Acumular créditos para venda futura através da Samobi Carbon</li>
                <li>Acessar relatórios profissionais de impacto ambiental</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">3. Cadastro e Conta</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Para utilizar nossos serviços, você deve:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Fornecer informações verdadeiras, precisas e completas durante o cadastro</li>
                <li>Manter suas credenciais de acesso seguras e confidenciais</li>
                <li>Notificar imediatamente a Samobi Carbon sobre qualquer uso não autorizado de sua conta</li>
                <li>Ser responsável por todas as atividades realizadas em sua conta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">4. Créditos de Carbono</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>4.1. Geração de Créditos:</strong> Os créditos de carbono são calculados com base nos dados fornecidos pelo usuário sobre suas atividades sustentáveis (km rodados em veículos elétricos, kWh gerados por energia solar, ou kWh fornecidos em eletropostos).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>4.2. Propriedade e Gestão:</strong> A Samobi Carbon é responsável pela gestão, registro, auditoria e comercialização dos créditos de carbono gerados através da plataforma.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>4.3. Precificação:</strong> Os valores de compra dos créditos são definidos exclusivamente pela Samobi Carbon, podendo variar conforme condições de mercado, câmbio e volume acumulado.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>4.4. Venda:</strong> A comercialização dos créditos para empresas compradoras é intermediada exclusivamente pela Samobi Carbon. Usuários não negociam diretamente com compradores corporativos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">5. Modo Acumular</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                O Modo Acumular permite que usuários consolidem seus créditos ao longo do tempo para potencialmente obter melhores valores de venda. A ativação deste modo é opcional e pode ser alterada a qualquer momento através das configurações da conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6. Pagamentos e Assinaturas</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>6.1. Planos:</strong> O acesso à plataforma requer assinatura de um dos planos disponíveis (Mobilidade, Solar ou Eletroposto).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                <strong>6.2. Renovação:</strong> As assinaturas são renovadas automaticamente conforme o período contratado (mensal ou anual).
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>6.3. Cancelamento:</strong> Você pode cancelar sua assinatura a qualquer momento através das configurações da conta ou entrando em contato com o suporte.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">7. Responsabilidades do Usuário</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                O usuário se compromete a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Fornecer dados verdadeiros e precisos sobre suas atividades sustentáveis</li>
                <li>Não manipular ou falsificar informações para gerar créditos indevidos</li>
                <li>Utilizar a plataforma de forma ética e legal</li>
                <li>Não tentar burlar sistemas de segurança ou acessar áreas restritas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">8. Limitação de Responsabilidade</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Samobi Carbon não se responsabiliza por flutuações de mercado, variações cambiais ou impossibilidade de venda dos créditos de carbono. Os valores apresentados são estimativas e não garantem retorno financeiro específico.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">9. Modificações dos Termos</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Samobi Carbon reserva-se o direito de modificar estes Termos de Uso a qualquer momento. Usuários serão notificados sobre mudanças significativas e o uso continuado da plataforma após as modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">10. Lei Aplicável</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será submetida ao foro da comarca de [Cidade], com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">11. Contato</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Para dúvidas sobre estes Termos de Uso, entre em contato através do email: <strong>contato@samobicarbon.com.br</strong>
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
