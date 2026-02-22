import { Card } from "@/app/components/ui/card";
import { Lock, Zap, Users, BookOpen, Shield, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Lock,
    title: "Hidden in the Tax Code",
    description: "Strategies buried in plain sight within IRS publications. Completely legal, fully documented, yet rarely discussed by mainstream financial institutions."
  },
  {
    icon: Zap,
    title: "Surprisingly Simple",
    description: "No complex jargon or confusing financial products. These are straightforward strategies that make sense the moment you see them."
  },
  {
    icon: Users,
    title: "Works for Everyone",
    description: "Whether you earn $40k or $400k, are 25 or 65, these strategies scale to your situation. Income level doesn't matter."
  },
  {
    icon: BookOpen,
    title: "Educational Approach",
    description: "We show you exactly how it works, with real examples and documentation. You'll understand every step before making any decisions."
  },
  {
    icon: Shield,
    title: "100% Legitimate",
    description: "Every strategy is IRS-approved and time-tested. No gray areas, no loopholes that might close—just solid, legal financial planning."
  },
  {
    icon: Sparkles,
    title: "Immediate Clarity",
    description: "That 'aha!' moment when you realize how accessible this really is. Most people are shocked they didn't know about this sooner."
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm mb-4">
            The Truth They Don't Advertise
          </div>
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Why This Feels Like a Secret
          </h2>
          <p className="text-xl text-gray-600">
            It's not actually a secret—it's just that nobody profits from teaching you these strategies. 
            Here's what makes this different from everything else you've heard.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-yellow-400">
                <div className="size-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="size-6 text-yellow-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}