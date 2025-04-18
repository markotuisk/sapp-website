
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Animated } from '@/components/ui/AnimatedElements';
import { DebugInfo, useComponentLogger } from '@/utils/debugTools';

const FoundingTeam = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { logEvent } = useComponentLogger('FoundingTeam');

  // Add state to track image loading for debugging
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
      bio: 'Commercial security strategist with deep understanding of corporate dynamics and executive risk, leading SAPP\'s integrated offering across markets.',
      image: '/lovable-uploads/c7299f63-1f0c-43ce-a05d-0263a7bed735.png', // Swapped with hover image
      hoverImage: '/lovable-uploads/63e9e1ac-4272-4ca1-802a-55f5f36806a8.png', // Swapped with default image
    },
    {
      name: 'Marko Tuisk',
      title: 'Technical Director',
      bio: 'Engineer with over 15 years of experience delivering global technical security solutions across critical infrastructure and sensitive projects.',
      image: '/lovable-uploads/c1e65442-ee2d-4805-902e-00744cb3d481.png',
      hoverImage: '/lovable-uploads/c1e65442-ee2d-4805-902e-00744cb3d481.png', // Currently same as default
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
            <DebugInfo
              key={founder.name}
              componentName={`FounderCard-${founder.name}`}
              data={{
                name: founder.name,
                defaultImageLoaded: index === 0 ? imageLoadState.railiDefault : imageLoadState.markoDefault,
                hoverImageLoaded: index === 0 ? imageLoadState.railiHover : imageLoadState.markoHover,
                defaultImagePath: founder.image,
                hoverImagePath: founder.hoverImage
              }}
            >
              <Animated 
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
                      onLoad={() => handleImageLoad(index === 0 ? 'railiDefault' : 'markoDefault')}
                      onError={(e) => handleImageError(index === 0 ? 'railiDefault' : 'markoDefault', e)}
                    />
                    {/* Hover Image */}
                    <img 
                      src={founder.hoverImage}
                      alt={`${founder.name} profile hover`}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      onLoad={() => handleImageLoad(index === 0 ? 'railiHover' : 'markoHover')}
                      onError={(e) => handleImageError(index === 0 ? 'railiHover' : 'markoHover', e)}
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
            </DebugInfo>
          ))}
        </div>

        {/* Debug Information - Only visible during development */}
        {process.env.NODE_ENV === 'development' && (
          <DebugInfo
            componentName="FoundingTeamDebug"
            data={{
              inView,
              imageLoadState,
              founderPaths: founders.map(f => ({name: f.name, image: f.image, hoverImage: f.hoverImage}))
            }}
            showOutline={false}
          >
            <div className="mt-6 p-3 bg-gray-100 text-xs rounded-md max-w-4xl mx-auto">
              <h4 className="font-bold mb-2">Debug Information</h4>
              <p>Image load states: {JSON.stringify(imageLoadState)}</p>
              <p>Section in view: {String(inView)}</p>
              <p className="font-bold mt-2">Image paths:</p>
              <ul className="space-y-1">
                <li>Raili default: {founders[0].image}</li>
                <li>Raili hover: {founders[0].hoverImage}</li>
                <li>Marko default: {founders[1].image}</li>
                <li>Marko hover: {founders[1].hoverImage}</li>
              </ul>
            </div>
          </DebugInfo>
        )}
      </div>
    </section>
  );
};

export default FoundingTeam;
