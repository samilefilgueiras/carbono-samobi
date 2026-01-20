'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
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
                  TERMOS DE USO – SAMOBI CARBON HUB
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                Versão curta e objetiva para o Lasy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              <p>O usuário concorda que:</p>
              <ul className="space-y-2 ml-6">
                <li>• Seus dados serão utilizados para cálculo e registro de créditos de carbono.</li>
                <li>• A Samobi Carbon consolida os créditos gerados no Samobi Carbon Pool.</li>
                <li>• A Samobi define o valor de compra dos créditos acumulados.</li>
                <li>• Compradores nacionais e internacionais não adquirem créditos diretamente de usuários individuais.</li>
                <li>• Toda venda é intermediada pela Samobi Carbon Hub.</li>
                <li>• A Samobi pode comprar créditos antecipadamente, mediante aceite prévio.</li>
                <li>• Valores de venda dependem de volume acumulado, auditoria e demanda de compradores.</li>
                <li>• O mercado de carbono é variável e não garante receita imediata.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}