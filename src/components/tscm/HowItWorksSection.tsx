
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const HowItWorksSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Our TSCM Process
          </h2>
          <p className="text-lg text-sapp-gray">
            A systematic approach to identifying and neutralizing surveillance threats
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sapp-blue/20 hidden md:block"></div>
            
            {/* Steps */}
            <div className="space-y-24 relative">
              {/* Step 1 */}
              <div className={cn(
                "flex flex-col md:flex-row items-center transition-all duration-700",
                inView ? "opacity-100" : "opacity-0 translate-y-12"
              )}>
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:ml-auto md:mr-0 max-w-md">
                    <span className="inline-block px-3 py-1 bg-sapp-blue/10 text-sapp-blue rounded-full text-sm font-medium mb-4">STEP 1</span>
                    <h3 className="text-2xl font-display font-semibold mb-3 text-sapp-dark">Initial Consultation</h3>
                    <p className="text-sapp-gray">
                      We discuss your concerns and assess potential risks in a secure setting. This helps us understand your specific needs and tailor our approach.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="w-12 h-12 rounded-full bg-sapp-blue flex items-center justify-center text-white font-bold text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg hidden md:flex">1</div>
                  <div className="md:pl-12">
                    <div className="bg-gradient-to-br from-slate-100 to-white rounded-xl h-64 shadow overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <span className="text-5xl mb-3 block text-sapp-blue/20">📋</span>
                          <span className="text-xl font-medium text-sapp-gray">Assessment & Planning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className={cn(
                "flex flex-col md:flex-row-reverse items-center transition-all duration-700",
                inView ? "opacity-100 delay-300" : "opacity-0 translate-y-12"
              )}>
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 md:text-left">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:mr-auto md:ml-0 max-w-md">
                    <span className="inline-block px-3 py-1 bg-sapp-blue/10 text-sapp-blue rounded-full text-sm font-medium mb-4">STEP 2</span>
                    <h3 className="text-2xl font-display font-semibold mb-3 text-sapp-dark">Technical Sweep</h3>
                    <p className="text-sapp-gray">
                      Our engineers conduct a thorough inspection using specialized equipment to detect electronic surveillance devices, wireless transmitters, and other threats.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="w-12 h-12 rounded-full bg-sapp-blue flex items-center justify-center text-white font-bold text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg hidden md:flex">2</div>
                  <div className="md:pr-12">
                    <div className="bg-gradient-to-br from-slate-100 to-white rounded-xl h-64 shadow overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <span className="text-5xl mb-3 block text-sapp-blue/20">🔍</span>
                          <span className="text-xl font-medium text-sapp-gray">Thorough Inspection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className={cn(
                "flex flex-col md:flex-row items-center transition-all duration-700",
                inView ? "opacity-100 delay-600" : "opacity-0 translate-y-12"
              )}>
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:ml-auto md:mr-0 max-w-md">
                    <span className="inline-block px-3 py-1 bg-sapp-blue/10 text-sapp-blue rounded-full text-sm font-medium mb-4">STEP 3</span>
                    <h3 className="text-2xl font-display font-semibold mb-3 text-sapp-dark">Analysis & Verification</h3>
                    <p className="text-sapp-gray">
                      We analyze all findings, validate potential threats, and document evidence of surveillance when discovered.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="w-12 h-12 rounded-full bg-sapp-blue flex items-center justify-center text-white font-bold text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg hidden md:flex">3</div>
                  <div className="md:pl-12">
                    <div className="bg-gradient-to-br from-slate-100 to-white rounded-xl h-64 shadow overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <span className="text-5xl mb-3 block text-sapp-blue/20">🔬</span>
                          <span className="text-xl font-medium text-sapp-gray">Detailed Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className={cn(
                "flex flex-col md:flex-row-reverse items-center transition-all duration-700",
                inView ? "opacity-100 delay-900" : "opacity-0 translate-y-12"
              )}>
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 md:text-left">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:mr-auto md:ml-0 max-w-md">
                    <span className="inline-block px-3 py-1 bg-sapp-blue/10 text-sapp-blue rounded-full text-sm font-medium mb-4">STEP 4</span>
                    <h3 className="text-2xl font-display font-semibold mb-3 text-sapp-dark">Comprehensive Reporting</h3>
                    <p className="text-sapp-gray">
                      Receive a detailed report with findings, recommendations, and ongoing security measures to protect against future threats.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="w-12 h-12 rounded-full bg-sapp-blue flex items-center justify-center text-white font-bold text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg hidden md:flex">4</div>
                  <div className="md:pr-12">
                    <div className="bg-gradient-to-br from-slate-100 to-white rounded-xl h-64 shadow overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <span className="text-5xl mb-3 block text-sapp-blue/20">📊</span>
                          <span className="text-xl font-medium text-sapp-gray">Secure Reporting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
