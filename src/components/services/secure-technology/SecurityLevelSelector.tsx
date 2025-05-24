
import React, { useState } from 'react';
import { Check, Shield, Eye, Users, Star } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const SecurityLevelSelector: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('standard');

  const securityLevels = [
    {
      id: 'basic',
      name: 'Essential Protection',
      icon: Shield,
      subtitle: 'Foundation-level security',
      description: 'Core protection for straightforward events',
      features: [
        'Password-protected communication devices',
        'Basic network encryption',
        'Standard file handling protocols',
        'Remote technical support',
        'Basic equipment auditing'
      ],
      bestFor: 'Small meetings, community events, private gatherings under 100 attendees',
      color: 'blue',
      protection: '65%'
    },
    {
      id: 'standard',
      name: 'Comprehensive Security',
      icon: Eye,
      subtitle: 'Professional-grade protection',
      description: 'Advanced security for corporate and commercial events',
      features: [
        'Military-grade encrypted radio communications',
        'Secure isolated network infrastructure',
        'Advanced file transfer protocols',
        'Real-time network monitoring',
        'On-site technical support team',
        'Equipment security certification',
        'Secure document disposal'
      ],
      bestFor: 'Corporate conferences, trade shows, product launches, events 100-500 attendees',
      color: 'green',
      popular: true,
      protection: '90%'
    },
    {
      id: 'high',
      name: 'Maximum Security',
      icon: Users,
      subtitle: 'Elite-level protection',
      description: 'Ultimate protection for high-stakes events',
      features: [
        'Completely isolated secure networks',
        'Advanced military-grade encryption',
        'TSCM surveillance detection sweeps',
        'Secure document shredding on-site',
        'Close protection integration available',
        'Continuous threat monitoring',
        '24/7 dedicated security personnel',
        'Emergency response protocols',
        'Post-event forensic cleanup'
      ],
      bestFor: 'VIP events, political gatherings, celebrity appearances, sensitive corporate meetings',
      color: 'purple',
      protection: '99%'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-600/30' : 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300',
      green: isSelected ? 'bg-green-600 text-white border-green-600 shadow-2xl shadow-green-600/30' : 'bg-white hover:bg-green-50 border-gray-200 hover:border-green-300',
      purple: isSelected ? 'bg-purple-600 text-white border-purple-600 shadow-2xl shadow-purple-600/30' : 'bg-white hover:bg-purple-50 border-gray-200 hover:border-purple-300'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  const getProtectionColor = (color: string) => {
    const colors = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      purple: 'text-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">PROTECTION LEVELS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Choose Your Security Framework
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Three tiers of communication security, each designed to match your event's specific risk profile and operational requirements.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {securityLevels.map((level, index) => {
            const LevelIcon = level.icon;
            const isSelected = selectedLevel === level.id;
            
            return (
              <Animated key={level.id} animation="fade-up" delay={100 * (index + 1)}>
                <motion.div
                  className={`relative rounded-xl p-6 border-2 transition-all duration-500 cursor-pointer ${getColorClasses(level.color, isSelected)}`}
                  onClick={() => setSelectedLevel(level.id)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {level.popular && (
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Most Popular
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-6">
                    <motion.div 
                      className={`inline-flex p-3 rounded-lg mb-4 ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <LevelIcon className={`h-8 w-8 ${isSelected ? 'text-white' : getIconColor(level.color)}`} />
                    </motion.div>
                    
                    <h3 className={`text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-sapp-dark'}`}>
                      {level.name}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-sapp-gray'}`}>
                      {level.subtitle}
                    </p>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${isSelected ? 'bg-white/20 text-white' : `bg-${level.color}-50 ${getProtectionColor(level.color)}`}`}>
                      {level.protection} Protection Coverage
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {level.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <Check className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-white' : getIconColor(level.color)}`} />
                        <span className={`text-sm ${isSelected ? 'text-white' : 'text-sapp-gray'}`}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium mb-1 ${isSelected ? 'text-white' : 'text-sapp-dark'}`}>
                      Recommended for:
                    </p>
                    <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-sapp-gray'}`}>
                      {level.bestFor}
                    </p>
                  </div>
                </motion.div>
              </Animated>
            );
          })}
        </div>

        <Animated animation="fade-up" delay={500} className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white max-w-2xl mx-auto"
          >
            <p className="text-white/90 mb-4">
              Need guidance on which protection level suits your event? Our security experts will assess your requirements and recommend the optimal solution.
            </p>
            <button className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
              Get Free Security Assessment
            </button>
          </motion.div>
        </Animated>
      </div>
    </section>
  );
};

export default SecurityLevelSelector;
