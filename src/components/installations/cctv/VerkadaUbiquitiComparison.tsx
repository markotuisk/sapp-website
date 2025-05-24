
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Server, Shield, DollarSign, Users, Zap, CheckCircle, XCircle, ArrowRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const platforms = {
  verkada: {
    name: 'Verkada',
    tagline: 'Cloud-First Enterprise Platform',
    logo: '🏢',
    color: 'from-blue-600 to-cyan-600',
    architecture: 'Cloud-Native',
    dataStorage: 'Cloud + Edge (1 year on-device)',
    aiCapabilities: 'Advanced cloud-based AI with face search',
    accessControl: 'Software-first, mobile-enabled credentials',
    integration: 'Rich APIs, webhooks, third-party connectors',
    security: 'End-to-end encryption, tamper-resistant hardware',
    cost: 'Premium (bundled licensing)',
    support: '24/7 enterprise support included',
    idealFor: 'Large enterprises, multi-site deployments',
    strengths: [
      'No on-site servers required',
      'Automatic updates and maintenance',
      'Advanced cloud AI analytics',
      'Professional 24/7 support',
      'Rapid deployment capabilities',
      'Enterprise-grade security'
    ],
    considerations: [
      'Higher ongoing costs',
      'Internet dependency',
      'Subscription-based pricing',
      'Data stored in cloud'
    ]
  },
  ubiquiti: {
    name: 'Ubiquiti UniFi',
    tagline: 'Hybrid Local-Control Platform',
    logo: '🔧',
    color: 'from-green-600 to-emerald-600',
    architecture: 'Hybrid (Local + Cloud Management)',
    dataStorage: 'Local storage, cloud management portal',
    aiCapabilities: 'On-device AI, local face recognition',
    accessControl: 'PoE-based hubs with touchscreen readers',
    integration: 'UniFi ecosystem, RTSP camera support',
    security: 'Local data control, encrypted communications',
    cost: 'Cost-effective (no licensing fees)',
    support: 'Community-driven, optional paid support',
    idealFor: 'SMB, tech-savvy users, budget-conscious',
    strengths: [
      'No subscription fees',
      'Complete data ownership',
      'Extensive ecosystem integration',
      'Cost-effective hardware',
      'DIY-friendly setup',
      'Active community support'
    ],
    considerations: [
      'Requires technical expertise',
      'Manual updates needed',
      'Limited professional support',
      'More complex setup'
    ]
  }
};

const comparisonCategories = [
  {
    id: 'architecture',
    title: 'Architecture & Data Flow',
    icon: Server,
    verkadaScore: 9,
    ubiquitiScore: 7,
    verkadaDescription: 'Cloud-native with edge processing',
    ubiquitiDescription: 'Hybrid local + cloud management'
  },
  {
    id: 'ai',
    title: 'AI & Analytics',
    icon: BarChart,
    verkadaScore: 10,
    ubiquitiScore: 8,
    verkadaDescription: 'Advanced cloud AI with instant search',
    ubiquitiDescription: 'On-device AI with local processing'
  },
  {
    id: 'cost',
    title: 'Total Cost of Ownership',
    icon: DollarSign,
    verkadaScore: 6,
    ubiquitiScore: 9,
    verkadaDescription: 'Higher upfront and ongoing costs',
    ubiquitiDescription: 'Low cost, no licensing fees'
  },
  {
    id: 'ease',
    title: 'Ease of Deployment',
    icon: Zap,
    verkadaScore: 10,
    ubiquitiScore: 6,
    verkadaDescription: 'Plug-and-play deployment',
    ubiquitiDescription: 'Requires technical configuration'
  },
  {
    id: 'support',
    title: 'Support & Maintenance',
    icon: Users,
    verkadaScore: 10,
    ubiquitiScore: 5,
    verkadaDescription: '24/7 professional support',
    ubiquitiDescription: 'Community support, DIY maintenance'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    verkadaScore: 9,
    ubiquitiScore: 10,
    verkadaDescription: 'Enterprise-grade cloud security',
    ubiquitiDescription: 'Local data control and privacy'
  }
];

const VerkadaUbiquitiComparison = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('verkada');
  const [comparisonView, setComparisonView] = useState('overview');
  const [priorityWeights, setPriorityWeights] = useState({
    cost: 5,
    features: 5,
    ease: 5,
    support: 5
  });

  const calculateWeightedScore = (platform) => {
    const scores = {
      verkada: { cost: 6, features: 9.5, ease: 10, support: 10 },
      ubiquiti: { cost: 9, features: 7.5, ease: 6, support: 5 }
    };
    
    const totalWeight = Object.values(priorityWeights).reduce((sum, weight) => sum + weight, 0);
    const weightedScore = Object.entries(priorityWeights).reduce((sum, [key, weight]) => {
      return sum + (scores[platform][key] * weight);
    }, 0);
    
    return (weightedScore / totalWeight).toFixed(1);
  };

  return (
    <section id="comparison" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-blue-600/10 rounded-full px-6 py-2 mb-6">
            <h3 className="text-sm font-medium text-blue-700 tracking-wider">PLATFORM COMPARISON</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            Verkada vs Ubiquiti UniFi
          </h2>
          <p className="text-xl text-sapp-gray max-w-3xl mx-auto mb-8">
            Interactive comparison of two leading security platforms. Explore features, costs, and find your ideal solution.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setComparisonView('overview')}
              variant={comparisonView === 'overview' ? "default" : "outline"}
              className="px-6 py-2"
            >
              Platform Overview
            </Button>
            <Button 
              onClick={() => setComparisonView('detailed')}
              variant={comparisonView === 'detailed' ? "default" : "outline"}
              className="px-6 py-2"
            >
              Detailed Comparison
            </Button>
            <Button 
              onClick={() => setComparisonView('calculator')}
              variant={comparisonView === 'calculator' ? "default" : "outline"}
              className="px-6 py-2"
            >
              Decision Calculator
            </Button>
          </div>
        </motion.div>

        {comparisonView === 'overview' && (
          <div className="max-w-6xl mx-auto">
            {/* Platform Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {Object.entries(platforms).map(([key, platform]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedPlatform(key)}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedPlatform === key 
                      ? 'border-blue-300 bg-blue-50 shadow-xl scale-105' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                  }`}
                  whileHover={{ scale: selectedPlatform === key ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center text-2xl`}>
                      {platform.logo}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        selectedPlatform === key ? 'text-blue-800' : 'text-sapp-dark'
                      }`}>
                        {platform.name}
                      </h3>
                      <p className="text-gray-600">{platform.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{platform.idealFor}</p>
                  <div className="text-xs text-gray-500">
                    Click to explore detailed features
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Selected Platform Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 shadow-xl border border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Platform Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-full bg-gradient-to-r ${platforms[selectedPlatform].color}`}>
                          <span className="text-2xl">{platforms[selectedPlatform].logo}</span>
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-sapp-dark">{platforms[selectedPlatform].name}</h3>
                          <p className="text-gray-600">{platforms[selectedPlatform].tagline}</p>
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div className="space-y-4 mb-8">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm text-gray-900 mb-1">Architecture</div>
                            <div className="text-sm text-gray-600">{platforms[selectedPlatform].architecture}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm text-gray-900 mb-1">Data Storage</div>
                            <div className="text-sm text-gray-600">{platforms[selectedPlatform].dataStorage}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm text-gray-900 mb-1">AI Capabilities</div>
                            <div className="text-sm text-gray-600">{platforms[selectedPlatform].aiCapabilities}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strengths and Considerations */}
                    <div className="space-y-8">
                      {/* Strengths */}
                      <div>
                        <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Key Strengths
                        </h4>
                        <ul className="space-y-2">
                          {platforms[selectedPlatform].strengths.map((strength, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="text-green-500 mr-2 mt-1">•</span>
                              {strength}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Considerations */}
                      <div>
                        <h4 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                          <XCircle className="h-5 w-5 mr-2" />
                          Considerations
                        </h4>
                        <ul className="space-y-2">
                          {platforms[selectedPlatform].considerations.map((consideration, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="text-orange-500 mr-2 mt-1">•</span>
                              {consideration}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {comparisonView === 'detailed' && (
          <div className="max-w-7xl mx-auto">
            <Card className="p-8 shadow-xl border border-gray-100">
              <div className="space-y-8">
                {comparisonCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 pb-8 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="h-6 w-6 text-sapp-blue" />
                        <h3 className="text-2xl font-bold text-sapp-dark">{category.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Verkada */}
                        <div className="bg-blue-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-blue-800">Verkada</h4>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-blue-700">{category.verkadaScore}/10</div>
                              <div className="w-20 bg-blue-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${category.verkadaScore * 10}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blue-700">{category.verkadaDescription}</p>
                        </div>

                        {/* Ubiquiti */}
                        <div className="bg-green-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-green-800">Ubiquiti UniFi</h4>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl font-bold text-green-700">{category.ubiquitiScore}/10</div>
                              <div className="w-20 bg-green-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${category.ubiquitiScore * 10}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-green-700">{category.ubiquitiDescription}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {comparisonView === 'calculator' && (
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-sapp-dark mb-8 text-center">
                Personalised Platform Recommendation
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Priority Sliders */}
                <div>
                  <h4 className="text-lg font-semibold text-sapp-dark mb-6">
                    Rate Your Priorities (1-10)
                  </h4>
                  
                  <div className="space-y-6">
                    {Object.entries(priorityWeights).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700 capitalize">
                            {key === 'ease' ? 'Ease of Use' : key}
                          </label>
                          <span className="text-sm font-bold text-sapp-blue">{value}</span>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) => 
                            setPriorityWeights(prev => ({ ...prev, [key]: newValue }))
                          }
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-semibold text-sapp-dark mb-6">
                    Recommended Platform
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-lg font-bold text-blue-800">Verkada</h5>
                        <div className="text-2xl font-bold text-blue-700">
                          {calculateWeightedScore('verkada')}/10
                        </div>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${calculateWeightedScore('verkada') * 10}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-lg font-bold text-green-800">Ubiquiti UniFi</h5>
                        <div className="text-2xl font-bold text-green-700">
                          {calculateWeightedScore('ubiquiti')}/10
                        </div>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${calculateWeightedScore('ubiquiti') * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-2">Recommendation</h6>
                    <p className="text-sm text-gray-600">
                      {calculateWeightedScore('verkada') > calculateWeightedScore('ubiquiti') 
                        ? "Based on your priorities, Verkada appears to be the better fit. Its enterprise features and support align with your requirements."
                        : "Based on your priorities, Ubiquiti UniFi appears to be the better fit. Its cost-effectiveness and local control align with your requirements."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-sapp-blue to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Make Your Decision?</h3>
            <p className="text-blue-100 mb-6">
              As certified installers for both platforms, we can help you choose and deploy the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-sapp-blue hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sapp-blue font-semibold px-8 py-3"
              >
                Request Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerkadaUbiquitiComparison;
