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
}

const ResultDialog = ({ open, onOpenChange, result }: ResultDialogProps) => {
  const navigate = useNavigate();

  const handleViewTips = () => {
    navigate('/health-tips');
  };

  const getResultConfig = () => {
    switch (result) {
      case 'low-risk':
        return {
          icon: CheckCircle,
          iconColor: 'text-accent',
          title: 'Low Risk',
          description: 'Great news! Your results suggest a low risk of diabetes. Keep maintaining your healthy lifestyle!',
          showTipsButton: false,
        };
      case 'pre-diabetic':
        return {
          icon: AlertTriangle,
          iconColor: 'text-accent',
          title: "Don't Worry, You're in Control!",
          description: "Your results suggest pre-diabetic indicators. But here's the good news: diabetes in initial stages is always reversible with the right lifestyle changes!",
          showTipsButton: true,
        };
      case 'diabetic':
        return {
          icon: AlertCircle,
          iconColor: 'text-destructive',
          title: "Don't Worry, Diabetes is Reversible!",
          description: 'Your results suggest diabetic indicators. However, with proper care, natural remedies, and lifestyle changes, diabetes can be managed and even reversed. See our health tips to get started.',
          showTipsButton: true,
        };
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-${result === 'low-risk' ? 'accent' : 'accent'}/10 flex items-center justify-center`}>
              <Icon className={`h-8 w-8 ${config.iconColor}`} />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl">
            {config.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col gap-2">
          {config.showTipsButton && (
            <AlertDialogAction
              onClick={handleViewTips}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Yes, Show Me Health Tips
            </AlertDialogAction>
          )}
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {config.showTipsButton ? 'Maybe Later' : 'Great, Thanks!'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultDialog;
