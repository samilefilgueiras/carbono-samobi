'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Car, Zap, Battery, AlertCircle, ArrowLeft } from 'lucide-react';

export default function RegisterDataPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [km, setKm] = useState('');
  const [kwh, setKwh] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    }
  };

  const calculateCO2AndCredits = (kmValue: number, kwhValue: number, type: string) => {
    let co2Avoided = 0;
    let carbonCredits = 0;

    if (type === 'mobility' && kmValue > 0) {
      // Assumindo que um carro elétrico evita ~0.1 kg CO2 por km comparado a gasolina
      co2Avoided = kmValue * 0.1;
      carbonCredits = co2Avoided / 1000; // 1 tonelada = 1000 kg
    } else if ((type === 'solar' || type === 'charging_station') && kwhValue > 0) {
      // Assumindo que 1 kWh evita ~0.4 kg CO2
      co2Avoided = kwhValue * 0.4;
      carbonCredits = co2Avoided / 1000;
    }

    return { co2Avoided, carbonCredits };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const kmValue = parseFloat(km) || 0;
    const kwhValue = parseFloat(kwh) || 0;

    if (kmValue === 0 && kwhValue === 0) {
      setError('Informe pelo menos um valor (km ou kWh).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !profile) return;

      const { co2Avoided, carbonCredits } = calculateCO2AndCredits(kmValue, kwhValue, profile.impact_type!);
      const estimatedValue = carbonCredits * 4; // US$ 4 por tonelada, convertido para BRL (aprox)

      const { error } = await supabase
        .from('carbon_calculations')
        .insert({
          user_id: user.id,
          calculation_type: profile.impact_type!,
          km_per_month: kmValue > 0 ? kmValue : null,
          kwh_per_month: kwhValue > 0 ? kwhValue : null,
          co2_avoided_kg: co2Avoided,
          carbon_credits: carbonCredits,
          estimated_value_brl: estimatedValue,
        });

      if (error) throw error;

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

  const getInputLabel = () => {
    switch (profile?.impact_type) {
      case 'mobility': return 'Km rodados no mês';
      case 'solar': return 'kWh gerados no mês';
      case 'charging_station': return 'kWh entregues no mês';
    }
    return '';
  };

  const getIcon = () => {
    switch (profile?.impact_type) {
      case 'mobility': return <Car className="w-6 h-6 text-emerald-600" />;
      case 'solar': return <Zap className="w-6 h-6 text-amber-600" />;
      case 'charging_station': return <Battery className="w-6 h-6 text-blue-600" />;
    }
    return <Leaf className="w-6 h-6 text-emerald-600" />;
  };

  if (!profile) {
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
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
            <CardHeader className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                  {getIcon()}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Registrar Dados do Mês
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Informe seus dados para calcular o impacto ambiental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="input">{getInputLabel()}</Label>
                  <Input
                    id="input"
                    type="number"
                    step="0.01"
                    placeholder={`Ex: ${profile.impact_type === 'mobility' ? '1500' : '500'}`}
                    value={profile.impact_type === 'mobility' ? km : kwh}
                    onChange={(e) => profile.impact_type === 'mobility' ? setKm(e.target.value) : setKwh(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? 'Calculando...' : 'Calcular e Salvar'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}