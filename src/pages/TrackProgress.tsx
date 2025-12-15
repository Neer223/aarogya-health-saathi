import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Calendar, TrendingUp, AlertCircle, Activity } from 'lucide-react';

// Types
interface HealthRecord {
  id: string;
  date: string;
  time: string;
  age: number;
  glucose: number;
  bloodPressure: string;
  bmi: number;
  riskLevel: string;
  riskScore: number;
}

interface UserProfile {
  name: string;
  gender: string;
  records: HealthRecord[];
}

const TrackProgress = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user profile exists in localStorage
    const savedProfile = localStorage.getItem('diabetesCareProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !gender) {
      alert('Please enter your name and select gender');
      return;
    }

    // Create new profile
    const newProfile: UserProfile = {
      name: name.trim(),
      gender,
      records: []
    };

    // Save to localStorage
    localStorage.setItem('diabetesCareProfile', JSON.stringify(newProfile));
    setUserProfile(newProfile);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {!userProfile ? (
            // New User - Registration Form
            <Card className="max-w-md mx-auto border-2 border-emerald-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Welcome to Track Progress
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Please enter your details to get started
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Gender *
                    </Label>
                    <RadioGroup value={gender} onValueChange={setGender}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer flex-1">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer flex-1">
                          Female
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer flex-1">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
                  >
                    Continue
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : userProfile.records.length === 0 ? (
            // User exists but no records
            <div className="text-center max-w-2xl mx-auto">
              <Card className="border-2 border-amber-200 shadow-xl">
                <CardContent className="pt-12 pb-12">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-10 w-10 text-amber-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome, {userProfile.name}!
                  </h2>
                  <p className="text-lg text-gray-600 mb-2">
                    Gender: <span className="font-semibold capitalize">{userProfile.gender}</span>
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    No health records found yet.
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={() => navigate('/tracker')}
                      className="w-full sm:w-auto px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-base"
                    >
                      Take Health Assessment
                    </Button>
                    <div className="pt-4">
                      <Button 
                        onClick={() => {
                          localStorage.removeItem('diabetesCareProfile');
                          setUserProfile(null);
                        }}
                        variant="outline"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Change Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // User with records - Show tracking history
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Health Progress Tracker
                </h1>
                <p className="text-xl text-gray-600">
                  Welcome back, <span className="font-semibold text-emerald-600">{userProfile.name}</span>!
                </p>
                <p className="text-gray-500 capitalize">Gender: {userProfile.gender}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-2 border-emerald-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Total Assessments</p>
                      <p className="text-3xl font-bold text-gray-900">{userProfile.records.length}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Activity className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Latest Risk Level</p>
                      <p className={`text-2xl font-bold ${userProfile.records[0].riskLevel.toLowerCase() === 'low' ? 'text-green-600' : userProfile.records[0].riskLevel.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {userProfile.records[0].riskLevel}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-cyan-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Last Assessment</p>
                      <p className="text-lg font-bold text-gray-900">{userProfile.records[0].date}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-2 border-emerald-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Assessment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.records.map((record) => (
                      <Card key={record.id} className={`border-2 ${getRiskColor(record.riskLevel)}`}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                              <p className="font-semibold text-gray-900">{record.date}</p>
                              <p className="text-sm text-gray-600">{record.time}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                              <p className={`text-xl font-bold ${record.riskLevel.toLowerCase() === 'low' ? 'text-green-600' : record.riskLevel.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                                {record.riskLevel}
                              </p>
                              <p className="text-sm text-gray-600">Score: {record.riskScore}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Glucose</p>
                              <p className="font-semibold text-gray-900">{record.glucose} mg/dL</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">BMI</p>
                              <p className="font-semibold text-gray-900">{record.bmi}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/tracker')}
                  className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8"
                >
                  New Assessment
                </Button>
                <Button 
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your profile? This will delete all your records.')) {
                      localStorage.removeItem('diabetesCareProfile');
                      setUserProfile(null);
                    }
                  }}
                  variant="outline"
                  className="h-12 px-8 border-2 border-gray-300 hover:bg-gray-50"
                >
                  Clear Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackProgress;