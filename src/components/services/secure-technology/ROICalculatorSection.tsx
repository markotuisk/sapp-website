
import React, { useState } from 'react';
import { Calculator, TrendingDown, Shield, AlertTriangle, Zap } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import { motion } from 'framer-motion';

const ROICalculatorSection: React.FC = () => {
  const [eventSize, setEventSize] = useState(100);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [eventValue, setEventValue] = useState(50000);

  // Risk multipliers based on industry data
  const riskMultipliers = {
    low: 0.05,    // 5% risk
    medium: 0.15, // 15% risk  
    high: 0.35    // 35% risk
  };

  // Base costs per attendee for different security levels
  const baseCostPerAttendee = {
    low: 15,     // £15 per attendee for basic
    medium: 25,  // £25 per attendee for standard
    high: 45     // £45 per attendee for comprehensive
  };

  const calculateRisk = () => {
    // Base potential loss calculation
    const baseRisk = eventValue * riskMultipliers[riskLevel as keyof typeof riskMultipliers];
    
    // Scale factor for attendee count (more attendees = higher complexity and risk)
    const attendeeRiskFactor = Math.min(1 + (eventSize - 10) / 200, 3); // Cap at 3x multiplier
    
    // Additional factors for larger events
    const complexityFactor = eventSize > 500 ? 1.5 : eventSize > 200 ? 1.2 : 1;
    
    return Math.round(baseRisk * attendeeRiskFactor * complexityFactor);
  };

  const getServiceCost = () => {
    const baseCost = eventSize * baseCostPerAttendee[riskLevel as keyof typeof baseCostPerAttendee];
    
    // Ensure minimum cost of £2,500
    const minimumCost = 2500;
    
    // Add setup and deployment costs for larger events
    const setupCost = eventSize > 200 ? 1000 : eventSize > 100 ? 500 : 250;
    
    const totalCost = Math.max(baseCost + setupCost, minimumCost);
    
    return Math.round(totalCost);
  };

  const potentialLoss = calculateRisk();
  const serviceCost = getServiceCost();
  const savings = Math.max(potentialLoss - serviceCost, 0);
  const roi = serviceCost > 0 ? Math.round((savings / serviceCost) * 100) : 0;

  // Animation variants for the results
  const resultVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <motion.div 
            className="inline-block bg-green-600/10 rounded-full px-4 py-1.5 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-sm font-medium text-green-700 tracking-wider">INVESTMENT CALCULATOR</h3>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Calculate Your Security Investment Value
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            Discover the financial impact of our secure communication services by comparing potential breach costs with our protection investment.
          </p>
        </Animated>

        <div className="max-w-6xl mx-auto">
          <Animated animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Calculator className="h-6 w-6 text-sapp-blue" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-sapp-dark">Event Parameters</h3>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        Number of Attendees: <span className="text-sapp-blue font-bold">{eventSize}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          value={eventSize}
                          onChange={(e) => setEventSize(parseInt(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-sapp-gray mt-2">
                          <span>10</span>
                          <span>250</span>
                          <span>500</span>
                          <span>750</span>
                          <span>1,000</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        Event Value: <span className="text-sapp-blue font-bold">£{eventValue.toLocaleString()}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="10000"
                          max="500000"
                          step="5000"
                          value={eventValue}
                          onChange={(e) => setEventValue(parseInt(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-green-200 to-green-500 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-sapp-gray mt-2">
                          <span>£10k</span>
                          <span>£100k</span>
                          <span>£250k</span>
                          <span>£500k</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        Security Risk Assessment
                      </label>
                      <div className="space-y-3">
                        {[
                          { 
                            value: 'low', 
                            label: 'Low Risk', 
                            desc: 'Internal meetings, community events',
                            color: 'bg-blue-50 border-blue-200 text-blue-800'
                          },
                          { 
                            value: 'medium', 
                            label: 'Medium Risk', 
                            desc: 'Corporate conferences, trade exhibitions',
                            color: 'bg-amber-50 border-amber-200 text-amber-800'
                          },
                          { 
                            value: 'high', 
                            label: 'High Risk', 
                            desc: 'VIP events, sensitive information handling',
                            color: 'bg-red-50 border-red-200 text-red-800'
                          }
                        ].map((option) => (
                          <motion.label 
                            key={option.value} 
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              riskLevel === option.value 
                                ? option.color + ' shadow-lg' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="riskLevel"
                              value={option.value}
                              checked={riskLevel === option.value}
                              onChange={(e) => setRiskLevel(e.target.value)}
                              className="mr-3 text-sapp-blue"
                            />
                            <div>
                              <span className="font-medium">{option.label}</span>
                              <p className="text-xs opacity-75">{option.desc}</p>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-sapp-dark">Financial Impact Analysis</h3>
                  </div>

                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-900">Potential Breach Cost</span>
                      </div>
                      <div className="text-3xl font-bold text-red-700 mb-2">
                        £{potentialLoss.toLocaleString()}
                      </div>
                      <p className="text-xs text-red-600">
                        Estimated cost including data breach fines, business disruption, and reputation damage
                      </p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Security Investment</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-700 mb-2">
                        £{serviceCost.toLocaleString()}
                      </div>
                      <p className="text-xs text-blue-600">
                        Complete secure communication package including setup, monitoring, and support
                      </p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">Protected Value</span>
                      </div>
                      <div className="text-3xl font-bold text-green-700 mb-2">
                        £{savings.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-green-600 mb-2">
                        {roi}% Return on Investment
                      </div>
                      <p className="text-xs text-green-600">
                        Value protected through prevention of security incidents
                      </p>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-8 p-6 bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-xl text-white"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Investment Summary
                    </h4>
                    <div className="text-sm opacity-90 space-y-1">
                      <p>• Cost per attendee: £{Math.round(serviceCost / eventSize)}</p>
                      <p>• Protection coverage: {riskLevel === 'high' ? '99%' : riskLevel === 'medium' ? '90%' : '65%'}</p>
                      <p>• Break-even threshold: {Math.round((serviceCost / eventValue) * 100)}% of event value at risk</p>
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
                Ready to protect your event investment and secure these potential savings?
              </p>
              <button className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                Get Tailored Security Quote
              </button>
            </motion.div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
