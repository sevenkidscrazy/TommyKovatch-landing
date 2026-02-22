import { useState, useEffect } from 'react';
import { Settings, X, Copy, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';

interface ThemeConfig {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  gradientIntensity: 'light' | 'medium' | 'dark';
  customPrimaryHex?: string;
  customSecondaryHex?: string;
  logoUrl?: string;
  logoShape?: 'circle' | 'square' | 'rounded';
}

const defaultTheme: ThemeConfig = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  primaryColor: 'custom',
  secondaryColor: 'custom',
  gradientIntensity: 'medium',
  customPrimaryHex: '#1a3a5c',
  customSecondaryHex: '#c9a961'
};

const fontOptions = [
  { value: 'system-ui, -apple-system, sans-serif', label: 'System Default' },
  { value: 'Georgia, serif', label: 'Georgia (Serif)' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"Trebuchet MS", sans-serif', label: 'Trebuchet' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: '"Courier New", monospace', label: 'Courier New' },
  { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
  { value: 'Impact, sans-serif', label: 'Impact' },
];

const colorOptions = [
  { value: 'blue', label: 'Blue', hex: '#2563eb' },
  { value: 'indigo', label: 'Indigo', hex: '#6366f1' },
  { value: 'purple', label: 'Purple', hex: '#9333ea' },
  { value: 'pink', label: 'Pink', hex: '#ec4899' },
  { value: 'red', label: 'Red', hex: '#ef4444' },
  { value: 'orange', label: 'Orange', hex: '#f97316' },
  { value: 'amber', label: 'Amber', hex: '#f59e0b' },
  { value: 'yellow', label: 'Yellow', hex: '#eab308' },
  { value: 'lime', label: 'Lime', hex: '#84cc16' },
  { value: 'green', label: 'Green', hex: '#22c55e' },
  { value: 'emerald', label: 'Emerald', hex: '#10b981' },
  { value: 'teal', label: 'Teal', hex: '#14b8a6' },
  { value: 'cyan', label: 'Cyan', hex: '#06b6d4' },
  { value: 'sky', label: 'Sky', hex: '#0ea5e9' },
  { value: 'slate', label: 'Slate', hex: '#64748b' },
  { value: 'gray', label: 'Gray', hex: '#6b7280' },
  { value: 'zinc', label: 'Zinc', hex: '#71717a' },
  { value: 'stone', label: 'Stone', hex: '#78716c' },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [copied, setCopied] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tommy_theme_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTheme(parsed);
        applyTheme(parsed);
      } catch (e) {
        console.error('Failed to parse saved theme:', e);
        // If parsing fails, apply default theme
        applyTheme(defaultTheme);
      }
    } else {
      // No saved theme, apply default
      applyTheme(defaultTheme);
    }
  }, []);

  // Apply theme changes to document
  const applyTheme = (newTheme: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply font family
    root.style.setProperty('font-family', newTheme.fontFamily);
    document.body.style.fontFamily = newTheme.fontFamily;
    
    // Determine which colors to use (custom or preset)
    let primaryHex: string;
    let secondaryHex: string;
    
    if (newTheme.customPrimaryHex) {
      primaryHex = newTheme.customPrimaryHex;
    } else {
      const primaryColor = colorOptions.find(c => c.value === newTheme.primaryColor);
      if (!primaryColor) return;
      primaryHex = primaryColor.hex;
    }
    
    if (newTheme.customSecondaryHex) {
      secondaryHex = newTheme.customSecondaryHex;
    } else {
      const secondaryColor = colorOptions.find(c => c.value === newTheme.secondaryColor);
      if (!secondaryColor) return;
      secondaryHex = secondaryColor.hex;
    }
    
    // Create or update style tag for color overrides
    let styleTag = document.getElementById('theme-customizer-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-customizer-styles';
      document.head.appendChild(styleTag);
    }
    
    // Generate color shades for the selected colors
    const generateShades = (baseHex: string) => {
      // Parse hex to RGB
      const hex = baseHex.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Generate shades
      const shades = {
        50: `${Math.min(255, r + 200)}, ${Math.min(255, g + 200)}, ${Math.min(255, b + 200)}`,
        100: `${Math.min(255, r + 150)}, ${Math.min(255, g + 150)}, ${Math.min(255, b + 150)}`,
        200: `${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)}`,
        500: `${r}, ${g}, ${b}`,
        600: `${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)}`,
        700: `${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}`,
      };
      
      return shades;
    };
    
    const primaryShades = generateShades(primaryHex);
    const secondaryShades = generateShades(secondaryHex);
    
    // Override blue colors with primary color
    // Override emerald colors with secondary color
    styleTag.textContent = `
      :root {
        --color-blue-50: ${primaryShades[50]};
        --color-blue-100: ${primaryShades[100]};
        --color-blue-200: ${primaryShades[200]};
        --color-blue-500: ${primaryShades[500]};
        --color-blue-600: ${primaryShades[600]};
        --color-blue-700: ${primaryShades[700]};
        
        --color-emerald-50: ${secondaryShades[50]};
        --color-emerald-100: ${secondaryShades[100]};
        --color-emerald-200: ${secondaryShades[200]};
        --color-emerald-500: ${secondaryShades[500]};
        --color-emerald-600: ${secondaryShades[600]};
        --color-emerald-700: ${secondaryShades[700]};
      }
      
      .bg-blue-50 { background-color: rgb(${primaryShades[50]}); }
      .bg-blue-600 { background-color: rgb(${primaryShades[600]}); }
      .bg-blue-700 { background-color: rgb(${primaryShades[700]}); }
      .hover\\:bg-blue-700:hover { background-color: rgb(${primaryShades[700]}); }
      .text-blue-50 { color: rgb(${primaryShades[50]}); }
      .text-blue-100 { color: rgb(${primaryShades[100]}); }
      .text-blue-600 { color: rgb(${primaryShades[600]}); }
      .border-blue-200 { border-color: rgb(${primaryShades[200]}); }
      .from-blue-50 { --tw-gradient-from: rgb(${primaryShades[50]}); --tw-gradient-to: rgb(${primaryShades[50]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .from-blue-500 { --tw-gradient-from: rgb(${primaryShades[500]}); --tw-gradient-to: rgb(${primaryShades[500]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .from-blue-600 { --tw-gradient-from: rgb(${primaryShades[600]}); --tw-gradient-to: rgb(${primaryShades[600]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .from-blue-700 { --tw-gradient-from: rgb(${primaryShades[700]}); --tw-gradient-to: rgb(${primaryShades[700]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .via-blue-700 { --tw-gradient-to: rgb(${primaryShades[700]} / 0); --tw-gradient-stops: var(--tw-gradient-from), rgb(${primaryShades[700]}), var(--tw-gradient-to); }
      .to-blue-600 { --tw-gradient-to: rgb(${primaryShades[600]}); }
      .hover\\:from-blue-700:hover { --tw-gradient-from: rgb(${primaryShades[700]}); --tw-gradient-to: rgb(${primaryShades[700]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      
      .bg-emerald-50 { background-color: rgb(${secondaryShades[50]}); }
      .bg-emerald-100 { background-color: rgb(${secondaryShades[100]}); }
      .bg-emerald-600 { background-color: rgb(${secondaryShades[600]}); }
      .text-emerald-600 { color: rgb(${secondaryShades[600]}); }
      .border-emerald-200 { border-color: rgb(${secondaryShades[200]}); }
      .from-emerald-50 { --tw-gradient-from: rgb(${secondaryShades[50]}); --tw-gradient-to: rgb(${secondaryShades[50]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .from-emerald-500 { --tw-gradient-from: rgb(${secondaryShades[500]}); --tw-gradient-to: rgb(${secondaryShades[500]} / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .to-emerald-50 { --tw-gradient-to: rgb(${secondaryShades[50]}); }
      .to-emerald-600 { --tw-gradient-to: rgb(${secondaryShades[600]}); }
      .to-emerald-700 { --tw-gradient-to: rgb(${secondaryShades[700]}); }
      .hover\\:to-emerald-700:hover { --tw-gradient-to: rgb(${secondaryShades[700]}); }
    `;
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('tommy_theme_config', JSON.stringify(newTheme));
    
    // Dispatch custom event for same-page updates
    window.dispatchEvent(new Event('theme-updated'));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.removeItem('tommy_theme_config');
    
    // Dispatch custom event for same-page updates
    window.dispatchEvent(new Event('theme-updated'));
  };

  const copyConfig = () => {
    const config = {
      fontFamily: theme.fontFamily,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      gradientIntensity: theme.gradientIntensity,
      customPrimaryHex: theme.customPrimaryHex,
      customSecondaryHex: theme.customSecondaryHex,
      logoUrl: theme.logoUrl,
      logoShape: theme.logoShape,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGradientShade = (color: string, intensity: string) => {
    const shades = {
      light: { from: 50, to: 100 },
      medium: { from: 500, to: 600 },
      dark: { from: 700, to: 900 },
    };
    return shades[intensity as keyof typeof shades];
  };

  // Hide the UI controls - colors still apply automatically
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#1a3a5c] to-[#c9a961] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        aria-label="Open theme customizer"
      >
        <Settings className="size-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-lg shadow-2xl border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-2">
          <Settings className="size-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Theme Customizer</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close theme customizer"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <select
            value={theme.fontFamily}
            onChange={(e) => updateTheme({ fontFamily: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            Preview: <span style={{ fontFamily: theme.fontFamily }}>The quick brown fox</span>
          </p>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="grid grid-cols-6 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => updateTheme({ primaryColor: color.value, customPrimaryHex: undefined })}
                className={`h-10 rounded-md border-2 transition-all ${
                  theme.primaryColor === color.value && !theme.customPrimaryHex
                    ? 'border-gray-900 scale-110 shadow-lg'
                    : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
          
          {/* Custom color picker */}
          <div className="flex items-center gap-2 pt-2">
            <Label className="text-xs text-gray-600">Or use custom:</Label>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="color"
                value={theme.customPrimaryHex || colorOptions.find(c => c.value === theme.primaryColor)?.hex || '#2563eb'}
                onChange={(e) => updateTheme({ customPrimaryHex: e.target.value })}
                className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.customPrimaryHex || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value) || value === '') {
                    updateTheme({ customPrimaryHex: value || undefined });
                  }
                }}
                placeholder="#2563eb"
                className="flex-1 p-1 text-xs border border-gray-300 rounded-md"
              />
              {theme.customPrimaryHex && (
                <button
                  onClick={() => updateTheme({ customPrimaryHex: undefined })}
                  className="text-xs text-gray-500 hover:text-gray-700"
                  title="Clear custom color"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            {theme.customPrimaryHex ? `Custom: ${theme.customPrimaryHex}` : `Selected: ${theme.primaryColor}`}
          </p>
        </div>

        {/* Secondary Color */}
        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <div className="grid grid-cols-6 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => updateTheme({ secondaryColor: color.value, customSecondaryHex: undefined })}
                className={`h-10 rounded-md border-2 transition-all ${
                  theme.secondaryColor === color.value && !theme.customSecondaryHex
                    ? 'border-gray-900 scale-110 shadow-lg'
                    : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
          
          {/* Custom color picker */}
          <div className="flex items-center gap-2 pt-2">
            <Label className="text-xs text-gray-600">Or use custom:</Label>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="color"
                value={theme.customSecondaryHex || colorOptions.find(c => c.value === theme.secondaryColor)?.hex || '#10b981'}
                onChange={(e) => updateTheme({ customSecondaryHex: e.target.value })}
                className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={theme.customSecondaryHex || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value) || value === '') {
                    updateTheme({ customSecondaryHex: value || undefined });
                  }
                }}
                placeholder="#10b981"
                className="flex-1 p-1 text-xs border border-gray-300 rounded-md"
              />
              {theme.customSecondaryHex && (
                <button
                  onClick={() => updateTheme({ customSecondaryHex: undefined })}
                  className="text-xs text-gray-500 hover:text-gray-700"
                  title="Clear custom color"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            {theme.customSecondaryHex ? `Custom: ${theme.customSecondaryHex}` : `Selected: ${theme.secondaryColor}`}
          </p>
        </div>

        {/* Gradient Intensity */}
        <div className="space-y-2">
          <Label>Gradient Intensity</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'medium', 'dark'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => updateTheme({ gradientIntensity: intensity })}
                className={`p-3 rounded-md border-2 text-sm font-medium capitalize transition-all ${
                  theme.gradientIntensity === intensity
                    ? 'border-gray-900 bg-gray-100'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {intensity}
              </button>
            ))}
          </div>
        </div>

        {/* Logo Customization */}
        <div className="space-y-2">
          <Label>Logo</Label>
          
          {/* Logo URL Input */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Logo URL:</Label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={theme.logoUrl || ''}
                onChange={(e) => updateTheme({ logoUrl: e.target.value || undefined })}
                placeholder="https://example.com/logo.png"
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
              />
              {theme.logoUrl && (
                <button
                  onClick={() => updateTheme({ logoUrl: undefined })}
                  className="text-gray-500 hover:text-gray-700"
                  title="Clear logo URL"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Paste a URL to any logo image
            </p>
          </div>
          
          {/* OR divider */}
          <div className="flex items-center gap-2 py-1">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-xs text-gray-500 px-2">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Local File Upload */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Upload Local File:</Label>
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <svg className="size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600">Choose file</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Check file size (limit to 2MB)
                      if (file.size > 2 * 1024 * 1024) {
                        alert('File size must be less than 2MB');
                        e.target.value = '';
                        return;
                      }
                      
                      // Convert to data URL
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const dataUrl = event.target?.result as string;
                        updateTheme({ logoUrl: dataUrl });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, SVG, or GIF (max 2MB)
            </p>
          </div>
          
          {/* Logo Shape */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Logo Shape:</Label>
            <div className="grid grid-cols-3 gap-2">
              {(['circle', 'rounded', 'square'] as const).map((shape) => (
                <button
                  key={shape}
                  onClick={() => updateTheme({ logoShape: shape })}
                  className={`p-3 rounded-md border-2 text-sm font-medium capitalize transition-all ${
                    (theme.logoShape || 'circle') === shape
                      ? 'border-gray-900 bg-gray-100'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
          
          {/* Logo Preview */}
          {theme.logoUrl && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              <Label className="text-xs text-gray-600 mb-2 block">Preview:</Label>
              <div className="flex items-center gap-4">
                <img
                  src={theme.logoUrl}
                  alt="Custom logo preview"
                  className={`h-20 w-20 object-contain ${
                    theme.logoShape === 'circle' ? 'rounded-full' :
                    theme.logoShape === 'rounded' ? 'rounded-lg' :
                    ''
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="text-xs text-gray-500">
                  Desktop: 128x128px<br/>
                  Mobile: 80x80px
                  {theme.logoUrl.startsWith('data:') && (
                    <><br/><span className="text-emerald-600">✓ Local file</span></>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div 
            className="p-4 rounded-lg"
            style={{
              background: `linear-gradient(to right, var(--tw-gradient-stops))`,
              // @ts-ignore - Dynamic CSS variable
              '--tw-gradient-from': `rgb(var(--color-${theme.primaryColor}-${getGradientShade(theme.primaryColor, theme.gradientIntensity).from}))`,
              '--tw-gradient-to': `rgb(var(--color-${theme.secondaryColor}-${getGradientShade(theme.secondaryColor, theme.gradientIntensity).to}))`,
              '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
            }}
          >
            <p className="text-white font-semibold" style={{ fontFamily: theme.fontFamily }}>
              Sample gradient text
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
        <div className="flex gap-2">
          <Button
            onClick={copyConfig}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            {copied ? (
              <>
                <Check className="size-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-4 mr-2" />
                Copy Config
              </>
            )}
          </Button>
          <Button
            onClick={resetTheme}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <RotateCcw className="size-4 mr-2" />
            Reset
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Theme settings are saved in your browser
        </p>
      </div>
    </div>
  );
}