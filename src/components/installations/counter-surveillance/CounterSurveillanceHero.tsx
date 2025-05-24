
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Smartphone, Camera, Mic, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CounterSurveillanceHero = () => {
  const [isWatching, setIsWatching] = useState(true);

  const threats = [
    { icon: Camera, label: 'Hidden Cameras', x: '20%', y: '30%' },
    { icon: Mic, label: 'Audio Bugs', x: '70%', y: '25%' },
    { icon: Smartphone, label: 'Device Tracking', x: '45%', y: '60%' },
    { icon: Eye, label: 'Visual Surveillance', x: '80%', y: '70%' }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-sapp-dark overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {threats.map((threat, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: threat.x, top: threat.y }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <threat.icon className="h-8 w-8 text-red-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-300 tracking-wider">PRIVACY UNDER ATTACK</h3>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Counter-Surveillance &{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Privacy Assurance
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                In today's hyper-connected world, your conversations, strategies, and private moments are under constant threat. 
                It's time to take back control of your privacy.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80">Privacy Awareness Alert:</span>
                  <button
                    onClick={() => setIsWatching(!isWatching)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {isWatching ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="text-lg font-semibold text-amber-400">
                      Surveillance Technology is Everywhere
                    </div>
                    <p className="text-sm text-white/70 mt-1">
                      From smartphones to smart buildings, every device is a potential surveillance tool. Your privacy needs active protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4"
                >
                  Protect Your Privacy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4"
                >
                  Assessment Required
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
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Your Privacy Status</h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-4 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Shield className="h-12 w-12 text-red-400" />
                    </div>
                  </div>
                  <div className="text-red-400 font-bold text-lg">EXPOSED</div>
                  <p className="text-white/70 text-sm mt-2">
                    Multiple vulnerabilities detected in your environment
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Audio Surveillance Risk', level: 85, color: 'red' },
                    { label: 'Visual Privacy', level: 60, color: 'yellow' },
                    { label: 'Device Security', level: 40, color: 'red' },
                    { label: 'RF Protection', level: 20, color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">{item.label}</span>
                        <span className={`text-${item.color}-400 font-semibold`}>{item.level}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-${item.color}-500`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSurveillanceHero;
