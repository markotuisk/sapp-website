
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Server, Network, Check, X, ArrowRight, Zap, Shield, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const architectures = [
  {
    id: 'cloud',
    title: 'Cloud-First',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    description: 'Fully cloud-managed security platform with remote access and automatic updates',
    dataFlow: ['Cameras → Cloud Platform → Management Dashboard'],
    pros: [
      'No on-site servers required',
      'Automatic updates and maintenance',
      'Scalable storage and processing',
      'Remote access from anywhere',
      'Professional monitoring available',
      'Rapid deployment'
    ],
    cons: [
      'Requires reliable internet',
      'Ongoing subscription costs',
      'Data stored off-site',
      'Potential latency issues'
    ],
    useCases: [
      'Multi-site businesses',
      'Retail chains',
      'Remote locations',
      'Quick deployments'
    ],
    cost: 'Medium to High (subscription-based)',
    complexity: 'Low',
    maintenance: 'Minimal (managed service)'
  },
  {
    id: 'onsite',
    title: 'On-Premise',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    description: 'Local server-based system with complete data control and no cloud dependencies',
    dataFlow: ['Cameras → Local NVR/Server → Local Management'],
    pros: [
      'Complete data control',
      'No internet dependency',
      'One-time purchase cost',
      'Maximum privacy and security',
      'Low latency',
      'No subscription fees'
    ],
    cons: [
      'Higher upfront costs',
      'Requires IT expertise',
      'Manual updates and maintenance',
      'Limited remote access',
      'Backup complexity'
    ],
    useCases: [
      'Government facilities',
      'High-security environments',
      'Areas with poor internet',
      'Privacy-sensitive applications'
    ],
    cost: 'High (upfront)',
    complexity: 'High',
    maintenance: 'High (self-managed)'
  },
  {
    id: 'hybrid',
    title: 'Hybrid',
    icon: Network,
    color: 'from-purple-500 to-indigo-500',
    description: 'Best of both worlds - local storage with cloud management and remote access',
    dataFlow: ['Cameras → Local Storage → Cloud Management Portal'],
    pros: [
      'Data stored locally',
      'Cloud-based management',
      'Secure remote access',
      'Flexible deployment',
      'Redundant storage options',
      'Balanced cost structure'
    ],
    cons: [
      'More complex setup',
      'Internet required for management',
      'Higher initial complexity',
      'Potential licensing costs'
    ],
    useCases: [
      'Corporate headquarters',
      'Healthcare facilities',
      'Educational institutions',
      'Manufacturing plants'
    ],
    cost: 'Medium',
    complexity: 'Medium', 
    maintenance: 'Medium (shared responsibility)'
  }
];

const ArchitectureDecisionSection = () => {
  const [selectedArchitecture, setSelectedArchitecture] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);

  const DataFlowDiagram = ({ architecture, isActive }) => {
    const segments = architecture.dataFlow[0].split(' → ');
    
    return (
      <div className="flex items-center justify-center space-x-4 p-6">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <motion.div
              className={`px-4 py-2 rounded-lg border-2 ${
                isActive 
                  ? 'bg-white border-blue-300 text-blue-800 shadow-lg' 
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <span className="text-sm font-medium">{segment}</span>
            </motion.div>
            {index < segments.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                <ArrowRight className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-indigo-600/10 rounded-full px-6 py-2 mb-6">
            <h3 className="text-sm font-medium text-indigo-700 tracking-wider">ARCHITECTURE DECISION FRAMEWORK</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
            Choose Your Security Architecture
          </h2>
          <p className="text-xl text-sapp-gray max-w-3xl mx-auto mb-8">
            Compare cloud, on-premise, and hybrid solutions to find the perfect fit for your security requirements
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setComparisonMode(false)}
              variant={!comparisonMode ? "default" : "outline"}
              className="px-6 py-2"
            >
              Explore Options
            </Button>
            <Button 
              onClick={() => setComparisonMode(true)}
              variant={comparisonMode ? "default" : "outline"}
              className="px-6 py-2"
            >
              Compare All
            </Button>
          </div>
        </motion.div>

        {!comparisonMode ? (
          // Individual Architecture Explorer
          <div className="max-w-6xl mx-auto">
            {/* Architecture Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {architectures.map((arch, index) => {
                const Icon = arch.icon;
                const isSelected = selectedArchitecture === index;
                
                return (
                  <motion.button
                    key={arch.id}
                    onClick={() => setSelectedArchitecture(index)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'border-blue-300 bg-blue-50 shadow-lg scale-105' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${arch.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isSelected ? 'text-blue-800' : 'text-sapp-dark'
                    }`}>
                      {arch.title}
                    </h3>
                    <p className="text-sm text-gray-600">{arch.description}</p>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected Architecture Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArchitecture}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 shadow-xl border border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Architecture Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-full bg-gradient-to-r ${architectures[selectedArchitecture].color}`}>
                          {React.createElement(architectures[selectedArchitecture].icon, { className: "h-8 w-8 text-white" })}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-sapp-dark">{architectures[selectedArchitecture].title}</h3>
                          <p className="text-gray-600">Security Architecture</p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-sapp-gray mb-8 leading-relaxed">
                        {architectures[selectedArchitecture].description}
                      </p>

                      {/* Data Flow Diagram */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-sapp-dark mb-4">Data Flow</h4>
                        <DataFlowDiagram architecture={architectures[selectedArchitecture]} isActive={true} />
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-gray-900">Cost</div>
                          <div className="text-xs text-gray-600">{architectures[selectedArchitecture].cost}</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-gray-900">Complexity</div>
                          <div className="text-xs text-gray-600">{architectures[selectedArchitecture].complexity}</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-gray-900">Maintenance</div>
                          <div className="text-xs text-gray-600">{architectures[selectedArchitecture].maintenance}</div>
                        </div>
                      </div>
                    </div>

                    {/* Pros, Cons, and Use Cases */}
                    <div className="space-y-8">
                      {/* Pros */}
                      <div>
                        <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                          <Check className="h-5 w-5 mr-2" />
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {architectures[selectedArchitecture].pros.map((pro, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="text-green-500 mr-2 mt-1">•</span>
                              {pro}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div>
                        <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                          <X className="h-5 w-5 mr-2" />
                          Considerations
                        </h4>
                        <ul className="space-y-2">
                          {architectures[selectedArchitecture].cons.map((con, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="text-red-500 mr-2 mt-1">•</span>
                              {con}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Ideal For
                        </h4>
                        <ul className="space-y-2">
                          {architectures[selectedArchitecture].useCases.map((useCase, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.6 }}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              {useCase}
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
        ) : (
          // Comparison Table View
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                      {architectures.map((arch) => (
                        <th key={arch.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${arch.color} flex items-center justify-center mb-2`}>
                              {React.createElement(arch.icon, { className: "h-6 w-6 text-white" })}
                            </div>
                            {arch.title}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Cost Row */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Cost Structure</td>
                      {architectures.map((arch) => (
                        <td key={arch.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {arch.cost}
                        </td>
                      ))}
                    </tr>
                    {/* Complexity Row */}
                    <tr className="bg-gray-25">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Setup Complexity</td>
                      {architectures.map((arch) => (
                        <td key={arch.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {arch.complexity}
                        </td>
                      ))}
                    </tr>
                    {/* Maintenance Row */}
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Maintenance</td>
                      {architectures.map((arch) => (
                        <td key={arch.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {arch.maintenance}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Decision Helper */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-sapp-blue to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-blue-100 mb-6">
              Our security experts can help you evaluate your specific requirements and recommend the ideal architecture for your environment.
            </p>
            <Button 
              className="bg-white text-sapp-blue hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Expert Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureDecisionSection;
