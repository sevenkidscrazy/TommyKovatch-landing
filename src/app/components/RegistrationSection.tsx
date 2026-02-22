import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { CheckCircle2, UserCheck, Shield } from "lucide-react";
import { toast } from "sonner";
import { trackButtonClick } from "@/app/utils/tracking";
import { trackRegistrationSubmitted } from "@/app/utils/sessionTracking";
import { Turnstile } from "@marsidev/react-turnstile";
import { getAffiliateData } from "@/app/utils/affiliate";

// Add your Calendly link here
const CALENDLY_LINK = "https://calendly.com/tommy-greenline/financial-strategy"; // Replace with your actual Calendly URL

// Cloudflare Turnstile Site Key - Get this from: https://dash.cloudflare.com/?to=/:account/turnstile
const TURNSTILE_SITE_KEY = "0x4AAAAAACYeM9XW0c6YFqVs"; // REPLACE WITH YOUR ACTUAL SITE KEY

// Detect if we're on the production domain
const isProduction = window.location.hostname === "petroscapitaladvisors.com" || 
                     window.location.hostname === "www.petroscapitaladvisors.com" ||
                     window.location.hostname === "tommykovatch.com" ||
                     window.location.hostname === "www.tommykovatch.com";

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    maritalStatus: "",
    annualIncome: "",
    totalDebt: "",
    additionalInfo: "",
    meetingPreference: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify Cloudflare Turnstile token is present (skip check if not in production)
    if (isProduction && !turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }
    
    // Track registration submission
    trackButtonClick('Submit Registration');
    trackRegistrationSubmitted();
    
    // Get affiliate/UTM data
    const affiliateData = getAffiliateData();
    
    // Ensure we always have source tracking - use defaults if no affiliate data captured
    const trackingData = {
      affiliateRef: affiliateData.ref || '',
      utmSource: affiliateData.utmSource || 'tommykovatch.com',
      utmMedium: affiliateData.utmMedium || 'website',
      utmCampaign: affiliateData.utmCampaign || 'organic'
    };
    
    // Submit form data to Google Sheets (including turnstile token for server-side verification)
    fetch('https://script.google.com/macros/s/AKfycbzwdnwsVmaV26ft8SItFmSkGpoKdBVvKiu1rHbcAkmkvMiyCwTAE1obuXUpowBUfJvrrA/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logType: 'tommy reg', // Tell Google Apps Script to write to "Tommy Reg" tab
        source: 'tommykovatch.com', // Identify the source
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        maritalStatus: formData.maritalStatus,
        annualIncome: formData.annualIncome,
        totalDebt: formData.totalDebt,
        meetingPreference: 'calendly',
        additionalInfo: formData.additionalInfo,
        turnstileToken: turnstileToken, // Include token for server-side verification
        affiliateRef: trackingData.affiliateRef,
        utmSource: trackingData.utmSource,
        utmMedium: trackingData.utmMedium,
        utmCampaign: trackingData.utmCampaign
      })
    })
    .then(() => {
      setIsSubmitted(true);
      setIsRedirecting(true);
      
      // Build Calendly URL with prefilled data
      const calendlyUrl = new URL(CALENDLY_LINK);
      calendlyUrl.searchParams.set('name', `${formData.firstName} ${formData.lastName}`);
      calendlyUrl.searchParams.set('email', formData.email);
      calendlyUrl.searchParams.set('a1', formData.totalDebt); // a1 = Total Debt
      
      // Add US country code (+1) to phone number if not already present
      const phoneWithCountryCode = formData.phone.startsWith('+') ? formData.phone : `+1${formData.phone.replace(/\D/g, '')}`;
      calendlyUrl.searchParams.set('a2', phoneWithCountryCode); // a2 = Phone Number
      
      toast.success("Registration received! Redirecting you to schedule your meeting...");
      
      // Redirect to Calendly after a brief delay (2 seconds) so they see the success message
      setTimeout(() => {
        window.location.href = calendlyUrl.toString();
      }, 2000);
    })
    .catch((error) => {
      console.error('Submission error:', error);
      toast.error("There was an error submitting your registration. Please try again.");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  return (
    <section id="registration" className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/20 text-white px-6 py-3 rounded-full text-sm border border-white/30 mb-6">
            <UserCheck className="inline-block size-5 mr-2 mb-1" />
            Get Started Today
          </div>
          <h2 className="text-4xl sm:text-5xl text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Complete the form below to schedule your first session and start your path to complete financial freedom.
          </p>
        </div>
        
        <Card className="p-8 md:p-12 bg-white">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="size-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="size-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl text-gray-900 mb-4">
                Registration Received!
              </h3>
              {isRedirecting ? (
                <>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                    Thank you for accepting the challenge! Redirecting you to schedule your 1-on-1 meeting...
                  </p>
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg animate-pulse">
                    <p className="text-gray-700">
                      <strong>Redirecting to set an appointment with our next available fiduciary advisor.</strong>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Thank you for accepting the challenge! Our team will review your information and contact you within 24 hours to schedule your Educational Session.
                  </p>
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Next Step:</strong> Watch for an email from Tommy Kovatch with details about your scheduled sessions.
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.smith@example.com"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-base">Qualifying Questions *</Label>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">How old are you? *</Label>
                    <select
                      id="age"
                      name="age"
                      required
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      style={{ colorScheme: 'light' }}
                    >
                      <option value="">Select age range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-35">25-35</option>
                      <option value="36-49">36-49</option>
                      <option value="50-64">50-64</option>
                      <option value="65+">65+</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status *</Label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      required
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      style={{ colorScheme: 'light' }}
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income (combined if married) *</Label>
                    <select
                      id="annualIncome"
                      name="annualIncome"
                      required
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      style={{ colorScheme: 'light' }}
                    >
                      <option value="">Select income range</option>
                      <option value="$40k to $65k">$40k to $65k</option>
                      <option value="$65k to $80k">$65k to $80k</option>
                      <option value="$80k to $100k">$80k to $100k</option>
                      <option value="$100k to $200k">$100k to $200k</option>
                      <option value="$200k+">$200k+</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalDebt">Total Debt Burden (total principle balance owed) *</Label>
                    <select
                      id="totalDebt"
                      name="totalDebt"
                      required
                      value={formData.totalDebt}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      style={{ colorScheme: 'light' }}
                    >
                      <option value="">Select debt range</option>
                      <option value="$0 - $25k">$0 - $25k</option>
                      <option value="$25k - $100k">$25k - $100k</option>
                      <option value="$100k to $500k">$100k to $500k</option>
                      <option value="$500k+">$500k+</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Tell us about your financial goals or any specific concerns..."
                  className="w-full min-h-[100px]"
                />
              </div>
              
              {/* Security Verification Section */}
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="size-5 text-blue-600" />
                  <Label className="text-base mb-0">Security Verification *</Label>
                  {!isProduction && (
                    <span className="ml-auto text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      Dev Mode - Bypass Enabled
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please wait a moment while we verify you're human. This is invisible bot protection.
                </p>
                
                {isProduction ? (
                  <>
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => {
                        console.log('Turnstile verified! Token:', token);
                        setTurnstileToken(token);
                        setTurnstileReady(true);
                        toast.success("Security verification complete!");
                      }}
                      onError={(error) => {
                        console.error('Turnstile error:', error);
                        toast.error("Security verification failed. Please refresh the page.");
                      }}
                      onExpire={() => {
                        console.log('Turnstile expired');
                        setTurnstileToken("");
                        setTurnstileReady(false);
                        toast.error("Security verification expired. Please verify again.");
                      }}
                      options={{
                        theme: 'light',
                        size: 'normal',
                      }}
                    />
                    
                    {turnstileReady && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
                        <CheckCircle2 className="size-4" />
                        <span>Verified - you're good to go!</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Development Mode:</strong> Turnstile is disabled in preview. Bot protection will activate automatically on your published site (tommykovatch.com).
                    </p>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-6 text-lg"
              >
                Submit Registration
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                No purchase required. We will never share or sell your information. Protected under our Information Security Policy.
              </p>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}