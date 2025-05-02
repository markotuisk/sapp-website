
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-1">
        <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-lg h-full flex flex-col">
          <div className="bg-sapp-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-sapp-dark text-lg mb-2">{title}</h3>
          <p className="text-sapp-gray text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
