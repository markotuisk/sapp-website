
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio, Volume2, Eye, Monitor, Smartphone, Settings, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const PrivacySolutionsShowcase = () => {
  const [activeDemo, setActiveDemo] = useState('privacy-films');
  const [filmOpacity, setFilmOpacity] = useState([50]);
  const [acousticMasking, setAcousticMasking] = useState(false);
  const [rfDetection, setRfDetection] = useState(true);

  const solutions = [
    {
      id: 'privacy-films',
      title: 'Privacy Films & Smart Glass',
      icon: Monitor,
      description: 'Instant visual protection for screens and windows',
      interactive: true
    },
    {
      id: 'acoustic-masking',
      title: 'Acoustic Masking Systems',
      icon: Volume2,
      description: 'Sound masking to prevent eavesdropping',
      interactive: true
    },
    {
      id: 'rf-detection',
      title: 'RF Detection & Monitoring',
      icon: Radio,
      description: 'Real-time surveillance device detection',
      interactive: true
    },
    {
      id: 'presence-detection',
      title: 'Presence Detection',
      icon: Eye,
      description: 'Detect hidden observers and intrusions',
      interactive: false
    }
  ];

  const corporateVsPersonal = {
    corporate: {
      title: 'Corporate-Grade Solutions',
      solutions: [
        {
          name: 'Integrated Room Privacy Systems',
          description: 'Ceiling, wall, and window transducers for complete room protection',
          price: '£££–££££',
          features: ['Network integration', 'Enterprise dashboards', 'Automatic activation', 'Multi-room control']
        },
        {
          name: 'Network-Integrated Device Detection',
          description: 'Continuous monitoring for unauthorized devices',
          price: '£££–££££',
          features: ['24/7 monitoring', 'Alert systems', 'Device fingerprinting', 'Threat intelligence']
        },
        {
          name: 'Smart Glass Technology',
          description: 'Instant opacity control for glass partitions and windows',
          price: '££–£££',
          features: ['App control', 'Scheduled privacy', 'Emergency modes', 'Energy efficient']
        }
      ]
    },
    personal: {
      title: 'Personal Privacy Solutions',
      solutions: [
        {
          name: 'Portable Ultrasonic Jammers',
          description: 'Personal devices for vehicles and home offices',
          price: '£–££',
          features: ['Battery powered', 'Pocket-sized', 'Instant activation', 'Multiple frequencies']
        },
        {
          name: 'Desktop Privacy Systems',
          description: 'Compact speech masking for home offices',
          price: '£–££',
          features: ['USB powered', 'App control', 'Adjustable zones', 'Silent operation']
        },
        {
          name: 'Mobile Detection Tools',
          description: 'Portable RF and camera detection devices',
          price: '£–££',
          features: ['Travel-friendly', 'Multiple detection modes', 'Visual/audio alerts', 'Easy operation']
        }
      ]
    }
  };

  const renderPrivacyFilmDemo = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <h4 className="text-lg font-bold text-sapp-dark mb-4">Privacy Film Opacity Control</h4>
      
      <div className="relative mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-48 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          <div className="text-center">
            <Monitor className="h-12 w-12 mx-auto mb-2" />
            <div>Sensitive Information</div>
            <div className="text-sm opacity-75">Executive Dashboard</div>
          </div>
        </div>
        
        <motion.div
          className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center"
          animate={{ opacity: filmOpacity[0] / 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">Privacy Protected</div>
          </div>
        </motion.div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-sapp-dark">Privacy Level</label>
          <span className="text-sm text-sapp-gray">{filmOpacity[0]}% opacity</span>
        </div>
        <Slider
          value={filmOpacity}
          onValueChange={setFilmOpacity}
          max={100}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-sapp-gray">
          Adjust privacy film opacity in real-time. Perfect for meeting rooms and executive offices.
        </p>
      </div>
    </div>
  );

  const renderAcousticMaskingDemo = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <h4 className="text-lg font-bold text-sapp-dark mb-4">Acoustic Masking Control</h4>
      
      <div className="relative mb-6">
        <div className="bg-gradient-to-br from-green-500 to-blue-500 h-48 rounded-lg flex items-center justify-center text-white">
          <motion.div
            className="text-center"
            animate={{ scale: acousticMasking ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: acousticMasking ? Infinity : 0 }}
          >
            <Volume2 className="h-12 w-12 mx-auto mb-2" />
            <div className="font-bold">Confidential Meeting</div>
            <div className="text-sm opacity-75">
              {acousticMasking ? 'Protected by Sound Masking' : 'Vulnerable to Eavesdropping'}
            </div>
          </motion.div>
        </div>
        
        {acousticMasking && (
          <motion.div
            className="absolute inset-0 border-4 border-green-400 rounded-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-sapp-dark">Sound Masking</label>
          <Switch
            checked={acousticMasking}
            onCheckedChange={setAcousticMasking}
          />
        </div>
        <div className={`text-sm p-3 rounded-lg ${acousticMasking ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {acousticMasking 
            ? '✓ Speech privacy enabled - conversations are unintelligible outside the room'
            : '⚠ Conversations can be easily overheard or recorded'
          }
        </div>
      </div>
    </div>
  );

  const renderRFDetectionDemo = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <h4 className="text-lg font-bold text-sapp-dark mb-4">RF Detection Monitor</h4>
      
      <div className="space-y-4 mb-6">
        {[
          { frequency: '2.4 GHz', device: 'Hidden Camera', status: 'detected', strength: 85 },
          { frequency: '900 MHz', device: 'Audio Bug', status: 'detected', strength: 92 },
          { frequency: '5.8 GHz', device: 'WiFi Camera', status: 'monitoring', strength: 45 },
          { frequency: '433 MHz', device: 'Unknown Device', status: 'investigating', strength: 67 }
        ].map((signal, index) => (
          <motion.div
            key={index}
            className={`p-3 rounded-lg border ${
              signal.status === 'detected' ? 'border-red-200 bg-red-50' :
              signal.status === 'monitoring' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-sapp-dark">{signal.frequency}</div>
                <div className="text-xs text-sapp-gray">{signal.device}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-sapp-gray">{signal.strength}%</div>
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    signal.status === 'detected' ? 'bg-red-500' :
                    signal.status === 'monitoring' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-sapp-dark">Detection Active</label>
        <Switch
          checked={rfDetection}
          onCheckedChange={setRfDetection}
        />
      </div>
    </div>
  );

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'privacy-films':
        return renderPrivacyFilmDemo();
      case 'acoustic-masking':
        return renderAcousticMaskingDemo();
      case 'rf-detection':
        return renderRFDetectionDemo();
      default:
        return <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">Demo not available</div>;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-blue-500/10 rounded-full px-6 py-2 mb-6 border border-blue-500/20">
              <h3 className="text-sm font-medium text-blue-600 tracking-wider">INTERACTIVE SOLUTIONS</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
              Privacy Solutions Showcase
            </h2>
            <p className="text-xl text-sapp-gray max-w-3xl mx-auto">
              Experience our counter-surveillance technologies through interactive demonstrations. 
              See how each solution protects your privacy in real-world scenarios.
            </p>
          </motion.div>

          {/* Interactive Demo Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-sapp-dark mb-6">Try Our Solutions</h3>
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeDemo === solution.id 
                      ? 'bg-gradient-to-r from-sapp-blue to-blue-600 text-white shadow-xl' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveDemo(solution.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <solution.icon className={`h-8 w-8 ${activeDemo === solution.id ? 'text-white' : 'text-sapp-blue'}`} />
                      <div>
                        <h3 className={`text-lg font-semibold ${activeDemo === solution.id ? 'text-white' : 'text-sapp-dark'}`}>
                          {solution.title}
                        </h3>
                        <p className={`text-sm ${activeDemo === solution.id ? 'text-white/90' : 'text-sapp-gray'}`}>
                          {solution.description}
                        </p>
                      </div>
                    </div>
                    {solution.interactive && (
                      <Play className={`h-5 w-5 ${activeDemo === solution.id ? 'text-white' : 'text-sapp-blue'}`} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderActiveDemo()}
            </motion.div>
          </div>

          {/* Corporate vs Personal Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {Object.entries(corporateVsPersonal).map(([type, category]) => (
              <motion.div
                key={type}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: type === 'corporate' ? 0 : 0.2 }}
              >
                <div className={`text-center p-6 rounded-xl ${type === 'corporate' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-green-500 to-teal-500'} text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90">
                    {type === 'corporate' 
                      ? 'High-risk environments requiring absolute privacy'
                      : 'Affordable and practical privacy tools for personal use'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  {category.solutions.map((solution, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-sapp-dark">{solution.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          solution.price.includes('££££') ? 'bg-red-100 text-red-600' :
                          solution.price.includes('£££') ? 'bg-orange-100 text-orange-600' :
                          solution.price.includes('££') ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {solution.price}
                        </span>
                      </div>
                      <p className="text-sapp-gray mb-4">{solution.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-sapp-gray">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solution Builder CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-sapp-dark to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Build Your Privacy Shield</h3>
              <p className="text-xl text-gray-300 mb-6">
                Not sure which solutions you need? Our interactive configurator will recommend 
                the perfect combination of technologies for your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-sapp-dark hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  Start Solution Builder
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-sapp-dark font-semibold px-8 py-3"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySolutionsShowcase;
