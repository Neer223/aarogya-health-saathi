import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[var(--shadow-soft)]">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">DiabetesCare</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your natural companion for diabetes prevention and management through Ayurvedic wisdom and modern science.
            </p>
          </div>

          {/* Quick Links and Contact - Wrapper for mobile layout */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/tracker" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Diabetes Tracker
                  </Link>
                </li>
                <li>
                  <Link to="/health-tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Health Tips
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                   weare@diabetescare.com
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  +91 1800-XXX-XXXX
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  India
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 DiabetesCare. All rights reserved. | This is for educational purposes only. Please consult a healthcare professional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;