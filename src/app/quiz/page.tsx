'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Leaf, ChevronRight } from 'lucide-react';

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parâmetros da URL
  const moduloParam = searchParams.get('modulo');
  const origemParam = searchParams.get('origem');
  const modoAcumularParam = searchParams.get('modo_acumular');

  // Estados do formulário
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [moduloPrincipal, setModuloPrincipal] = useState(moduloParam || '');
  const [faixaVolume, setFaixaVolume] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [modoAcumular, setModoAcumular] = useState(modoAcumularParam === 'true');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  // Bloquear módulo se vier da URL
  const moduloBloqueado = !!moduloParam;

  // Textos condicionais baseados no módulo
  const getVolumeQuestion = () => {
    switch (moduloPrincipal) {
      case 'mobilidade':
        return {
          title: 'Quantos km você roda por mês, em média, com seu carro elétrico/híbrido?',
          options: [
            'Até 1.000 km',
            '1.001 a 3.000 km',
            '3.001 a 5.000 km',
            'Acima de 5.000 km'
          ]
        };
      case 'solar':
        return {
          title: 'Quantos kWh sua usina gera por mês, em média?',
          options: [
            'Até 500 kWh',
            '501 a 1.500 kWh',
            '1.501 a 3.000 kWh',
            'Acima de 3.000 kWh'
          ]
        };
      case 'eletroposto':
        return {
          title: 'Quantos kWh são entregues em recargas por mês, em média?',
          options: [
            'Até 300 kWh',
            '301 a 1.000 kWh',
            '1.001 a 3.000 kWh',
            'Acima de 3.000 kWh'
          ]
        };
      default:
        return {
          title: 'Selecione um módulo primeiro',
          options: []
        };
    }
  };

  const volumeQuestion = getVolumeQuestion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!tipoUsuario || !moduloPrincipal || !faixaVolume || !objetivo || !estado || !cidade) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Salvar dados no localStorage para usar depois
    const quizData = {
      tipo_usuario: tipoUsuario,
      modulo_principal: moduloPrincipal,
      faixa_volume_mensal: faixaVolume,
      objetivo_principal: objetivo,
      modo_acumular: modoAcumular,
      estado,
      cidade,
      origem_lead: origemParam || 'landing'
    };

    localStorage.setItem('quiz_data', JSON.stringify(quizData));

    // Redirecionar para a página de Aceite Legal
    router.push('/aceite-legal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-10 h-10 text-emerald-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">Samobi Carbon Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Antes de começar, me conta um pouco sobre você 💚
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Essas informações servem para calcular melhor seu impacto, montar sua carteira de créditos e deixar tudo pronto para o modo acumular.
          </p>
        </div>

        {/* Formulário */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz de Entrada</CardTitle>
            <CardDescription>Preencha as informações abaixo para personalizar sua experiência</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pergunta 1 - Tipo de Usuário */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">1. Quem é você?</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Você está se cadastrando como:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoUsuario('fisica')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tipoUsuario === 'fisica'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Pessoa Física</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoUsuario('juridica')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tipoUsuario === 'juridica'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Pessoa Jurídica</span>
                  </button>
                </div>
              </div>

              {/* Pergunta 2 - Módulo */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">2. Qual o seu tipo principal de impacto?</Label>
                {moduloBloqueado && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Módulo pré-selecionado
                  </p>
                )}
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => !moduloBloqueado && setModuloPrincipal('mobilidade')}
                    disabled={moduloBloqueado && moduloPrincipal !== 'mobilidade'}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      moduloPrincipal === 'mobilidade'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    } ${moduloBloqueado && moduloPrincipal !== 'mobilidade' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-semibold">Mobilidade Elétrica</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(carro elétrico ou híbrido)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => !moduloBloqueado && setModuloPrincipal('solar')}
                    disabled={moduloBloqueado && moduloPrincipal !== 'solar'}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      moduloPrincipal === 'solar'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    } ${moduloBloqueado && moduloPrincipal !== 'solar' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-semibold">Energia Solar</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(sistema fotovoltaico)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => !moduloBloqueado && setModuloPrincipal('eletroposto')}
                    disabled={moduloBloqueado && moduloPrincipal !== 'eletroposto'}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      moduloPrincipal === 'eletroposto'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    } ${moduloBloqueado && moduloPrincipal !== 'eletroposto' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-semibold">Eletroposto / Carregador</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(eletroposto ou wallbox individual)</p>
                  </button>
                </div>
              </div>

              {/* Pergunta 3 - Volume Mensal */}
              {moduloPrincipal && (
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">3. {volumeQuestion.title}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {volumeQuestion.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFaixaVolume(option)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          faixaVolume === option
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        <span className="font-semibold">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pergunta 4 - Objetivo */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">4. Qual é o seu principal objetivo com o Samobi Carbon Hub?</Label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => setObjetivo('acompanhar')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      objetivo === 'acompanhar'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Acompanhar meu impacto ambiental</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(CO₂, árvores, etc.)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjetivo('acumular')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      objetivo === 'acumular'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Acumular créditos de carbono</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(para vender no futuro)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjetivo('relatorios')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      objetivo === 'relatorios'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Mostrar relatórios ESG</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(para clientes, parceiros ou empresa)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjetivo('tudo')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      objetivo === 'tudo'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Tudo isso</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">(monitorar, acumular e vender)</p>
                  </button>
                </div>
              </div>

              {/* Pergunta 5 - Modo Acumular */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">5. Você quer ativar o modo acumular?</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  O modo acumular prioriza juntar mais créditos para vender em lotes maiores, com potencial de valor melhor.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModoAcumular(true)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      modoAcumular
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Sim, quero ativar automaticamente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModoAcumular(false)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      !modoAcumular
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-semibold">Não, quero decidir depois</span>
                  </button>
                </div>
              </div>

              {/* Pergunta 6 - Localização */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">6. Onde fica sua operação principal?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado (UF)</Label>
                    <select
                      id="estado"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-emerald-500 outline-none"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <input
                      id="cidade"
                      type="text"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Digite sua cidade"
                      className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  Continuar para o Aceite Legal
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Leaf className="w-16 h-16 text-emerald-600 mx-auto animate-pulse" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
