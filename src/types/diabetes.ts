export type Gender = 'female' | 'male' | 'other';

export interface DiabetesFormData {
  name: string;
  age: string;
  gender: Gender | null;
  glucose: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  skinThickness: string;
  pregnancies?: string;
}

export interface PredictionResult {
  prediction: 'low-risk' | 'pre-diabetic' | 'diabetic';
  confidence: number;
}
