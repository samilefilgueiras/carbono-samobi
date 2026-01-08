'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type CarbonCalculation } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, LogOut, TrendingUp, DollarSign, Calendar, Car, Zap, Battery, Plus } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [calculations, setCalculations] = useState<CarbonCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Form states
  const [kmPerMonth, setKmPerMonth] = useState('');
  const [kwhPerMonth, setKwhPerMonth] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

      // Buscar perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let co2AvoidedKg = 0;
      let calculationType = profile?.user_type || 'mobility';

      if (calculationType === 'mobility' && kmPerMonth) {
        // 0.12 kg CO2/km evitado (média carro a combustão vs elétrico)
        co2AvoidedKg = parseFloat(kmPerMonth) * 0.12;
      } else if ((calculationType === 'solar' || calculationType === 'charging_station') && kwhPerMonth) {
        // 0.075 kg CO2/kWh evitado (fator de emissão médio da rede brasileira)
        co2AvoidedKg = parseFloat(kwhPerMonth) * 0.075;
      }

      const carbonCredits = co2AvoidedKg / 1000; // 1 crédito = 1 tonelada CO2
      const estimatedValueBrl = carbonCredits * 150; // R$ 150 por crédito (valor médio)

      const { error } = await supabase
        .from('carbon_calculations')
        .insert({
          user_id: user.id,
          calculation_type: calculationType,
          km_per_month: kmPerMonth ? parseFloat(kmPerMonth) : null,
          kwh_per_month: kwhPerMonth ? parseFloat(kwhPerMonth) : null,
          co2_avoided_kg: co2AvoidedKg,
          carbon_credits: carbonCredits,
          estimated_value_brl: estimatedValueBrl,
        });

      if (error) throw error;

      // Recarregar cálculos
      await checkUser();
      setShowCalculator(false);
      setKmPerMonth('');
      setKwhPerMonth('');
    } catch (error) {
      console.error('Erro ao salvar cálculo:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalCO2 = calculations.reduce((sum, calc) => sum + calc.co2_avoided_kg, 0);
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
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-emerald-200 dark:border-emerald-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Samobi Carbon Hub
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Olá, {profile?.full_name || profile?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-3">
              <CardDescription>CO₂ Evitado</CardDescription>
              <CardTitle className="text-3xl font-bold text-emerald-600">
                {totalCO2.toFixed(2)} kg
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>Total acumulado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 dark:border-teal-800">
            <CardHeader className="pb-3">
              <CardDescription>Créditos de Carbono</CardDescription>
              <CardTitle className="text-3xl font-bold text-teal-600">
                {totalCredits.toFixed(4)}
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
              <CardDescription>Valor Estimado</CardDescription>
              <CardTitle className="text-3xl font-bold text-cyan-600">
                R$ {totalValue.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>Potencial de monetização</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Section */}
        <Card className="mb-8 border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Novo Cálculo</CardTitle>
                <CardDescription>
                  Registre seu impacto mensal
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {showCalculator ? 'Fechar' : 'Adicionar'}
              </Button>
            </div>
          </CardHeader>
          {showCalculator && (
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-4">
                {profile?.user_type === 'mobility' && (
                  <div className="space-y-2">
                    <Label htmlFor="km" className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Quilômetros rodados no mês
                    </Label>
                    <Input
                      id="km"
                      type="number"
                      placeholder="Ex: 1500"
                      value={kmPerMonth}
                      onChange={(e) => setKmPerMonth(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                )}

                {(profile?.user_type === 'solar' || profile?.user_type === 'charging_station') && (
                  <div className="space-y-2">
                    <Label htmlFor="kwh" className="flex items-center gap-2">
                      {profile.user_type === 'solar' ? <Zap className="w-4 h-4" /> : <Battery className="w-4 h-4" />}
                      kWh {profile.user_type === 'solar' ? 'gerados' : 'fornecidos'} no mês
                    </Label>
                    <Input
                      id="kwh"
                      type="number"
                      placeholder="Ex: 500"
                      value={kwhPerMonth}
                      onChange={(e) => setKwhPerMonth(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {submitting ? 'Calculando...' : 'Calcular Impacto'}
                </Button>
              </form>
            </CardContent>
          )}
        </Card>

        {/* History */}
        <Card className="border-2 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Histórico de Cálculos</CardTitle>
            <CardDescription>
              Seus registros de impacto ambiental
            </CardDescription>
          </CardHeader>
          <CardContent>
            {calculations.length === 0 ? (
              <div className="text-center py-12">
                <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhum cálculo registrado ainda. Adicione seu primeiro cálculo acima!
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
                        <p className="text-gray-500">Créditos</p>
                        <p className="font-semibold text-teal-600">{calc.carbon_credits.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor estimado</p>
                        <p className="font-semibold text-cyan-600">R$ {calc.estimated_value_brl.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
