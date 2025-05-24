
import React, { useState } from 'react';
import { Check, Shield, Eye, Users } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const SecurityLevelSelector: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('standard');

  const securityLevels = [
    {
      id: 'basic',
      name: 'Basic Security',
      icon: Shield,
      price: 'From £500/day',
      description: 'Essential protection for low-risk events',
      features: [
        'Password-protected devices',
        'Basic network security',
        'Standard file encryption',
        'Email support'
      ],
      bestFor: 'Small meetings, community events, private gatherings',
      color: 'blue'
    },
    {
      id: 'standard',
      name: 'Standard Security',
      icon: Eye,
      price: 'From £1,500/day',
      description: 'Comprehensive security for corporate events',
      features: [
        'Encrypted radio communications',
        'Secure file transfer protocols',
        'Network monitoring',
        'Equipment auditing',
        'On-site technical support'
      ],
      bestFor: 'Corporate conferences, trade shows, product launches',
      color: 'green',
      popular: true
    },
    {
      id: 'high',
      name: 'High Security',
      icon: Users,
      price: 'From £3,000/day',
      description: 'Maximum protection for high-profile events',
      features: [
        'Isolated secure networks',
        'Advanced encryption protocols',
        'TSCM surveillance sweeps',
        'Secure document disposal',
        'Close protection integration',
        'Real-time threat monitoring',
        '24/7 security personnel'
      ],
      bestFor: 'VIP events, political gatherings, celebrity appearances',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-blue-50 border-gray-200',
      green: isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-white hover:bg-green-50 border-gray-200',
      purple: isSelected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white hover:bg-purple-50 border-gray-200'
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

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">SECURITY LEVELS</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Choose Your Level of Protection
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            We offer three tiers of communication security, each designed to match your event's risk profile and requirements.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {securityLevels.map((level, index) => {
            const LevelIcon = level.icon;
            const isSelected = selectedLevel === level.id;
            
            return (
              <Animated key={level.id} animation="fade-up" delay={100 * (index + 1)}>
                <motion.div
                  className={`relative rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${getColorClasses(level.color, isSelected)}`}
                  onClick={() => setSelectedLevel(level.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {level.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-lg mb-4 ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <LevelIcon className={`h-8 w-8 ${isSelected ? 'text-white' : getIconColor(level.color)}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-sapp-dark'}`}>
                      {level.name}
                    </h3>
                    <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-sapp-gray'}`}>
                      {level.description}
                    </p>
                    <div className={`text-2xl font-bold ${isSelected ? 'text-white' : getIconColor(level.color)}`}>
                      {level.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {level.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-white' : getIconColor(level.color)}`} />
                        <span className={`text-sm ${isSelected ? 'text-white' : 'text-sapp-gray'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium mb-1 ${isSelected ? 'text-white' : 'text-sapp-dark'}`}>
                      Best for:
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
          <p className="text-sapp-gray mb-6">
            Not sure which level is right for you? Our experts will assess your needs and recommend the perfect solution.
          </p>
          <button className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Get Free Security Assessment
          </button>
        </Animated>
      </div>
    </section>
  );
};

export default SecurityLevelSelector;
