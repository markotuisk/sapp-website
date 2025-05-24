
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wifi, Radio, Lock, Eye, Zap } from 'lucide-react';

const FloatingSecurityElements: React.FC = () => {
  const securityIcons = [
    { Icon: Shield, delay: 0, x: '10%', y: '20%' },
    { Icon: Wifi, delay: 0.5, x: '80%', y: '15%' },
    { Icon: Radio, delay: 1, x: '15%', y: '70%' },
    { Icon: Lock, delay: 1.5, x: '85%', y: '65%' },
    { Icon: Eye, delay: 2, x: '50%', y: '80%' },
    { Icon: Zap, delay: 2.5, x: '60%', y: '25%' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {securityIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-sapp-blue/20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.1, 0.3],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0, -10, 0]
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSecurityElements;
