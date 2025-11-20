'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Mail, Lock, User, AlertCircle, Car, Zap, Battery } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'mobility' | 'solar' | 'charging_station'>('mobility');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Criar usuário
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Criar perfil
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            user_type: userType,
          });

        if (profileError) throw profileError;

        router.push('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
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
              Criar Conta
            </span>
          </CardTitle>
          <CardDescription className="text-base">
            Comece a transformar seu impacto em créditos de carbono
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
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
                      <span>Eletroposto</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <div className="text-center pt-4 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Entrar
                </Link>
              </p>
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 block"
              >
                Voltar para home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
