import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

/**
 * FAQ Section - Critical for AEO (Answer Engine Optimization)
 * Structured as semantic HTML with proper heading hierarchy
 */
export function FAQSection() {
  const faqs = [
    {
      question: "What is financial freedom?",
      answer: "Financial freedom is the state of having sufficient personal wealth to live without having to actively work for basic necessities. It means your assets generate enough income to cover your living expenses, giving you the freedom to pursue your passions and make choices without financial constraints."
    },
    {
      question: "How can Tommy help me achieve financial freedom?",
      answer: "Tommy provides personalized financial guidance and proven strategies to help you build wealth, create passive income streams, and achieve financial independence. Through one-on-one consultation, you'll receive a customized plan tailored to your unique financial situation and goals."
    },
    {
      question: "Who qualifies for financial advisory services?",
      answer: "Anyone serious about achieving financial freedom can benefit from professional financial guidance. Whether you're just starting your wealth-building journey or looking to optimize existing investments, personalized financial strategies can help you reach your goals faster."
    },
    {
      question: "What makes Tommy different from other financial advisors?",
      answer: "Tommy focuses on proven, actionable strategies for achieving true financial freedom. With a personalized approach and commitment to client success, the emphasis is on creating sustainable wealth-building systems rather than quick fixes."
    },
    {
      question: "How do I get started with financial planning?",
      answer: "Getting started is simple: schedule a free consultation to discuss your financial goals and current situation. From there, you'll receive a personalized assessment and customized strategy to begin your journey toward financial freedom."
    },
    {
      question: "What should I expect during the consultation?",
      answer: "During your consultation, we'll review your current financial situation, discuss your short-term and long-term goals, and identify opportunities for wealth building. You'll leave with actionable insights and a clear path forward toward achieving financial freedom."
    },
    {
      question: "How long does it take to achieve financial freedom?",
      answer: "The timeline varies based on your starting point, goals, and commitment to the strategy. Some clients see significant progress within 12-24 months, while building substantial wealth typically takes 3-7 years with consistent implementation of proven strategies."
    },
    {
      question: "Do I need a lot of money to get started?",
      answer: "No. Financial freedom strategies can be tailored to any starting point. The key is having the right knowledge, strategy, and commitment to building wealth over time. Many successful clients started with limited resources but achieved significant results through smart planning and execution."
    }
  ];

  return (
    <section 
      id="faq" 
      className="py-24 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Semantic heading structure for better SEO/AEO */}
        <div className="text-center mb-16">
          <h2 id="faq-heading" className="text-4xl md:text-5xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about achieving financial freedom and working with Tommy.
          </p>
        </div>

        {/* Accordion with semantic markup */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-left text-lg py-6 hover:text-[#1a3a5c] transition-colors">
                <h3 className="text-lg font-semibold pr-4">
                  {faq.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA after FAQs */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#registration"
            className="inline-block bg-gradient-to-r from-[#1a3a5c] to-[#c9a961] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Schedule Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}