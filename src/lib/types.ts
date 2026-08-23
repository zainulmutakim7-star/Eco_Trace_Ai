// src/lib/types.ts

export interface Activity {
  id: string;
  type: 'transport' | 'energy' | 'waste' | 'consumption';
  data: Record<string, any>;
  emission: number; // kg CO2e
}

export interface WasteReport {
  id: string;
  itemName: string;
  category: 'Anorganik Daur Ulang' | 'Organik' | 'B3 (Berbahaya)';
  imageUrl: string;
  carbonReduction: string;
  confidence: number;
  date: string; // ISO string
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  participants: number;
  daysLeft: number;
  progress: number; // 0-100
  joined: boolean;
  category: string;
}

export interface UserData {
  name: string;
  points: number;
}

export interface EcoScoreInput {
  activities: Activity[];
  wasteReports: WasteReport[];
  challenges: Challenge[];
  points: number;
}
