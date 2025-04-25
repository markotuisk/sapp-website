import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Animated } from '@/components/ui/AnimatedElements';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

const FoundingTeam = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { logEvent } = useComponentLogger('FoundingTeam');
  const { isDebugMode } = useDebugContext();

  const [imageLoadState, setImageLoadState] = useState({
    railiDefault: false,
    railiHover: false,
    markoDefault: false,
    markoHover: false
  });

  const handleImageLoad = (imageType) => {
    setImageLoadState(prev => ({
      ...prev,
      [imageType]: true
    }));
    logEvent('ImageLoaded', imageType);
  };

  const handleImageError = (imageType, error) => {
    logEvent('ImageError', { imageType, error });
  };

  const founders = [
    {
      name: 'Raili Maripuu',
      title: 'Commercial Director',
      bio: "Commercial security strategist with deep understanding of corporate dynamics and executive risk, leading SAPP's integrated offering across markets.",
      image: '/lovable-uploads/98349e56-b76f-4ad7-bd73-28d1699f11c9.png',
      hoverImage: '', // Remove hover image as requested
    },
    {
      name: 'Marko Tuisk',
      title: 'Technical Director',
      bio: 'Engineer with over 15 years of experience delivering global technical security solutions across critical infrastructure and sensitive projects.',
      image: '/lovable-uploads/98349e56-b76f-4ad7-bd73-28d1699f11c9.png',
      hoverImage: '', // Remove hover image as requested
    },
  ];

  const FounderCard = ({ founder, index, handleImageLoad, handleImageError }) => {
    return (
      <Animated 
        animation="fade-up" 
        delay={100 + (index * 100)}
      >
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="relative h-[400px] overflow-hidden rounded-t-xl">
            <img 
              src={founder.image}
              alt={`${founder.name} profile`}
              className="w-full h-full object-cover object-top"
              onLoad={() => handleImageLoad(index === 0 ? 'railiDefault' : 'markoDefault')}
              onError={(e) => handleImageError(index === 0 ? 'railiDefault' : 'markoDefault', e)}
            />
          </div>
          
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-sapp-dark mb-1">{founder.name}</h3>
            <p className="text-sapp-blue font-medium mb-3">{founder.title}</p>
            <p className="text-sapp-gray text-sm">{founder.bio}</p>
          </div>
        </div>
      </Animated>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white"
      id="founding-team"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Animated animation="fade-up" delay={0}>
            <div className="inline-block mb-4">
              <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium uppercase">Leadership</h3>
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
            <div key={founder.name}>
              {isDebugMode ? (
                <DebugInfo
                  componentName={`FounderCard-${founder.name}`}
                  data={{
                    name: founder.name,
                    defaultImageLoaded: index === 0 ? imageLoadState.railiDefault : imageLoadState.markoDefault,
                    defaultImagePath: founder.image,
                  }}
                >
                  <FounderCard 
                    founder={founder} 
                    index={index} 
                    handleImageLoad={handleImageLoad} 
                    handleImageError={handleImageError}
                  />
                </DebugInfo>
              ) : (
                <FounderCard 
                  founder={founder} 
                  index={index} 
                  handleImageLoad={handleImageLoad} 
                  handleImageError={handleImageError}
                />
              )}
            </div>
          ))}
        </div>

        {process.env.NODE_ENV === 'development' && isDebugMode && (
          <div className="mt-6 p-3 bg-gray-100 text-xs rounded-md max-w-4xl mx-auto">
            <h4 className="font-bold mb-2">Debug Information</h4>
            <p>Image load states: {JSON.stringify(imageLoadState)}</p>
            <p>Section in view: {String(inView)}</p>
            <p className="font-bold mt-2">Image paths:</p>
            <ul className="space-y-1">
              <li>Raili default: {founders[0].image}</li>
              <li>Marko default: {founders[1].image}</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoundingTeam;
