'use client';

import { useState } from 'react';
import { Calculator, Leaf, Zap, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  calculateMobilityCO2,
  calculateSolarCO2,
  calculateChargingStationCO2,
  formatNumber,
  formatCurrency,
  type CarbonResult,
} from '@/lib/carbon-calculations';

type CalculatorType = 'mobility' | 'solar' | 'charging';

export function CarbonCalculator() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('mobility');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<CarbonResult | null>(null);

  const handleCalculate = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return;

    let calculationResult: CarbonResult;

    switch (calculatorType) {
      case 'mobility':
        calculationResult = calculateMobilityCO2({ kmDriven: value, vehicleType: 'BEV' });
        break;
      case 'solar':
        calculationResult = calculateSolarCO2({ kwhGenerated: value });
        break;
      case 'charging':
        calculationResult = calculateChargingStationCO2({ kwhDelivered: value });
        break;
    }

    setResult(calculationResult);
  };

  const getInputLabel = () => {
    switch (calculatorType) {
      case 'mobility':
        return 'Quantos km você rodou?';
      case 'solar':
        return 'Quantos kWh você gerou?';
      case 'charging':
        return 'Quantos kWh você entregou?';
    }
  };

  const getInputPlaceholder = () => {
    switch (calculatorType) {
      case 'mobility':
        return 'Ex: 100';
      case 'solar':
        return 'Ex: 500';
      case 'charging':
        return 'Ex: 1000';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
        <CardHeader className="text-center space-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Calculator className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Calculadora de CO₂
          </CardTitle>
          <CardDescription className="text-base">
            Descubra quanto CO₂ você evita em 30 segundos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Seletor de Tipo */}
          <div className="space-y-2">
            <Label htmlFor="calculator-type" className="text-base font-semibold">
              O que você quer calcular?
            </Label>
            <Select
              value={calculatorType}
              onValueChange={(value) => {
                setCalculatorType(value as CalculatorType);
                setResult(null);
                setInputValue('');
              }}
            >
              <SelectTrigger id="calculator-type" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobility" className="text-base py-3">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-emerald-600" />
                    <span>Mobilidade Elétrica (km rodados)</span>
                  </div>
                </SelectItem>
                <SelectItem value="solar" className="text-base py-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <span>Energia Solar (kWh gerados)</span>
                  </div>
                </SelectItem>
                <SelectItem value="charging" className="text-base py-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span>Eletroposto (kWh entregues)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input de Valor */}
          <div className="space-y-2">
            <Label htmlFor="input-value" className="text-base font-semibold">
              {getInputLabel()}
            </Label>
            <div className="flex gap-3">
              <Input
                id="input-value"
                type="number"
                placeholder={getInputPlaceholder()}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                className="h-12 text-lg"
              />
              <Button
                onClick={handleCalculate}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Calcular
              </Button>
            </div>
          </div>

          {/* Resultado */}
          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* CO₂ Evitado - Destaque Principal */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-2xl">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium opacity-90">Você evitou</p>
                  <p className="text-5xl font-bold">
                    {formatNumber(result.co2Avoided, 1)} kg
                  </p>
                  <p className="text-xl font-semibold">de CO₂</p>
                </div>
              </div>

              {/* Métricas Secundárias */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Árvores */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Árvores Equivalentes
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                    {formatNumber(result.treesEquivalent, 1)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    árvores/ano
                  </p>
                </div>

                {/* Gasolina */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-6 h-6 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Gasolina Evitada
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                    {formatNumber(result.gasolineLitersAvoided, 1)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    litros
                  </p>
                </div>

                {/* Valor Estimado */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Valor Estimado
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                    {formatCurrency(result.estimatedValue)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    em créditos
                  </p>
                </div>
              </div>

              {/* Metodologia */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Metodologia:</span> {result.methodology}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white text-center space-y-3">
                <p className="text-lg font-semibold">
                  Quer acompanhar seu impacto todo mês?
                </p>
                <p className="text-sm opacity-90">
                  Entre na lista de espera do Samobi Carbon Hub
                </p>
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Quero Participar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
