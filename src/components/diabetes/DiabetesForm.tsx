import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Info, Loader2, ChevronRight, ChevronLeft, User, Heart, Activity } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
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
  const [validationErrors, setValidationErrors] = useState({});
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [riskCategory, setRiskCategory] = useState('');
  const navigate = useNavigate();

  const handleViewTips = () => {
    navigate('/health-tips');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

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
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
    setValidationErrors({});

    // Validation checks
    const errors = {};

    const age = parseInt(formData.age);
    if (age < 1 || age > 120) {
      errors.age = 'Age must be between 1 and 120 years';
    }

    const bmi = parseFloat(formData.bmi);
    if (bmi < 10 || bmi > 100) {
      errors.bmi = 'BMI must be between 10 and 100';
    }

    const hbA1c = parseFloat(formData.hbA1c);
    if (hbA1c < 3 || hbA1c > 20) {
      errors.hbA1c = 'HbA1c level must be between 3% and 20%';
    }

    const bloodGlucose = parseFloat(formData.bloodGlucose);
    if (bloodGlucose < 40 || bloodGlucose > 600) {
      errors.bloodGlucose = 'Blood glucose must be between 40 and 600 mg/dL';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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

            {Object.keys(validationErrors).length > 0 && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-sm text-red-700">
                  <div className="font-semibold mb-2">Please correct the following errors:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(validationErrors).map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {currentPage === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                    <User className={`w-8 h-8 ${styles.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                  <p className="text-gray-600 mt-2">Please provide your basic details</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`text-lg py-6 border-2 ${styles.focusBorder} rounded-lg`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-lg font-semibold text-gray-700">Age *</Label>
                    <select
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className={`w-full px-4 py-4 text-lg border-2 ${styles.focusBorder} rounded-lg focus:outline-none focus:ring-2 ${styles.focusRing} bg-white`}
                    >
                      <option value="">Select your age</option>
                      {Array.from({ length: 120 }, (_, i) => i + 1).map((age) => (
                        <option key={age} value={age}>
                          {age} {age === 1 ? 'year' : 'years'}
                        </option>
                      ))}
                    </select>
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
                  <h2 className="text-2xl font-bold text-gray-800">Gender Selection</h2>
                  <p className="text-gray-600 mt-2">This helps us provide more accurate predictions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Female')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${formData.gender === 'Female'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${formData.gender === 'Female' ? 'bg-indigo-100' : 'bg-gray-100'
                        }`}>
                        <svg className={`w-12 h-12 ${formData.gender === 'Female' ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="4" strokeWidth="2" />
                          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className={`font-bold text-xl ${formData.gender === 'Female' ? 'text-indigo-700' : 'text-gray-700'}`}>
                        Female
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Male')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${formData.gender === 'Male'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${formData.gender === 'Male' ? 'bg-indigo-100' : 'bg-gray-100'
                        }`}>
                        <svg className={`w-12 h-12 ${formData.gender === 'Male' ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="4" strokeWidth="2" />
                          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className={`font-bold text-xl ${formData.gender === 'Male' ? 'text-indigo-700' : 'text-gray-700'}`}>
                        Male
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'Other')}
                    className={`p-8 rounded-2xl border-2 transition-all duration-200 ${formData.gender === 'Other'
                        ? 'border-indigo-500 bg-indigo-50 shadow-xl scale-105'
                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:shadow-lg hover:scale-102'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${formData.gender === 'Other' ? 'bg-indigo-100' : 'bg-gray-100'
                        }`}>
                        <svg className={`w-12 h-12 ${formData.gender === 'Other' ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="4" strokeWidth="2" />
                          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" />
                        </svg>
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
                  <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
                  <p className="text-gray-600 mt-2">Information about existing health conditions</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-700">Have you been diagnosed with high blood pressure? *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => handleChange('hypertension', 'yes')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.hypertension === 'yes' ? 'border-red-500 bg-red-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-red-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${formData.hypertension === 'yes' ? 'bg-red-100' : 'bg-gray-100'}`}>
                            <svg className={`w-8 h-8 ${formData.hypertension === 'yes' ? 'text-red-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <span className={`font-semibold text-lg ${formData.hypertension === 'yes' ? 'text-red-700' : 'text-gray-700'}`}>Yes</span>
                        </div>
                      </button>
                      <button type="button" onClick={() => handleChange('hypertension', 'no')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.hypertension === 'no' ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-emerald-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${formData.hypertension === 'no' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            <svg className={`w-8 h-8 ${formData.hypertension === 'no' ? 'text-emerald-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className={`font-semibold text-lg ${formData.hypertension === 'no' ? 'text-emerald-700' : 'text-gray-700'}`}>No</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-700">Do you have any heart disease? *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => handleChange('heartDisease', 'yes')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.heartDisease === 'yes' ? 'border-red-500 bg-red-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-red-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${formData.heartDisease === 'yes' ? 'bg-red-100' : 'bg-gray-100'}`}>
                            <svg className={`w-8 h-8 ${formData.heartDisease === 'yes' ? 'text-red-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <span className={`font-semibold text-lg ${formData.heartDisease === 'yes' ? 'text-red-700' : 'text-gray-700'}`}>Yes</span>
                        </div>
                      </button>
                      <button type="button" onClick={() => handleChange('heartDisease', 'no')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${formData.heartDisease === 'no' ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-emerald-300 hover:shadow-md'}`}>
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${formData.heartDisease === 'no' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            <svg className={`w-8 h-8 ${formData.heartDisease === 'no' ? 'text-emerald-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className={`font-semibold text-lg ${formData.heartDisease === 'no' ? 'text-emerald-700' : 'text-gray-700'}`}>No</span>
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
                  <h2 className="text-2xl font-bold text-gray-800">Clinical Measurements</h2>
                  <p className="text-gray-600 mt-2">Final health metrics for assessment</p>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-gray-700">
                    Use the calculator if you need help estimating your BMI from height and weight.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="smokingHistory" className="text-base font-semibold text-gray-700">Smoking History *</Label>
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
                      <Input
                        id="bloodGlucose"
                        type="number"
                        placeholder="e.g., 120"
                        value={formData.bloodGlucose}
                        onChange={(e) => handleBloodGlucoseChange(e.target.value)}
                        className={`border-2 ${validationErrors.bloodGlucose ? 'border-red-300 bg-red-50' : ''}`}
                      />
                      {validationErrors.bloodGlucose && (
                        <p className="text-xs text-red-600">{validationErrors.bloodGlucose}</p>
                      )}
                      <p className="text-xs text-gray-500">Fasting blood sugar reading (40-600 mg/dL)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hbA1c" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                        HbA1c Level (%) * <span className="text-xs text-violet-600 font-normal">(Auto-calculated)</span>
                      </Label>
                      <Input
                        id="hbA1c"
                        type="number"
                        step="0.1"
                        placeholder="Calculated automatically"
                        value={formData.hbA1c}
                        onChange={(e) => handleChange('hbA1c', e.target.value)}
                        className={`bg-violet-50 border-2 ${validationErrors.hbA1c ? 'border-red-300 bg-red-50' : 'border-violet-200'}`}
                      />
                      {validationErrors.hbA1c && (
                        <p className="text-xs text-red-600">{validationErrors.hbA1c}</p>
                      )}
                      <p className="text-xs text-violet-600">
                        {formData.bloodGlucose ? '✓ Calculated from your glucose level (3-20%)' : 'Enter blood glucose first'}
                      </p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                        Body Mass Index (BMI) *
                        <button type="button" onClick={() => setShowEstimator(showEstimator === 'bmi' ? null : 'bmi')} className="text-blue-600 hover:text-blue-700">
                          <Calculator className="h-4 w-4" />
                        </button>
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 25.5"
                        value={formData.bmi}
                        onChange={(e) => handleChange('bmi', e.target.value)}
                        className={`border-2 ${validationErrors.bmi ? 'border-red-300 bg-red-50' : ''}`}
                      />
                      {validationErrors.bmi && (
                        <p className="text-xs text-red-600">{validationErrors.bmi}</p>
                      )}
                      <p className="text-xs text-gray-500">Normal range: 10-100</p>

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