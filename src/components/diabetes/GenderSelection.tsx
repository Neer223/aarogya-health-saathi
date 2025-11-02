import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gender } from '@/types/diabetes';
import { User } from 'lucide-react';

interface GenderSelectionProps {
  onSelectGender: (gender: Gender) => void;
}

const GenderSelection = ({ onSelectGender }: GenderSelectionProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-border shadow-[var(--shadow-soft)]">
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Gender</h2>
            <p className="text-muted-foreground">
              This helps us provide more accurate predictions tailored to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelectGender('female')}
              className="h-24 text-lg font-semibold hover:border-primary hover:bg-primary/80 transition-all"
            >
              Female
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelectGender('male')}
              className="h-24 text-lg font-semibold hover:border-primary hover:bg-primary/80 transition-all"
            >
              Male
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelectGender('other')}
              className="h-24 text-lg font-semibold hover:border-primary hover:bg-primary/80 transition-all"
            >
              Other
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenderSelection;
