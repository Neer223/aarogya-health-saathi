import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Activity, Heart, Leaf, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        {/* Hero Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <HeroSlider />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose DiabetesCare?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe in empowering you with the best of both worlds — ancient Ayurvedic wisdom and today’s medical knowledge — to help you live freely, with better health and balance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 border-border hover:border-primary transition-all hover:shadow-[var(--shadow-soft)] group"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-border shadow-[var(--shadow-soft)]">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                  Taking Charge of Your Health
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Diabetes affects millions of people worldwide — but the encouraging truth is that it can often be prevented, and even reversed, especially in the early stages. Through natural remedies, mindful nutrition, regular movement, and stress-free living, you can take meaningful steps toward better health.
                  </p>
                  <p>
                    With DiabetesCare, you’ll be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Track your health and identify early risk factors</li>
                    <li>Learn simple, effective Ayurvedic home remedies</li>
                    <li>Find diabetes-friendly foods, herbs, and recipes</li>
                    <li>Understand how yoga and exercise improve insulin response</li>
                    <li>Get lifestyle tips designed for your unique needs</li>
                  </ul>
                  <p className="text-sm italic text-center pt-4 border-t border-border mt-6">
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
