'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type CarbonCalculation } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, BarChart3, TrendingUp, Calendar, Car, Zap, Battery, ArrowLeft, Download } from 'lucide-react';

export default function ReportsPage() {
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

  const totalCO2 = calculations.reduce((sum, calc) => sum + calc.co2_avoided_kg, 0);
  const totalCredits = calculations.reduce((sum, calc) => sum + calc.carbon_credits, 0);
  const totalValue = calculations.reduce((sum, calc) => sum + calc.estimated_value_brl, 0);
  const avgMonthlyCO2 = calculations.length > 0 ? totalCO2 / calculations.length : 0;

  const handleExport = () => {
    // Placeholder para exportação - em implementação futura
    alert('Funcionalidade de exportação será implementada em breve!');
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
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Relatórios Detalhados
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Análises completas do seu impacto ambiental
              </p>
            </div>
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Relatório
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="pb-3">
                <CardDescription>Total CO₂ Evitado</CardDescription>
                <CardTitle className="text-2xl font-bold text-emerald-600">
                  {totalCO2.toFixed(2)} kg
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Acumulado total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 dark:border-teal-800">
              <CardHeader className="pb-3">
                <CardDescription>Créditos Gerados</CardDescription>
                <CardTitle className="text-2xl font-bold text-teal-600">
                  {totalCredits.toFixed(4)} t
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Leaf className="w-4 h-4" />
                  <span>Toneladas equivalentes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 dark:border-cyan-800">
              <CardHeader className="pb-3">
                <CardDescription>Média Mensal CO₂</CardDescription>
                <CardTitle className="text-2xl font-bold text-cyan-600">
                  {avgMonthlyCO2.toFixed(2)} kg
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Por mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-3">
                <CardDescription>Valor Potencial</CardDescription>
                <CardTitle className="text-2xl font-bold text-amber-600">
                  R$ {totalValue.toFixed(2)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>Estimativa atual</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-2 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-xl">Evolução Mensal de CO₂ Evitado</CardTitle>
                <CardDescription>
                  Gráfico mostrando seu impacto ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Gráfico será implementado em breve
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 dark:border-teal-800">
              <CardHeader>
                <CardTitle className="text-xl">Distribuição por Tipo de Atividade</CardTitle>
                <CardDescription>
                  Como suas ações contribuem para o impacto total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Gráfico será implementado em breve
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Histórico Detalhado</CardTitle>
              <CardDescription>
                Todos os registros com detalhes completos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {calculations.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhum dado registrado ainda.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4">Data</th>
                        <th className="text-left py-3 px-4">Tipo</th>
                        <th className="text-right py-3 px-4">Km/kWh</th>
                        <th className="text-right py-3 px-4">CO₂ Evitado (kg)</th>
                        <th className="text-right py-3 px-4">Créditos (t)</th>
                        <th className="text-right py-3 px-4">Valor Estimado (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.map((calc) => (
                        <tr key={calc.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4">
                            {new Date(calc.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {calc.calculation_type === 'mobility' && <Car className="w-4 h-4 text-emerald-600" />}
                              {calc.calculation_type === 'solar' && <Zap className="w-4 h-4 text-amber-600" />}
                              {calc.calculation_type === 'charging_station' && <Battery className="w-4 h-4 text-blue-600" />}
                              <span>
                                {calc.calculation_type === 'mobility' && 'Mobilidade'}
                                {calc.calculation_type === 'solar' && 'Solar'}
                                {calc.calculation_type === 'charging_station' && 'Eletroposto'}
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">
                            {calc.km_per_month ? `${calc.km_per_month} km` : `${calc.kwh_per_month} kWh`}
                          </td>
                          <td className="text-right py-3 px-4 text-emerald-600 font-semibold">
                            {calc.co2_avoided_kg.toFixed(2)}
                          </td>
                          <td className="text-right py-3 px-4 text-teal-600 font-semibold">
                            {calc.carbon_credits.toFixed(4)}
                          </td>
                          <td className="text-right py-3 px-4 text-amber-600 font-semibold">
                            R$ {calc.estimated_value_brl.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}