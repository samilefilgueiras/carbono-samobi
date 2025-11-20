'use client';

import { Car, Zap, Battery, Leaf, TrendingUp, Users, Award, CheckCircle2 } from 'lucide-react';
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
                Primeiro Hub Brasileiro de Créditos de Carbono
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Transforme seu impacto
              </span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">
                em crédito de carbono
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Você dirige elétrico, tem energia solar ou um eletroposto?
              <br />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Você está gerando créditos de carbono e nem sabe.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Calcular Meu Impacto
              </Button>
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
                <span><strong className="text-gray-900 dark:text-gray-100">1.247</strong> na lista de espera</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span><strong className="text-gray-900 dark:text-gray-100">15 ton</strong> de CO₂ evitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span><strong className="text-gray-900 dark:text-gray-100">682</strong> árvores equivalentes</span>
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
              Calcule seu impacto em{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                30 segundos
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubra quanto CO₂ você evita e quanto vale em créditos de carbono
            </p>
          </div>

          <CarbonCalculator />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Como funciona o{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Samobi Carbon
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simples, transparente e acessível para todos
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
                <CardTitle className="text-2xl">Cadastre-se</CardTitle>
                <CardDescription className="text-base">
                  Escolha seu módulo: Mobilidade, Solar ou Eletroposto
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
                <CardTitle className="text-2xl">Acompanhe</CardTitle>
                <CardDescription className="text-base">
                  Registre seus dados e veja seu impacto crescer em tempo real
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
                  Acumule créditos e venda para empresas (em breve)
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Módulos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Para motoristas de carros elétricos e híbridos
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Calcule CO₂ evitado por km rodado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios mensais de impacto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Desconto para motoristas de app</span>
                  </li>
                </ul>
                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">A partir de</p>
                  <p className="text-3xl font-bold text-emerald-600">R$ 9,90<span className="text-base font-normal">/mês</span></p>
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
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Para donos de sistemas de geração solar
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Calcule CO₂ evitado por kWh gerado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Valorize seu investimento solar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios ESG profissionais</span>
                  </li>
                </ul>
                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">A partir de</p>
                  <p className="text-3xl font-bold text-amber-600">R$ 19,90<span className="text-base font-normal">/mês</span></p>
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
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Para operadores de carregadores elétricos
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Monetize o impacto ambiental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Diferencial competitivo ESG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Relatórios para clientes B2B</span>
                  </li>
                </ul>
                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">A partir de</p>
                  <p className="text-3xl font-bold text-blue-600">R$ 39,90<span className="text-base font-normal">/mês</span></p>
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
              Crédito de carbono não é mais só pra grande empresa. É seu também.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Simples e Transparente</h3>
                <p className="opacity-90">
                  Cálculos validados, metodologia clara, sem complexidade desnecessária
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Para Todos</h3>
                <p className="opacity-90">
                  Motoristas, donos de solar, eletropostos - todos podem participar
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Impacto Real</h3>
                <p className="opacity-90">
                  Veja seu impacto crescer em tempo real, com relatórios profissionais
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Monetização Futura</h3>
                <p className="opacity-90">
                  Marketplace para vender créditos para empresas (em breve)
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
              Pronto para fazer parte do{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                movimento?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Entre na lista de espera e seja um dos primeiros a transformar seu impacto em créditos
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
              O primeiro hub brasileiro de microgeradores de créditos de carbono
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
