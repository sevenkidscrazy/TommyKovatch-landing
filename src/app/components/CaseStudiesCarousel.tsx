import { Card } from "@/app/components/ui/card";
import { ChevronLeft, ChevronRight, TrendingUp, DollarSign, Calendar } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";

const caseStudies = [
  {
    name: "JOHN B.",
    totalDebt: "$940,730",
    currentPayoff: "30.1 yrs",
    fdfPlanPayoff: "9.9 yrs",
    interestSaved: "$225,600",
    capitalAccumulated: "$517,420"
  },
  {
    name: "RICKY & MELINDA J.",
    totalDebt: "$443,801",
    currentPayoff: "27.8 yrs",
    fdfPlanPayoff: "9.5 yrs",
    interestSaved: "$56,437",
    capitalAccumulated: "$77,650"
  },
  {
    name: "JOHN M.",
    totalDebt: "$495,945",
    currentPayoff: "27.4 yrs",
    fdfPlanPayoff: "9.08 yrs",
    interestSaved: "$74,671",
    capitalAccumulated: "$129,137"
  },
  {
    name: "MARK & KIMBERLY O.",
    totalDebt: "$500,122",
    currentPayoff: "27.9 yrs",
    fdfPlanPayoff: "9.3 yrs",
    interestSaved: "$74,556",
    capitalAccumulated: "$125,346"
  },
  {
    name: "CALEB K.",
    totalDebt: "$461,028",
    currentPayoff: "27.4 yrs",
    fdfPlanPayoff: "9.3 yrs",
    interestSaved: "$106,300",
    capitalAccumulated: "$259,750"
  }
];

export function CaseStudiesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-3">
            Real Client Results
          </h2>
          <p className="text-lg text-gray-600">
            These case studies are based on real clients. Individual results vary.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {caseStudies.map((study, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <Card className="p-8 bg-white shadow-xl border-2 border-gray-200 rounded-2xl relative">
                    {/* Client Name */}
                    <h3 className="text-3xl text-center text-gray-900 mb-6 tracking-wide">
                      {study.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Total Debt</span>
                        <span className="text-xl font-bold text-gray-900">{study.totalDebt}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Current Payoff</span>
                        <span className="text-lg text-gray-900">{study.currentPayoff}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 -mx-4 px-4 py-2" style={{ backgroundColor: '#f8f6f1', borderColor: '#c9a961' }}>
                        <span className="font-semibold" style={{ color: '#1a3a5c' }}>Custom Plan Payoff</span>
                        <span className="text-xl font-bold" style={{ color: '#c9a961' }}>{study.fdfPlanPayoff}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 py-6">
                        <span className="text-gray-600">Interest Saved</span>
                        <span className="text-lg font-bold" style={{ color: '#c9a961' }}>{study.interestSaved}</span>
                      </div>
                    </div>

                    {/* Capital Accumulated Highlight */}
                    <div className="p-6 rounded-xl border-2" style={{ background: 'linear-gradient(to bottom right, #f8f6f1, #faf9f5)', borderColor: '#c9a961' }}>
                      <p className="text-sm text-gray-700 text-center mb-2 leading-relaxed">
                        Liquid, Tax-Efficient Capital<br />Accumulated WHILE Eliminating All Debt
                      </p>
                      <p className="text-3xl font-bold text-center" style={{ color: '#c9a961' }}>
                        {study.capitalAccumulated}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={scrollPrev}
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-2 hover:bg-opacity-10"
              style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
            >
              <ChevronLeft className="size-5" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`size-2.5 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={index === selectedIndex ? { backgroundColor: '#c9a961' } : {}}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={scrollNext}
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-2 hover:bg-opacity-10"
              style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            This case study is based on a real client. Individual results vary.
          </p>
        </div>
      </div>
    </section>
  );
}