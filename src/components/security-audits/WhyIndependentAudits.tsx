
import React from 'react';

const WhyIndependentAudits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4 text-center">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Independent Audits Matter</h3>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Unbiased physical security assessment for greater resilience
              </h2>
              
              <div className="space-y-4 text-sapp-gray">
                <p className="text-lg">Comply with the international best practises for information security management.</p>
                <p className="text-lg">Use external teams for comprehensive and objective assessment of information security status in your organisation.</p>
                <p className="text-lg">Commission an all-inclusive or a niche security audit tailored to your specific requirement.</p>
                <p className="text-lg">These external audits are on-site service visits to objectively evaluate the state of play of the physical and information security processes and technology at your organisation.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
              <img 
                src="/lovable-uploads/photo-1498050108023-c5249f4df085.png"
                alt="Security Audit Process" 
                className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIndependentAudits;
