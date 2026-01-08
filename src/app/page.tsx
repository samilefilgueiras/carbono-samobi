'use client';

import { Car, Zap, Battery, Leaf, TrendingUp, Users, Award, CheckCircle2, Shield, DollarSign, BarChart3, FileText } from 'lucide-react';
import { CarbonCalculator } from '@/components/custom/carbon-calculator';
import { EmailCapture } from '@/components/custom/email-capture';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/5 dark:via-teal-500/5 dark:to-cyan-500/5" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full border border-emerald-300 dark:border-emerald-700">
              <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Primeiro Ecossistema Brasileiro de Microgeradores de Créditos de Carbono
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Transforme seu impacto
              </span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">
                em créditos de carbono
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Você dirige elétrico, tem energia solar ou opera um eletroposto?
              <br />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Você está gerando créditos de carbono e pode monetizá-los.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/quiz?origem=quero_fazer_parte">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Quero Fazer Parte
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Como Funciona
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span><strong className="text-gray-900 dark:text-gray-100">1.247+</strong> usuários ativos</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span><strong className="text-gray-900 dark:text-gray-100">15+ ton</strong> de CO₂ evitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span><strong className="text-gray-900 dark:text-gray-100">682+</strong> árvores equivalentes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Descubra quanto você já evitou em{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                30 segundos
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calcule quanto CO₂ você evita e o valor potencial em créditos de carbono
            </p>
          </div>

          <CarbonCalculator />
        </div>
      </section>

      {/* Value Proposition - Seu Crédito Vale Mais */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Estratégia de Valorização
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Seu Crédito Acumulado Vale Mais
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Quanto mais você acumula, maior o valor de venda. Compradores pagam prêmio por lotes maiores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="text-5xl font-bold mb-2">2×</div>
                  <CardTitle className="text-xl">50 tCO₂e</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm opacity-90">Valorização de até 2× no preço de venda</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform md:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="text-5xl font-bold mb-2">4×</div>
                  <CardTitle className="text-xl">200 tCO₂e</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm opacity-90">Valorização de até 4× no preço de venda</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="text-5xl font-bold mb-2">5×</div>
                  <CardTitle className="text-xl">1.000 tCO₂e</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm opacity-90">Valorização de até 5× no preço de venda</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Exemplo Prático
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="opacity-90">Venda mensal isolada:</span>
                      <span className="font-bold">US$ 6/ton</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="opacity-90">Venda acumulada (lote):</span>
                      <span className="font-bold text-emerald-300">até US$ 18/ton</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Segurança Total
                  </h3>
                  <p className="text-sm opacity-90">
                    Todos os créditos têm ID único, auditoria digital e registro seguro na plataforma Samobi Carbon Hub.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 text-center">
                <Link href="/quiz?modo_acumular=true">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold shadow-xl"
                  >
                    Ativar Modo Acumular
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Como funciona o{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Samobi Carbon Hub
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simples, transparente e acessível. Qualquer pessoa pode participar do mercado de carbono.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Passo 1 */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    1
                  </div>
                </div>
                <CardTitle className="text-2xl">Escolha seu Módulo</CardTitle>
                <CardDescription className="text-base">
                  Mobilidade Elétrica, Energia Solar ou Eletropostos/Carregadores
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Passo 2 */}
            <Card className="border-2 border-teal-200 dark:border-teal-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    2
                  </div>
                </div>
                <CardTitle className="text-2xl">Registre & Acumule</CardTitle>
                <CardDescription className="text-base">
                  Insira seus dados mensais e veja seus créditos crescerem em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Passo 3 */}
            <Card className="border-2 border-cyan-200 dark:border-cyan-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    3
                  </div>
                </div>
                <CardTitle className="text-2xl">Monetize</CardTitle>
                <CardDescription className="text-base">
                  Venda seus créditos acumulados para empresas através da Samobi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Pricing Cards - Módulos */}
          <div id="pricing" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mobilidade Elétrica */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                    <Car className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Mobilidade Elétrica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
                  Para motoristas de carros elétricos e híbridos (Uber, 99, táxi, proprietários)
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Calcule CO₂ evitado por km rodado automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios mensais de impacto em PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Carteira de créditos acumulados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Equivalências (árvores, gasolina evitada)</span>
                  </li>
                </ul>
                <div className="pt-4 text-center space-y-2">
                  <p className="text-3xl font-bold text-emerald-600">R$ 9,90<span className="text-base font-normal">/mês</span></p>
                  <p className="text-sm text-emerald-600 font-semibold">ou R$ 99/ano</p>
                  <a href="https://checkout.keoto.com/a713bd2b-2819-4abf-a518-cd744cf96c6d" target="_blank" rel="noopener noreferrer">
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                    >
                      Assinar Agora
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Energia Solar */}
            <Card className="border-2 border-amber-200 dark:border-amber-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Energia Solar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
                  Para donos de sistemas de geração solar (residencial, comercial, rural)
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Calcule CO₂ evitado por kWh gerado (fator SIN)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Valorize seu investimento em energia limpa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios ESG profissionais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Créditos acumulados com rastreabilidade</span>
                  </li>
                </ul>
                <div className="pt-4 text-center space-y-2">
                  <p className="text-3xl font-bold text-amber-600">R$ 19,90<span className="text-base font-normal">/mês</span></p>
                  <p className="text-sm text-amber-600 font-semibold">ou R$ 199/ano</p>
                  <a href="https://checkout.keoto.com/9168cc60-9a89-4b94-b726-b107fbe33ab1" target="_blank" rel="noopener noreferrer">
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    >
                      Assinar Agora
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Eletropostos */}
            <Card className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
                    <Battery className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Eletropostos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
                  Para operadores de carregadores (shoppings, condomínios, wallbox)
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Monetize o impacto ambiental do seu carregador</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Diferencial competitivo ESG para seu negócio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios profissionais para clientes B2B</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Estimativa de km abastecidos e CO₂ evitado</span>
                  </li>
                </ul>
                <div className="pt-4 text-center space-y-2">
                  <p className="text-3xl font-bold text-blue-600">R$ 22,90<span className="text-base font-normal">/mês</span></p>
                  <p className="text-sm text-blue-600 font-semibold">ou R$ 229/ano</p>
                  <a href="https://checkout.keoto.com/7c30cfc7-ff4c-4319-8117-a56f8d79a51e" target="_blank" rel="noopener noreferrer">
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                    >
                      Assinar Agora
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                Valores de{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Compra e Venda
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Transparência total nos valores praticados pela Samobi Carbon
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xl">Preço de Compra pela Samobi Carbon</CardTitle>
                  </div>
                  <CardDescription>Valor pago aos usuários pela Samobi Carbon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-5xl font-bold text-emerald-600">até US$ 4</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">por tonelada CO₂e</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                      * Valor pode variar de acordo com a cotação do câmbio
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Preço de Venda para Empresas</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        A Samobi Carbon vende os créditos para empresas compradoras por valores entre <strong>US$ 8 a US$ 18 por tonelada CO₂e</strong>, dependendo do volume acumulado e demanda de mercado.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-amber-200 dark:border-amber-700 pt-4 space-y-3 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Os valores pagos ao usuário são sempre definidos pela Samobi Carbon</strong> e podem variar conforme câmbio e condições de mercado.
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Compradores corporativos não têm relação direta com usuários individuais. Todas as transações são intermediadas pela Samobi Carbon.
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold flex-shrink-0">⚠</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        A Samobi pode realizar compra antecipada de créditos mediante autorização prévia do usuário.
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Por que o Samobi Carbon é diferente?
            </h2>
            <p className="text-xl opacity-90">
              Crédito de carbono não é mais só para grandes empresas. Agora é acessível para todos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Simples e Transparente</h3>
                <p className="opacity-90">
                  Cálculos validados, metodologia clara, sem complexidade desnecessária. Você entende exatamente o que está gerando.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Para Todos</h3>
                <p className="opacity-90">
                  Motoristas, donos de solar, operadores de eletropostos - qualquer pessoa pode participar do mercado de carbono.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Relatórios Profissionais</h3>
                <p className="opacity-90">
                  Relatórios ESG em PDF com gráficos, equivalências e assinatura digital. Compartilhe seu impacto.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Seguro e Auditável</h3>
                <p className="opacity-90">
                  Todos os créditos têm ID único, auditoria digital e rastreabilidade completa na blockchain.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Impacto Real</h3>
                <p className="opacity-90">
                  Veja seu impacto crescer em tempo real, com gráficos de evolução e projeções financeiras.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Monetização Futura</h3>
                <p className="opacity-90">
                  Marketplace para vender créditos acumulados para empresas que precisam compensar emissões.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Pronto para transformar seu{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                impacto em valor?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Entre na lista de espera e seja um dos primeiros a monetizar seus créditos de carbono
            </p>
          </div>

          <EmailCapture />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">Samobi Carbon Hub</span>
            </div>
            <p className="text-gray-400">
              O primeiro ecossistema brasileiro de microgeradores de créditos de carbono
            </p>
            <p className="text-sm text-gray-500">
              Liderança e credibilidade: Samile Filgueiras
            </p>
            <div className="pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                © 2024 Samobi Carbon Hub. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
