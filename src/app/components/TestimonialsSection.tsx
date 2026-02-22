import { Card } from "@/app/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Teacher, $52k/year",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "I thought strategies like this were only for rich people. Turns out, I qualified all along. Saved $4,200 in taxes last year on a teacher's salary. Mind. Blown.",
    beforeAfter: "Went from paying max taxes to keeping $350/month more"
  },
  {
    name: "Jennifer K.",
    role: "Freelancer, variable income",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "The session felt like someone finally turned on the lights. Everything made perfect sense. I implemented it the same week and saw results on my next quarterly payment.",
    beforeAfter: "Reduced quarterly tax burden by 31%"
  },
  {
    name: "David L.",
    role: "IT Manager, $78k/year",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "I kept waiting for the catch. There wasn't one. It's literally just knowledge that's publicly available but nobody talks about. Wish I'd found this 10 years ago.",
    beforeAfter: "Now saving $620/month automatically"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Real People, Real "Aha" Moments
          </h2>
          <p className="text-xl text-gray-600">
            These aren't carefully selected success stories—this is the typical reaction when people discover what's been available all along.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 border-2 border-gray-100 hover:border-yellow-400 transition-colors">
              <Quote className="size-8 text-yellow-400 mb-4" />
              
              <p className="text-gray-700 mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-1">Result:</div>
                <div className="text-green-700">{testimonial.beforeAfter}</div>
              </div>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            Note: Results vary based on individual circumstances, but the strategies themselves are universally accessible.
          </p>
        </div>
      </div>
    </section>
  );
}