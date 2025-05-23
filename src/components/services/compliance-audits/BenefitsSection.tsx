
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Zap, Calculator, DollarSign } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BenefitsSection: React.FC = () => {
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [companySize, setCompanySize] = useState(100);
  const [currentIncidents, setCurrentIncidents] = useState(2);

  const benefits = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Ensures adherence to ISO27001 and other relevant standards, such as HIPAA or PCI DSS, where applicable.',
      impact: 'Avoid regulatory fines and penalties',
      color: 'emerald'
    },
    {
      icon: TrendingUp,
      title: 'Risk Reduction',
      description: 'Identifies and mitigates vulnerabilities in physical security measures, reducing the likelihood of breaches.',
      impact: 'Up to 60% reduction in security incidents',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Enhanced Security Posture',
      description: 'Strengthens your overall security framework, protecting assets, data, and personnel.',
      impact: 'Comprehensive protection across all assets',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Client and Partner Trust',
      description: 'Demonstrates a commitment to information security, fostering confidence among stakeholders.',
      impact: 'Increased business opportunities',
      color: 'orange'
    },
    {
      icon: DollarSign,
      title: 'Operational Efficiency',
      description: 'Streamlines security processes, reducing the risk of costly incidents and improving resource allocation.',
      impact: 'Optimized security spending',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-500/10 text-emerald-500',
      blue: 'bg-blue-500/10 text-blue-500',
      purple: 'bg-purple-500/10 text-purple-500',
      orange: 'bg-orange-500/10 text-orange-500',
      indigo: 'bg-indigo-500/10 text-indigo-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  // Simple ROI calculation
  const calculateROI = () => {
    const averageIncidentCost = 50000; // Average cost per security incident
    const auditCost = 15000; // Typical audit cost
    const reductionPercentage = 0.6; // 60% reduction in incidents
    
    const currentAnnualCost = currentIncidents * averageIncidentCost;
    const projectedAnnualCost = currentAnnualCost * (1 - reductionPercentage);
    const annualSavings = currentAnnualCost - projectedAnnualCost;
    const netROI = ((annualSavings - auditCost) / auditCost) * 100;
    
    return {
      currentAnnualCost,
      projectedAnnualCost,
      annualSavings,
      netROI: Math.max(0, netROI)
    };
  };

  const roiData = calculateROI();

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">BUSINESS VALUE</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Benefits That Drive Business Success
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Our compliance audits deliver measurable value beyond regulatory requirements, 
            creating lasting competitive advantages for your organisation.
          </p>
        </Animated>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.slice(0, 3).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                <div className={`rounded-full p-3 w-fit mb-4 ${getColorClasses(benefit.color)}`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sapp-dark mb-3">{benefit.title}</h3>
                <p className="text-sapp-gray text-sm mb-4">{benefit.description}</p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-sapp-blue">{benefit.impact}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {benefits.slice(3).map((benefit, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                <div className={`rounded-full p-3 w-fit mb-4 ${getColorClasses(benefit.color)}`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sapp-dark mb-3">{benefit.title}</h3>
                <p className="text-sapp-gray text-sm mb-4">{benefit.description}</p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-sapp-blue">{benefit.impact}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <Animated animation="fade-up" delay={600}>
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-sapp-blue/10 rounded-full p-3">
                  <Calculator className="h-6 w-6 text-sapp-blue" />
                </div>
                <h3 className="text-2xl font-bold text-sapp-dark">ROI Calculator</h3>
              </div>
              <p className="text-sapp-gray">
                See the potential return on investment from implementing compliance audits
              </p>
            </div>

            {!showROICalculator ? (
              <div className="text-center">
                <Button 
                  onClick={() => setShowROICalculator(true)}
                  className="bg-sapp-blue hover:bg-sapp-blue/90"
                >
                  Calculate Your ROI
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-sapp-dark mb-4">Your Organisation</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-sapp-dark mb-2">
                          Company Size (employees)
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="1000"
                          value={companySize}
                          onChange={(e) => setCompanySize(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-sapp-gray mt-1">{companySize} employees</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-sapp-dark mb-2">
                          Security incidents per year
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={currentIncidents}
                          onChange={(e) => setCurrentIncidents(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-sapp-gray mt-1">{currentIncidents} incidents</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sapp-dark mb-4">Projected Results</h4>
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-sm text-red-600 mb-1">Current Annual Risk Cost</div>
                        <div className="text-2xl font-bold text-red-700">
                          £{roiData.currentAnnualCost.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <div className="text-sm text-emerald-600 mb-1">After Compliance Audit</div>
                        <div className="text-2xl font-bold text-emerald-700">
                          £{roiData.projectedAnnualCost.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-sapp-blue/10 rounded-lg p-4">
                        <div className="text-sm text-sapp-blue mb-1">Annual Savings</div>
                        <div className="text-2xl font-bold text-sapp-blue">
                          £{roiData.annualSavings.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 mb-1">ROI (First Year)</div>
                        <div className="text-2xl font-bold text-purple-700">
                          {roiData.netROI.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> These calculations are estimates based on industry averages. 
                    Actual results may vary based on your organisation's specific circumstances.
                  </p>
                </div>
              </motion.div>
            )}
          </Card>
        </Animated>
      </div>
    </section>
  );
};

export default BenefitsSection;
