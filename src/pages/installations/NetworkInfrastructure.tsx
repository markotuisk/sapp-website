
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Network, Wifi, Shield, Users, CheckCircle, AlertTriangle, Building, Home, Calendar, Server, Database, Router, Cable, Zap, Clock, Target, Award, Monitor, Eye, Calculator, TrendingUp, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugToggle } from '@/components/debug';
import { useToast } from '@/hooks/use-toast';

const NetworkInfrastructure = () => {
  const { isDebugMode } = useDebugContext();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('medium');
  
  // ROI Calculator State
  const [deviceCount, setDeviceCount] = useState([500]);
  const [organizationType, setOrganizationType] = useState('corporate');
  const [securityLevel, setSecurityLevel] = useState('standard');
  const [currentInfrastructure, setCurrentInfrastructure] = useState('legacy');
  const [location, setLocation] = useState('uk');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsultation = () => {
    toast({
      title: "Network Consultation Requested",
      description: "Our network infrastructure specialists will contact you within 24 hours to discuss your requirements.",
    });
  };

  const handleAssessment = () => {
    toast({
      title: "Infrastructure Assessment Scheduled",
      description: "We'll conduct a comprehensive evaluation of your current network and integration needs.",
    });
  };

  // ROI Calculator Logic - Based on Industry Research
  const calculateROI = () => {
    const devices = deviceCount[0];
    
    // Hardware costs (per device) - Based on enterprise networking costs
    const hardwareCostPerDevice = securityLevel === 'enterprise' ? 250 : 
                                  securityLevel === 'standard' ? 180 : 120;
    
    // Installation costs (per device) - Industry standard labor rates
    const installationCostPerDevice = location === 'london' ? 85 : 65;
    
    // Annual maintenance (per device) - 15-20% of hardware cost
    const maintenanceCostPerDevice = hardwareCostPerDevice * 0.18;
    
    // Calculate total implementation cost
    const totalHardwareCost = devices * hardwareCostPerDevice;
    const totalInstallationCost = devices * installationCostPerDevice;
    const totalImplementationCost = totalHardwareCost + totalInstallationCost;
    
    // Annual savings calculations - Based on Gartner/IDC research
    
    // 1. Downtime prevention - $5,600/minute average for SME
    const currentDowntimeHours = currentInfrastructure === 'legacy' ? 48 : 
                                currentInfrastructure === 'basic' ? 24 : 12;
    const newDowntimeHours = securityLevel === 'enterprise' ? 2 : 
                            securityLevel === 'standard' ? 4 : 8;
    const downtimeReduction = currentDowntimeHours - newDowntimeHours;
    const annualDowntimeSavings = downtimeReduction * 60 * 5600; // $5,600/minute
    
    // 2. Productivity improvements - 15-25% efficiency gain
    const avgSalaryPerEmployee = 45000;
    const estimatedEmployees = Math.min(devices * 0.8, devices); // Conservative estimate
    const productivityGain = securityLevel === 'enterprise' ? 0.25 : 
                            securityLevel === 'standard' ? 0.18 : 0.12;
    const annualProductivitySavings = estimatedEmployees * avgSalaryPerEmployee * productivityGain;
    
    // 3. Security breach prevention - Ponemon Institute data
    const breachRiskReduction = securityLevel === 'enterprise' ? 0.85 : 
                               securityLevel === 'standard' ? 0.70 : 0.55;
    const avgBreachCost = organizationType === 'finance' ? 6200000 : 
                         organizationType === 'healthcare' ? 5400000 : 
                         organizationType === 'technology' ? 4800000 : 4200000;
    const annualBreachPreventionValue = (avgBreachCost * 0.035) * breachRiskReduction; // 3.5% annual risk
    
    // 4. IT support cost reduction - 30-50% reduction
    const currentITCostPerDevice = 120;
    const supportCostReduction = securityLevel === 'enterprise' ? 0.50 : 
                                securityLevel === 'standard' ? 0.35 : 0.25;
    const annualSupportSavings = devices * currentITCostPerDevice * supportCostReduction;
    
    // 5. Energy efficiency - 25-40% reduction in power consumption
    const energySavingPerDevice = securityLevel === 'enterprise' ? 45 : 
                                 securityLevel === 'standard' ? 35 : 25;
    const annualEnergySavings = devices * energySavingPerDevice;
    
    // Total annual savings
    const totalAnnualSavings = annualDowntimeSavings + annualProductivitySavings + 
                              annualBreachPreventionValue + annualSupportSavings + annualEnergySavings;
    
    // ROI calculation
    const paybackPeriod = totalImplementationCost / totalAnnualSavings;
    const threeYearROI = ((totalAnnualSavings * 3 - totalImplementationCost) / totalImplementationCost) * 100;
    
    return {
      totalImplementationCost,
      totalAnnualSavings,
      paybackPeriod,
      threeYearROI,
      breakdown: {
        downtime: annualDowntimeSavings,
        productivity: annualProductivitySavings,
        security: annualBreachPreventionValue,
        support: annualSupportSavings,
        energy: annualEnergySavings
      }
    };
  };

  const roiData = calculateROI();

  const networkSizes = [
    {
      id: 'small',
      title: 'Small Business Networks',
      description: '100-300 devices',
      icon: Building,
      features: ['Branch offices', 'Retail locations', 'Small manufacturing', 'Professional services'],
      ideal: 'Perfect for growing businesses'
    },
    {
      id: 'medium',
      title: 'Medium Organization Networks',
      description: '300-800 devices',
      icon: Users,
      features: ['Multi-location offices', 'Schools and universities', 'Mid-size manufacturing', 'Healthcare facilities'],
      ideal: 'Ideal for established organizations'
    },
    {
      id: 'large',
      title: 'Large Organization Networks',
      description: '800-1,500 devices',
      icon: Server,
      features: ['Corporate campuses', 'Large retail chains', 'Distribution centers', 'Government facilities'],
      ideal: 'Enterprise-scale infrastructure'
    }
  ];

  const organizationTypes = {
    corporate: { name: 'Corporate/Business', riskFactor: 1.0 },
    finance: { name: 'Financial Services', riskFactor: 1.8 },
    healthcare: { name: 'Healthcare/Medical', riskFactor: 1.6 },
    technology: { name: 'Technology/Software', riskFactor: 1.4 },
    education: { name: 'Education/Academic', riskFactor: 1.2 },
    government: { name: 'Government/Public', riskFactor: 2.0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Network Infrastructure for SME & Private Residences | 100-1,500 Devices | SAPP Security</title>
        <meta name="description" content="Professional network infrastructure solutions for small and medium-sized organizations and private residences. Supporting 100-1,500 devices with comprehensive ROI analysis." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      
      <main className="pt-32 pb-16">
        {/* Hero Section with Network Animation */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden relative">
          {/* Animated Network Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#3b82f6" opacity="0.6">
                    <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="10" cy="20" r="1" fill="#06b6d4" opacity="0.4" />
                  <circle cx="80" cy="30" r="1" fill="#10b981" opacity="0.4" />
                  <line x1="50" y1="50" x2="10" y2="20" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                  <line x1="50" y1="50" x2="80" y2="30" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-grid)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-block bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-cyan-500/30">
                    <h3 className="text-sm font-medium text-cyan-300 tracking-wider">NETWORK INFRASTRUCTURE SPECIALISTS</h3>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Enterprise-Grade Networks for{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      SME & Private Residences
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Professional network infrastructure solutions designed for small and medium-sized organizations 
                    and private residences. Supporting 100-1,500 devices with measurable ROI and comprehensive integration.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-cyan-400" />
                      <span className="text-lg font-semibold text-cyan-400">Our Expertise Range</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-white/80 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">100-300</div>
                        <div>Small Business</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">300-800</div>
                        <div>Medium Org</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">800-1,500</div>
                        <div>Large Enterprise</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg"
                      onClick={handleConsultation}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4"
                    >
                      Get Infrastructure Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={handleAssessment}
                      className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4"
                    >
                      Calculate Your ROI
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Professional Infrastructure Matters</h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: TrendingUp, title: '15-25% Productivity Gain', desc: 'Reliable network = efficient teams' },
                        { icon: Shield, title: '70-85% Risk Reduction', desc: 'Professional security implementation' },
                        { icon: DollarSign, title: '6-18 Month Payback', desc: 'ROI through reduced downtime' },
                        { icon: Activity, title: '99.9% Uptime Target', desc: 'Enterprise-grade reliability' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <item.icon className="h-6 w-6 text-cyan-400" />
                          <div>
                            <div className="font-semibold text-white">{item.title}</div>
                            <div className="text-sm text-white/70">{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center">
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Counter-Surveillance
              </Button>
            </Link>
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to All Installations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Interactive ROI Calculator Section */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-600/10 rounded-full px-6 py-2 mb-4">
                  <h3 className="text-sm font-medium text-blue-700 tracking-wider">ROI CALCULATOR</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Calculate Your Network Infrastructure ROI
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Professional ROI analysis based on industry research from Gartner, IDC, and Ponemon Institute. 
                  Get realistic projections for your network infrastructure investment.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Calculator Input Panel */}
                <Card className="border-2 border-blue-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calculator className="h-6 w-6 text-blue-600" />
                      Network Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Device Count Slider */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-3">
                        <Network className="inline w-4 h-4 mr-2" />
                        Number of Devices: <span className="text-blue-600 font-bold">{deviceCount[0]}</span>
                      </label>
                      <Slider
                        value={deviceCount}
                        onValueChange={setDeviceCount}
                        max={1500}
                        min={100}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-sapp-gray mt-2">
                        <span>100</span>
                        <span>500</span>
                        <span>1,000</span>
                        <span>1,500</span>
                      </div>
                    </div>

                    {/* Organization Type */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        <Building className="inline w-4 h-4 mr-2" />
                        Organization Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(organizationTypes).map(([key, type]) => (
                          <motion.label
                            key={key}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                              organizationType === key 
                                ? 'bg-blue-50 border-blue-300 text-blue-800' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="organizationType"
                              value={key}
                              checked={organizationType === key}
                              onChange={(e) => setOrganizationType(e.target.value)}
                              className="mr-2 text-blue-600"
                            />
                            <span className="font-medium">{type.name}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Security Level */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        <Shield className="inline w-4 h-4 mr-2" />
                        Security Level Required
                      </label>
                      <div className="space-y-3">
                        {[
                          { key: 'basic', name: 'Basic Security', desc: 'Standard business protection' },
                          { key: 'standard', name: 'Standard Security', desc: 'Enhanced threat protection' },
                          { key: 'enterprise', name: 'Enterprise Security', desc: 'Maximum security implementation' }
                        ].map((level) => (
                          <motion.label 
                            key={level.key} 
                            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              securityLevel === level.key 
                                ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-md' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <input
                              type="radio"
                              name="securityLevel"
                              value={level.key}
                              checked={securityLevel === level.key}
                              onChange={(e) => setSecurityLevel(e.target.value)}
                              className="mr-3 text-blue-600"
                            />
                            <div>
                              <span className="font-medium">{level.name}</span>
                              <p className="text-xs opacity-75 mt-1">{level.desc}</p>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Current Infrastructure */}
                    <div>
                      <label className="block text-sm font-medium text-sapp-dark mb-4">
                        <Server className="inline w-4 h-4 mr-2" />
                        Current Infrastructure
                      </label>
                      <select 
                        value={currentInfrastructure}
                        onChange={(e) => setCurrentInfrastructure(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="legacy">Legacy/Outdated Equipment</option>
                        <option value="basic">Basic Network Setup</option>
                        <option value="mixed">Mixed Legacy and Modern</option>
                        <option value="none">No Current Infrastructure</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Results Panel */}
                <Card className="border-2 border-green-200 shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                      ROI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="bg-white rounded-lg p-4 border border-green-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-2xl font-bold text-green-700">
                          £{roiData.totalImplementationCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">Total Investment</div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white rounded-lg p-4 border border-blue-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-2xl font-bold text-blue-700">
                          £{roiData.totalAnnualSavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">Annual Savings</div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white rounded-lg p-4 border border-purple-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-2xl font-bold text-purple-700">
                          {roiData.paybackPeriod.toFixed(1)} years
                        </div>
                        <div className="text-sm text-purple-600">Payback Period</div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white rounded-lg p-4 border border-orange-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-2xl font-bold text-orange-700">
                          {roiData.threeYearROI.toFixed(0)}%
                        </div>
                        <div className="text-sm text-orange-600">3-Year ROI</div>
                      </motion.div>
                    </div>

                    {/* Savings Breakdown */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="font-semibold text-sapp-dark mb-4">Annual Savings Breakdown</h4>
                      <div className="space-y-3">
                        {Object.entries(roiData.breakdown).map(([key, value]) => {
                          const labels = {
                            downtime: 'Downtime Prevention',
                            productivity: 'Productivity Improvements',
                            security: 'Security Breach Prevention',
                            support: 'IT Support Cost Reduction',
                            energy: 'Energy Efficiency'
                          };
                          const percentage = (value / roiData.totalAnnualSavings) * 100;
                          
                          return (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm text-sapp-gray">{labels[key as keyof typeof labels]}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <motion.div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-sapp-dark">
                                  £{value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Industry Benchmarks */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">Industry Benchmarks</h5>
                      <div className="text-xs text-blue-700 space-y-1">
                        <p>• Average network downtime cost: £5,600/minute (Gartner 2024)</p>
                        <p>• Productivity gain from reliable infrastructure: 15-25% (IDC)</p>
                        <p>• Average data breach cost: £4.2M globally (Ponemon Institute)</p>
                        <p>• IT support reduction with modern networks: 30-50%</p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleConsultation}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      Get Detailed ROI Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Network Size Categories - Updated */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Professional Networks for Every Scale
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  From growing businesses to established enterprises, we design and implement 
                  network infrastructure that scales with your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {networkSizes.map((size) => {
                  const IconComponent = size.icon;
                  const isSelected = selectedSize === size.id;
                  
                  return (
                    <motion.div
                      key={size.id}
                      className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          isSelected ? 'bg-blue-500' : 'bg-gray-200'
                        }`}>
                          <IconComponent className={`h-8 w-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <h3 className="text-xl font-bold text-sapp-dark mb-2">{size.title}</h3>
                        <p className="text-sapp-blue font-semibold mb-4">{size.description}</p>
                        <div className="text-sm text-blue-600 font-medium mb-4">{size.ideal}</div>
                        <ul className="text-sm text-sapp-gray space-y-1">
                          {size.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Integration Hub */}
        <section className="py-20 bg-gradient-to-br from-slate-100 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  The Foundation for All Your Systems
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Your network infrastructure enables seamless integration between security, 
                  business, and operational systems across your organization.
                </p>
              </div>

              <div className="relative">
                {/* Central Network Hub */}
                <div className="flex justify-center mb-12">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-32 h-32 flex items-center justify-center shadow-xl"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 20px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Network className="h-16 w-16 text-white" />
                  </motion.div>
                </div>

                {/* Connected Systems Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { name: 'CCTV & Surveillance', icon: Monitor, link: '/installations/cctv-access', color: 'blue' },
                    { name: 'Access Control', icon: Shield, link: '/installations', color: 'green' },
                    { name: 'Counter-Surveillance', icon: Eye, link: '/installations/counter-surveillance', color: 'purple' },
                    { name: 'Event Security', icon: Calendar, link: '/event-security', color: 'orange' }
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <Link to={service.link}>
                        <motion.div 
                          className={`bg-white border-2 border-${service.color}-200 rounded-lg p-6 hover:border-${service.color}-400 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <service.icon className={`h-8 w-8 text-${service.color}-600 mx-auto mb-3`} />
                          <h3 className="font-semibold text-sapp-dark text-sm">{service.name}</h3>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                  <defs>
                    <animate id="dash" attributeName="stroke-dasharray" values="0,10;5,5;10,0;5,5;0,10" dur="3s" repeatCount="indefinite" />
                  </defs>
                  {/* Connection lines from center to corners */}
                  <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#3b82f6" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                    <animateTransform attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#10b981" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
                    <animateTransform attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="3s" begin="0.5s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-sapp-dark via-sapp-navy to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Ready to Build Professional Network Infrastructure?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  From 100 to 1,500 devices, we design and implement network infrastructure 
                  that delivers measurable ROI and seamless system integration.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: Target, label: 'ROI-Focused Design', desc: '6-18 month payback period' },
                    { icon: Award, label: 'Professional Implementation', desc: 'Enterprise-grade standards' },
                    { icon: Users, label: 'Ongoing Partnership', desc: '24/7 support and monitoring' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <div className="font-semibold text-white text-sm">{item.label}</div>
                      <div className="text-xs text-white/70">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={handleConsultation}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4"
                  >
                    Start Your Infrastructure Project
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleAssessment}
                    className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4"
                  >
                    Get Detailed ROI Analysis
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    🚀 Professional consultation within 24h • 📊 Detailed ROI analysis • 🔧 Complete system integration
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="container mx-auto px-4 mt-12">
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Counter-Surveillance
              </Button>
            </Link>
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to All Installations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NetworkInfrastructure;
