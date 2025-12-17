import { Activity, Heart, Leaf, Shield, AlertCircle, Sparkles, ChevronDown, Calculator, TrendingUp, BookOpen, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Import your actual images here
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const slides = [
  {
    image: heroSlide1,
    title: 'Natural Diabetes Prevention',
    description: 'Discover the power of nature in managing and preventing diabetes with Ayurvedic wisdom.',
  },
  {
    image: heroSlide2,
    title: 'Wellness Through Balance',
    description: 'Embrace a holistic approach to health with mindful practices and natural remedies.',
  },
  {
    image: heroSlide3,
    title: 'Nourish Your Body',
    description: 'Learn about diabetes-friendly foods from traditional Indian households.',
  },
];

const HeroSlider = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[80vh] sm:h-[600px] md:h-[700px] overflow-hidden w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
        >
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-teal-900/60 to-cyan-900/50" />
            
            <div className="absolute inset-0 flex items-center justify-center px-3 xs:px-4 sm:px-6">
              <div className="text-center w-full max-w-3xl">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 xs:mb-4 md:mb-6 drop-shadow-lg leading-tight px-2">
                  {slide.title}
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-5 xs:mb-6 sm:mb-8 drop-shadow leading-relaxed px-2">
                  {slide.description}
                </p>
                <Button
                  onClick={onGetStarted}
                  className="text-sm xs:text-base sm:text-lg px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-4 h-auto rounded-lg bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-emerald-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 xs:right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-emerald-600" />
      </button>

      <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 xs:gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 xs:h-2 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-5 xs:w-6 sm:w-8'
                : 'bg-white/60 w-1.5 xs:w-2 sm:w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [showGetStartedDialog, setShowGetStartedDialog] = useState(false);
  
  const benefits = [
    { icon: '📊', text: 'Track health and identify risk factors' },
    { icon: '🌿', text: 'Learn Ayurvedic remedies' },
    { icon: '🥗', text: 'Discover diabetes-friendly foods' },
    { icon: '🧘', text: 'Improve insulin response through yoga' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full">
          <HeroSlider onGetStarted={() => setShowGetStartedDialog(true)} />
        </section>

        {/* How to Use Section */}
        <section className="py-12 xs:py-16 sm:py-20 md:py-24 px-4 xs:px-6 sm:px-8 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative">
                <div className="relative mx-auto max-w-sm">
                  <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-8 text-white">
                        <div className="text-sm mb-2">Today, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                        <div className="text-4xl font-bold mb-2">Risk Score</div>
                        <div className="text-6xl font-bold mb-1">Low</div>
                        <div className="text-sm opacity-90">Keep up the good work!</div>
                      </div>
                      
                      <div className="bg-white p-6 space-y-4">
                        <div 
                          onClick={() => navigate('/tracker')}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Calculator className="h-5 w-5 text-emerald-600" />
                            </div>
                            <span className="font-medium text-gray-900">Health Assessment</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div 
                          onClick={() => navigate('/health-tips')}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                              <Leaf className="h-5 w-5 text-teal-600" />
                            </div>
                            <span className="font-medium text-gray-900">Ayurvedic Tips</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div 
                          onClick={() => navigate('/track-progress')}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                              <Activity className="h-5 w-5 text-cyan-600" />
                            </div>
                            <span className="font-medium text-gray-900">Track Progress</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h2 className="text-4xl xs:text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Making wellness <span className="text-emerald-600">accessible</span> since 2024
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="border-l-4 border-emerald-500 pl-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">For Everyone</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We combine ancient Ayurvedic wisdom with modern health tracking to help you prevent and manage diabetes naturally. Get personalized insights that become your daily wellness companion.
                    </p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">For Your Journey</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Track your health metrics in real-time, get AI-powered risk assessments, and receive customized Ayurvedic remedies to optimize your wellness and prevent diabetes effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 xs:py-16 sm:py-20 md:py-24 px-4 xs:px-6 sm:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl xs:text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                Your Wellness Toolkit
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Natural solutions for a healthier tomorrow
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group cursor-pointer" onClick={() => navigate('/health-tips')}>
                <div className="rounded-2xl overflow-hidden mb-6 h-64 shadow-lg relative transform transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=80"
                    alt="Fresh healthy vegetables and herbs"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                      Natural Remedies
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Herbal Healing
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover time-tested herbal remedies and natural solutions to manage blood sugar levels effectively
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>Explore Remedies</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="group cursor-pointer" onClick={() => navigate('/tracker')}>
                <div className="rounded-2xl overflow-hidden mb-6 h-64 shadow-lg relative transform transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&q=80"
                    alt="Green leafy vegetables and healthy food"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full mb-2">
                      Smart Assessment
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Risk Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Get instant diabetes risk assessment with personalized recommendations based on your health metrics
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>Start Assessment</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="group cursor-pointer" onClick={() => navigate('/track-progress')}>
                <div className="rounded-2xl overflow-hidden mb-6 h-64 shadow-lg relative transform transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop&q=80"
                    alt="Fresh green plants and natural wellness"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-cyan-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full mb-2">
                      Health Journey
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Track Progress
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your health metrics over time and celebrate milestones on your path to diabetes prevention
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>View Progress</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Your Progress Section - Clean Minimalist Design */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-8 sm:mb-10 md:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                A smarter way to track your health
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Monitor your wellness journey, track progress daily
              </p>
            </div>

            {/* Center Image Card - Maintains aspect ratio across all screens */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
              <div 
                className="group cursor-pointer"
                onClick={() => navigate('/track-progress')}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg relative transform transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
                      alt="Health and wellness tracking"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent"></div>
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2 sm:mb-3">
                        Progress Tracking
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                        Track Your Progress
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/90">
                        Monitor your health metrics and celebrate your wellness milestones
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid - Centered and consistent */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6">
                
                {/* Feature 1 */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-emerald-100 hover:border-emerald-200 transition-all hover:shadow-md">
                  <div className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Calculator className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-emerald-600" />
                    </div>
                    <div className="flex-1 sm:text-center pt-0 sm:pt-0">
                      <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Track daily</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Monitor health metrics every day</p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-teal-100 hover:border-teal-200 transition-all hover:shadow-md">
                  <div className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Activity className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-teal-600" />
                    </div>
                    <div className="flex-1 sm:text-center pt-0 sm:pt-0">
                      <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">View trends</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">See progress over time</p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-cyan-100 hover:border-cyan-200 transition-all hover:shadow-md">
                  <div className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-cyan-600" />
                    </div>
                    <div className="flex-1 sm:text-center pt-0 sm:pt-0">
                      <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Get insights</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Personalized recommendations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Tracking Link - Centered below cards */}
              <div className="flex justify-center">
                <div 
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold cursor-pointer group/link hover:gap-3 transition-all text-sm sm:text-base"
                  onClick={() => navigate('/track-progress')}
                >
                  <span>Start Tracking</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto">
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-3 sm:p-4 shadow-sm">
                <div className="flex gap-2 sm:gap-3">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">
                      Important Note
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      For educational purposes only. Consult a healthcare professional before making medical decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Get Started Confirmation Dialog */}
      <AlertDialog open={showGetStartedDialog} onOpenChange={setShowGetStartedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              Start Your Health Assessment?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Are you ready to track your diabetes risk and get personalized health insights? This will take you to our comprehensive health assessment form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Not Now</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowGetStartedDialog(false);
                navigate('/tracker');
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Yes, Let's Start
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Index;