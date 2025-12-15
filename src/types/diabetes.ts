// src/types/diabetes.ts

export type Gender = 'male' | 'female' | 'other';

export interface DiabetesFormData {
  name: string;
  age: string;
  gender?: Gender;
  hypertension: string;
  heartDisease: string;
  smokingHistory: string;
  bmi: string;
  hbA1c: string;
  bloodGlucose: string;
}

export interface PredictionResult {
  success: boolean;
  risk_percentage: number;
  risk_category: string;
  error?: string;
}

export interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  riskPercentage: number;
  riskCategory: string;
  patientName?: string;
  onViewTips?: () => void;
}

export interface DiabetesFormProps {
  gender?: Gender;
  onSubmit?: (data: DiabetesFormData) => void | Promise<void>;
}
