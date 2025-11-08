import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Activity, Heart, Leaf, Shield, AlertCircle, Sparkles, ChevronDown, Calculator, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import yogaPerson from '@/assets/yoga-person.gif';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[500px] xs:h-[550px] sm:h-[600px] md:h-[700px] overflow-hidden w-full">
      {/* Slides */}
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
                  className="text-sm xs:text-base sm:text-lg px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-4 h-auto rounded-lg bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/tracker')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
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
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Natural Healing',
      description: 'Combining Ayurveda with modern science for natural diabetes support.',
    },
    {
      icon: Activity,
      title: 'Risk Assessment',
      description: 'Smart health tracker to identify and manage diabetes risk early.',
    },
    {
      icon: Leaf,
      title: 'Ayurvedic Remedies',
      description: 'Traditional Indian remedies and natural foods for diabetes management.',
    },
    {
      icon: Shield,
      title: 'Prevention Focus',
      description: 'Simple lifestyle changes to reverse early-stage diabetes.',
    },
  ];

  const howToUseSteps = [
    {
      icon: Calculator,
      title: 'Enter Your Health Data',
      description: 'Input basic health metrics like age, weight, blood sugar levels, and family history using our simple and intuitive form.',
    },
    {
      icon: TrendingUp,
      title: 'Get Risk Assessment',
      description: 'Our AI-ML powered system analyzes your data and provides a personalized diabetes risk score with detailed insights.',
    },
    {
      icon: BookOpen,
      title: 'Follow Personalized Tips',
      description: 'Receive customized Ayurvedic remedies, diet plans, and lifestyle recommendations based on your risk level.',
    },
    {
      icon: Activity,
      title: 'Track Your Progress',
      description: 'Monitor your health journey over time and see improvements as you follow the recommended lifestyle changes.',
    },
  ];

  const benefits = [
    { icon: '📊', text: 'Track health and identify risk factors' },
    { icon: '🌿', text: 'Learn Ayurvedic remedies' },
    { icon: '🥗', text: 'Discover diabetes-friendly foods' },
    { icon: '🧘', text: 'Improve insulin response through yoga' },
  ];

  const toggleCard = (cardId) => {
    // Only toggle on mobile (screens smaller than 640px - sm breakpoint)
    if (window.innerWidth < 640) {
      setExpandedCard(expandedCard === cardId ? null : cardId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full">
          <HeroSlider />
        </section>

        {/* Features Section */}
        <section className="py-8 xs:py-10 sm:py-12 md:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 mt-6 xs:mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 px-2">
                Why Choose DiabetesCare?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-3 xs:px-4">
                Ancient Ayurvedic wisdom meets modern medical knowledge.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isExpanded = expandedCard === `feature-${index}`;
                
                return (
                  <Card
                    key={index}
                    className="border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl group bg-white cursor-pointer sm:cursor-default"
                    onClick={() => toggleCard(`feature-${index}`)}
                  >
                    <CardContent className="pt-3 pb-3 xs:pt-4 xs:pb-4 px-2 xs:px-3 sm:px-6 text-center">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-2 sm:mb-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 transform group-hover:scale-110">
                        <Icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-7 sm:w-7 text-emerald-600" />
                      </div>
                      <h3 className="text-xs xs:text-sm sm:text-xl font-semibold text-gray-900 mb-1 xs:mb-2">{feature.title}</h3>
                      
                      {/* Description - hidden only on small mobile unless expanded, always visible on tablet and desktop */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-40' : 'max-h-0 sm:max-h-none'
                      }`}>
                        <p className="text-xs sm:text-base text-gray-600 leading-relaxed mt-1 xs:mt-2">{feature.description}</p>
                      </div>
                      
                      {/* Expand icon - only visible on small mobile */}
                      <div className="sm:hidden mt-1 xs:mt-2">
                        <ChevronDown className={`h-3 w-3 xs:h-4 xs:w-4 mx-auto text-emerald-600 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-8 xs:py-10 sm:py-12 md:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 bg-white mt-6 xs:mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 px-2">
                How to Use DiabetesCare
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-3 xs:px-4">
                Get started in four simple steps
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {howToUseSteps.map((step, index) => {
                const Icon = step.icon;
                const isExpanded = expandedCard === `step-${index}`;
                
                return (
                  <Card
                    key={index}
                    className="border-2 border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl group bg-white cursor-pointer sm:cursor-default"
                    onClick={() => toggleCard(`step-${index}`)}
                  >
                    <CardContent className="pt-3 pb-3 xs:pt-4 xs:pb-4 px-2 xs:px-3 sm:px-6 text-center">
                      <div className="relative inline-block mb-2 xs:mb-2 sm:mb-4">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center group-hover:from-teal-200 group-hover:to-cyan-200 transition-all duration-300 transform group-hover:scale-110">
                          <Icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-7 sm:w-7 text-teal-600" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-xs xs:text-sm sm:text-xl font-semibold text-gray-900 mb-1 xs:mb-2">{step.title}</h3>
                      
                      {/* Description - hidden only on small mobile unless expanded, always visible on tablet and desktop */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-40' : 'max-h-0 sm:max-h-none'
                      }`}>
                        <p className="text-xs sm:text-base text-gray-600 leading-relaxed mt-1 xs:mt-2">{step.description}</p>
                      </div>
                      
                      {/* Expand icon - only visible on small mobile */}
                      <div className="sm:hidden mt-1 xs:mt-2">
                        <ChevronDown className={`h-3 w-3 xs:h-4 xs:w-4 mx-auto text-teal-600 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Information Section with GIF */}
        <section className="py-8 xs:py-10 sm:py-12 md:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 mt-6 xs:mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 xs:gap-6 lg:gap-8 items-start">
              {/* GIF Container - Always on Left - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div className="relative rounded-xl xs:rounded-2xl overflow-hidden shadow-2xl border-2 xs:border-4 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 lg:sticky lg:top-4">
                  <img
                    src={yogaPerson}
                    alt="Person practicing yoga meditation"
                    className="w-full h-auto object-cover"
                    style={{
                      filter: 'hue-rotate(10deg) saturate(1.0) brightness(0.95)',
                      mixBlendMode: 'multiply'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 pointer-events-none"></div>
                </div>
              </div>

              {/* Card Content - Right Side - Takes 3 columns on large screens */}
              <div className="lg:col-span-3">
                <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 overflow-hidden">
                  <CardContent className="pt-4 pb-4 xs:pt-5 xs:pb-5 sm:pt-6 sm:pb-6 px-3 xs:px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-center mb-3 xs:mb-4 sm:mb-6">
                      <Sparkles className="h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 text-emerald-600 animate-pulse" />
                    </div>
                    <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 text-center">
                      Transform Your Health Journey
                    </h2>
                    <div className="space-y-3 xs:space-y-4 text-gray-700">
                      <p className="text-xs xs:text-sm sm:text-base leading-relaxed">
                        Diabetes can often be prevented and reversed through natural remedies, mindful nutrition, and stress-free living.
                      </p>
                      
                      <div className="pt-1 xs:pt-2">
                        <p className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-2 xs:mb-3">
                          With DiabetesCare:
                        </p>
                        <div className="grid grid-cols-1 gap-1.5 xs:gap-2">
                          {benefits.map((benefit, index) => (
                            <div 
                              key={index}
                              className="flex items-start gap-2 xs:gap-3 p-2 xs:p-2 sm:p-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50 hover:from-emerald-100/50 hover:to-teal-100/50 transition-all duration-200 group"
                            >
                              <span className="text-lg xs:text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                {benefit.icon}
                              </span>
                              <p className="text-xs sm:text-base text-gray-700 leading-relaxed pt-0.5">
                                {benefit.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Disclaimer Box */}
                      <div className="mt-4 xs:mt-5 sm:mt-6 pt-3 xs:pt-4">
                        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-2.5 xs:p-3 sm:p-5 shadow-sm">
                          <div className="flex gap-2 xs:gap-2 sm:gap-3">
                            <AlertCircle className="h-4 w-4 xs:h-5 xs:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-xs sm:text-base text-gray-900 mb-1">
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;