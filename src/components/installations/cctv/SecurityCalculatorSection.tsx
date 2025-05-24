
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Building, Users, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const SecurityCalculatorSection = () => {
  const [cameras, setCameras] = useState(10);
  const [doors, setDoors] = useState(5);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [businessType, setBusinessType] = useState('office');
  const [platform, setPlatform] = useState('hybrid');

  const businessTypes = {
    office: { name: 'Office Building', multiplier: 1.0 },
    retail: { name: 'Retail Store', multiplier: 1.3 },
    warehouse: { name: 'Warehouse', multiplier: 0.8 },
    healthcare: { name: 'Healthcare', multiplier: 1.8 },
    education: { name: 'Education', multiplier: 1.2 },
    government: { name: 'Government', multiplier: 2.2 }
  };

  const platformCosts = {
    verkada: { cameraBase: 800, doorBase: 1200, monthly: 30 },
    ubiquiti: { cameraBase: 400, doorBase: 600, monthly: 0 },
    hybrid: { cameraBase: 600, doorBase: 900, monthly: 15 }
  };

  const riskMultipliers = {
    low: 0.8,
    medium: 1.0,
    high: 1.4
  };

  const calculateCosts = () => {
    const platformConfig = platformCosts[platform];
    const businessMultiplier = businessTypes[businessType].multiplier;
    const riskMultiplier = riskMultipliers[riskLevel];
    
    const baseCameraCost = cameras * platformConfig.cameraBase * businessMultiplier * riskMultiplier;
    const baseDoorCost = doors * platformConfig.doorBase * businessMultiplier * riskMultiplier;
    const installationCost = (baseCameraCost + baseDoorCost) * 0.3; // 30% installation
    const monthlyOperational = (cameras + doors) * platformConfig.monthly;
    
    const totalUpfront = baseCameraCost + baseDoorCost + installationCost;
    const yearlyOperational = monthlyOperational * 12;
    const threeYearTotal = totalUpfront + (yearlyOperational * 3);
    
    return {
      upfront: Math.round(totalUpfront),
      monthly: Math.round(monthlyOperational),
      yearly: Math.round(yearlyOperational),
      threeYear: Math.round(threeYearTotal),
      costPerCamera: Math.round(baseCameraCost / cameras),
      costPerDoor: Math.round(baseDoorCost / doors)
    };
  };

  const costs = calculateCosts();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-green-600/10 rounded-full px-6 py-2 mb-6">
            <h3 className="text-sm font-medium text-green-700 tracking-wider">SECURITY INVESTMENT CALCULATOR</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            Calculate Your Security Investment
          </h2>
          <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
            Get instant cost estimates for your CCTV and access control system based on your specific requirements
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <Card className="p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <Calculator className="h-6 w-6 text-sapp-blue" />
                <h3 className="text-2xl font-bold text-sapp-dark">System Configuration</h3>
              </div>

              <div className="space-y-8">
                {/* Number of Cameras */}
                <div>
                  <label className="block text-sm font-medium text-sapp-dark mb-3">
                    Number of Cameras: <span className="text-sapp-blue font-bold">{cameras}</span>
                  </label>
                  <Slider
                    value={[cameras]}
                    onValueChange={([value]) => setCameras(value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Number of Doors */}
                <div>
                  <label className="block text-sm font-medium text-sapp-dark mb-3">
                    Access Control Points: <span className="text-sapp-blue font-bold">{doors}</span>
                  </label>
                  <Slider
                    value={[doors]}
                    onValueChange={([value]) => setDoors(value)}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>10</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-sapp-dark mb-4">
                    <Building className="inline w-4 h-4 mr-2" />
                    Business Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(businessTypes).map(([key, type]) => (
                      <motion.label
                        key={key}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                          businessType === key 
                            ? 'bg-blue-50 border-blue-300 text-blue-800' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="businessType"
                          value={key}
                          checked={businessType === key}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="mr-2 text-sapp-blue"
                        />
                        <span className="font-medium">{type.name}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Risk Level */}
                <div>
                  <label className="block text-sm font-medium text-sapp-dark mb-4">
                    <Shield className="inline w-4 h-4 mr-2" />
                    Security Risk Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'low', name: 'Low', color: 'green' },
                      { key: 'medium', name: 'Medium', color: 'yellow' },
                      { key: 'high', name: 'High', color: 'red' }
                    ].map(({ key, name, color }) => (
                      <motion.label
                        key={key}
                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                          riskLevel === key 
                            ? `bg-${color}-50 border-${color}-300 text-${color}-800` 
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
                          className="mr-2"
                        />
                        <span className="font-medium">{name}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Platform Choice */}
                <div>
                  <label className="block text-sm font-medium text-sapp-dark mb-4">
                    Platform Preference
                  </label>
                  <div className="space-y-2">
                    {[
                      { key: 'verkada', name: 'Verkada (Cloud-First)', desc: 'Premium enterprise solution' },
                      { key: 'ubiquiti', name: 'Ubiquiti UniFi (Local)', desc: 'Cost-effective local control' },
                      { key: 'hybrid', name: 'Hybrid Solution', desc: 'Best of both worlds' }
                    ].map(({ key, name, desc }) => (
                      <motion.label
                        key={key}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          platform === key 
                            ? 'bg-blue-50 border-blue-300 text-blue-800' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <input
                          type="radio"
                          name="platform"
                          value={key}
                          checked={platform === key}
                          onChange={(e) => setPlatform(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">{name}</div>
                          <div className="text-xs opacity-75">{desc}</div>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Panel */}
            <Card className="p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-sapp-dark">Investment Breakdown</h3>
              </div>

              <div className="space-y-6">
                {/* Upfront Costs */}
                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Initial Investment</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    £{costs.upfront.toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>• Hardware, installation, and setup</p>
                    <p>• £{costs.costPerCamera.toLocaleString()} per camera</p>
                    <p>• £{costs.costPerDoor.toLocaleString()} per access point</p>
                  </div>
                </motion.div>

                {/* Monthly Costs */}
                <motion.div 
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Monthly Operational</span>
                  </div>
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    £{costs.monthly.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>• Cloud services and support</p>
                    <p>• Monitoring and maintenance</p>
                    <p>• Software licensing fees</p>
                  </div>
                </motion.div>

                {/* 3-Year Total */}
                <motion.div 
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">3-Year Total Cost</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    £{costs.threeYear.toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-600 space-y-1">
                    <p>• Total cost of ownership</p>
                    <p>• Includes all hardware, software, and services</p>
                    <p>• Average monthly: £{Math.round(costs.threeYear / 36).toLocaleString()}</p>
                  </div>
                </motion.div>

                {/* System Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">System Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cameras:</span>
                      <span className="font-medium ml-2">{cameras} units</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Access Points:</span>
                      <span className="font-medium ml-2">{doors} units</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Business Type:</span>
                      <span className="font-medium ml-2">{businessTypes[businessType].name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <span className="font-medium ml-2 capitalize">{riskLevel}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Platform:</span>
                      <span className="font-medium ml-2 capitalize">{platform}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <Button 
                  className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white font-semibold py-3"
                >
                  Get Detailed Quote
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-sapp-blue text-sapp-blue hover:bg-sapp-blue hover:text-white font-semibold py-3"
                >
                  Schedule Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCalculatorSection;
