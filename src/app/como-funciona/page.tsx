"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Zap, Sun, BatteryCharging } from "lucide-react";

export default function ComoFunciona() {
  const router = useRouter();

  const planos = [
    {
      id: "mobilidade",
      titulo: "Mobilidade Elétrica",
      descricao: "Para quem possui carro elétrico ou híbrido",
      icon: Zap,
      cor: "from-blue-500 to-cyan-600",
      link: "https://checkout.keoto.com/a713bd2b-2819-4abf-a518-cd744cf96c6d",
    },
    {
      id: "solar",
      titulo: "Energia Solar",
      descricao: "Para quem possui sistema fotovoltaico",
      icon: Sun,
      cor: "from-orange-500 to-yellow-600",
      link: "https://checkout.keoto.com/9168cc60-9a89-4b94-b726-b107fbe33ab1",
    },
    {
      id: "eletroposto",
      titulo: "Eletropostos",
      descricao: "Para quem possui eletroposto ou wallbox",
      icon: BatteryCharging,
      cor: "from-emerald-500 to-teal-600",
      link: "https://checkout.keoto.com/7c30cfc7-ff4c-4319-8117-a56f8d79a51e",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Como funciona o Samobi Carbon Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Simples, transparente e acessível. Qualquer pessoa pode participar do mercado e assinar o plano.
          </p>
        </div>

        {/* Como funciona - Steps */}
        <div className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🌱 Como você gera créditos de carbono
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Você usa energia limpa</h3>
              <p className="text-gray-600">
                Seja dirigindo um carro elétrico, gerando energia solar ou operando um eletroposto.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nós calculamos seu impacto</h3>
              <p className="text-gray-600">
                Convertemos seus dados (km, kWh) em CO₂ evitado e créditos de carbono.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Você acumula e vende</h3>
              <p className="text-gray-600">
                Seus créditos são consolidados e vendidos para empresas. Você recebe o valor acordado.
              </p>
            </div>
          </div>
        </div>

        {/* Planos */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Escolha seu plano
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {planos.map((plano) => {
              const Icon = plano.icon;
              return (
                <div
                  key={plano.id}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${plano.cor} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {plano.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {plano.descricao}
                  </p>
                  
                  <a
                    href={plano.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${plano.cor} hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg`}
                  >
                    Assinar agora
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Por que escolher o Samobi Carbon Hub?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Transparência total</h3>
                <p className="text-white/90">Você acompanha cada crédito gerado e seu valor em tempo real.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Sem complicação</h3>
                <p className="text-white/90">Nós cuidamos de toda a burocracia, auditoria e venda.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Renda extra</h3>
                <p className="text-white/90">Transforme seu impacto positivo em receita real.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Impacto mensurável</h3>
                <p className="text-white/90">Relatórios ESG completos para você ou sua empresa.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Link voltar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900 underline text-lg"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  );
}
