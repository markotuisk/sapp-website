
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import type { FounderCardProps } from './types';

export const FounderCard: React.FC<FounderCardProps> = ({ 
  founder, 
  index, 
  handleImageLoad, 
  handleImageError 
}) => {
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
