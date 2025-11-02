import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DiabetesFormData, Gender } from '@/types/diabetes';
import { Activity, Droplet, Scale, TrendingUp, Layers, Sparkles, User } from 'lucide-react';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    <div className="animate-in fade-in slide-in-from-bottom duration-700">
      <Card className="max-w-3xl mx-auto border-2 border-emerald-200 shadow-2xl hover:shadow-emerald-200/50 transition-shadow duration-500 overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-b-2 border-emerald-200">
          <CardTitle className="text-2xl sm:text-3xl text-center text-gray-900 font-bold">
            Diabetes Risk Assessment
          </CardTitle>
          <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
            Please fill in your health information accurately
          </p>
        </CardHeader>
        <CardContent className="pt-8 pb-8 px-4 sm:px-6 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4 animate-in slide-in-from-left duration-500" style={{ animationDelay: '100ms' }}>
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-3">
                <span className="text-emerald-600">Personal Information</span>
              </h3>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 group">
                  <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`bg-white border-2 transition-all duration-300 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 ${
                        focusedField === 'name' ? 'shadow-lg shadow-emerald-200/50 scale-[1.02]' : ''
                      }`}
                    />
                  </div>
                </div>
              
                <div className="space-y-2 group">
                  <Label htmlFor="age" className="text-gray-700 font-medium">Age *</Label>
                  <div className="relative">
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age in years"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      onFocus={() => setFocusedField('age')}
                      onBlur={() => setFocusedField(null)}
                      min="1"
                      max="120"
                      className={`bg-white border-2 transition-all duration-300 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 ${
                        focusedField === 'age' ? 'shadow-lg shadow-emerald-200/50 scale-[1.02]' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-4 animate-in slide-in-from-right duration-500" style={{ animationDelay: '200ms' }}>
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-3">
                <span className="text-emerald-600">Health Metrics</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 group">
                  <Label htmlFor="glucose" className="text-gray-700 font-medium flex items-center gap-2">
                    Glucose Level (mg/dL) *
                  </Label>
                  <Input
                    id="glucose"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.glucose}
                    onChange={(e) => handleChange('glucose', e.target.value)}
                    onFocus={() => setFocusedField('glucose')}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    className={`bg-white border-2 transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      focusedField === 'glucose' ? 'shadow-lg shadow-blue-200/50 scale-[1.02]' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-500">Fasting blood glucose level</p>
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="insulin" className="text-gray-700 font-medium flex items-center gap-2">
                    Insulin Level (μU/mL) *
                  </Label>
                  <Input
                    id="insulin"
                    type="number"
                    placeholder="e.g., 85"
                    value={formData.insulin}
                    onChange={(e) => handleChange('insulin', e.target.value)}
                    onFocus={() => setFocusedField('insulin')}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    className={`bg-white border-2 transition-all duration-300 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                      focusedField === 'insulin' ? 'shadow-lg shadow-purple-200/50 scale-[1.02]' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-500">2-hour serum insulin</p>
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="bmi" className="text-gray-700 font-medium flex items-center gap-2">
                    Body Mass Index (BMI) *
                  </Label>
                  <Input
                    id="bmi"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25.5"
                    value={formData.bmi}
                    onChange={(e) => handleChange('bmi', e.target.value)}
                    onFocus={() => setFocusedField('bmi')}
                    onBlur={() => setFocusedField(null)}
                    min="10"
                    max="100"
                    className={`bg-white border-2 transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
                      focusedField === 'bmi' ? 'shadow-lg shadow-green-200/50 scale-[1.02]' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-500">Weight (kg) / Height² (m²)</p>
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="diabetesPedigree" className="text-gray-700 font-medium flex items-center gap-2">
                    Diabetes Pedigree Function *
                  </Label>
                  <Input
                    id="diabetesPedigree"
                    type="number"
                    step="0.001"
                    placeholder="e.g., 0.5"
                    value={formData.diabetesPedigree}
                    onChange={(e) => handleChange('diabetesPedigree', e.target.value)}
                    onFocus={() => setFocusedField('diabetesPedigree')}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    max="2.5"
                    className={`bg-white border-2 transition-all duration-300 hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                      focusedField === 'diabetesPedigree' ? 'shadow-lg shadow-orange-200/50 scale-[1.02]' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-500">Family diabetes history score</p>
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="skinThickness" className="text-gray-700 font-medium flex items-center gap-2">
                    Skin Thickness (mm) *
                  </Label>
                  <Input
                    id="skinThickness"
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.skinThickness}
                    onChange={(e) => handleChange('skinThickness', e.target.value)}
                    onFocus={() => setFocusedField('skinThickness')}
                    onBlur={() => setFocusedField(null)}
                    min="0"
                    max="100"
                    className={`bg-white border-2 transition-all duration-300 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${
                      focusedField === 'skinThickness' ? 'shadow-lg shadow-indigo-200/50 scale-[1.02]' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-500">Triceps skin fold thickness</p>
                </div>

                {gender === 'female' && (
                  <div className="space-y-2 group animate-in fade-in slide-in-from-bottom duration-500">
                    <Label htmlFor="pregnancies" className="text-gray-700 font-medium">
                      Number of Pregnancies *
                    </Label>
                    <Input
                      id="pregnancies"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.pregnancies || ''}
                      onChange={(e) => handleChange('pregnancies', e.target.value)}
                      onFocus={() => setFocusedField('pregnancies')}
                      onBlur={() => setFocusedField(null)}
                      min="0"
                      max="20"
                      className={`bg-white border-2 transition-all duration-300 hover:border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 ${
                        focusedField === 'pregnancies' ? 'shadow-lg shadow-pink-200/50 scale-[1.02]' : ''
                      }`}
                    />
                    <p className="text-xs text-gray-500">Total number of pregnancies</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={!isFormValid()}
            >
              Analyze Risk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiabetesForm;