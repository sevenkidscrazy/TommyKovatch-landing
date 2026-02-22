import { Button } from "@/app/components/ui/button";
import { useEffect, useState } from "react";

interface ThemeConfig {
  logoUrl?: string;
  logoShape?: 'circle' | 'square' | 'rounded';
}

export function Header() {
  const [theme, setTheme] = useState<ThemeConfig>({});

  useEffect(() => {
    // Load saved theme from localStorage
    const saved = localStorage.getItem('tommy_theme_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTheme(parsed);
      } catch (e) {
        console.error('Failed to parse saved theme:', e);
      }
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem('tommy_theme_config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTheme(parsed);
        } catch (e) {
          console.error('Failed to parse saved theme:', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-page updates
    window.addEventListener('theme-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('theme-updated', handleStorageChange);
    };
  }, []);

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentLogo = theme.logoUrl || '/Tommy White Logo V2.png';
  const logoShapeClass = theme.logoShape === 'circle' ? 'rounded-full' :
                         theme.logoShape === 'rounded' ? 'rounded-lg' :
                         '';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-400/20 bg-gradient-to-t from-[#1a3a5c] to-[#c9a961] backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden sm:flex h-[138px] items-center justify-between">
          <div className="flex items-center gap-2 -ml-[10px]">
            <img 
              src={currentLogo} 
              alt="Tommy Kovatch" 
              className={`h-[134px] w-auto object-contain ${logoShapeClass}`}
            />
          </div>
          <Button 
            onClick={scrollToRegistration}
            className="bg-white hover:bg-gray-100 text-[#1a3a5c] font-semibold"
          >
            Meet Tommy
          </Button>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 -ml-[10px]">
              <img 
                src={currentLogo} 
                alt="Tommy Kovatch" 
                className={`h-[69px] w-auto object-contain ${logoShapeClass}`}
              />
            </div>
            <Button 
              onClick={scrollToRegistration}
              className="bg-white hover:bg-gray-100 text-[#1a3a5c] font-semibold"
            >
              Meet Tommy
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}