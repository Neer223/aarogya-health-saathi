import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Diabetes Tracker', path: '/tracker' },
    { name: 'Health Tips', path: '/health-tips' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button (Left) + Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground -ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Logo (Text Only on Mobile, with Heart on Desktop) */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="hidden md:flex w-10 h-10 bg-primary rounded-full items-center justify-center shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-glow)] transition-all">
                  <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                </div>
                <span className="text-xl font-bold text-foreground">DiabetesCare</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/tracker">
                <Button variant="default" size="sm">
                  Track Now
                </Button>
              </Link>
            </div>

            {/* Mobile Get Started Button */}
            <Link to="/tracker" className="md:hidden">
              <Button variant="default" size="sm">
                Track Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Mobile Navigation Sidebar with Slide Animation */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-card border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-foreground">DiabetesCare</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;