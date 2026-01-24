"use client"

import { useState } from "react"
import { Calculator, Leaf, TrendingDown, Car, Home, Plane, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CarbonCalculatorPage() {
  const [transport, setTransport] = useState({ car: 0, bus: 0, plane: 0 })
  const [energy, setEnergy] = useState({ electricity: 0, gas: 0 })
  const [consumption, setConsumption] = useState({ food: 0, shopping: 0 })
  const [totalCarbon, setTotalCarbon] = useState(0)

  const calculateCarbon = () => {
    // Fatores de emissão aproximados (kg CO2 por unidade)
    const transportEmissions = 
      (transport.car * 0.21) + // kg CO2 por km de carro
      (transport.bus * 0.089) + // kg CO2 por km de ônibus
      (transport.plane * 0.255) // kg CO2 por km de avião

    const energyEmissions = 
      (energy.electricity * 0.475) + // kg CO2 por kWh
      (energy.gas * 2.03) // kg CO2 por m³

    const consumptionEmissions = 
      (consumption.food * 2.5) + // kg CO2 por refeição
      (consumption.shopping * 5) // kg CO2 por compra

    const total = transportEmissions + energyEmissions + consumptionEmissions
    setTotalCarbon(parseFloat(total.toFixed(2)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Samobi Carbon
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Calcule sua pegada de carbono e contribua para um planeta mais sustentável
          </p>
        </div>

        {/* Main Calculator */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-2 border-green-200 dark:border-green-800">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calculator className="w-6 h-6" />
                Calculadora de Carbono
              </CardTitle>
              <CardDescription className="text-green-50">
                Insira seus dados mensais para calcular sua emissão de CO₂
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="transport" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="transport" className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Transporte
                  </TabsTrigger>
                  <TabsTrigger value="energy" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Energia
                  </TabsTrigger>
                  <TabsTrigger value="consumption" className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Consumo
                  </TabsTrigger>
                </TabsList>

                {/* Transport Tab */}
                <TabsContent value="transport" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="car" className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-600" />
                        Quilômetros de carro por mês
                      </Label>
                      <Input
                        id="car"
                        type="number"
                        placeholder="Ex: 500"
                        value={transport.car || ""}
                        onChange={(e) => setTransport({ ...transport, car: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bus" className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-600" />
                        Quilômetros de ônibus por mês
                      </Label>
                      <Input
                        id="bus"
                        type="number"
                        placeholder="Ex: 200"
                        value={transport.bus || ""}
                        onChange={(e) => setTransport({ ...transport, bus: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plane" className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-gray-600" />
                        Quilômetros de avião por mês
                      </Label>
                      <Input
                        id="plane"
                        type="number"
                        placeholder="Ex: 1000"
                        value={transport.plane || ""}
                        onChange={(e) => setTransport({ ...transport, plane: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Energy Tab */}
                <TabsContent value="energy" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="electricity" className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-600" />
                        Consumo de eletricidade (kWh/mês)
                      </Label>
                      <Input
                        id="electricity"
                        type="number"
                        placeholder="Ex: 300"
                        value={energy.electricity || ""}
                        onChange={(e) => setEnergy({ ...energy, electricity: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gas" className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-600" />
                        Consumo de gás (m³/mês)
                      </Label>
                      <Input
                        id="gas"
                        type="number"
                        placeholder="Ex: 15"
                        value={energy.gas || ""}
                        onChange={(e) => setEnergy({ ...energy, gas: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Consumption Tab */}
                <TabsContent value="consumption" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="food" className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                        Refeições com carne por semana
                      </Label>
                      <Input
                        id="food"
                        type="number"
                        placeholder="Ex: 10"
                        value={consumption.food || ""}
                        onChange={(e) => setConsumption({ ...consumption, food: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopping" className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                        Compras de produtos novos por mês
                      </Label>
                      <Input
                        id="shopping"
                        type="number"
                        placeholder="Ex: 5"
                        value={consumption.shopping || ""}
                        onChange={(e) => setConsumption({ ...consumption, shopping: parseFloat(e.target.value) || 0 })}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                onClick={calculateCarbon}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Pegada de Carbono
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {totalCarbon > 0 && (
            <Card className="mt-8 shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <TrendingDown className="w-6 h-6" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Sua emissão mensal estimada:</p>
                  <p className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {totalCarbon}
                  </p>
                  <p className="text-2xl text-gray-700 dark:text-gray-200 mb-6">kg de CO₂</p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
                      Dicas para reduzir sua pegada:
                    </h3>
                    <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Use transporte público ou bicicleta sempre que possível</li>
                      <li>• Reduza o consumo de carne e opte por alimentos locais</li>
                      <li>• Economize energia desligando aparelhos em standby</li>
                      <li>• Compre produtos usados ou recicle sempre que possível</li>
                      <li>• Plante árvores para compensar suas emissões</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Juntos por um planeta mais sustentável
          </p>
        </div>
      </div>
    </div>
  )
}
