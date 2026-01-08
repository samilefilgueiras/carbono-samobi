'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, TrendingUp, DollarSign, Shield, ArrowLeft, CheckCircle } from 'lucide-react';

export default function AccumulateValuePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        if (!profileData.accepted_terms) {
          router.push('/acceptance');
          return;
        }
        if (!profileData.impact_type || !profileData.monthly_volume || !profileData.objective) {
          router.push('/onboarding');
          return;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateAccumulate = async () => {
    // Aqui poderia atualizar o perfil para modo acumular, mas por enquanto apenas volta
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-emerald-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <Card className="border-2 border-amber-200 dark:border-amber-800 shadow-2xl">
            <CardHeader className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-lg">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  📱✨ SEU CRÉDITO ACUMULADO VALE MAIS
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                Acumular seus créditos aumenta seu retorno.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Cada km rodado com seu carro elétrico, cada kWh solar gerado e cada recarga feita em seu carregador gera um ativo ambiental que pode ser vendido futuramente.
                </p>
                <p className="text-lg font-semibold">
                  Quanto mais você acumula, maior tende a ser o valor obtido na venda.
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">
                  💰 Por que acumular é mais vantajoso?
                </h3>
                <p className="mb-4">
                  Compradores de créditos pagam valores mais altos por lotes maiores:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">2×</p>
                    <p className="text-sm">mais por lotes de 50 tCO₂e</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-teal-600">Até 4×</p>
                    <p className="text-sm">mais por lotes de 200 tCO₂e</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-cyan-600">Até 5×</p>
                    <p className="text-sm">mais por lotes de 1.000 tCO₂e</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">
                  📦 Como isso funciona?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Você gera créditos automaticamente</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Eles são armazenados no Samobi Carbon Pool</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>A Samobi negocia lotes consolidados com compradores</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Lotes maiores → preços maiores</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Você recebe proporcionalmente</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-200">
                  💹 Exemplo real estimado
                </h3>
                <div className="space-y-2">
                  <p><strong>Venda isolada mensal:</strong> US$ 6 / tonelada</p>
                  <p><strong>Venda acumulada em lote grande:</strong> até US$ 18 / tonelada</p>
                  <p className="text-2xl font-bold text-green-600">➡ 3× mais lucro apenas acumulando.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  🔒 Segurança total
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Todos os créditos são registrados com ID único</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Auditoria digital</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Rastreabilidade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Prova de emissão evitada</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  🚀 Seu impacto vira renda
                </h3>
                <p className="text-lg">
                  Quanto mais você dirige, gera ou carrega, mais créditos acumula — e maior tende a ser o valor final.
                </p>
              </div>

              <Button
                onClick={handleActivateAccumulate}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ATIVAR MODO ACUMULAR
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}