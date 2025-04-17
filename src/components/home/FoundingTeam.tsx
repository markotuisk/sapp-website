
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Animated } from '@/components/ui/AnimatedElements';

const FoundingTeam = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const founders = [
    {
      name: 'Raili Maripuu',
      title: 'Commercial Director',
      bio: 'Commercial security strategist with deep understanding of corporate dynamics and executive risk, leading SAPP\'s integrated offering across markets.',
      image: '/lovable-uploads/4ba1c0fe-656b-452b-913f-6339212dbaef.png',
      hoverImage: '/lovable-uploads/e0398cfc-b325-481f-b8b3-8043ec373bd3.png',
    },
    {
      name: 'Marko Tuisk',
      title: 'Technical Director',
      bio: 'Engineer with over 15 years of experience delivering global technical security solutions across critical infrastructure and sensitive projects.',
      image: '/lovable-uploads/c1e65442-ee2d-4805-902e-00744cb3d481.png',
      hoverImage: '/lovable-uploads/c1e65442-ee2d-4805-902e-00744cb3d481.png',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white"
      id="founding-team"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Animated animation="fade-up" delay={0}>
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Leadership</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sapp-dark mb-2">Our Founding Team</h2>
            <p className="text-lg text-sapp-gray mx-auto max-w-2xl">
              Meet the founders of SAPP Security – leading with vision, experience and dedication.
            </p>
            <div className="w-16 h-1 bg-sapp-blue mx-auto rounded-full mt-4"></div>
          </Animated>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <Animated 
              key={founder.name}
              animation="fade-up" 
              delay={100 + (index * 100)}
            >
              <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Profile Card Container */}
                <div className="relative h-[400px] overflow-hidden rounded-t-xl">
                  {/* Default Image */}
                  <img 
                    src={founder.image}
                    alt={`${founder.name} profile`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  {/* Hover Image */}
                  <img 
                    src={founder.hoverImage}
                    alt={`${founder.name} profile hover`}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-sapp-dark mb-1">{founder.name}</h3>
                  <p className="text-sapp-blue font-medium mb-3">{founder.title}</p>
                  <p className="text-sapp-gray text-sm">{founder.bio}</p>
                </div>
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingTeam;
