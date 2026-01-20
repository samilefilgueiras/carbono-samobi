'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Leaf, AlertCircle } from 'lucide-react';

export default function AcceptancePage() {
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [authorizedCredits, setAuthorizedCredits] = useState(false);
  const [definedValues, setDefinedValues] = useState(false);
  const [understandNegotiations, setUnderstandNegotiations] = useState(false);
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

    // Verificar se já aceitou
    const { data: profile } = await supabase
      .from('profiles')
      .select('accepted_terms')
      .eq('id', user.id)
      .single();

    if (profile?.accepted_terms) {
      router.push('/onboarding');
    }
  };

  const handleAccept = async () => {
    if (!acceptedTerms || !acceptedPrivacy || !authorizedCredits || !definedValues || !understandNegotiations) {
      setError('Você deve aceitar todos os termos para continuar.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ accepted_terms: true })
        .eq('id', user.id);

      if (error) throw error;

      router.push('/onboarding');
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar aceite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              TERMO DE ACEITE E AUTORIZAÇÃO DE CRÉDITOS AMBIENTAIS
            </span>
          </CardTitle>
          <CardDescription className="text-base">
            Leia atentamente e aceite os termos para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4 text-sm">
            <p>Ao continuar, você declara que:</p>
            <ul className="space-y-2 ml-4">
              <li>• Autoriza o uso dos seus dados de km, kWh e atividade elétrica para cálculo de CO₂ evitado.</li>
              <li>• Autoriza a criação, consolidação e registro dos créditos de carbono gerados por suas ações.</li>
              <li>• Entende que os créditos acumulados serão armazenados no Samobi Carbon Pool.</li>
              <li>• A Samobi Carbon define os valores de compra interna dos créditos gerados pelos usuários.</li>
              <li>• Compradores de créditos de carbono não compram diretamente dos usuários individuais.</li>
              <li>• Toda venda ou transferência será realizada exclusivamente pela Samobi Carbon Hub.</li>
              <li>• A Samobi pode comprar seus créditos antecipadamente ("compra antecipada").</li>
              <li>• A Samobi pode vender lotes consolidados de créditos para empresas, fundos e compradores nacionais e internacionais.</li>
              <li>• Você aceita a transferência de titularidade dos créditos quando vendidos.</li>
              <li>• Seus dados serão tratados conforme a LGPD.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                Eu li e aceito os <a href="/terms" target="_blank" className="text-emerald-600 hover:underline">Termos de Uso</a>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={acceptedPrivacy}
                onCheckedChange={setAcceptedPrivacy}
              />
              <label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                Eu li e aceito a <a href="/privacy" target="_blank" className="text-emerald-600 hover:underline">Política de Privacidade</a>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="credits"
                checked={authorizedCredits}
                onCheckedChange={setAuthorizedCredits}
              />
              <label htmlFor="credits" className="text-sm leading-relaxed cursor-pointer">
                Autorizo a criação e venda dos meus créditos de carbono
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="values"
                checked={definedValues}
                onCheckedChange={setDefinedValues}
              />
              <label htmlFor="values" className="text-sm leading-relaxed cursor-pointer">
                Concordo que os valores de compra são definidos pela Samobi
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="negotiations"
                checked={understandNegotiations}
                onCheckedChange={setUnderstandNegotiations}
              />
              <label htmlFor="negotiations" className="text-sm leading-relaxed cursor-pointer">
                Entendo que compradores não negociam diretamente comigo
              </label>
            </div>
          </div>

          <Button
            onClick={handleAccept}
            disabled={loading || !acceptedTerms || !acceptedPrivacy || !authorizedCredits || !definedValues || !understandNegotiations}
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? 'Salvando...' : 'ACEITO E QUERO CONTINUAR'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}