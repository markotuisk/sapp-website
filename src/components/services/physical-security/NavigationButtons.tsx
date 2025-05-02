
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NavigationButtons: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="border-t border-gray-100 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/security-audits" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="group w-full sm:w-auto flex items-center gap-3 border-gray-200 hover:bg-slate-50 transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4 text-sapp-blue group-hover:-translate-x-1 transition-transform duration-300" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Previous</span>
                  <span className="text-sm font-medium">Security Audits</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/services/tscm-inspections" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="group w-full sm:w-auto flex items-center gap-3 border-gray-200 hover:bg-slate-50 transition-all duration-300"
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">Next</span>
                  <span className="text-sm font-medium">TSCM Inspections</span>
                </div>
                <ChevronRight className="h-4 w-4 text-sapp-blue group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NavigationButtons;
