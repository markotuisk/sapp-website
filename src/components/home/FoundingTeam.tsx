
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Animated } from '@/components/ui/AnimatedElements';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';
import { FounderCard } from './founding-team/FounderCard';
import { DebugPanel } from './founding-team/DebugPanel';
import { founders } from './founding-team/foundersData';

const FoundingTeam = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { logEvent } = useComponentLogger('FoundingTeam');
  const { isDebugMode } = useDebugContext();

  const [imageLoadState, setImageLoadState] = useState({
    railiDefault: false,
    markoDefault: false
  });

  const handleImageLoad = (imageType: string) => {
    setImageLoadState(prev => ({
      ...prev,
      [imageType]: true
    }));
    logEvent('ImageLoaded', imageType);
  };

  const handleImageError = (imageType: string, error: any) => {
    logEvent('ImageError', { imageType, error });
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
              <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium uppercase">
                Leadership
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sapp-dark mb-2">
              Our Founding Team
            </h2>
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
          <DebugPanel 
            imageLoadState={imageLoadState}
            inView={inView}
            founders={founders}
          />
        )}
      </div>
    </section>
  );
};

export default FoundingTeam;
