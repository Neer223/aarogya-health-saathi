import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DiabetesForm from '@/components/diabetes/DiabetesForm';

const DiabetesTracker = () => {
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

          {/* Diabetes Form - handles everything including gender selection and results */}
          <DiabetesForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiabetesTracker;