
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import QuoteCard from '@/components/ui/QuoteCard';

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
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <QuoteCard
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
