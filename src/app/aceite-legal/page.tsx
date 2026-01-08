'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Leaf, CheckCircle2, Shield, FileText } from 'lucide-react';
import Link from 'next/link';

// Mapeamento dos módulos para os links do Keoto
const KEOTO_LINKS = {
  mobilidade: 'https://checkout.keoto.com/a713bd2b-2819-4abf-a518-cd744cf96c6d',
  solar: 'https://checkout.keoto.com/9168cc60-9a89-4b94-b726-b107fbe33ab1',
  eletroposto: 'https://checkout.keoto.com/7c30cfc7-ff4c-4319-8117-a56f8d79a51e'
};

export default function AceiteLegalPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<any>(null);
  
  // Estados dos checkboxes
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);
  const [autorizoCriacao, setAutorizoCriacao] = useState(false);
  const [concordoValor, setConcordoValor] = useState(false);
  const [entendomNegociacao, setEntendomNegociacao] = useState(false);
  const [autorizoCompra, setAutorizoCompra] = useState(false);

  useEffect(() => {
    // Recuperar dados do quiz do localStorage
    const data = localStorage.getItem('quiz_data');
    if (data) {
      setQuizData(JSON.parse(data));
    } else {
      // Se não houver dados do quiz, redirecionar para o quiz
      router.push('/quiz');
    }
  }, [router]);

  const todosAceites = 
    aceiteTermos && 
    aceitePrivacidade && 
    autorizoCriacao && 
    concordoValor && 
    entendomNegociacao && 
    autorizoCompra;

  const handleContinuar = () => {
    if (!todosAceites) {
      alert('Por favor, aceite todos os termos para continuar');
      return;
    }

    if (!quizData) {
      alert('Dados do quiz não encontrados. Por favor, preencha o quiz novamente.');
      router.push('/quiz');
      return;
    }

    // Salvar aceite legal no localStorage
    const aceiteLegalData = {
      aceite_termos: aceiteTermos,
      aceite_privacidade: aceitePrivacidade,
      autorizo_criacao: autorizoCriacao,
      concordo_valor: concordoValor,
      entendo_negociacao: entendomNegociacao,
      autorizo_compra: autorizoCompra,
      data_aceite: new Date().toISOString()
    };

    localStorage.setItem('aceite_legal', JSON.stringify(aceiteLegalData));

    // Redirecionar para o checkout Keoto correspondente ao módulo
    const moduloPrincipal = quizData.modulo_principal;
    const keotoLink = KEOTO_LINKS[moduloPrincipal as keyof typeof KEOTO_LINKS];
    
    if (keotoLink) {
      window.location.href = keotoLink;
    } else {
      alert('Módulo inválido. Por favor, preencha o quiz novamente.');
      router.push('/quiz');
    }
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-10 h-10 text-emerald-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">Samobi Carbon Hub</span>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-emerald-600">Quiz</span>
            </div>
            <div className="w-12 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="text-sm font-medium text-emerald-600">Aceite Legal</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                3
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Checkout</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            📄 Termo de Uso, Privacidade e Créditos de Carbono
          </h1>
        </div>

        {/* Card Principal */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-800 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Informações Importantes
            </CardTitle>
            <CardDescription className="text-base">
              Leia atentamente antes de continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Texto Explicativo */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-6 space-y-4 border border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                O <strong>Samobi Carbon Hub</strong> utiliza seus dados de mobilidade, energia solar ou recarga para calcular CO₂ evitado, gerar créditos internos de carbono e consolidar saldos para venda futura a empresas compradoras.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A <strong>Samobi Carbon</strong> é responsável por definir valores de compra, negociar com empresas, assumir custos, riscos e auditorias e repassar ao usuário parte da receita quando houver venda.
              </p>
            </div>

            {/* Checkboxes Obrigatórios */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Aceites Obrigatórios
              </h3>

              {/* Checkbox 1 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="termos"
                  checked={aceiteTermos}
                  onCheckedChange={(checked) => setAceiteTermos(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="termos" className="cursor-pointer flex-1">
                  Li e aceito os{' '}
                  <Link href="/termos-de-uso" target="_blank" className="text-emerald-600 hover:underline font-semibold">
                    Termos de Uso
                  </Link>
                </Label>
              </div>

              {/* Checkbox 2 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="privacidade"
                  checked={aceitePrivacidade}
                  onCheckedChange={(checked) => setAceitePrivacidade(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="privacidade" className="cursor-pointer flex-1">
                  Li e aceito a{' '}
                  <Link href="/politica-de-privacidade" target="_blank" className="text-emerald-600 hover:underline font-semibold">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              {/* Checkbox 3 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="criacao"
                  checked={autorizoCriacao}
                  onCheckedChange={(checked) => setAutorizoCriacao(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="criacao" className="cursor-pointer flex-1">
                  Autorizo a criação, registro e venda de créditos de carbono a partir dos meus dados de uso
                </Label>
              </div>

              {/* Checkbox 4 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="valor"
                  checked={concordoValor}
                  onCheckedChange={(checked) => setConcordoValor(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="valor" className="cursor-pointer flex-1">
                  Concordo que o valor de compra dos meus créditos é definido pela Samobi Carbon
                </Label>
              </div>

              {/* Checkbox 5 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="negociacao"
                  checked={entendomNegociacao}
                  onCheckedChange={(checked) => setEntendomNegociacao(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="negociacao" className="cursor-pointer flex-1">
                  Entendo que empresas compradoras não negociam diretamente comigo
                </Label>
              </div>

              {/* Checkbox 6 */}
              <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                <Checkbox
                  id="compra"
                  checked={autorizoCompra}
                  onCheckedChange={(checked) => setAutorizoCompra(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="compra" className="cursor-pointer flex-1">
                  Autorizo a Samobi Carbon a realizar compra antecipada de créditos em meu nome, quando aplicável
                </Label>
              </div>
            </div>

            {/* Botão de Continuar */}
            <div className="pt-6">
              <Button
                onClick={handleContinuar}
                disabled={!todosAceites}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {todosAceites ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    ACEITO E QUERO CONTINUAR
                  </>
                ) : (
                  'Aceite todos os termos para continuar'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card de Segurança */}
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-gray-100">Seus dados estão seguros</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Todas as informações são criptografadas e armazenadas com segurança. Você pode solicitar a exclusão dos seus dados a qualquer momento através do suporte.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
