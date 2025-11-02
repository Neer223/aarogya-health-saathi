import { useState } from 'react';
import { Leaf, Dumbbell, AlertCircle, Sparkles, Heart, Moon, Droplets, Apple, Wind, Brain, Scale, Pill, TrendingDown, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

// Types
type TabValue = 'remedies' | 'exercise' | 'lifestyle';

const HealthTips = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('remedies');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const exercises = [
    {
      title: 'Daily Walking',
      description: 'A simple daily walk of 30–45 minutes can make a world of difference. Early morning walks in fresh air help balance blood sugar and refresh your mind.',
      benefits: 'Boosts insulin sensitivity, aids weight control, lowers stress, and keeps blood glucose in check.',
      color: 'from-blue-500 to-cyan-500',
      image: exerciseWalking,
    },
    {
      title: 'Surya Namaskar (Sun Salutation)',
      description: 'This full-body yoga flow of 12 poses energizes your body and mind. Try 5–10 rounds every morning to improve strength, flexibility, and metabolism.',
      benefits: 'Stimulates the pancreas, supports insulin production, burns calories, and tones the entire body.',
      color: 'from-orange-500 to-yellow-500',
      image: yogaSuryaNamaskar,
    },
    {
      title: 'Paschimottanasana (Seated Forward Bend)',
      description: 'Sit with legs stretched forward, then gently bend to touch your toes. Hold for 30–60 seconds. Do 3–5 sets with slow, deep breaths.',
      benefits: 'Massages abdominal organs, supports the pancreas and liver, improves digestion, and reduces belly fat.',
      color: 'from-purple-500 to-pink-500',
      image: yogaPaschimottanasana,
    },
    {
      title: 'Dhanurasana (Bow Pose)',
      description: 'Lie on your stomach, hold your ankles, and lift your chest and thighs off the floor. Hold for 15–30 seconds and repeat 3–4 times.',
      benefits: 'Strengthens the core, stimulates pancreatic function, improves digestion, and tones the abdomen.',
      color: 'from-green-500 to-teal-500',
      image: yogaDhanurasana,
    },
    {
      title: 'Trikonasana (Triangle Pose)',
      description: 'Stand with legs apart, bend sideways to touch one foot while raising the opposite arm. Hold for 30 seconds on each side.',
      benefits: 'Improves blood flow, activates abdominal organs, eases stress, and enhances posture and balance.',
      color: 'from-indigo-500 to-blue-500',
      image: yogaTrikonasana,
    },
    {
      title: 'Pranayama (Breathing Practices)',
      description: 'Spend 10–15 minutes daily on Anulom Vilom and Kapalbhati. These breathing exercises calm your mind and balance your system.',
      benefits: 'Reduces stress hormones, enhances oxygen flow, improves insulin sensitivity, and supports mental peace.',
      color: 'from-teal-500 to-emerald-500',
      image: yogaPranayama,
    },
  ];

  const indianRemedies = [
    {
      title: 'Bitter Gourd (Karela)',
      description: 'Start your day with karela juice or include it in meals two to three times a week.',
      benefits: 'Contains natural compounds that act like insulin to help lower blood sugar.',
      howToUse: 'Juice: Blend 2–3 karelas and strain. Add water if too bitter. Food: Cook karela sabzi with minimal oil and spices.',
      color: 'from-green-600 to-emerald-600',
      image: foodKarela,
    },
    {
      title: 'Fenugreek Seeds (Methi)',
      description: 'Soak 1–2 tablespoons of fenugreek seeds overnight. Drink the water and chew the soaked seeds in the morning.',
      benefits: 'High in fiber, helps slow sugar absorption and keeps you feeling full longer.',
      howToUse: 'You can also add methi seeds to curries, soups, or sprout them for salads.',
      color: 'from-amber-600 to-yellow-600',
      image: foodFenugreek,
    },
    {
      title: 'Indian Gooseberry (Amla)',
      description: 'Eat 1–2 fresh amlas daily, or mix 2–3 tablespoons of amla juice with water and drink in the morning.',
      benefits: 'Packed with vitamin C, it boosts metabolism, supports insulin secretion, and strengthens immunity.',
      howToUse: 'Enjoy fresh, as juice, or mix amla powder with water daily.',
      color: 'from-lime-600 to-green-600',
      image: foodAmla,
    },
    {
      title: 'Leafy Greens & Colorful Veggies',
      description: 'Include spinach, methi leaves, bottle gourd, bitter gourd, and other non-starchy vegetables in your meals.',
      benefits: 'They\'re rich in fiber, low in calories, and help regulate blood sugar naturally.',
      howToUse: 'Add to daily meals as salads, sabzis, or smoothies for maximum benefits.',
      color: 'from-emerald-600 to-teal-600',
      image: foodSalad,
    },
  ];

  const lifestyleTips = [
    { text: 'Get 7–8 hours of sound sleep every night', icon: Moon, color: 'from-indigo-500 to-purple-500' },
    { text: 'Manage stress with meditation or deep breathing', icon: Brain, color: 'from-pink-500 to-rose-500' },
    { text: 'Stay hydrated — aim for 8–10 glasses of water daily', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
    { text: 'Avoid sugary drinks and processed foods', icon: AlertCircle, color: 'from-red-500 to-orange-500' },
    { text: 'Eat smaller, balanced meals throughout the day', icon: Apple, color: 'from-green-500 to-emerald-500' },
    { text: 'Include whole grains like millets, oats, and brown rice', icon: Sparkles, color: 'from-amber-500 to-yellow-500' },
    { text: 'Limit alcohol and quit smoking for better health', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { text: 'Monitor your blood sugar levels regularly', icon: TrendingDown, color: 'from-violet-500 to-purple-500' },
    { text: 'Maintain a healthy weight through diet and exercise', icon: Scale, color: 'from-teal-500 to-cyan-500' },
    { text: 'Always take medications as advised by your doctor', icon: Pill, color: 'from-blue-500 to-indigo-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with animation */}
          <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-block mb-4">
              <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-600 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Natural Health Tips for Managing Diabetes
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Discover simple, natural ways — from Ayurveda to yoga and mindful eating — to help manage and even reverse early diabetes.
            </p>
          </div>

          {/* Important Notice */}
          <div className="mb-8 sm:mb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex gap-3 sm:gap-4">
                <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                    Important: Diabetes Can Be Reversed
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Studies show that with the right diet, exercise, and mindset, pre-diabetes and early-stage Type 2 diabetes can often be reversed. The following tips blend Ayurvedic wisdom with scientific guidance — but always consult your healthcare professional before making major lifestyle changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs - Now at top */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[
                { value: 'remedies' as TabValue, label: 'Natural Remedies', icon: Leaf, color: 'emerald' },
                { value: 'exercise' as TabValue, label: 'Exercise & Yoga', icon: Dumbbell, color: 'blue' },
                { value: 'lifestyle' as TabValue, label: 'Lifestyle Habits', icon: Heart, color: 'rose' }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base
                      transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${isActive 
                        ? `bg-${tab.color}-600 text-white shadow-lg` 
                        : `bg-white text-gray-700 hover:bg-${tab.color}-50 border-2 border-gray-200`
                      }
                    `}
                    style={isActive ? {
                      backgroundColor: tab.color === 'emerald' ? '#059669' : tab.color === 'blue' ? '#2563eb' : '#f43f5e',
                    } : {}}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Remedies Tab Content */}
            {activeTab === 'remedies' && (
              <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-right duration-500">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                    🌿 Indian Household Remedies
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {indianRemedies.map((remedy, index) => (
                      <div
                        key={index}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                          <img
                            src={remedy.image}
                            alt={remedy.title}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${remedy.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        </div>
                        <div className={`h-2 bg-gradient-to-r ${remedy.color}`}></div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                            {remedy.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                            {remedy.description}
                          </p>
                          <div className="space-y-2 sm:space-y-3">
                            <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                              <p className="font-semibold text-xs sm:text-sm text-emerald-700 mb-1">✓ Benefits:</p>
                              <p className="text-xs sm:text-sm text-gray-700">{remedy.benefits}</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                              <p className="font-semibold text-xs sm:text-sm text-blue-700 mb-1">→ How to Use:</p>
                              <p className="text-xs sm:text-sm text-gray-700">{remedy.howToUse}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Exercise Tab Content */}
            {activeTab === 'exercise' && (
              <div className="animate-in fade-in slide-in-from-right duration-500">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                  🧘 Recommended Exercises & Yoga
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center max-w-3xl mx-auto px-4">
                  These yoga poses and movements activate key organs, improve metabolism, and bring overall balance. Practice regularly, and remember — progress, not perfection!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                        <img
                          src={exercise.image}
                          alt={exercise.title}
                          className={`w-full h-full ${index === 5 ? 'object-contain' : 'object-cover'} transform transition-transform duration-500 group-hover:scale-110`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${exercise.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      </div>
                      <div className={`h-2 bg-gradient-to-r ${exercise.color}`}></div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                          {exercise.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                          {exercise.description}
                        </p>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border-l-4 border-blue-500">
                          <p className="font-semibold text-xs sm:text-sm text-blue-700 mb-1">💪 Benefits:</p>
                          <p className="text-xs sm:text-sm text-gray-700">{exercise.benefits}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lifestyle Tab Content */}
            {activeTab === 'lifestyle' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right duration-500">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                  ✨ Lifestyle Habits for Better Health
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {lifestyleTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div
                        key={index}
                        className="group relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        <div className="relative flex gap-3 sm:gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${tip.color} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <span className={`flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br ${tip.color} text-white text-xs font-bold`}>
                                {index + 1}
                              </span>
                              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                                {tip.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border-2 border-rose-200 rounded-2xl p-6 sm:p-8 shadow-lg text-center mt-8 sm:mt-12">
                  <div className="inline-block mb-4">
                    <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-rose-500 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">
                    Remember
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    Consistency matters more than perfection. Small, daily habits like mindful eating, movement, and rest can bring lasting change. Combine these tips with your doctor's advice for the best results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthTips;