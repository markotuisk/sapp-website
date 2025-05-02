
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const QuoteSection = () => {
  return (
    <section className="py-16 bg-sapp-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/8a5bc35f-ee0e-4cf9-bb62-6f30d769062c.png')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-sapp-dark via-transparent to-sapp-dark"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Animated animation="fade-up">
          <div className="max-w-4xl mx-auto">
            <Quote className="h-16 w-16 text-sapp-blue/30 mx-auto mb-6" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-display italic text-white text-center leading-relaxed mb-8">
                "The professional security audit by SAPP Security revealed several critical vulnerabilities in our planned event venue that we would have completely overlooked. Their detailed recommendations allowed us to address these issues before our executive conference."
              </blockquote>
              
              <div className="flex flex-col items-center">
                <p className="font-semibold text-white">Margaret Richardson</p>
                <p className="text-gray-400">Chief Security Officer, Global Financial Services</p>
              </div>
            </motion.div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default QuoteSection;
