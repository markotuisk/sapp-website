
import React from 'react';
import { Building, Shield, Radar, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceIllustration: React.FC = () => {
  return (
    <div className="hidden md:block">
      <motion.div 
        className="relative h-40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {[Building, Shield, Radar, Key].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: `${index * 25}%`, top: `${index * 20}%` }}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className={`bg-gradient-to-br from-white to-blue-50 p-4 rounded-lg shadow-lg border border-gray-100`}>
              <Icon className="h-8 w-8 text-sapp-blue" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServiceIllustration;
