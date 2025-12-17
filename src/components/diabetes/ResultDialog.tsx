import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle, CheckCircle, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  riskPercentage: number;
  riskCategory: string;
  patientName?: string;
  onViewTips?: () => void;
}

const ResultDialog = ({ 
  open, 
  onOpenChange, 
  riskPercentage,
  riskCategory,
  patientName,
  onViewTips
}: ResultDialogProps) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const getResultType = (): 'low-risk' | 'pre-diabetic' | 'diabetic' | 'unknown' => {
    const category = riskCategory.toLowerCase();
    if (category.includes('low')) return 'low-risk';
    if (category.includes('pre')) return 'pre-diabetic';
    if (category.includes('diabetic')) return 'diabetic';
    return 'unknown';
  };

  const result = getResultType();

  useEffect(() => {
    if (open && riskPercentage !== undefined && riskPercentage !== null) {
      setAnimatedWidth(0);
      setAnimatedNumber(0);
      setShowContent(false);
      
      const widthTimer = setTimeout(() => {
        setAnimatedWidth(Math.min(riskPercentage, 100));
      }, 200);
      
      // Animate the number counting up
      const duration = 1000;
      const steps = 60;
      const increment = riskPercentage / steps;
      let currentStep = 0;
      
      const numberInterval = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedNumber(Math.min(increment * currentStep, riskPercentage));
        } else {
          clearInterval(numberInterval);
        }
      }, duration / steps);
      
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      
      return () => {
        clearTimeout(widthTimer);
        clearTimeout(contentTimer);
        clearInterval(numberInterval);
      };
    } else {
      setAnimatedWidth(0);
      setAnimatedNumber(0);
      setShowContent(false);
    }
  }, [open, riskPercentage]);

  const handleViewTips = () => {
    onOpenChange(false);
    if (onViewTips) {
      onViewTips();
    }
    // Navigate to HealthTips page or scroll if on same page
    setTimeout(() => {
      const healthTipsSection = document.getElementById('health-tips-section');
      if (healthTipsSection) {
        // Section exists on same page - scroll to it
        healthTipsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Section not found - navigate to HealthTips page
        window.location.href = '/health-tips';
      }
    }, 300);
  };

  const getResultConfig = () => {
    switch (result) {
      case 'low-risk':
        return {
          icon: CheckCircle,
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          title: 'Excellent News! 🎉',
          subtitle: 'Low Risk of Diabetes',
          description: `${patientName ? `${patientName}, great` : 'Great'} news! Your results indicate a low risk of diabetes. Your health metrics are looking good. Keep maintaining your healthy lifestyle with regular exercise and balanced nutrition!`,
          recommendations: [
            'Continue with regular physical activity (150+ minutes/week)',
            'Maintain a balanced, nutritious diet rich in whole foods',
            'Get regular health check-ups annually to monitor vitals',
            'Stay hydrated (8+ glasses of water daily)',
            'Ensure 7-8 hours of quality sleep each night',
            'Manage stress through relaxation techniques'
          ],
          showTipsButton: true,
          tipsButtonText: 'View Healthy Living Tips',
          actionStyle: 'bg-emerald-600 hover:bg-emerald-700',
          probabilityThreshold: '< 30%'
        };
      case 'pre-diabetic':
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          iconBg: 'bg-amber-100',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          title: "You're in Control! 💪",
          subtitle: 'Pre-Diabetic Range',
          description: `${patientName ? `${patientName}, your` : 'Your'} results suggest pre-diabetic indicators. But here's the empowering truth: pre-diabetes is highly reversible! With the right lifestyle changes, you can prevent diabetes and improve your health significantly.`,
          recommendations: [
            'Adopt a low-sugar, whole-food diet (reduce refined carbs)',
            'Exercise for 30-45 minutes, at least 5 days a week',
            'Monitor your blood sugar levels regularly',
            'Lose 5-10% of body weight if overweight',
            'Reduce stress through meditation, yoga, or deep breathing',
            'Get 7-8 hours of quality sleep consistently',
            'Limit alcohol consumption and avoid smoking'
          ],
          showTipsButton: true,
          tipsButtonText: 'Yes, Show Me How to Reverse This',
          actionStyle: 'bg-amber-600 hover:bg-amber-700',
          probabilityThreshold: '30-50%'
        };
      case 'diabetic':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: "Take Action - Diabetes is Manageable! 🌟",
          subtitle: 'Diabetic Range Detected',
          description: `${patientName ? `${patientName}, your` : 'Your'} results indicate diabetic-level markers. While this requires immediate attention, remember: diabetes can be effectively managed and in many cases improved significantly with proper care and lifestyle modifications.`,
          recommendations: [
            '⚠️ Consult with a healthcare provider IMMEDIATELY',
            'Start a diabetes-friendly diet plan (low glycemic index foods)',
            'Engage in regular, moderate exercise (walking, swimming)',
            'Monitor blood glucose levels daily with a glucometer',
            'Take prescribed medications consistently as directed',
            'Consider consulting an endocrinologist and dietitian',
            'Join a diabetes support group for guidance and motivation',
            'Learn to recognize and manage hypo/hyperglycemia symptoms'
          ],
          showTipsButton: true,
          tipsButtonText: 'Show Me Diabetes Management Tips',
          actionStyle: 'bg-red-600 hover:bg-red-700',
          probabilityThreshold: '≥ 50%'
        };
      case 'unknown':
      default:
        return {
          icon: Info,
          iconColor: 'text-gray-600',
          iconBg: 'bg-gray-100',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: "Unable to Determine Risk",
          subtitle: 'Data Verification Needed',
          description: `We encountered an issue processing your results. Please ensure all health data is entered correctly and try again.`,
          recommendations: [
            'Verify all input fields are filled correctly',
            'Check that numeric values are within valid ranges',
            'Ensure gender and smoking history are selected',
            'Try submitting the form again'
          ],
          showTipsButton: false,
          tipsButtonText: '',
          actionStyle: 'bg-gray-600 hover:bg-gray-700',
          probabilityThreshold: 'N/A'
        };
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  const getRiskLevel = () => {
    if (riskPercentage < 30) return { 
      text: 'Low Risk Zone', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-600',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    };
    if (riskPercentage < 50) return { 
      text: 'Moderate Risk Zone', 
      color: 'text-amber-600', 
      bg: 'bg-amber-600',
      lightBg: 'bg-amber-50',
      borderColor: 'border-amber-200'
    };
    return { 
      text: 'High Risk Zone', 
      color: 'text-red-600', 
      bg: 'bg-red-600',
      lightBg: 'bg-red-50',
      borderColor: 'border-red-200'
    };
  };

  const riskLevel = getRiskLevel();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon with pulse animation */}
            <div className={`w-20 h-20 rounded-full ${config.iconBg} flex items-center justify-center shadow-lg transform transition-all duration-500 ${showContent ? 'scale-100' : 'scale-95'}`}>
              <Icon className={`h-10 w-10 ${config.iconColor}`} />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <AlertDialogTitle className="text-2xl font-bold text-gray-900">
                {config.title}
              </AlertDialogTitle>
              <div className="text-sm font-medium text-gray-500">
                {config.subtitle}
              </div>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Risk Percentage Display */}
        {result !== 'unknown' && (
          <div className="space-y-4 px-6">
            {/* Large percentage number */}
            <div className="flex items-baseline justify-center gap-2 py-4">
              <span className={`text-6xl font-bold ${riskLevel.color} transition-all duration-300 tabular-nums`}>
                {animatedNumber.toFixed(1)}
              </span>
              <span className="text-3xl text-gray-400 font-light">%</span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className={`h-full ${riskLevel.bg} rounded-full shadow-sm transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${animatedWidth}%`,
                    transition: 'width 1s cubic-bezier(0.65, 0, 0.35, 1)'
                  }}
                />
                
                {/* Threshold markers */}
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <div className="w-px h-full bg-white opacity-60 absolute" style={{ left: '30%' }}></div>
                  <div className="w-px h-full bg-white opacity-60 absolute" style={{ left: '50%' }}></div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>0%</span>
                <span className="text-amber-600">30%</span>
                <span className="text-red-600">50%</span>
                <span>100%</span>
              </div>

              {/* Risk badge */}
              <div className={`text-center py-2 px-4 rounded-lg ${riskLevel.lightBg} border ${riskLevel.borderColor}`}>
                <span className={`text-sm font-semibold ${riskLevel.color}`}>
                  {riskLevel.text}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Message with fade-in */}
        <div className={`px-6 transition-all duration-500 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <AlertDialogDescription className="text-center text-base text-gray-700 leading-relaxed">
            {config.description}
          </AlertDialogDescription>
        </div>

        {/* Key Recommendations */}
        <div className={`mx-6 p-4 rounded-lg ${config.bgColor} border ${config.borderColor} transition-all duration-500 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            {result === 'low-risk' ? '✅ Keep Up These Habits:' : 
             result === 'unknown' ? '⚠️ Next Steps:' : 
             '📋 Recommended Actions:'}
          </h4>
          <ul className="space-y-2">
            {config.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`${config.iconColor} mt-0.5 font-bold`}>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Medical Disclaimer */}
        {result !== 'low-risk' && result !== 'unknown' && (
          <div className={`mx-6 p-3 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-500 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>⚕️ Medical Disclaimer:</strong> This assessment is based on machine learning predictive modeling using the data you provided. It is <strong>NOT a medical diagnosis</strong> and should not replace professional medical advice. Please consult with a qualified healthcare provider for proper diagnosis, treatment, and personalized medical guidance.
            </p>
          </div>
        )}

        <AlertDialogFooter className="flex-col sm:flex-col gap-3 px-6 pt-4">
          {config.showTipsButton && (
            <AlertDialogAction
              onClick={handleViewTips}
              className={`w-full ${config.actionStyle} text-white font-medium py-3 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
            >
              {config.tipsButtonText}
              <ArrowRight className="h-4 w-4" />
            </AlertDialogAction>
          )}
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 font-medium py-3"
          >
            {config.showTipsButton ? "I'll Check This Later" : result === 'unknown' ? 'Close' : 'Great, Thanks!'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultDialog;