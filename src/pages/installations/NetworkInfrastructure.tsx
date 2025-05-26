
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Network, Wifi, Shield, Users, CheckCircle, AlertTriangle, Building, Home, Calendar, Server, Database, Router, Cable, Zap, Clock, Target, Award, Monitor, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugToggle } from '@/components/debug';
import { useToast } from '@/hooks/use-toast';

const NetworkInfrastructure = () => {
  const { isDebugMode } = useDebugContext();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('small');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsultation = () => {
    toast({
      title: "Consultation Request Submitted",
      description: "Our network specialists will contact you within 24 hours to discuss your infrastructure needs.",
    });
  };

  const handleAssessment = () => {
    toast({
      title: "Network Assessment Scheduled",
      description: "We'll conduct a comprehensive evaluation of your current network setup and integration requirements.",
    });
  };

  const networkSizes = [
    {
      id: 'small',
      title: 'Small Office Networks',
      description: '5-25 devices',
      icon: Building,
      features: ['Up to 25 connected devices', 'Secure WiFi setup', 'Basic firewall protection', 'System integration support'],
      ideal: 'Perfect for startups and small businesses'
    },
    {
      id: 'home',
      title: 'Smart Home Networks',
      description: '10-50 devices',
      icon: Home,
      features: ['IoT device management', 'Family-safe networks', 'Guest network isolation', 'Smart device integration'],
      ideal: 'Ideal for modern connected homes'
    },
    {
      id: 'event',
      title: 'Event Networks',
      description: 'Temporary setups',
      icon: Calendar,
      features: ['Rapid deployment', 'Secure guest access', 'High-capacity handling', 'Post-event teardown'],
      ideal: 'Essential for conferences and events'
    }
  ];

  const integrationServices = [
    {
      icon: Shield,
      title: 'Security System Integration',
      description: 'Connect CCTV, access control, and monitoring systems through secure network infrastructure.',
      services: ['CCTV network integration', 'Access control connectivity', 'Alarm system networking', 'Security monitoring hubs']
    },
    {
      icon: Server,
      title: 'Office System Integration',
      description: 'Seamlessly connect all office systems including VoIP, printers, and cloud services.',
      services: ['VoIP phone systems', 'Printer networking', 'Cloud service integration', 'File sharing systems']
    },
    {
      icon: Wifi,
      title: 'IoT & Smart Systems',
      description: 'Secure integration of smart devices and IoT systems with proper network segmentation.',
      services: ['Smart device management', 'IoT security protocols', 'Network segmentation', 'Device monitoring']
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Network Infrastructure Specialists | Small Networks & System Integration | SAPP Security</title>
        <meta name="description" content="Specialists in small network installations and system integrations. Where larger companies say no, we say yes. Expert network design for offices, homes, and events." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-sapp-dark overflow-hidden relative">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 opacity-10">
              <Network className="h-32 w-32 text-blue-400" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-10">
              <Router className="h-24 w-24 text-cyan-400" />
            </div>
            <div className="absolute top-40 right-20 opacity-10">
              <Cable className="h-20 w-20 text-green-400" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-block bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-blue-500/30">
                    <h3 className="text-sm font-medium text-blue-300 tracking-wider">SMALL NETWORK SPECIALISTS</h3>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Where Others Say{' '}
                    <span className="text-red-400">"Too Small"</span>
                    <br />
                    We Say{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      "Perfect Fit"
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Specialising in small network installations and system integrations that larger companies overlook. 
                    We build the connected foundations that make all your other security systems work together seamlessly.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-amber-400" />
                      <span className="text-lg font-semibold text-amber-400">Our Sweet Spot</span>
                    </div>
                    <ul className="text-white/80 space-y-2 text-sm">
                      <li>• Small office networks (5-50 devices)</li>
                      <li>• System integration projects</li>
                      <li>• Custom network solutions</li>
                      <li>• Ongoing support relationships</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg"
                      onClick={handleConsultation}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4"
                    >
                      Get Your Network Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={handleAssessment}
                      className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4"
                    >
                      Network Assessment
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
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Our Approach?</h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: CheckCircle, title: 'Personal Attention', desc: 'Every project gets dedicated focus' },
                        { icon: Award, title: 'Integration Experts', desc: 'Systems work together perfectly' },
                        { icon: Clock, title: 'Rapid Response', desc: '24-48 hour consultation turnaround' },
                        { icon: Users, title: 'Ongoing Support', desc: 'Long-term partnership approach' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <item.icon className="h-6 w-6 text-blue-400" />
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

        {/* Problem/Solution Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  The Small Network Challenge
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Large network installation companies often decline smaller projects. 
                  We've built our entire business around being the perfect solution for these "overlooked" opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                      <h3 className="text-lg font-semibold text-red-700">What Others Say</h3>
                    </div>
                    <ul className="space-y-2 text-red-600">
                      <li>• "Project too small for our minimum"</li>
                      <li>• "We only do enterprise installations"</li>
                      <li>• "Not worth our time for 20 devices"</li>
                      <li>• "Call us when you're bigger"</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <h3 className="text-lg font-semibold text-green-700">What We Say</h3>
                    </div>
                    <ul className="space-y-2 text-green-600">
                      <li>• "Perfect size for our expertise"</li>
                      <li>• "We specialise in small installations"</li>
                      <li>• "Every device matters to us"</li>
                      <li>• "Let's start building your network today"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Size Selector */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Find Your Perfect Network Solution
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Select your network type to see how we can help you build the perfect infrastructure.
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
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
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
                        <p className="text-sapp-gray mb-4">{size.description}</p>
                        <div className="text-sm text-blue-600 font-medium">{size.ideal}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Network Details */}
              <motion.div
                key={selectedSize}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200"
              >
                {networkSizes
                  .filter(size => size.id === selectedSize)
                  .map(size => (
                    <div key={size.id}>
                      <h3 className="text-2xl font-bold text-sapp-dark mb-6">
                        {size.title} Features & Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-sapp-dark mb-3">Included Features:</h4>
                          <ul className="space-y-2">
                            {size.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sapp-gray">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Button 
                            onClick={handleConsultation}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
                          >
                            Get Quote for {size.title}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration Excellence Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-6 py-2 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">INTEGRATION EXCELLENCE</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Making Your Systems Work Together
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Our network infrastructure isn't just about connectivity—it's the foundation that enables 
                  seamless integration between all your security and business systems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {integrationServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl text-sapp-dark">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sapp-gray mb-4">{service.description}</p>
                        <div className="space-y-2">
                          {service.services.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-sapp-gray">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Integration Hub */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  The Hub That Connects Everything
                </h2>
                <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
                  Your network infrastructure is the foundation that enables all our other services to work together seamlessly.
                </p>
              </div>

              <div className="relative">
                {/* Central Hub */}
                <div className="flex justify-center mb-12">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-32 h-32 flex items-center justify-center">
                    <Network className="h-16 w-16 text-white" />
                  </div>
                </div>

                {/* Connected Services */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { name: 'CCTV Systems', icon: Monitor, link: '/installations/cctv-access' },
                    { name: 'Access Control', icon: Shield, link: '/installations' },
                    { name: 'Counter-Surveillance', icon: Eye, link: '/installations/counter-surveillance' },
                    { name: 'Event Security', icon: Calendar, link: '/event-security' }
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
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                          <service.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-sapp-dark">{service.name}</h3>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Connection Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="#e2e8f0" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
                  </svg>
                </div>
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
                  Ready to Build Your Perfect Network?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Don't let size hold you back. Get the professional network infrastructure you deserve, 
                  designed specifically for your needs and integrated with all your systems.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={handleConsultation}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4"
                  >
                    Start Your Network Project
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleAssessment}
                    className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4"
                  >
                    Free Network Assessment
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    🚀 24-48 hour consultation turnaround • 📞 Ongoing support included • 🔧 Integration guaranteed
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
