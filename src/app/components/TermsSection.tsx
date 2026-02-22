import { Card } from "@/app/components/ui/card";
import { Shield, Lock, FileCheck } from "lucide-react";

export function TermsSection() {
  return (
    <section id="terms" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Terms & Conditions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and trust are our top priorities
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <FileCheck className="size-6 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">
              Program Terms
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This consultation program is available to qualifying households on an ongoing basis. Peacock Capital Partners will work with you to demonstrate a clear path to complete financial freedom in 10 years or less using your current budget. The program may be paused or closed at the sole discretion of Peacock Capital Partners.
            </p>
          </Card>
          
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
              <Shield className="size-6 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">
              Privacy Notice
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Peacock Capital Partners complies with the Gramm-Leach-Bliley Act. All financial data provided is used solely for the purpose of your custom analysis and is protected under our Information Security Policy. We do not require bank account numbers or Social Security numbers for the purposes of our strategy sessions and meetings.
            </p>
          </Card>
          
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Lock className="size-6 text-white" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">
              No Purchase Required
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No purchase of any service is required to participate in this program. All participants receive a complimentary, no-obligation Financial Action Plan to help you achieve financial freedom.
            </p>
          </Card>
        </div>
        
        <Card className="p-8 bg-white border-2 border-gray-200">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-2xl text-gray-900 mb-6">Complete Terms of Service</h3>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="text-lg text-gray-900 mb-2">Program Terms & Conditions</h4>
                <p>
                  This consultation program is available to new prospective clients of Peacock Capital Partners who meet the stated qualifications. Participants must complete the full consultation process, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Attendance at an introductory Educational Session (1-on-1 meeting)</li>
                  <li>Completion of a Strategy Session to review Household Financial Profile</li>
                  <li>Participation in an Action Plan Review session</li>
                  <li>Submission of a completed Household Financial Profile</li>
                </ul>
                <p className="mt-2">
                  US residents only. Limit one consultation per household. Participation by all household financial decision-makers is required. This is a financial strategy consultation; no purchase of any financial product or service is required to participate.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg text-gray-900 mb-2">Complimentary Action Plan</h4>
                <p>
                  All participants who complete the required sessions receive a complimentary, no-obligation Financial Action Plan. This plan demonstrates a clear path to complete financial freedom (including mortgage) in 10 years or less using your current budget, with strategies tailored to your unique situation.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg text-gray-900 mb-2">Privacy & Data Security</h4>
                <p>
                  Peacock Capital Partners is committed to your privacy and complies with the Gramm-Leach-Bliley Act (GLBA). All financial data provided during sessions (including income, expenses, and debt totals) is used strictly for the creation of your custom Financial Action Plan and is protected under our Information Security Policy.
                </p>
                <p className="mt-2 font-semibold">
                  We do not require, and you should not provide, bank account numbers, credit card numbers, or Social Security numbers during these strategy sessions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg text-gray-900 mb-2">Meeting Requirements</h4>
                <p>
                  All meetings must be conducted in a "sit-down" style environment via desktop computer, laptop, or large tablet to ensure a focused and thorough review of your financial data. Mobile phone participation or participation while driving is not permitted, as it does not provide the necessary environment for detailed financial analysis.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg text-gray-900 mb-2">Household Participation</h4>
                <p>
                  If married or in a committed partnership where financial decisions are made jointly, it is highly encouraged that both decision-makers participate in all sessions. This ensures the strategy is comprehensive and effective for the entire household's financial situation.
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  Peacock Capital Partners reserves the right to modify, pause, or terminate this program at any time at its sole discretion. This offer cannot be combined with other promotions. By submitting your registration, you acknowledge that you have read, understood, and agree to these terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}