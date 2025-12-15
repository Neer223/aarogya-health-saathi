import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Info, Loader2, ChevronRight, ChevronLeft, User, Heart, Activity } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ResultDialog from './ResultDialog';

const DiabetesForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    hypertension: '',
    heartDisease: '',
    smokingHistory: '',
    bmi: '',
    hbA1c: '',
    bloodGlucose: '',
  });

  const [showEstimator, setShowEstimator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [riskCategory, setRiskCategory] = useState('');

  const smokingOptions = [
    { value: '', label: 'Select smoking history' },
    { value: 'never', label: 'Never' },
    { value: 'former', label: 'Former' },
    { value: 'current', label: 'Current' },
    { value: 'not current', label: 'Not Current' },
    { value: 'ever', label: 'Ever' },
    { value: 'No Info', label: 'No Info' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateHbA1c = (glucose) => {
    if (!glucose || glucose === '') return '';
    const glucoseNum = parseFloat(glucose);
    const hbA1c = (glucoseNum + 46.7) / 28.7;
    return hbA1c.toFixed(1);
  };

  const handleBloodGlucoseChange = (value) => {
    handleChange('bloodGlucose', value);
    if (value) {
      const calculatedHbA1c = calculateHbA1c(value);
      handleChange('hbA1c', calculatedHbA1c);
    }
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiPayload = {
        age: parseInt(formData.age),
        gender: formData.gender,
        hypertension: formData.hypertension === 'yes' ? 1 : 0,
        heart_disease: formData.heartDisease === 'yes' ? 1 : 0,
        smoking_history: formData.smokingHistory,
        bmi: parseFloat(formData.bmi),
        HbA1c_level: parseFloat(formData.hbA1c),
        blood_glucose_level: parseFloat(formData.bloodGlucose),
      };

      console.log('Sending to API:', apiPayload);

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);

      const result = await response.json();

      console.log('API Response:', result);

      if (!result.success) {
        throw new Error(result.error || 'Prediction failed');
      }

      const percentage = result.risk_percentage || 0;
      const category = result.risk_category || 'Unknown';

      console.log('Setting dialog with:', { percentage, category });

      setRiskPercentage(percentage);
      setRiskCategory(category);
      setDialogOpen(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isPage1Valid = () => formData.name && formData.age;
  const isPage2Valid = () => formData.gender;
  const isPage3Valid = () => formData.hypertension && formData.heartDisease;
  const isPage4Valid = () => formData.smokingHistory && formData.bmi && formData.hbA1c && formData.bloodGlucose;

  const nextPage = () => {
    if (currentPage === 1 && isPage1Valid()) setCurrentPage(2);
    else if (currentPage === 2 && isPage2Valid()) setCurrentPage(3);
    else if (currentPage === 3 && isPage3Valid()) setCurrentPage(4);
  };

  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  const getPageStyles = () => {
    switch (currentPage) {
      case 1: return {
        bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
        headerGradient: 'from-cyan-500 to-teal-600',
        borderColor: 'border-cyan-200',
        iconBg: 'bg-cyan-100',
        iconColor: 'text-cyan-600',
        buttonBg: 'bg-teal-600 hover:bg-teal-700',
        focusBorder: 'border-cyan-200 focus:border-cyan-400',
        focusRing: 'focus:ring-teal-500',
      };
      case 2: return {
        bgGradient: 'from-indigo-50 via-blue-50 to-sky-50',
        headerGradient: 'from-indigo-500 to-blue-600',
        borderColor: 'border-indigo-200',
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
        focusBorder: 'border-indigo-200 focus:border-indigo-400',
        focusRing: 'focus:ring-indigo-500',
      };
      case 3: return {
        bgGradient: 'from-rose-50 via-pink-50 to-orange-50',
        headerGradient: 'from-pink-500 to-rose-600',
        borderColor: 'border-pink-200',
        iconBg: 'bg-rose-100',
        iconColor: 'text-rose-600',
        buttonBg: 'bg-rose-600 hover:bg-rose-700',
        focusBorder: 'border-pink-200 focus:border-pink-400',
        focusRing: 'focus:ring-rose-500',
      };
      case 4: return {
        bgGradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
        headerGradient: 'from-violet-500 to-purple-600',
        borderColor: 'border-violet-200',
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-600',
        buttonBg: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700',
        focusBorder: 'border-violet-200 focus:border-violet-400',
        focusRing: 'focus:ring-violet-500',
      };
    }
  };

  const styles = getPageStyles();

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br ${styles.bgGradient} py-8 px-4 transition-all duration-700`}>
        <Card className={`max-w-3xl mx-auto border-2 ${styles.borderColor} shadow-2xl`}>
          <CardHeader className={`bg-gradient-to-r ${styles.headerGradient} text-white border-b-2`}>
            <CardTitle className="text-3xl text-center font-bold">Diabetes Risk Assessment</CardTitle>
            <p className="text-center text-white/90 mt-2">Step {currentPage} of 4</p>
            <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full transition-all duration-500" style={{ width: `${(currentPage / 4) * 100}%` }} />
            </div>
          </CardHeader>

          <CardContent className="pt-8 pb-8 px-6 bg-white">
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {currentPage === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                    <User className={`w-8 h-8 ${styles.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Let's Get Started!</h2>
                  <p className="text-gray-600 mt-2">First, tell us a bit about yourself</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">What's your name? *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Type your full name here..."
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`text-lg py-6 border-2 ${styles.focusBorder} rounded-lg`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-lg font-semibold text-gray-700">How old are you? *</Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Enter your age..."
                        value={formData.age}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 100)) {
                            handleChange('age', value);
                          }
                        }}
                        className={`text-lg py-6 border-2 ${styles.focusBorder} rounded-lg pr-20`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">years old</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[18, 25, 35, 45, 55, 65].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => handleChange('age', age.toString())}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.age === age.toString()
                              ? 'bg-cyan-600 text-white shadow-md scale-105'
                              : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="button" size="lg" className={`w-full ${styles.buttonBg} text-white py-6 text-lg font-semibold mt-8`} disabled={!isPage1Valid()} onClick={nextPage}>
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                    <User className={`w-8 h-8 ${styles.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Select Your Gender</h2>
                  <p className="text-gray-600 mt-2">This helps us provide more accurate predictions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Female')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                      formData.gender === 'Female'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        formData.gender === 'Female' ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <User className={`w-8 h-8 ${formData.gender === 'Female' ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-bold text-xl ${formData.gender === 'Female' ? 'text-indigo-700' : 'text-gray-700'}`}>
                        Female
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Male')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                      formData.gender === 'Male'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        formData.gender === 'Male' ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <User className={`w-8 h-8 ${formData.gender === 'Male' ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-bold text-xl ${formData.gender === 'Male' ? 'text-indigo-700' : 'text-gray-700'}`}>
                        Male
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Other')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                      formData.gender === 'Other'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        formData.gender === 'Other' ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <User className={`w-8 h-8 ${formData.gender === 'Other' ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-bold text-xl ${formData.gender === 'Other' ? 'text-indigo-700' : 'text-gray-700'}`}>
                        Other
                      </span>
                    </div>
                  </button>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button type="button" size="lg" variant="outline" className="w-full py-6 text-lg font-semibold border-2 hover:bg-gray-50" onClick={prevPage}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Go Back
                  </Button>
                  <Button type="button" size="lg" className={`w-full ${styles.buttonBg} text-white py-6 text-lg font-semibold`} disabled={!isPage2Valid()} onClick={nextPage}>
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                    <Heart className={`w-8 h-8 ${styles.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Your Health History</h2>
                  <p className="text-gray-600 mt-2">These help us understand your current condition</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-700">Have you been diagnosed with high blood pressure? *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => handleChange('hypertension', 'yes')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.hypertension === 'yes' ? 'border-rose-500 bg-rose-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-rose-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-2">
                          <Activity className={`w-8 h-8 ${formData.hypertension === 'yes' ? 'text-rose-600' : 'text-gray-400'}`} />
                          <span className={`font-semibold text-lg ${formData.hypertension === 'yes' ? 'text-rose-700' : 'text-gray-700'}`}>Yes, I do</span>
                        </div>
                      </button>
                      <button type="button" onClick={() => handleChange('hypertension', 'no')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.hypertension === 'no' ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-emerald-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-2">
                          <Activity className={`w-8 h-8 ${formData.hypertension === 'no' ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <span className={`font-semibold text-lg ${formData.hypertension === 'no' ? 'text-emerald-700' : 'text-gray-700'}`}>No, I don't</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-700">Do you have any heart disease? *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => handleChange('heartDisease', 'yes')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.heartDisease === 'yes' ? 'border-rose-500 bg-rose-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-rose-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-2">
                          <Heart className={`w-8 h-8 ${formData.heartDisease === 'yes' ? 'text-rose-600' : 'text-gray-400'}`} />
                          <span className={`font-semibold text-lg ${formData.heartDisease === 'yes' ? 'text-rose-700' : 'text-gray-700'}`}>Yes, I do</span>
                        </div>
                      </button>
                      <button type="button" onClick={() => handleChange('heartDisease', 'no')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.heartDisease === 'no' ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-emerald-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-2">
                          <Heart className={`w-8 h-8 ${formData.heartDisease === 'no' ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <span className={`font-semibold text-lg ${formData.heartDisease === 'no' ? 'text-emerald-700' : 'text-gray-700'}`}>No, I don't</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button type="button" size="lg" variant="outline" className="w-full py-6 text-lg font-semibold border-2 hover:bg-gray-50" onClick={prevPage}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Go Back
                  </Button>
                  <Button type="button" size="lg" className={`w-full ${styles.buttonBg} text-white py-6 text-lg font-semibold`} disabled={!isPage3Valid()} onClick={nextPage}>
                    Almost Done <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {currentPage === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                    <Activity className={`w-8 h-8 ${styles.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Final Details</h2>
                  <p className="text-gray-600 mt-2">Just a few measurements to complete your assessment</p>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-gray-700">
                    Don't worry if you don't have exact numbers - use our calculator to estimate BMI!
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="smokingHistory" className="text-base font-semibold text-gray-700">What's your smoking history? *</Label>
                    <select id="smokingHistory" value={formData.smokingHistory} onChange={(e) => handleChange('smokingHistory', e.target.value)}
                      className={`w-full px-4 py-3 border-2 ${styles.focusBorder} rounded-lg focus:outline-none focus:ring-2 ${styles.focusRing}`}>
                      {smokingOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGlucose" className="text-base font-semibold text-gray-700">Blood Glucose Level (mg/dL) *</Label>
                      <Input id="bloodGlucose" type="number" placeholder="e.g., 120" value={formData.bloodGlucose}
                        onChange={(e) => handleBloodGlucoseChange(e.target.value)} className="border-2" />
                      <p className="text-xs text-gray-500">Fasting blood sugar reading</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hbA1c" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                        HbA1c Level (%) * <span className="text-xs text-violet-600 font-normal">(Auto-calculated)</span>
                      </Label>
                      <Input id="hbA1c" type="number" step="0.1" placeholder="Calculated automatically" value={formData.hbA1c}
                        onChange={(e) => handleChange('hbA1c', e.target.value)} className="bg-violet-50 border-2 border-violet-200" />
                      <p className="text-xs text-violet-600">
                        {formData.bloodGlucose ? '✓ Calculated from your glucose level' : 'Enter blood glucose first'}
                      </p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                        Body Mass Index (BMI) *
                        <button type="button" onClick={() => setShowEstimator(showEstimator === 'bmi' ? null : 'bmi')} className="text-blue-600 hover:text-blue-700">
                          <Calculator className="h-4 w-4" />
                        </button>
                      </Label>
                      <Input type="number" step="0.1" placeholder="e.g., 25.5" value={formData.bmi}
                        onChange={(e) => handleChange('bmi', e.target.value)} className="border-2" />

                      {showEstimator === 'bmi' && (
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 space-y-3">
                          <p className="text-sm font-semibold text-blue-700">Calculate your BMI:</p>
                          <Input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
                          <Input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
                          <Button type="button" onClick={calculateBMI} size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Calculate</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button type="button" size="lg" variant="outline" className="w-full py-6 text-lg font-semibold border-2 hover:bg-gray-50" onClick={prevPage}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button type="button" size="lg" className={`w-full ${styles.buttonBg} text-white py-6 text-lg font-semibold`}
                    disabled={!isPage4Valid() || isLoading} onClick={handleSubmit}>
                    {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>) : 'Analyze Risk'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ResultDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        riskPercentage={riskPercentage}
        riskCategory={riskCategory}
        patientName={formData.name}
      />
    </>
  );
};

export default DiabetesForm;