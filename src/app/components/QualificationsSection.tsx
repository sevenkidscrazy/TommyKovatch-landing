import { Card } from "@/app/components/ui/card";
import { Check, Home, DollarSign, Users, Monitor, TrendingUp } from "lucide-react";

export function QualificationsSection() {
  const qualifications = [
    {
      icon: DollarSign,
      title: "Married? - Best with $100k Combined Annual Household Income",
      description: "Actively managing multiple debts (paying more than minimums) OR debt-free and looking to optimize cash flow and protect competitive capital growth and storage in a tax efficient structure.",
      color: "blue"
    },
    {
      icon: DollarSign,
      title: "Single? - Best with $40k+ Annual Income",
      description: "Actively managing multiple debts (paying more than minimums) OR debt-free and looking to optimize cash flow and protect competitive capital growth and storage in a tax efficient structure.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Household Decision-Makers",
      description: "If married, both decision-makers must participate in all financial discussions and meetings to ensure the strategy is effective for the entire household.",
      color: "blue"
    },
    {
      icon: Home,
      title: "Homeowners Encouraged",
      description: "Existing mortgage holders are highly encouraged to participate to maximize debt-elimination strategies.",
      color: "blue"
    },
    {
      icon: Monitor,
      title: "Focused Meeting Setting",
      description: "Meeting must be uninterrupted 'sit-down' style via desktop, laptop, or large tablet for focused data review and analysis of your financial landscape (no mobile).",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Ideal Age Range",
      description: "Working professionals between the ages of 25 to 45 typically see more dramatic economic results. The younger you start, the better the outcome.",
      color: "blue"
    }
  ];

  return (
    <section id="qualifications" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Who Is This For?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serious committed individuals or families that are ready to learn what's possible by reimagining their existing financial landscapes and putting their money to work for them in two different places at the same time. That's a hard dollar to beat!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {qualifications.map((qual, index) => {
            const Icon = qual.icon;
            const colorClasses = qual.color === "blue" 
              ? "from-blue-500 to-blue-600" 
              : "from-emerald-500 to-emerald-600";
            
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <div className="flex items-start gap-4">
                  <div className={`size-12 rounded-lg bg-gradient-to-br ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-2">
                      {qual.title}
                    </h3>
                    <p className="text-gray-600">
                      {qual.description}
                    </p>
                  </div>
                  <Check className="size-6 text-emerald-600 flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}