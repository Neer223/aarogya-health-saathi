import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DiabetesFormData, Gender } from '@/types/diabetes';
import { Activity, Droplet, Scale, TrendingUp, Layers } from 'lucide-react';

interface DiabetesFormProps {
  gender: Gender;
  onSubmit: (data: DiabetesFormData) => void;
}

const DiabetesForm = ({ gender, onSubmit }: DiabetesFormProps) => {
  const [formData, setFormData] = useState<DiabetesFormData>({
    name: '',
    age: '',
    gender,
    glucose: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    skinThickness: '',
    pregnancies: gender === 'female' ? '' : undefined,
  });

  const handleChange = (field: keyof DiabetesFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    const requiredFields: (keyof DiabetesFormData)[] = [
      'name',
      'age',
      'glucose',
      'insulin',
      'bmi',
      'diabetesPedigree',
      'skinThickness',
    ];

    if (gender === 'female') {
      requiredFields.push('pregnancies');
    }

    return requiredFields.every((field) => formData[field] && formData[field]?.toString().trim() !== '');
  };

  return (
    <Card className="max-w-3xl mx-auto border-2 border-border shadow-[var(--shadow-soft)]">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border">
        <CardTitle className="text-2xl text-center">Diabetes Risk Assessment</CardTitle>
        <p className="text-center text-muted-foreground mt-2">
          Please fill in your health information accurately
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs text-primary">1</span>
              </div>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age in years"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  min="1"
                  max="120"
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* Health Metrics */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs text-primary">2</span>
              </div>
              Health Metrics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="glucose" className="text-foreground flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-primary" />
                  Glucose Level (mg/dL) *
                </Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="e.g., 120"
                  value={formData.glucose}
                  onChange={(e) => handleChange('glucose', e.target.value)}
                  min="0"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">Fasting blood glucose level</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulin" className="text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Insulin Level (μU/mL) *
                </Label>
                <Input
                  id="insulin"
                  type="number"
                  placeholder="e.g., 85"
                  value={formData.insulin}
                  onChange={(e) => handleChange('insulin', e.target.value)}
                  min="0"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">2-hour serum insulin</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmi" className="text-foreground flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  Body Mass Index (BMI) *
                </Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 25.5"
                  value={formData.bmi}
                  onChange={(e) => handleChange('bmi', e.target.value)}
                  min="10"
                  max="100"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">Weight (kg) / Height² (m²)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diabetesPedigree" className="text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Diabetes Pedigree Function *
                </Label>
                <Input
                  id="diabetesPedigree"
                  type="number"
                  step="0.001"
                  placeholder="e.g., 0.5"
                  value={formData.diabetesPedigree}
                  onChange={(e) => handleChange('diabetesPedigree', e.target.value)}
                  min="0"
                  max="2.5"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">Family diabetes history score</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinThickness" className="text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  Skin Thickness (mm) *
                </Label>
                <Input
                  id="skinThickness"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.skinThickness}
                  onChange={(e) => handleChange('skinThickness', e.target.value)}
                  min="0"
                  max="100"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">Triceps skin fold thickness</p>
              </div>

              {gender === 'female' && (
                <div className="space-y-2">
                  <Label htmlFor="pregnancies" className="text-foreground">
                    Number of Pregnancies *
                  </Label>
                  <Input
                    id="pregnancies"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.pregnancies || ''}
                    onChange={(e) => handleChange('pregnancies', e.target.value)}
                    min="0"
                    max="20"
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">Total number of pregnancies</p>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={!isFormValid()}
          >
            Analyze Risk
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesForm;
