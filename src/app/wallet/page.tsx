'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type CarbonCalculation } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Wallet, TrendingUp, Calendar, Car, Zap, Battery, ArrowLeft, DollarSign } from 'lucide-react';

export default function WalletPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [calculations, setCalculations] = useState<CarbonCalculation[]>([]);
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

      // Buscar cálculos
      const { data: calculationsData } = await supabase
        .from('carbon_calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (calculationsData) {
        setCalculations(calculationsData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCredits = calculations.reduce((sum, calc) => sum + calc.carbon_credits, 0);
  const totalValue = calculations.reduce((sum, calc) => sum + calc.estimated_value_brl, 0);

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-teal-200 dark:border-teal-800">
              <CardHeader className="pb-3">
                <CardDescription>Total Acumulado</CardDescription>
                <CardTitle className="text-3xl font-bold text-teal-600">
                  {totalCredits.toFixed(4)}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toneladas CO₂ equivalente</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Wallet className="w-4 h-4" />
                  <span>Créditos Samobi</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-3">
                <CardDescription>Valor Estimado</CardDescription>
                <CardTitle className="text-3xl font-bold text-amber-600">
                  R$ {totalValue.toFixed(2)}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Baseado em US$ 4/tonelada</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span>Potencial de venda</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="pb-3">
                <CardDescription>Status da Conta</CardDescription>
                <CardTitle className="text-lg font-bold text-emerald-600">
                  Ativa
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conta verificada</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Acumulação ativa</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-2 border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Wallet className="w-6 h-6 text-teal-600" />
                Extrato Mês a Mês
              </CardTitle>
              <CardDescription>
                Histórico detalhado dos seus créditos gerados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {calculations.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhum crédito ainda. Comece registrando seus dados!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {calculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {calc.calculation_type === 'mobility' && <Car className="w-5 h-5 text-emerald-600" />}
                          {calc.calculation_type === 'solar' && <Zap className="w-5 h-5 text-amber-600" />}
                          {calc.calculation_type === 'charging_station' && <Battery className="w-5 h-5 text-blue-600" />}
                          <span className="font-semibold">
                            {calc.calculation_type === 'mobility' && 'Mobilidade Elétrica'}
                            {calc.calculation_type === 'solar' && 'Energia Solar'}
                            {calc.calculation_type === 'charging_station' && 'Eletroposto'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(calc.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {calc.km_per_month && (
                          <div>
                            <p className="text-gray-500">Km rodados</p>
                            <p className="font-semibold">{calc.km_per_month} km</p>
                          </div>
                        )}
                        {calc.kwh_per_month && (
                          <div>
                            <p className="text-gray-500">kWh</p>
                            <p className="font-semibold">{calc.kwh_per_month} kWh</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-500">CO₂ evitado</p>
                          <p className="font-semibold text-emerald-600">{calc.co2_avoided_kg.toFixed(2)} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Créditos gerados</p>
                          <p className="font-semibold text-teal-600">+{calc.carbon_credits.toFixed(4)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-2xl">💵 VALOR DE COMPRA – SAMOBI CARBON</CardTitle>
              <CardDescription>
                A Samobi estabelece preços internos transparentes para compra dos créditos do usuário.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="font-semibold text-amber-800 dark:text-amber-200">
                  📌 Preço atual de compra pela Samobi:
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  US$ 4 por tonelada de CO₂ equivalente
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  📌 Preço médio de venda de lotes consolidados para compradores:
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  US$ 8 a US$ 18 por tonelada
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  (informação meramente ilustrativa; não disponível para venda direta ao usuário)
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="font-semibold text-red-800 dark:text-red-200">
                  🔒 Os usuários vendem seus créditos exclusivamente para a Samobi Carbon Hub, conforme disponibilidade e lote.
                </p>
              </div>

              <Button
                onClick={() => router.push('/accumulate-value')}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold"
              >
                Seu Crédito Acumulado Vale Mais
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}