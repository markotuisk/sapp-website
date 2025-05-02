
import React from 'react';
import { Shield, Building, Radar, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesList: React.FC = () => {
  const services = [
    "Site perimeter assessment",
    "Access control evaluation",
    "Security technology audits",
    "Personnel security procedures",
    "CCTV & surveillance reviews",
    "Alarm system testing",
    "Security lighting assessment",
    "Penetration testing",
    "Key management systems",
    "Visitor management procedures",
    "Emergency response planning",
    "Security staff training reviews"
  ];

  // Split services into two columns
  const halfwayPoint = Math.ceil(services.length / 2);
  const firstColumn = services.slice(0, halfwayPoint);
  const secondColumn = services.slice(halfwayPoint);

  return (
    <div className="w-full md:w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
        <div>
          <ul className="space-y-3">
            {firstColumn.map((service, index) => (
              <motion.li 
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-sapp-blue/10 rounded-full p-1">
                  <Shield className="h-4 w-4 text-sapp-blue" />
                </div>
                <span className="text-sapp-dark">{service}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            {secondColumn.map((service, index) => (
              <motion.li 
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + halfwayPoint) * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-sapp-blue/10 rounded-full p-1">
                  <Shield className="h-4 w-4 text-sapp-blue" />
                </div>
                <span className="text-sapp-dark">{service}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
