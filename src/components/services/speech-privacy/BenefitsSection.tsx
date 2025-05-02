
import React from 'react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Card } from '@/components/ui/card';
import { Shield, Activity, Speaker, Lock } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-white" />,
      title: "Privacy Protection",
      description: "Ensures sensitive conversations remain confidential, preventing both casual and intentional eavesdropping.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Activity className="h-10 w-10 text-white" />,
      title: "Enhanced Productivity",
      description: "Reduces distractions and improves focus by mitigating disruptive noises and conversation overlap.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Speaker className="h-10 w-10 text-white" />,
      title: "Acoustic Comfort",
      description: "Creates a more pleasant work environment by reducing noise dynamics and eliminating stark silences.",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: <Lock className="h-10 w-10 text-white" />,
      title: "Compliance Support",
      description: "Helps meet regulatory requirements for privacy in healthcare, finance, legal, and other regulated industries.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
              Key Benefits of Speech Privacy Solutions
            </h2>
            <p className="text-lg text-sapp-gray max-w-3xl mx-auto">
              Our advanced speech privacy and soundmasking systems deliver multiple benefits 
              beyond just conversation protection.
            </p>
          </div>
        </Animated>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Animated key={benefit.title} animation="fade-up" delay={100 * (index + 1)}>
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`bg-gradient-to-r ${benefit.color} p-4 flex justify-center`}>
                  {benefit.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sapp-dark mb-3">{benefit.title}</h3>
                  <p className="text-sapp-gray">{benefit.description}</p>
                </div>
              </Card>
            </Animated>
          ))}
        </div>
        
        <Animated animation="fade-up" delay={500}>
          <div className="mt-16 bg-white rounded-xl p-8 border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-sapp-dark mb-4">Did You Know?</h3>
            <p className="text-sapp-gray">
              Studies show that conversations become unintelligible when the signal-to-noise ratio is around +5 dB. 
              Our soundmasking systems precisely maintain this acoustical balance while remaining comfortable and 
              nearly imperceptible to occupants.
            </p>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default BenefitsSection;
