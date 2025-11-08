import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DiabetesFormData, Gender } from '@/types/diabetes';
import { Calculator, Info, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  
  const [unknownFields, setUnknownFields] = useState<Record<string, boolean>>({
    glucose: false,
    insulin: false,
    diabetesPedigree: false,
    skinThickness: false,
  });
  
  const [showEstimator, setShowEstimator] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  // BMI Calculator states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Pedigree estimator states
  const [familyHistory, setFamilyHistory] = useState({
    parents: false,
    siblings: false,
    grandparents: false,
    none: false,
  });

  const handleChange = (field: keyof DiabetesFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUnknownToggle = (field: string) => {
    setUnknownFields(prev => {
      const newState = { ...prev, [field]: !prev[field] };
      
      // If checking "unknown", set estimated values
      if (newState[field]) {
        switch(field) {
          case 'glucose':
            handleChange('glucose', '100');
            break;
          case 'insulin':
            handleChange('insulin', '80');
            break;
          case 'diabetesPedigree':
            const score = calculatePedigreeScore();
            handleChange('diabetesPedigree', score.toString());
            break;
          case 'skinThickness':
            handleChange('skinThickness', '20');
            break;
        }
      } else {
        handleChange(field as keyof DiabetesFormData, '');
      }
      
      return newState;
    });
  };

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      handleChange('bmi', bmi.toFixed(1));
      setShowEstimator(null);
      setWeight('');
      setHeight('');
    } else {
      alert('Please enter both weight and height to calculate BMI');
    }
  };

  const handleFamilyHistoryChange = (field: keyof typeof familyHistory, checked: boolean) => {
    if (field === 'none' && checked) {
      // If "None of the above" is checked, uncheck all others
      setFamilyHistory({
        parents: false,
        siblings: false,
        grandparents: false,
        none: true,
      });
    } else if (field !== 'none' && checked) {
      // If any specific option is checked, uncheck "None of the above"
      setFamilyHistory(prev => ({ ...prev, [field]: checked, none: false }));
    } else {
      // Normal uncheck
      setFamilyHistory(prev => ({ ...prev, [field]: checked }));
    }
  };

  const calculatePedigreeScore = () => {
    let score = 0.078; // Base score
    if (familyHistory.parents) score += 0.3;
    if (familyHistory.siblings) score += 0.2;
    if (familyHistory.grandparents) score += 0.1;
    return score.toFixed(3);
  };

  const applyPedigreeScore = () => {
    const score = calculatePedigreeScore();
    handleChange('diabetesPedigree', score);
    setShowEstimator(null);
    // Reset family history checkboxes
    setFamilyHistory({
      parents: false,
      siblings: false,
      grandparents: false,
      none: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Prepare the API payload matching your backend format
      const apiPayload = {
        Name: formData.name,
        Age: parseInt(formData.age),
        "Glucose level (mg/dl)": parseFloat(formData.glucose),
        "Insulin Level (μU/mL)": parseFloat(formData.insulin),
        BMI: parseFloat(formData.bmi),
        "Diabetes Pedigree": parseFloat(formData.diabetesPedigree),
        "Skin Thickness (mm)": parseFloat(formData.skinThickness),
      };

      // Make the API call
      const response = await fetch('https://aarogya-health-saathi-1.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      // Set the prediction result
      setPrediction(result.prediction);
      
      // Also call the parent's onSubmit if needed
      onSubmit(formData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
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
      <Card className="max-w-3xl mx-auto border-2 border-emerald-200 shadow-2xl">
        <CardHeader className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-b-2 border-emerald-200">
          <CardTitle className="text-2xl sm:text-3xl text-center text-gray-900 font-bold">
            Diabetes Risk Assessment
          </CardTitle>
          <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
            Please fill in your health information accurately
          </p>
        </CardHeader>
        <CardContent className="pt-8 pb-8 px-4 sm:px-6 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-gray-700">
              Don't know some values? Check the "Don't know" box and we'll use estimated values based on averages.
            </AlertDescription>
          </Alert>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-sm text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Prediction Result */}
          {prediction && (
            <Alert className={`mb-6 ${prediction === 'High Risk' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
              <AlertDescription className={`text-sm font-semibold ${prediction === 'High Risk' ? 'text-red-700' : 'text-green-700'}`}>
                Prediction Result: {prediction}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900">
                <span className="text-emerald-600">Personal Information</span>
              </h3>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900">
                <span className="text-emerald-600">Health Metrics</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Glucose */}
                <div className="space-y-2">
                  <Label htmlFor="glucose">Glucose Level (mg/dL) *</Label>
                  <Input
                    id="glucose"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.glucose}
                    onChange={(e) => handleChange('glucose', e.target.value)}
                    disabled={unknownFields.glucose}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="glucose-unknown"
                      checked={unknownFields.glucose}
                      onChange={() => handleUnknownToggle('glucose')}
                      className="rounded"
                    />
                    <label htmlFor="glucose-unknown" className="text-xs text-gray-600 cursor-pointer">
                      Don't know (use average: 100 mg/dL)
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Fasting blood glucose</p>
                </div>

                {/* Insulin */}
                <div className="space-y-2">
                  <Label htmlFor="insulin">Insulin Level (μU/mL) *</Label>
                  <Input
                    id="insulin"
                    type="number"
                    placeholder="e.g., 85"
                    value={formData.insulin}
                    onChange={(e) => handleChange('insulin', e.target.value)}
                    disabled={unknownFields.insulin}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="insulin-unknown"
                      checked={unknownFields.insulin}
                      onChange={() => handleUnknownToggle('insulin')}
                      className="rounded"
                    />
                    <label htmlFor="insulin-unknown" className="text-xs text-gray-600 cursor-pointer">
                      Don't know (use average: 80 μU/mL)
                    </label>
                  </div>
                </div>

                {/* BMI with Calculator */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    BMI *
                    <button
                      type="button"
                      onClick={() => setShowEstimator(showEstimator === 'bmi' ? null : 'bmi')}
                      className="text-emerald-600"
                    >
                      <Calculator className="h-4 w-4" />
                    </button>
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25.5"
                    value={formData.bmi}
                    onChange={(e) => handleChange('bmi', e.target.value)}
                  />
                  
                  {showEstimator === 'bmi' && (
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
                      <p className="text-xs font-medium">Calculate BMI:</p>
                      <Input
                        type="number"
                        placeholder="Weight (kg)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Height (cm)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={calculateBMI}
                        size="sm"
                        className="w-full"
                      >
                        Calculate
                      </Button>
                    </div>
                  )}
                </div>

                {/* Pedigree with Estimator */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Diabetes Pedigree *
                    <button
                      type="button"
                      onClick={() => setShowEstimator(showEstimator === 'pedigree' ? null : 'pedigree')}
                      className="text-emerald-600"
                    >
                      <Calculator className="h-4 w-4" />
                    </button>
                  </Label>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="e.g., 0.5"
                    value={formData.diabetesPedigree}
                    onChange={(e) => handleChange('diabetesPedigree', e.target.value)}
                    disabled={unknownFields.diabetesPedigree}
                  />
                  
                  {showEstimator === 'pedigree' && (
                    <div className="p-3 bg-orange-50 rounded-lg border space-y-2">
                      <p className="text-xs font-medium">Family History:</p>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={familyHistory.parents}
                          onChange={(e) => handleFamilyHistoryChange('parents', e.target.checked)}
                        />
                        Parents have diabetes
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={familyHistory.siblings}
                          onChange={(e) => handleFamilyHistoryChange('siblings', e.target.checked)}
                        />
                        Siblings have diabetes
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={familyHistory.grandparents}
                          onChange={(e) => handleFamilyHistoryChange('grandparents', e.target.checked)}
                        />
                        Grandparents have diabetes
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={familyHistory.none}
                          onChange={(e) => handleFamilyHistoryChange('none', e.target.checked)}
                        />
                        None of the above
                      </label>
                      <Button
                        type="button"
                        onClick={applyPedigreeScore}
                        size="sm"
                        className="w-full"
                      >
                        Calculate
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pedigree-unknown"
                      checked={unknownFields.diabetesPedigree}
                      onChange={() => handleUnknownToggle('diabetesPedigree')}
                    />
                    <label htmlFor="pedigree-unknown" className="text-xs text-gray-600 cursor-pointer">
                      Don't know (use estimate)
                    </label>
                  </div>
                </div>

                {/* Skin Thickness */}
                <div className="space-y-2">
                  <Label>Skin Thickness (mm) *</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.skinThickness}
                    onChange={(e) => handleChange('skinThickness', e.target.value)}
                    disabled={unknownFields.skinThickness}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="skin-unknown"
                      checked={unknownFields.skinThickness}
                      onChange={() => handleUnknownToggle('skinThickness')}
                    />
                    <label htmlFor="skin-unknown" className="text-xs text-gray-600 cursor-pointer">
                      Don't know (use average: 20 mm)
                    </label>
                  </div>
                </div>

                {/* Pregnancies */}
                {gender === 'female' && (
                  <div className="space-y-2">
                    <Label>Number of Pregnancies *</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.pregnancies || ''}
                      onChange={(e) => handleChange('pregnancies', e.target.value)}
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={!isFormValid() || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Risk'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiabetesForm;