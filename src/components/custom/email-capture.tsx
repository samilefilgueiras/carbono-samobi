'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
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

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) return;

    setIsSubmitting(true);

    // Simula envio (integrar com Mailchimp/ConvertKit depois)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset após 5 segundos
    setTimeout(() => {
      setIsSuccess(false);
      setEmail('');
      setName('');
    }, 5000);
  };

  if (isSuccess) {
    return (
      <div id="email-capture" className="w-full max-w-2xl mx-auto">
        <Card className="border-2 border-emerald-500 shadow-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-emerald-500 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                Bem-vindo ao movimento! 🌱
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Você está na lista de espera do Samobi Carbon Hub.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Em breve você receberá acesso exclusivo ao app!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div id="email-capture" className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
        <CardHeader className="text-center space-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Entre na Lista de Espera
          </CardTitle>
          <CardDescription className="text-base">
            Seja um dos primeiros a transformar seu impacto em créditos de carbono
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Seu nome
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Seu melhor e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="joao@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            {/* Benefícios */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl p-6 space-y-3 border border-emerald-200 dark:border-emerald-800">
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                O que você vai receber:
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Acesso antecipado ao app (antes do lançamento oficial)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>30 dias de teste gratuito (sem cartão de crédito)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Desconto especial de 50% nos primeiros 3 meses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Badge exclusivo "Fundador Samobi" no app</span>
                </li>
              </ul>
            </div>

            {/* Botão Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando na lista...
                </>
              ) : (
                'Quero Fazer Parte! 🌱'
              )}
            </Button>

            {/* Disclaimer */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Seus dados estão seguros. Não compartilhamos com terceiros.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
