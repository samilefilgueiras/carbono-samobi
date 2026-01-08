/**
 * Cálculos de CO₂ evitado para o Samobi Carbon Hub
 * Baseado em metodologias reconhecidas (GHG Protocol, IPCC)
 */

// Fatores de emissão (kg CO₂)
export const EMISSION_FACTORS = {
  // Sistema Interligado Nacional (SIN) - Brasil 2024
  SIN_KWH: 0.233, // kg CO₂/kWh
  
  // Combustíveis fósseis
  GASOLINE_LITER: 2.3, // kg CO₂/litro
  DIESEL_LITER: 2.7, // kg CO₂/litro
  
  // Eficiência média de veículos
  EV_EFFICIENCY: 6, // km/kWh
  GASOLINE_CAR_EFFICIENCY: 12, // km/litro
  
  // Conversões
  TREE_ABSORPTION_YEAR: 22, // kg CO₂/árvore/ano
  CARBON_CREDIT_VALUE: 80, // R$/tonelada (média mercado voluntário)
} as const;

export interface MobilityInput {
  kmDriven: number;
  vehicleType: 'BEV' | 'PHEV' | 'HEV';
  efficiency?: number; // km/kWh (opcional, usa padrão se não informado)
}

export interface SolarInput {
  kwhGenerated: number;
}

export interface ChargingStationInput {
  kwhDelivered: number;
}

export interface CarbonResult {
  co2Avoided: number; // kg
  treesEquivalent: number;
  gasolineLitersAvoided: number;
  estimatedValue: number; // R$
  methodology: string;
}

/**
 * Calcula CO₂ evitado por mobilidade elétrica
 */
export function calculateMobilityCO2(input: MobilityInput): CarbonResult {
  const { kmDriven, efficiency = EMISSION_FACTORS.EV_EFFICIENCY } = input;
  
  // Consumo do EV em kWh
  const evConsumption = kmDriven / efficiency;
  
  // Emissão do EV (energia da rede)
  const evEmission = evConsumption * EMISSION_FACTORS.SIN_KWH;
  
  // Emissão que seria gerada por carro a gasolina
  const gasolineLiters = kmDriven / EMISSION_FACTORS.GASOLINE_CAR_EFFICIENCY;
  const gasolineEmission = gasolineLiters * EMISSION_FACTORS.GASOLINE_LITER;
  
  // CO₂ evitado
  const co2Avoided = gasolineEmission - evEmission;
  
  return {
    co2Avoided,
    treesEquivalent: co2Avoided / EMISSION_FACTORS.TREE_ABSORPTION_YEAR,
    gasolineLitersAvoided: gasolineLiters,
    estimatedValue: (co2Avoided / 1000) * EMISSION_FACTORS.CARBON_CREDIT_VALUE,
    methodology: 'Comparação EV vs Gasolina (GHG Protocol)',
  };
}

/**
 * Calcula CO₂ evitado por energia solar
 */
export function calculateSolarCO2(input: SolarInput): CarbonResult {
  const { kwhGenerated } = input;
  
  // CO₂ evitado = energia gerada × fator de emissão do SIN
  const co2Avoided = kwhGenerated * EMISSION_FACTORS.SIN_KWH;
  
  // Gasolina equivalente (aproximação energética)
  const gasolineLitersAvoided = (kwhGenerated * EMISSION_FACTORS.EV_EFFICIENCY) / EMISSION_FACTORS.GASOLINE_CAR_EFFICIENCY;
  
  return {
    co2Avoided,
    treesEquivalent: co2Avoided / EMISSION_FACTORS.TREE_ABSORPTION_YEAR,
    gasolineLitersAvoided,
    estimatedValue: (co2Avoided / 1000) * EMISSION_FACTORS.CARBON_CREDIT_VALUE,
    methodology: 'Fator de Emissão SIN Brasil (ONS 2024)',
  };
}

/**
 * Calcula CO₂ evitado por eletropostos
 */
export function calculateChargingStationCO2(input: ChargingStationInput): CarbonResult {
  const { kwhDelivered } = input;
  
  // km estimados abastecidos
  const kmCharged = kwhDelivered * EMISSION_FACTORS.EV_EFFICIENCY;
  
  // Gasolina que seria necessária
  const gasolineLiters = kmCharged / EMISSION_FACTORS.GASOLINE_CAR_EFFICIENCY;
  const gasolineEmission = gasolineLiters * EMISSION_FACTORS.GASOLINE_LITER;
  
  // Emissão do carregamento elétrico
  const chargingEmission = kwhDelivered * EMISSION_FACTORS.SIN_KWH;
  
  // CO₂ evitado
  const co2Avoided = gasolineEmission - chargingEmission;
  
  return {
    co2Avoided,
    treesEquivalent: co2Avoided / EMISSION_FACTORS.TREE_ABSORPTION_YEAR,
    gasolineLitersAvoided: gasolineLiters,
    estimatedValue: (co2Avoided / 1000) * EMISSION_FACTORS.CARBON_CREDIT_VALUE,
    methodology: 'Carregamento Elétrico vs Gasolina (GHG Protocol)',
  };
}

/**
 * Formata número para exibição (com separadores de milhar)
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formata valor monetário
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
