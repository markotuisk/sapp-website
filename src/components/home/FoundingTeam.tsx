
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
      image: '/lovable-uploads/bc901c6a-2dc2-4d76-8c1f-6fc400986598.png',
      initials: 'RM',
    },
    {
      name: 'Marko Tuisk',
      title: 'Technical Director',
      bio: 'Engineer with over 15 years of experience delivering global technical security solutions across critical infrastructure and sensitive projects.',
      image: '/lovable-uploads/c1e65442-ee2d-4805-902e-00744cb3d481.png',
      initials: 'MT',
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
              <Card className="flex flex-col items-center text-center overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6 pb-2">
                  <div className="relative mb-4">
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Avatar className="w-full h-full">
                        <AvatarImage 
                          src={founder.image} 
                          alt={founder.name} 
                          className="object-cover w-full h-full"
                        />
                        <AvatarFallback className="text-2xl">{founder.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <CardContent className="px-6 pt-0 pb-6">
                  <h3 className="text-xl font-bold text-sapp-dark mb-1">{founder.name}</h3>
                  <p className="text-sapp-blue font-medium mb-3">{founder.title}</p>
                  <p className="text-sapp-gray">{founder.bio}</p>
                </CardContent>
              </Card>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingTeam;
