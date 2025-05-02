
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Volume2, Users, Building, Briefcase } from 'lucide-react';

const SoundmaskingExplainedSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmOWZhZmIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuNDIgMzEuODJhMSAxIDAgMCAwLTEuNDE0IDBsLS43MDcuNzA3YS45OTkuOTk5IDAgMCAwIDAgMS40MTQgMSAxIDAgMCAwIDEuNDE0IDBsLjcwNy0uNzA3YTEgMSAwIDAgMCAwLTEuNDE0TTMwIDM2YTEgMSAwIDAgMC0xLTFoLTFhMSAxIDAgMCAwIDAgMmgxYTEgMSAwIDAgMCAxLTFNMzAgMzFhMSAxIDAgMCAwIDEgMWgxYTEgMSAwIDAgMCAwLTJoLTFhMSAxIDAgMCAwLTEgMU0yNC4yOSAzMi41MmExIDEgMCAwIDAgMS40MTQgMGwuNzA3LS43MDdhLjk5OS45OTkgMCAwIDAgMC0xLjQxNCAxIDEgMCAwIDAtMS40MTQgMGwtLjcwNy43MDdhMSAxIDAgMCAwIDAgMS40MTRNMzAgMjZhMSAxIDAgMCAwIDEtMXYtMWExIDEgMCAwIDAtMiAwdjFhMSAxIDAgMCAwIDEgMU0zMCA0MWExIDEgMCAwIDAtMS0xaC0xYTEgMSAwIDAgMCAwIDJoMWExIDEgMCAwIDAgMS0xTTMwIDQzYTEgMSAwIDAgMCAxIDF2MWExIDEgMCAwIDAgMiAwdi0xYTEgMSAwIDAgMC0xLTFNMjQuMjkgMzIuNTJhMSAxIDAgMCAwIDAgMS40MTRsLS43MDcuNzA3YTEgMSAwIDEgMCAxLjQxNCAxLjQxNGwuNzA3LS43MDdhLjk5OS45OTkgMCAwIDAgMC0xLjQxIDEgMSAwIDAgMC0xLjQxNC0uNzFNMzYuNDIgMzEuODJhMSAxIDAgMCAwIDAgMS40MWwuNzA3LjcwN2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLS43MDctLjcwN2ExIDEgMCAwIDAtMS40MTQgME0zMCAzYTEgMSAwIDAgMC0xLTFoLTFhMSAxIDAgMCAwIDAgMmgxYTEgMSAwIDAgMCAxLTEiIGZpbGw9IiNlZWYiLz48L2c+PC9zdmc+')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Animated animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-sapp-blue/10 rounded-full mb-4">
                <Volume2 className="h-8 w-8 text-sapp-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Advanced Soundmasking Technology
              </h2>
              <p className="text-lg text-sapp-gray max-w-3xl mx-auto">
                Our soundmasking solutions create an acoustically balanced environment that protects conversations
                while enhancing comfort and productivity.
              </p>
            </div>
          </Animated>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Animated animation="fade-right" delay={200}>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full bg-sapp-blue/5 rounded-xl transform rotate-3"></div>
                <div className="absolute -bottom-5 -right-5 w-full h-full bg-sapp-blue/10 rounded-xl transform -rotate-3"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="w-full h-full bg-gradient-to-br from-[#022B3A] to-[#053F5E] p-8 flex items-center justify-center">
                      <div className="relative">
                        <Volume2 className="h-20 w-20 text-white/30" />
                        
                        {/* Sound pattern visualization */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 h-10">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-1 bg-white/50 rounded-full"
                              style={{
                                height: `${20 + (Math.sin(i/3) * 30)}%`,
                                animation: `soundBars ${0.5 + (i/5)}s ease infinite alternate`,
                                animationDelay: `${i * 0.05}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-sapp-dark mb-2">Precisely Engineered Sound</h3>
                    <p className="text-sapp-gray">
                      Unlike intrusive white noise, our soundmasking solutions produce a carefully calibrated ambient sound 
                      that specifically targets speech frequencies without being noticeable or distracting.
                    </p>
                  </div>
                </div>
              </div>
            </Animated>
            
            <Animated animation="fade-left" delay={300}>
              <h3 className="text-2xl font-display font-bold text-sapp-dark mb-6">
                Perfect for Multiple Environments
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-sapp-blue/10 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-sapp-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-sapp-dark mb-2">Corporate Spaces</h4>
                    <p className="text-sapp-gray">
                      Protect sensitive discussions in open offices, meeting rooms, and executive suites while reducing distractions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-sapp-blue/10 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-sapp-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-sapp-dark mb-2">Healthcare Facilities</h4>
                    <p className="text-sapp-gray">
                      Ensure patient confidentiality in reception areas, consultation rooms, and treatment spaces.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-sapp-blue/10 rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 text-sapp-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-sapp-dark mb-2">Legal & Financial Services</h4>
                    <p className="text-sapp-gray">
                      Maintain confidentiality during client meetings and protect sensitive financial or legal discussions.
                    </p>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>
        {`
        @keyframes soundBars {
          from { height: 10%; }
          to { height: 100%; }
        }
        `}
      </style>
    </section>
  );
};

export default SoundmaskingExplainedSection;
