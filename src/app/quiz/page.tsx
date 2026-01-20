'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function QuizPage() {
  const searchParams = useSearchParams();
  const origem = searchParams.get('origem');
  const modoAcumular = searchParams.get('modo_acumular');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Página em Desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Esta funcionalidade estará disponível em breve!
          </p>
          {origem && (
            <p className="text-sm text-gray-500">
              Origem: {origem}
            </p>
          )}
          {modoAcumular && (
            <p className="text-sm text-gray-500">
              Modo Acumular: Ativado
            </p>
          )}
          <Link href="/">
            <Button className="mt-4">
              Voltar para Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
