import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Activity, Heart, Leaf, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
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
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-teal-900/60 to-cyan-900/50" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4 sm:px-6 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 drop-shadow leading-relaxed">
                  {slide.description}
                </p>
                <Button
                  className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 h-auto rounded-lg bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-6 sm:w-8'
                : 'bg-white/60 w-2 sm:w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: 'A Natural Way to Heal',
      description:
        'We combine the timeless power of Ayurveda with modern medical science to support your diabetes journey naturally and effectively.',
    },
    {
      icon: Activity,
      title: 'Personalized Risk Check',
      description:
        'Get a clear picture of your diabetes risk through our intelligent health tracker — made to help you take control early.',
    },
    {
      icon: Leaf,
      title: 'Traditional Indian Remedies',
      description:
        'Explore home-based Ayurvedic remedies and simple, natural foods that can help you manage and even prevent diabetes.',
    },
    {
      icon: Shield,
      title: 'Focus on Prevention',
      description:
        'Discover how small lifestyle changes — like mindful eating and staying active — can reverse early-stage diabetes and protect your long-term health.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - No padding/margin for full-width slider */}
        <section className="w-full">
          <HeroSlider />
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                Why Choose DiabetesCare?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                We believe in empowering you with the best of both worlds — ancient Ayurvedic wisdom and today's medical knowledge — to help you live freely, with better health and balance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl group bg-white"
                  >
                    <CardContent className="pt-6 pb-6 px-4 sm:px-6 text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 transform group-hover:scale-110">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-emerald-200 shadow-xl bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
              <CardContent className="pt-6 pb-6 px-4 sm:px-6 md:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                  Taking Charge of Your Health
                </h2>
                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <p className="text-sm sm:text-base leading-relaxed">
                    Diabetes affects millions of people worldwide — but the encouraging truth is that it can often be prevented, and even reversed, especially in the early stages. Through natural remedies, mindful nutrition, regular movement, and stress-free living, you can take meaningful steps toward better health.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    With DiabetesCare, you'll be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">
                    <li>Track your health and identify early risk factors</li>
                    <li>Learn simple, effective Ayurvedic home remedies</li>
                    <li>Find diabetes-friendly foods, herbs, and recipes</li>
                    <li>Understand how yoga and exercise improve insulin response</li>
                    <li>Get lifestyle tips designed for your unique needs</li>
                  </ul>
                  <p className="text-xs sm:text-sm italic text-center pt-3 sm:pt-4 border-t-2 border-emerald-200 mt-4 sm:mt-6 text-gray-600">
                    Note: This platform is for educational and lifestyle support purposes only. Please consult a qualified healthcare professional before making medical decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;