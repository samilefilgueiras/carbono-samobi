'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Car, Zap, Battery, TrendingUp, AlertCircle } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [impactType, setImpactType] = useState<'mobility' | 'solar' | 'charging_station'>('mobility');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [objective, setObjective] = useState<'track' | 'accumulate' | 'monetize'>('track');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Verificar se aceitou termos
    const { data: profile } = await supabase
      .from('profiles')
      .select('accepted_terms, impact_type, monthly_volume, objective')
      .eq('id', user.id)
      .single();

    if (!profile?.accepted_terms) {
      router.push('/acceptance');
      return;
    }

    // Se já completou onboarding, ir para dashboard
    if (profile.impact_type && profile.monthly_volume && profile.objective) {
      router.push('/dashboard');
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!monthlyVolume) {
      setError('Por favor, informe seu volume mensal.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          impact_type: impactType,
          monthly_volume: parseFloat(monthlyVolume),
          objective: objective,
        })
        .eq('id', user.id);

      if (error) throw error;

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

  const getVolumeLabel = () => {
    switch (impactType) {
      case 'mobility': return 'km rodados';
      case 'solar': return 'kWh gerados';
      case 'charging_station': return 'kWh entregues';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Configuração Inicial
            </span>
          </CardTitle>
          <CardDescription className="text-base">
            Passo {step} de 3
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Qual impacto deseja acompanhar?</h3>
              </div>
              <Select value={impactType} onValueChange={(value: any) => setImpactType(value)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobility">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-emerald-600" />
                      <span>Mobilidade Elétrica</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="solar">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>Energia Solar</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="charging_station">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-blue-600" />
                      <span>Carregadores / Eletroposto</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Qual seu volume mensal?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getVolumeLabel()} por mês
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">{getVolumeLabel()}</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder={`Ex: ${impactType === 'mobility' ? '1500' : '500'}`}
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Objetivo principal:</h3>
              </div>
              <Select value={objective} onValueChange={(value: any) => setObjective(value)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="track">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>Acompanhar impacto</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="accumulate">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span>Acumular créditos</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="monetize">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span>Monetizar créditos futuramente</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {loading ? 'Salvando...' : step === 3 ? 'Concluir' : 'Próximo'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}