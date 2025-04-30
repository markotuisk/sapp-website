
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      quote: "We discovered unauthorized surveillance devices during a routine TSCM inspection by SAPP Security. Their discreet and professional approach helped us address the situation without business disruption.",
      author: "Financial Services Executive",
      position: "Global Investment Firm"
    },
    {
      quote: "The SAPP team conducted a thorough sweep of our facilities before a major board meeting. Their attention to detail and technical knowledge gave us complete confidence in the security of our discussions.",
      author: "Chief Legal Officer",
      position: "Technology Corporation"
    },
    {
      quote: "After concerns about information leaks, SAPP's TSCM inspection identified several vulnerabilities in our communications security. Their recommendations have been invaluable in strengthening our privacy measures.",
      author: "Security Director",
      position: "International Media Company"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-sapp-gray">
            What our clients say about our TSCM services
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-gradient-to-br from-[#F8F9FF] to-white rounded-xl p-8 shadow-xl border border-gray-100/40 transition-all duration-700 hover:shadow-2xl transform hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Quote className="h-12 w-12 text-sapp-blue/20 mb-4" />
              <blockquote className="mb-6">
                <p className="text-xl md:text-2xl font-display italic text-sapp-dark leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <footer className="flex items-center">
                <div className="mr-4 h-12 w-12 bg-sapp-blue/10 rounded-full flex items-center justify-center text-sapp-blue font-medium">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sapp-dark">{testimonial.author}</p>
                  <p className="text-sm text-sapp-gray">{testimonial.position}</p>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
