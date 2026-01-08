import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  user_type: 'mobility' | 'solar' | 'charging_station' | null;
  created_at: string;
  updated_at: string;
};

export type CarbonCalculation = {
  id: string;
  user_id: string;
  calculation_type: 'mobility' | 'solar' | 'charging_station';
  km_per_month: number | null;
  kwh_per_month: number | null;
  co2_avoided_kg: number;
  carbon_credits: number;
  estimated_value_brl: number;
  created_at: string;
};

export type WaitlistLead = {
  id: string;
  email: string;
  full_name: string | null;
  interest_type: string | null;
  created_at: string;
};
