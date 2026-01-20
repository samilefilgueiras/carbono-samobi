'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

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

          <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  POLÍTICA DE PRIVACIDADE – SAMOBI CARBON HUB
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                Como tratamos seus dados pessoais e ambientais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              <p>A Samobi coleta os seguintes dados:</p>
              <ul className="space-y-2 ml-6">
                <li>• Dados pessoais: nome, e-mail</li>
                <li>• Dados ambientais: km rodados, kWh gerados, kWh entregues</li>
                <li>• Dados para cálculo e auditoria de créditos de carbono</li>
              </ul>

              <p>Os dados são utilizados para:</p>
              <ul className="space-y-2 ml-6">
                <li>• Calcular CO₂ evitado pelas suas ações</li>
                <li>• Gerar créditos internos de carbono</li>
                <li>• Consolidar créditos no Samobi Carbon Pool</li>
                <li>• Realizar auditorias digitais</li>
                <li>• Preparar para venda futura de créditos</li>
              </ul>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                  🔒 Compromisso com a Privacidade
                </p>
                <p className="mt-2">
                  A Samobi não vende dados pessoais e cumpre integralmente a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </div>

              <p>O usuário pode exercer seus direitos a qualquer momento:</p>
              <ul className="space-y-2 ml-6">
                <li>• Solicitar exclusão dos dados</li>
                <li>• Solicitar alteração dos dados</li>
                <li>• Solicitar retificação dos dados</li>
                <li>• Solicitar anonimização dos dados</li>
              </ul>

              <p>
                Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato conosco através do suporte do aplicativo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}