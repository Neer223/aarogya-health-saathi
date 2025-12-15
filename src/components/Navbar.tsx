import { Leaf, Menu, X, ChevronRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Health Tips', path: '/health-tips' },
    { name: 'Track Progress', path: '/track-progress' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white",
          scrolled
            ? "shadow-md border-gray-200"
            : "border-gray-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group relative z-50">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
                <Leaf className="h-5 w-5 fill-current" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">
                  Diabetes<span className="text-emerald-600">Care</span>
                </span>
                <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">
                  Health Companion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1.5 rounded-full border border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                    isActive(link.path)
                      ? "text-white bg-emerald-600 shadow-md"
                      : "text-gray-700 hover:text-gray-900 hover:bg-white/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link to="/tracker" className="hidden md:block">
                <Button 
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                  size="sm"
                >
                  Diabetes Tracker <Activity className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative z-50 p-2 text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-80 bg-white border-l border-gray-200 shadow-2xl z-40 md:hidden transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-6">
          <div className="space-y-6 flex-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border border-transparent",
                  isActive(link.path)
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "hover:bg-gray-50 text-gray-900"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="text-lg font-medium">{link.name}</span>
                <ChevronRight className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isActive(link.path) ? "text-emerald-600" : "text-gray-400 group-hover:translate-x-1"
                )} />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-gray-200">
            <Link to="/tracker" className="block">
              <Button className="w-full rounded-xl h-12 text-base bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 font-semibold" size="lg">
                Diabetes Tracker <Activity className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-center text-xs text-gray-500 mt-6">
              © 2024 DiabetesCare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;