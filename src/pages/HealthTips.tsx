import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Dumbbell, AlertCircle } from 'lucide-react';
import exerciseWalking from '@/assets/exercise-walking-improved.jpg';
import yogaSuryaNamaskar from '@/assets/yoga-surya-namaskar.jpg';
import yogaPaschimottanasana from '@/assets/yoga-paschimottanasana.jpg';
import yogaDhanurasana from '@/assets/yoga-dhanurasana.jpg';
import yogaTrikonasana from '@/assets/yoga-trikonasana.jpg';
import yogaPranayama from '@/assets/yoga-pranayama.jpg';
import foodKarela from '@/assets/food-karela.jpg';
import foodFenugreek from '@/assets/food-fenugreek.jpg';
import foodAmla from '@/assets/food-amla.jpg';
import foodSalad from '@/assets/food-salad.jpg';

const HealthTips = () => {
  const exercises = [
    {
      title: 'Daily Walking',
      description: 'Walk for 30-45 minutes daily. Morning walks in nature are especially beneficial for blood sugar control.',
      benefits: 'Improves insulin sensitivity, aids weight management, reduces stress, lowers blood glucose levels',
      image: exerciseWalking,
    },
    {
      title: 'Surya Namaskar (Sun Salutation)',
      description: 'A complete body workout combining 12 yoga poses in a flowing sequence. Practice 5-10 rounds daily, preferably during sunrise.',
      benefits: 'Stimulates pancreas, improves insulin production, enhances metabolism, burns calories, tones entire body',
      image: yogaSuryaNamaskar,
    },
    {
      title: 'Paschimottanasana (Seated Forward Bend)',
      description: 'Sit with legs extended, slowly bend forward to touch your toes. Hold for 30-60 seconds. Perform 3-5 repetitions.',
      benefits: 'Massages abdominal organs, stimulates pancreas and liver, reduces belly fat, improves digestion',
      image: yogaPaschimottanasana,
    },
    {
      title: 'Dhanurasana (Bow Pose)',
      description: 'Lie on stomach, bend knees, hold ankles and lift chest and thighs. Hold for 15-30 seconds. Repeat 3-4 times.',
      benefits: 'Strengthens pancreas, regulates blood sugar, improves digestion, reduces abdominal fat',
      image: yogaDhanurasana,
    },
    {
      title: 'Trikonasana (Triangle Pose)',
      description: 'Stand with legs wide apart, bend sideways touching one foot while raising the other arm. Hold for 30 seconds each side.',
      benefits: 'Improves blood circulation, stimulates abdominal organs, reduces stress, enhances overall balance',
      image: yogaTrikonasana,
    },
    {
      title: 'Pranayama (Breathing Exercises)',
      description: 'Practice Anulom Vilom (alternate nostril breathing) and Kapalbhati (forceful exhalation) for 10-15 minutes daily.',
      benefits: 'Reduces stress hormones, improves oxygen supply, enhances insulin sensitivity, calms nervous system',
      image: yogaPranayama,
    },
  ];

  const indianRemedies = [
    {
      title: 'Bitter Gourd (Karela)',
      description: 'Consume karela juice on an empty stomach or include cooked karela in your diet 2-3 times a week.',
      benefits: 'Contains compounds that act like insulin, helps lower blood glucose levels',
      howToUse: 'Juice: Extract juice from 2-3 karelas, dilute with water if needed. Cooking: Prepare karela sabzi with minimal oil.',
      image: foodKarela,
    },
    {
      title: 'Fenugreek Seeds (Methi)',
      description: 'Soak 1-2 tablespoons of fenugreek seeds in water overnight. Drink the water and eat the seeds on an empty stomach.',
      benefits: 'Rich in fiber, slows down digestion and absorption of carbohydrates',
      howToUse: 'Can also be added to curries or sprouted for salads',
      image: foodFenugreek,
    },
    {
      title: 'Indian Gooseberry (Amla)',
      description: 'Consume 1-2 fresh amlas daily, or take amla juice (2-3 tablespoons) mixed with water.',
      benefits: 'High in vitamin C, regulates carbohydrate metabolism, improves insulin secretion',
      howToUse: 'Fresh fruit, juice, or amla powder mixed with water',
      image: foodAmla,
    },
  ];

  const dietaryTips = [
    {
      title: 'Leafy Greens & Vegetables',
      description: 'Include spinach, fenugreek leaves, bottle gourd, bitter gourd, and other non-starchy vegetables.',
      benefits: 'Low in calories, high in fiber, helps control blood sugar',
      image: foodSalad,
    },
  ];

  const lifestyleTips = [
    'Get 7-8 hours of quality sleep every night',
    'Manage stress through meditation and pranayama',
    'Stay hydrated - drink 8-10 glasses of water daily',
    'Avoid refined sugars and processed foods',
    'Eat smaller, frequent meals instead of 3 large meals',
    'Include whole grains like brown rice, oats, and millets',
    'Limit alcohol consumption and quit smoking',
    'Monitor your blood sugar regularly',
    'Maintain a healthy weight through diet and exercise',
    'Take your medications as prescribed by your doctor',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Natural Health Tips for Diabetes Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover time-tested Ayurvedic remedies and lifestyle practices that can help manage and even reverse pre-diabetes naturally
            </p>
          </div>

          {/* Important Notice */}
          <Card className="border-2 border-accent/50 bg-accent/5 mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important: Diabetes is Reversible!</h3>
                  <p className="text-sm text-muted-foreground">
                    Research shows that pre-diabetes and early-stage Type 2 diabetes can be reversed through proper diet, exercise, and lifestyle changes. 
                    The tips below are based on Ayurvedic wisdom and modern nutritional science. However, always consult with a qualified healthcare 
                    professional before making significant changes to your diet or exercise routine, especially if you're taking medications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="remedies" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="remedies" className="gap-2">
                <Leaf className="h-4 w-4" />
                Natural Remedies
              </TabsTrigger>
              <TabsTrigger value="exercise" className="gap-2">
                <Dumbbell className="h-4 w-4" />
                Exercise
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Lifestyle Tips
              </TabsTrigger>
            </TabsList>

            {/* Natural Remedies Tab */}
            <TabsContent value="remedies" className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Indian Household Remedies</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {indianRemedies.map((remedy, index) => (
                  <Card key={index} className="border-2 border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={remedy.image} 
                        alt={remedy.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{remedy.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{remedy.description}</p>
                      <div className="pt-3 border-t border-border">
                        <p className="font-semibold text-sm text-primary mb-1">Benefits:</p>
                        <p className="text-sm text-muted-foreground">{remedy.benefits}</p>
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold text-sm text-primary mb-1">How to Use:</p>
                        <p className="text-sm text-muted-foreground">{remedy.howToUse}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-6 mt-12">Diabetes-Friendly Foods</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dietaryTips.map((tip, index) => (
                  <Card key={index} className="border-2 border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={tip.image} 
                        alt={tip.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{tip.description}</p>
                      <div className="pt-3 border-t border-border">
                        <p className="font-semibold text-sm text-primary mb-1">Benefits:</p>
                        <p className="text-sm text-muted-foreground">{tip.benefits}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Exercise Tab */}
            <TabsContent value="exercise" className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Exercises & Yoga Asanas</h2>
              <p className="text-muted-foreground mb-8">
                These specific yoga poses and exercises target the pancreas, improve metabolism, and help regulate blood sugar naturally. 
                Practice them regularly for best results.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exercises.map((exercise, index) => (
                  <Card key={index} className="border-2 border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={exercise.image} 
                        alt={exercise.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{exercise.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{exercise.description}</p>
                      <div className="pt-3 border-t border-border">
                        <p className="font-semibold text-sm text-primary mb-1">Benefits:</p>
                        <p className="text-sm text-muted-foreground">{exercise.benefits}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-primary/20 bg-primary/5 mt-8">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Exercise Tips:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Start slowly if you're new to exercise and gradually increase intensity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Aim for at least 150 minutes of moderate exercise per week</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Check your blood sugar before and after exercise</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Stay hydrated during workouts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Wear comfortable shoes and clothes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lifestyle Tips Tab */}
            <TabsContent value="lifestyle" className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Essential Lifestyle Changes</h2>
              
              <Card className="border-2 border-border">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lifestyleTips.map((tip, index) => (
                      <div key={index} className="flex gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-primary-foreground font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/50 bg-accent/5 mt-8">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 text-center text-lg">Remember</h3>
                  <p className="text-muted-foreground text-center">
                    Consistency is key! Small, sustainable changes in your daily routine can lead to significant improvements in your health over time. 
                    Combine these natural remedies with regular exercise, a balanced diet, and medical supervision for the best results.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthTips;
