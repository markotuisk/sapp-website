
import React from 'react';
import { motion } from 'framer-motion';

const PhysicalSecurityQuoteSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sapp-dark to-[#15232d] text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sapp-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0yMCAwdjQwTTAgMjBoNDAiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <svg className="w-16 h-16 mx-auto mb-8 text-sapp-blue/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
            </svg>
            
            <motion.blockquote 
              className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Physical security isn't about building an impenetrable fortress—it's about creating layers of protection that complement each other, where each layer buys you time and intelligence to respond appropriately to threats.
            </motion.blockquote>
            
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-1 bg-sapp-blue/50 rounded-full mb-6"></div>
              <h4 className="text-xl font-semibold">Marko Tuisk</h4>
              <p className="text-blue-100/80">SAPP Founder and Technical Director</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhysicalSecurityQuoteSection;
