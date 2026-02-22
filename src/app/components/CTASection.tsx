import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import { Calendar, Clock, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    toast.success("Strategy session confirmed! Check your email for next steps.");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: ""
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="booking-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6">
            <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm border border-yellow-400/30">
              Limited Availability This Month
            </div>
            
            <h2 className="text-4xl sm:text-5xl">
              See It for Yourself.<br/>
              <span className="text-yellow-400">No Cost. No Catch.</span>
            </h2>
            <p className="text-xl text-gray-300">
              In 30 minutes, you'll understand exactly what's been sitting in plain sight. 
              We'll show you the actual documents, walk through real examples, and apply it to your situation.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg">Zero pressure or obligation</div>
                  <p className="text-gray-400">This is education, not a sales pitch</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg">See the proof yourself</div>
                  <p className="text-gray-400">Tax code references and real documentation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg">Works for any income level</div>
                  <p className="text-gray-400">Whether you earn $40k or $400k+</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="size-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg">Your info stays private</div>
                  <p className="text-gray-400">We never share or sell your information</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right form */}
          <Card className="p-8 bg-white">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="size-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-2">
                  You're In!
                </h3>
                <p className="text-gray-600">
                  Check your email for confirmation and next steps. We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl text-gray-900 mb-2">
                    Claim Your Free Strategy Session
                  </h3>
                  <p className="text-gray-600">
                    30 minutes that could change how you think about your finances forever.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
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
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="flex items-center gap-2">
                        <Clock className="size-4" />
                        Preferred Time
                      </Label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-6 text-lg"
                  >
                    Yes, Show Me What I've Been Missing
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    100% free. No credit card required. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}