import { Card } from "@/app/components/ui/card";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";

export function RevelationSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl text-white mb-4">
            Why Don't More People Know About This?
          </h2>
          <p className="text-xl text-gray-300">
            The simple answer? There's no profit in telling you. Financial institutions make money when you don't know these strategies exist.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 bg-slate-700/50 border-2 border-slate-600 text-white">
            <FileText className="size-12 text-yellow-400 mb-4" />
            <h3 className="text-xl mb-3">It's in the Tax Code</h3>
            <p className="text-gray-300">
              IRS Publication 590, Section 408. It's been there for decades. Anyone can read it. 
              Most people just don't know to look.
            </p>
          </Card>
          
          <Card className="p-8 bg-slate-700/50 border-2 border-slate-600 text-white">
            <AlertCircle className="size-12 text-yellow-400 mb-4" />
            <h3 className="text-xl mb-3">Banks Don't Promote It</h3>
            <p className="text-gray-300">
              Traditional financial products are more profitable. Teaching you this strategy means less revenue for them. 
              So they stay quiet.
            </p>
          </Card>
          
          <Card className="p-8 bg-slate-700/50 border-2 border-slate-600 text-white">
            <CheckCircle className="size-12 text-green-400 mb-4" />
            <h3 className="text-xl mb-3">Completely Legal</h3>
            <p className="text-gray-300">
              This isn't a loophole or a gray area. It's an intentional provision in the tax code, 
              designed to be used—just rarely discussed.
            </p>
          </Card>
        </div>
        
        <div className="bg-yellow-500/10 border-2 border-yellow-400/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl text-white mb-4">
            The Question Everyone Asks
          </h3>
          <p className="text-xl text-gray-300 mb-6 italic">
            "If this is so simple and legal, why am I just hearing about it now?"
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Because the system profits from your lack of knowledge. You're not supposed to figure this out on your own. 
            But once you see it, you can't unsee it. And you'll wonder why nobody ever told you before.
          </p>
          <div className="mt-8 inline-block bg-slate-900 px-6 py-3 rounded-lg border border-yellow-400/50">
            <p className="text-yellow-400 text-sm">
              The average person who learns this strategy saves $8,000-$15,000 per year
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
