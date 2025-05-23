
import React from 'react';
import { Shield, AlertTriangle, Target, TrendingUp } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ThreatAwarenessSection: React.FC = () => {
  const threats = [
    {
      icon: Target,
      title: "Corporate Espionage",
      description: "87% of corporate events are targeted by information gatherers seeking competitive intelligence",
      impact: "Potential loss of proprietary information and competitive advantage"
    },
    {
      icon: AlertTriangle,
      title: "Data Breaches",
      description: "Unsecured event networks expose sensitive attendee and business data",
      impact: "Average cost of a data breach: £3.5M plus regulatory penalties"
    },
    {
      icon: Shield,
      title: "Unauthorized Surveillance",
      description: "Hidden recording devices and network intrusions compromise confidential discussions",
      impact: "Leaked strategic plans and damaged stakeholder relationships"
    },
    {
      icon: TrendingUp,
      title: "Reputation Damage",
      description: "Security incidents at corporate events amplify negative publicity",
      impact: "Long-term brand damage and loss of client confidence"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-red-500/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-red-600 tracking-wider">THREAT LANDSCAPE</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Corporate Events Are Prime Targets
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Corporate events concentrate valuable information, decision-makers, and sensitive discussions 
            in one location, making them attractive targets for various threat actors.
          </p>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {threats.map((threat, index) => {
            const ThreatIcon = threat.icon;
            return (
              <Animated key={index} animation="fade-up" delay={100 * (index + 1)}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/10 rounded-lg p-3 flex-shrink-0">
                      <ThreatIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sapp-dark mb-2">{threat.title}</h4>
                      <p className="text-sapp-gray mb-3 text-sm">{threat.description}</p>
                      <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
                        <p className="text-red-700 text-xs font-medium">Impact: {threat.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animated>
            );
          })}
        </div>

        <Animated animation="fade-up" delay={500} className="text-center mt-12">
          <div className="bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">The Cost of Inadequate Event Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-300">89%</div>
                <p className="text-sm opacity-90">of security breaches could have been prevented with proper monitoring</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">£2.1M</div>
                <p className="text-sm opacity-90">average cost of a corporate espionage incident</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">6 months</div>
                <p className="text-sm opacity-90">typical recovery time from reputation damage</p>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ThreatAwarenessSection;
