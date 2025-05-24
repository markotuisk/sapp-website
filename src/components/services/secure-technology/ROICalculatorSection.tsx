
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Shield, AlertTriangle, Zap, Users, Building } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const ROICalculatorSection: React.FC = () => {
  const [eventSize, setEventSize] = useState(100);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [eventValue, setEventValue] = useState(100000);
  const [eventDuration, setEventDuration] = useState(1);
  const [industryType, setIndustryType] = useState('corporate');

  // Industry risk multipliers and base values
  const industryFactors = {
    corporate: { riskMultiplier: 1.0, baseValue: 50000, name: 'Corporate Events' },
    finance: { riskMultiplier: 1.8, baseValue: 200000, name: 'Financial Services' },
    government: { riskMultiplier: 2.5, baseValue: 500000, name: 'Government/Political' },
    technology: { riskMultiplier: 1.6, baseValue: 150000, name: 'Technology/IP' },
    entertainment: { riskMultiplier: 1.3, baseValue: 100000, name: 'Entertainment/Media' },
    healthcare: { riskMultiplier: 2.0, baseValue: 300000, name: 'Healthcare/Pharma' }
  };

  // Risk level configurations
  const riskConfigurations = {
    low: { 
      multiplier: 0.08, 
      baseCostPerPerson: 12, 
      name: 'Low Risk',
      description: 'Standard business meetings, public conferences'
    },
    medium: { 
      multiplier: 0.25, 
      baseCostPerPerson: 28, 
      name: 'Medium Risk',
      description: 'Confidential business, competitive intelligence value'
    },
    high: { 
      multiplier: 0.45, 
      baseCostPerPerson: 55, 
      name: 'High Risk',
      description: 'Highly sensitive, national security, celebrity events'
    }
  };

  // Calculate sophisticated correlations
  const calculatePotentialLoss = () => {
    const industry = industryFactors[industryType as keyof typeof industryFactors];
    const risk = riskConfigurations[riskLevel as keyof typeof riskConfigurations];
    
    // Base calculation considering event value and industry risk
    let baseLoss = eventValue * risk.multiplier * industry.riskMultiplier;
    
    // Event size factor (economies of scale for smaller events, increased complexity for larger)
    const sizeMultiplier = eventSize <= 50 ? 1.2 : 
                          eventSize <= 200 ? 1.0 :
                          eventSize <= 500 ? 1.3 :
                          eventSize <= 750 ? 1.6 : 2.0;
    
    // Duration multiplier (longer events = higher risk)
    const durationMultiplier = 1 + (eventDuration - 1) * 0.3;
    
    // Regulatory and reputational damage multiplier based on industry
    const complianceMultiplier = industryType === 'finance' || industryType === 'healthcare' ? 1.5 :
                                industryType === 'government' ? 2.0 : 1.0;
    
    const totalLoss = baseLoss * sizeMultiplier * durationMultiplier * complianceMultiplier;
    
    return Math.round(totalLoss);
  };

  const calculateServiceCost = () => {
    const risk = riskConfigurations[riskLevel as keyof typeof riskConfigurations];
    const industry = industryFactors[industryType as keyof typeof industryFactors];
    
    // Base cost calculation
    let baseCost = eventSize * risk.baseCostPerPerson;
    
    // Industry premium
    const industryPremium = industry.riskMultiplier > 1.5 ? 1.4 : 
                           industry.riskMultiplier > 1.2 ? 1.2 : 1.0;
    
    // Duration costs (setup, equipment rental, personnel)
    const durationCost = eventDuration > 1 ? baseCost * (eventDuration - 1) * 0.6 : 0;
    
    // Setup and deployment costs based on event size and complexity
    const setupCost = eventSize <= 50 ? 1500 :
                     eventSize <= 200 ? 3000 :
                     eventSize <= 500 ? 6000 :
                     eventSize <= 750 ? 9000 : 15000;
    
    // Equipment and technology costs
    const equipmentCost = riskLevel === 'high' ? setupCost * 1.8 :
                         riskLevel === 'medium' ? setupCost * 1.3 : setupCost;
    
    // Calculate total before minimum enforcement
    let totalCost = (baseCost + durationCost + equipmentCost) * industryPremium;
    
    // Advanced security premium for high-risk industries
    if (industryType === 'government' || industryType === 'finance') {
      totalCost *= 1.3;
    }
    
    // Minimum service fee enforcement
    const minimumFee = 5500; // Updated to £5,500 as requested
    
    return Math.round(Math.max(totalCost, minimumFee));
  };

  const potentialLoss = calculatePotentialLoss();
  const serviceCost = calculateServiceCost();
  const protectedValue = Math.max(potentialLoss - serviceCost, 0);
  const roi = serviceCost > 0 ? Math.round((protectedValue / serviceCost) * 100) : 0;
  const breakEvenPercentage = Math.round((serviceCost / eventValue) * 100);

  // Animation variants
  const resultVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section id="roi-calculator" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <motion.div 
            className="inline-block bg-blue-600/10 rounded-full px-4 py-1.5 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-sm font-medium text-blue-700 tracking-wider">INVESTMENT CALCULATOR</h3>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Calculate Your Security Investment Value
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Sophisticated risk assessment tool calculating potential breach costs versus security investment based on industry standards and threat intelligence.
          </p>
        </Animated>

        <div className="max-w-7xl mx-auto">
          <Animated animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Enhanced Input Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Calculator className="h-6 w-6 text-sapp-blue" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-sapp-dark">Event Configuration</h3>
                  </div>

                  <div className="space-y-8">
                    {/* Industry Type */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        <Building className="inline w-4 h-4 mr-2" />
                        Industry Sector
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(industryFactors).map(([key, industry]) => (
                          <motion.label
                            key={key}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                              industryType === key 
                                ? 'bg-blue-50 border-blue-300 text-blue-800' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="industryType"
                              value={key}
                              checked={industryType === key}
                              onChange={(e) => setIndustryType(e.target.value)}
                              className="mr-2 text-sapp-blue"
                            />
                            <span className="font-medium">{industry.name}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Event Size */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        <Users className="inline w-4 h-4 mr-2" />
                        Number of Attendees: <span className="text-sapp-blue font-bold">{eventSize}</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={eventSize}
                        onChange={(e) => setEventSize(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-2">
                        <span>10</span>
                        <span>250</span>
                        <span>500</span>
                        <span>750</span>
                        <span>1,000</span>
                      </div>
                    </div>

                    {/* Event Value */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        Event/Information Value: <span className="text-sapp-blue font-bold">£{eventValue.toLocaleString()}</span>
                      </label>
                      <input
                        type="range"
                        min="50000"
                        max="5000000"
                        step="25000"
                        value={eventValue}
                        onChange={(e) => setEventValue(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-green-200 to-green-500 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-2">
                        <span>£50k</span>
                        <span>£1M</span>
                        <span>£2.5M</span>
                        <span>£5M</span>
                      </div>
                    </div>

                    {/* Event Duration */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        Event Duration: <span className="text-sapp-blue font-bold">{eventDuration} day{eventDuration > 1 ? 's' : ''}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="7"
                        step="1"
                        value={eventDuration}
                        onChange={(e) => setEventDuration(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-2">
                        <span>1 day</span>
                        <span>3 days</span>
                        <span>5 days</span>
                        <span>7 days</span>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        <Shield className="inline w-4 h-4 mr-2" />
                        Security Risk Assessment
                      </label>
                      <div className="space-y-3">
                        {Object.entries(riskConfigurations).map(([key, config]) => (
                          <motion.label 
                            key={key} 
                            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              riskLevel === key 
                                ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-lg' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="riskLevel"
                              value={key}
                              checked={riskLevel === key}
                              onChange={(e) => setRiskLevel(e.target.value)}
                              className="mr-3 text-sapp-blue"
                            />
                            <div>
                              <span className="font-medium">{config.name}</span>
                              <p className="text-xs opacity-75 mt-1">{config.description}</p>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Results Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-sapp-dark">Sophisticated Risk Analysis</h3>
                  </div>

                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      key={`loss-${potentialLoss}`}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-900">Potential Security Breach Cost</span>
                      </div>
                      <div className="text-3xl font-bold text-red-700 mb-2">
                        £{potentialLoss.toLocaleString()}
                      </div>
                      <div className="text-xs text-red-600 space-y-1">
                        <p>• Industry factor: {(industryFactors[industryType as keyof typeof industryFactors].riskMultiplier * 100)}% baseline risk</p>
                        <p>• Includes regulatory fines, business disruption, and reputational damage</p>
                        <p>• Based on {eventSize} attendees over {eventDuration} day{eventDuration > 1 ? 's' : ''}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      key={`cost-${serviceCost}`}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Security Investment Required</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-700 mb-2">
                        £{serviceCost.toLocaleString()}
                      </div>
                      <div className="text-xs text-blue-600 space-y-1">
                        <p>• Cost per attendee: £{Math.round(serviceCost / eventSize)}</p>
                        <p>• {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} security tier deployment</p>
                        <p>• Includes setup, monitoring, personnel, and equipment</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      key={`roi-${roi}`}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">Protected Value & ROI</span>
                      </div>
                      <div className="text-3xl font-bold text-green-700 mb-2">
                        £{protectedValue.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-green-600 mb-2">
                        {roi}% Return on Investment
                      </div>
                      <div className="text-xs text-green-600 space-y-1">
                        <p>• Break-even at {breakEvenPercentage}% breach probability</p>
                        <p>• Value protected through incident prevention</p>
                        <p>• Industry-adjusted risk calculation</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-8 p-6 bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl text-white"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Professional Assessment Summary
                    </h4>
                    <div className="text-sm opacity-90 space-y-2">
                      <p><strong>Industry:</strong> {industryFactors[industryType as keyof typeof industryFactors].name}</p>
                      <p><strong>Risk Profile:</strong> {riskConfigurations[riskLevel as keyof typeof riskConfigurations].name}</p>
                      <p><strong>Event Scale:</strong> {eventSize} attendees, {eventDuration} day{eventDuration > 1 ? 's' : ''}</p>
                      <p><strong>Security Coverage:</strong> {riskLevel === 'high' ? '99%' : riskLevel === 'medium' ? '90%' : '65%} threat prevention</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Animated>

          <Animated animation="fade-up" delay={400} className="text-center mt-12">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800 rounded-xl p-6 text-white max-w-2xl mx-auto"
            >
              <p className="text-white/90 mb-4">
                Ready to secure your event investment and protect these calculated values? Our security experts will provide a detailed assessment tailored to your specific requirements.
              </p>
              <button className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                Get Professional Security Assessment
              </button>
            </motion.div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
