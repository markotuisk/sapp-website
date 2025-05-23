
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, CheckCircle, Target, TrendingUp, Award } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const OverviewSection: React.FC = () => {
  const comparisonData = [
    {
      aspect: 'Purpose',
      compliance: 'Verify adherence to standards',
      penetration: 'Identify exploitable vulnerabilities',
      icon: Target
    },
    {
      aspect: 'Approach',
      compliance: 'Structured assessment framework',
      penetration: 'Simulated attack scenarios',
      icon: Shield
    },
    {
      aspect: 'Outcome',
      compliance: 'Certification & ongoing compliance',
      penetration: 'Vulnerability report & fixes',
      icon: Award
    }
  ];

  const growthData = [
    { year: '2018', certifications: 31910 },
    { year: '2019', certifications: 36362 },
    { year: '2020', certifications: 44486 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">UNDERSTANDING COMPLIANCE</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Why Compliance Audits Matter
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Compliance audits provide a structured, non-adversarial approach to ensuring your organisation 
            meets international standards, building long-term security posture and stakeholder confidence.
          </p>
        </Animated>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Compliance vs Penetration Testing */}
          <Animated animation="fade-up" delay={200}>
            <div className="bg-slate-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-sapp-blue/10 rounded-full p-3">
                  <Search className="h-6 w-6 text-sapp-blue" />
                </div>
                <h3 className="text-xl font-bold text-sapp-dark">Compliance vs Penetration Testing</h3>
              </div>
              
              <div className="space-y-4">
                {comparisonData.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-5 w-5 text-sapp-blue" />
                      <span className="font-semibold text-sapp-dark">{item.aspect}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <span className="font-medium text-emerald-700">Compliance Audits:</span>
                        <p className="text-emerald-600 mt-1">{item.compliance}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="font-medium text-blue-700">Penetration Testing:</span>
                        <p className="text-blue-600 mt-1">{item.penetration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Animated>

          {/* Growth Timeline */}
          <Animated animation="fade-up" delay={400}>
            <div className="bg-gradient-to-br from-sapp-blue/5 to-emerald-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500/10 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-sapp-dark">ISO 27001 Adoption Growth</h3>
              </div>
              
              <p className="text-sapp-gray mb-6">
                The rapid growth in ISO 27001 certifications demonstrates the increasing importance 
                organisations place on structured security compliance.
              </p>
              
              <div className="space-y-4">
                {growthData.map((data, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between bg-white rounded-lg p-4"
                  >
                    <span className="font-semibold text-sapp-dark">{data.year}</span>
                    <div className="flex items-center gap-3">
                      <div className="bg-sapp-blue/10 rounded-full px-3 py-1">
                        <span className="text-sapp-blue font-bold">
                          {data.certifications.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-sapp-gray">organisations</span>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-emerald-500 text-white rounded-lg p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold">39% Growth</span>
                  </div>
                  <p className="text-sm opacity-90">in just two years</p>
                </motion.div>
              </div>
            </div>
          </Animated>
        </div>

        {/* Value Proposition */}
        <Animated animation="fade-up" delay={600}>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-sapp-dark mb-4">
                Transform Compliance from Cost Centre to Competitive Advantage
              </h3>
              <p className="text-sapp-gray max-w-2xl mx-auto">
                Modern organisations use compliance audits not just to meet regulatory requirements, 
                but to build trust, reduce operational risk, and demonstrate security maturity to stakeholders.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-emerald-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-sapp-dark mb-2">Risk Mitigation</h4>
                <p className="text-sm text-sapp-gray">Proactively identify and address security gaps</p>
              </div>
              
              <div className="text-center">
                <div className="bg-sapp-blue/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-sapp-blue" />
                </div>
                <h4 className="font-semibold text-sapp-dark mb-2">Market Confidence</h4>
                <p className="text-sm text-sapp-gray">Demonstrate commitment to security excellence</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
                <h4 className="font-semibold text-sapp-dark mb-2">Business Growth</h4>
                <p className="text-sm text-sapp-gray">Enable new opportunities and partnerships</p>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default OverviewSection;
