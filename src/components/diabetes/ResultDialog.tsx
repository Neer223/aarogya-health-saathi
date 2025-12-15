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
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  riskPercentage: number; // 0-100 from your model
  riskCategory: string; // "Low Risk", "Pre-Diabetic", "Diabetic"
  patientName?: string;
  onViewTips?: () => void; // Callback for viewing tips
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

  // Normalize result type from category
  const getResultType = (): 'low-risk' | 'pre-diabetic' | 'diabetic' | 'unknown' => {
    const category = riskCategory.toLowerCase();
    if (category.includes('low')) return 'low-risk';
    if (category.includes('pre')) return 'pre-diabetic';
    if (category.includes('diabetic')) return 'diabetic';
    return 'unknown';
  };

  const result = getResultType();

  // Animate the progress bar when dialog opens
  useEffect(() => {
    if (open && riskPercentage !== undefined && riskPercentage !== null) {
      setAnimatedWidth(0);
      const timer = setTimeout(() => {
        setAnimatedWidth(Math.min(riskPercentage, 100));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedWidth(0);
    }
  }, [open, riskPercentage]);

  const handleViewTips = () => {
    onOpenChange(false);
    if (onViewTips) {
      onViewTips();
    }
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getRiskPercentageDisplay = () => {
    let riskBar = '';
    let riskColor = '';
    let barColor = '';
    
    if (riskPercentage < 30) {
      riskBar = 'Low Risk Zone';
      riskColor = 'text-emerald-700';
      barColor = 'bg-emerald-500';
    } else if (riskPercentage < 50) {
      riskBar = 'Moderate Risk Zone';
      riskColor = 'text-amber-700';
      barColor = 'bg-amber-500';
    } else {
      riskBar = 'High Risk Zone';
      riskColor = 'text-red-700';
      barColor = 'bg-red-500';
    }
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Risk Probability</span>
          <span className={`text-lg font-bold ${riskColor}`}>
            {formatPercentage(riskPercentage)}
          </span>
        </div>
        
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden relative">
          <div 
            className={`h-full ${barColor} transition-all duration-1000 ease-out`}
            style={{ width: `${animatedWidth}%` }}
          />
          
          <div className="absolute inset-0 flex items-center">
            <div className="w-px h-full bg-gray-500 opacity-70 absolute" style={{ left: '30%' }}></div>
            <div className="w-px h-full bg-gray-500 opacity-70 absolute" style={{ left: '50%' }}></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
          <span className="font-medium">0%</span>
          <span className="font-medium text-amber-600">30%</span>
          <span className="font-medium text-red-600">50%</span>
          <span className="font-medium">100%</span>
        </div>
        
        <div className={`text-center mt-3 py-2 rounded ${
          riskPercentage < 30 ? 'bg-emerald-100' : 
          riskPercentage < 50 ? 'bg-amber-100' : 
          'bg-red-100'
        }`}>
          <p className={`text-sm font-bold ${riskColor}`}>
            {riskBar}
          </p>
        </div>
      </div>
    );
  };

  const getResultConfig = () => {
    switch (result) {
      case 'low-risk':
        return {
          icon: CheckCircle,
          iconColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          title: 'Excellent News! 🎉',
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
          tipsButtonVariant: 'primary' as const,
          probabilityThreshold: '< 30%'
        };
      case 'pre-diabetic':
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          title: "You're in Control! 💪",
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
          tipsButtonVariant: 'warning' as const,
          probabilityThreshold: '30-50%'
        };
      case 'diabetic':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: "Take Action - Diabetes is Manageable! 🌟",
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
          tipsButtonVariant: 'destructive' as const,
          probabilityThreshold: '≥ 50%'
        };
      case 'unknown':
      default:
        return {
          icon: Info,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: "Unable to Determine Risk",
          description: `We encountered an issue processing your results. Please ensure all health data is entered correctly and try again.`,
          recommendations: [
            'Verify all input fields are filled correctly',
            'Check that numeric values are within valid ranges',
            'Ensure gender and smoking history are selected',
            'Try submitting the form again'
          ],
          showTipsButton: false,
          tipsButtonText: '',
          tipsButtonVariant: 'primary' as const,
          probabilityThreshold: 'N/A'
        };
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center`}>
              <Icon className={`h-10 w-10 ${config.iconColor}`} />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl font-bold">
            {config.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base leading-relaxed pt-2">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {result !== 'unknown' && getRiskPercentageDisplay()}

        {result !== 'unknown' && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Info className="h-4 w-4" />
            <span>
              Risk threshold for <strong>{riskCategory}</strong>: {config.probabilityThreshold}
            </span>
          </div>
        )}

        {result !== 'unknown' && (
          <div className="mt-2 text-center text-xs text-gray-500">
            Model Assessment: {riskCategory}
          </div>
        )}

        <div className={`mt-6 p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
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

        {result !== 'low-risk' && result !== 'unknown' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>⚕️ Important Medical Disclaimer:</strong> This assessment is based on machine learning predictive modeling using the data you provided. 
              It is <strong>NOT a medical diagnosis</strong> and should not replace professional medical advice. 
              Please consult with a qualified healthcare provider for proper diagnosis, treatment, and personalized medical guidance.
            </p>
          </div>
        )}

        <AlertDialogFooter className="flex-col sm:flex-col gap-3 mt-6">
          {config.showTipsButton && (
            <AlertDialogAction
              onClick={handleViewTips}
              className={`w-full ${
                config.tipsButtonVariant === 'primary' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : config.tipsButtonVariant === 'warning'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white font-medium`}
            >
              {config.tipsButtonText}
            </AlertDialogAction>
          )}
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full bg-gray-200 text-gray-900 hover:bg-gray-300 font-medium"
          >
            {config.showTipsButton ? 'I\'ll Check This Later' : result === 'unknown' ? 'Close' : 'Great, Thanks!'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultDialog;