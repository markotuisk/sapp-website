
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Twitter, Linkedin } from 'lucide-react';
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
          
          <div className="flex justify-center items-center mt-4 space-x-3">
            {founder.linkedin && (
              <a 
                href={founder.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-sapp-blue transition-colors duration-300"
                aria-label={`${founder.name}'s LinkedIn profile`}
              >
                <Linkedin size={20} />
              </a>
            )}
            {founder.twitter && (
              <a 
                href={founder.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-sapp-blue transition-colors duration-300"
                aria-label={`${founder.name}'s Twitter profile`}
              >
                <Twitter size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Animated>
  );
};
