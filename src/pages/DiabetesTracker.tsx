import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GenderSelection from '@/components/diabetes/GenderSelection';
import DiabetesForm from '@/components/diabetes/DiabetesForm';
import ResultDialog from '@/components/diabetes/ResultDialog';
import { DiabetesFormData, Gender } from '@/types/diabetes';
import { Button } from '@/components/ui/button';

const DiabetesTracker = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState<'low-risk' | 'pre-diabetic' | 'diabetic'>('pre-diabetic');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleFormSubmit = async (data: DiabetesFormData) => {
    console.log('Form submitted with data:', data);
    
    // Start loading animation
    setIsAnalyzing(true);
    
    // Simulate API call with delay (replace with actual backend call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate prediction logic
    const glucoseLevel = parseFloat(data.glucose);
    let result: 'low-risk' | 'pre-diabetic' | 'diabetic' = 'low-risk';
    
    if (glucoseLevel >= 126) {
      result = 'diabetic';
    } else if (glucoseLevel >= 100) {
      result = 'pre-diabetic';
    }
    
    setPredictionResult(result);
    setIsAnalyzing(false);
    setShowResult(true);
    
    // Here you would typically send data to your backend:
    // await fetch('/api/predict', { method: 'POST', body: JSON.stringify(data) });
  };

  const handleReset = () => {
    setSelectedGender(null);
    setShowResult(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Diabetes Risk Tracker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the assessment to understand your diabetes risk and receive personalized recommendations
            </p>
          </div>

          {/* Back Button (shown when gender is selected) */}
          {selectedGender && !isAnalyzing && (
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Change Gender
              </Button>
            </div>
          )}

          {/* Content */}
          {!selectedGender ? (
            <GenderSelection onSelectGender={handleGenderSelect} />
          ) : (
            <DiabetesForm 
              gender={selectedGender} 
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </main>

      <Footer />

      {/* Result Dialog */}
      <ResultDialog
        open={showResult}
        onOpenChange={setShowResult}
        result={predictionResult}
      />
    </div>
  );
};

export default DiabetesTracker;