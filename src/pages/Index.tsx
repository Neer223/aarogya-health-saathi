import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Activity, Heart, Leaf, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: 'Natural Approach',
      description: 'Harness the power of Ayurvedic wisdom combined with modern medical understanding for holistic diabetes care.',
    },
    {
      icon: Activity,
      title: 'Risk Assessment',
      description: 'Get personalized diabetes risk analysis based on your health metrics with our intelligent tracker.',
    },
    {
      icon: Leaf,
      title: 'Indian Remedies',
      description: 'Discover traditional household remedies and natural foods that help manage and prevent diabetes.',
    },
    {
      icon: Shield,
      title: 'Prevention Focus',
      description: 'Learn how pre-diabetes and early-stage diabetes can be reversed through lifestyle modifications.',
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
                A comprehensive platform combining ancient Ayurvedic wisdom with modern science to help you prevent and manage diabetes naturally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 border-border hover:border-primary transition-all hover:shadow-[var(--shadow-soft)] group">
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
                  Understanding Diabetes Prevention
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Diabetes is a condition that affects millions worldwide, but the good news is that it's largely preventable and even reversible in its early stages. Through a combination of natural remedies, proper nutrition, regular exercise, and lifestyle modifications, you can take control of your health.
                  </p>
                  <p>
                    Our platform provides you with tools to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Track your diabetes risk factors</li>
                    <li>Learn about natural Indian household remedies</li>
                    <li>Discover diabetes-friendly foods and recipes</li>
                    <li>Understand the importance of exercise and yoga</li>
                    <li>Access personalized health recommendations</li>
                  </ul>
                  <p className="text-sm italic text-center pt-4 border-t border-border mt-6">
                    Remember: This platform is for educational purposes. Always consult with a qualified healthcare professional for medical advice.
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
