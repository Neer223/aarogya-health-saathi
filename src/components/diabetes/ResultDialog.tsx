import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: 'low-risk' | 'pre-diabetic' | 'diabetic';
  patientName?: string;
}

const ResultDialog = ({ open, onOpenChange, result, patientName }: ResultDialogProps) => {
  const navigate = useNavigate();

  const handleViewTips = () => {
    onOpenChange(false);
    navigate('/health-tips');
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
            'Continue with regular physical activity',
            'Maintain a balanced, nutritious diet',
            'Get regular health check-ups annually',
            'Stay hydrated and get adequate sleep'
          ],
          showTipsButton: true,
          tipsButtonText: 'View Healthy Living Tips',
          tipsButtonVariant: 'primary' as const,
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
            'Adopt a low-sugar, whole-food diet',
            'Exercise for 30 minutes, 5 days a week',
            'Monitor your blood sugar regularly',
            'Reduce stress through meditation or yoga',
            'Get 7-8 hours of quality sleep'
          ],
          showTipsButton: true,
          tipsButtonText: 'Yes, Show Me How to Reverse This',
          tipsButtonVariant: 'warning' as const,
        };
      case 'diabetic':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: "Take Action - Diabetes is Manageable! 🌟",
          description: `${patientName ? `${patientName}, your` : 'Your'} results indicate diabetic-level markers. While this requires attention, remember: diabetes can be effectively managed and even reversed with proper care. Many people have successfully improved their condition through natural remedies and lifestyle modifications.`,
          recommendations: [
            'Consult with a healthcare provider immediately',
            'Start a diabetes-friendly diet plan',
            'Engage in regular, moderate exercise',
            'Monitor blood glucose levels daily',
            'Consider natural supplements (consult doctor)',
            'Join a diabetes support group'
          ],
          showTipsButton: true,
          tipsButtonText: 'Show Me Diabetes Management Tips',
          tipsButtonVariant: 'destructive' as const,
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

        {/* Recommendations Section */}
        <div className={`mt-6 p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
          <h4 className="font-semibold text-sm mb-3 text-gray-900">
            {result === 'low-risk' ? 'Keep Up These Habits:' : 'Recommended Actions:'}
          </h4>
          <ul className="space-y-2">
            {config.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`${config.iconColor} mt-0.5`}>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Note */}
        {result !== 'low-risk' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Important:</strong> This assessment is based on the data provided and uses predictive modeling. 
              It is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice and treatment.
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
              } text-white`}
            >
              {config.tipsButtonText}
            </AlertDialogAction>
          )}
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            {config.showTipsButton ? 'I\'ll Check This Later' : 'Great, Thanks!'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultDialog;