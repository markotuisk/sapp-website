import React from 'react';

const OurStory = () => {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium mb-4">
            FOUNDERS STORY
          </h3>
          <p className="text-sapp-gray">We brings together versatile backgrounds and security expertise with a vision to converge physical and digital security</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="/lovable-uploads/cd071450-90f8-4b5b-bcda-1a5cb6a9bb5c.png" 
              alt="SAPP Security Founders at Technology Presentation" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-4 text-accent-dark-blue">The SAPP Story</h3>
            <p className="text-sapp-gray mb-4">
              Our two founders, Raili and Marko, are native Estonians with a combined 30-years expertise in the global technical security industry. They share a common professional frustration in corporations where physical and cyber security operate in silos. As a result, security threats requiring both disciplines are left overlooked — mobile devices in unlocked executive desk drawers, accessible control panels in unsecured boardrooms, incorrectly positioned security cameras, and so on.
            </p>
            <p className="text-sapp-gray mb-4">
              Organisations need both physical and digital security. Companies require this equally, so both fields must break their bubbles, embrace collaboration, and work together. The SAPP Vision is to lead by example — creating a unique security offering to assist corporations in converging their physical and cyber security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
