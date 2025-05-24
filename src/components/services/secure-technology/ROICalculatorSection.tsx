
import React, { useState } from 'react';
import { Calculator, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const ROICalculatorSection: React.FC = () => {
  const [eventSize, setEventSize] = useState(500);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [eventValue, setEventValue] = useState(100000);

  const riskMultipliers = {
    low: 0.1,
    medium: 0.3,
    high: 0.6
  };

  const calculateRisk = () => {
    const baseRisk = eventValue * riskMultipliers[riskLevel as keyof typeof riskMultipliers];
    const attendeeMultiplier = Math.log10(eventSize / 100);
    return Math.round(baseRisk * attendeeMultiplier);
  };

  const getServiceCost = () => {
    if (riskLevel === 'low') return Math.round(eventSize * 1.2);
    if (riskLevel === 'medium') return Math.round(eventSize * 2.1);
    return Math.round(eventSize * 4.2);
  };

  const potentialLoss = calculateRisk();
  const serviceCost = getServiceCost();
  const savings = potentialLoss - serviceCost;
  const roi = Math.round((savings / serviceCost) * 100);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-green-600/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-green-700 tracking-wider">ROI CALCULATOR</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Calculate the Value of Security
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            See how much our secure communication services could save you by preventing security incidents and data breaches.
          </p>
        </Animated>

        <div className="max-w-4xl mx-auto">
          <Animated animation="fade-up" delay={200}>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="h-6 w-6 text-sapp-blue" />
                    <h3 className="text-xl font-bold text-sapp-dark">Event Details</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-2">
                        Number of Attendees: {eventSize}
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="5000"
                        step="50"
                        value={eventSize}
                        onChange={(e) => setEventSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-1">
                        <span>50</span>
                        <span>5,000</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-2">
                        Event Value (£): {eventValue.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={eventValue}
                        onChange={(e) => setEventValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-1">
                        <span>£10k</span>
                        <span>£1M</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-2">
                        Risk Level
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'low', label: 'Low Risk', desc: 'Internal meetings, low-profile events' },
                          { value: 'medium', label: 'Medium Risk', desc: 'Corporate events, trade shows' },
                          { value: 'high', label: 'High Risk', desc: 'VIP events, sensitive information' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="riskLevel"
                              value={option.value}
                              checked={riskLevel === option.value}
                              onChange={(e) => setRiskLevel(e.target.value)}
                              className="mr-3"
                            />
                            <div>
                              <span className="font-medium text-sapp-dark">{option.label}</span>
                              <p className="text-xs text-sapp-gray">{option.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingDown className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-sapp-dark">Potential Savings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-900">Potential Loss (Breach)</span>
                      </div>
                      <div className="text-2xl font-bold text-red-700">
                        £{potentialLoss.toLocaleString()}
                      </div>
                      <p className="text-xs text-red-600 mt-1">
                        Based on industry averages for data breaches and security incidents
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Security Service Cost</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">
                        £{serviceCost.toLocaleString()}
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Estimated cost for recommended security level
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Net Savings</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        £{savings.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-green-600 mt-1">
                        {roi}% ROI
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-sapp-blue to-accent-dark-blue rounded-lg text-white">
                    <h4 className="font-bold mb-2">Investment Summary</h4>
                    <p className="text-sm opacity-90">
                      For every £1 invested in secure communications, you could save £{Math.round(savings/serviceCost)} 
                      in potential losses from security incidents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Animated>

          <Animated animation="fade-up" delay={400} className="text-center mt-8">
            <p className="text-sapp-gray mb-4">
              Ready to protect your event and see these savings in reality?
            </p>
            <button className="bg-sapp-blue hover:bg-sapp-blue/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Get Accurate Quote for Your Event
            </button>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
