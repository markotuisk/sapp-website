
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const PrivacyIdeologySection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="h-16 w-16 text-cyan-400 mx-auto mb-8" />
            
            <blockquote className="text-3xl md:text-4xl font-light text-white leading-relaxed mb-8">
              "Privacy is not about hiding something. It's about protecting everything that makes you who you are."
            </blockquote>
            
            <div className="text-gray-400 mb-12">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-4"></div>
              <p className="text-lg">Our Philosophy on Digital Privacy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Fundamental Right</h3>
                <p className="text-gray-300">
                  Privacy is not a privilege to be earned, but a fundamental human right that must be actively protected in our connected world.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Active Defence</h3>
                <p className="text-gray-300">
                  True security requires proactive measures. We don't wait for breaches—we prevent them through continuous vigilance and advanced detection.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Trusted Partnership</h3>
                <p className="text-gray-300">
                  Your security is our mission. We build lasting relationships based on transparency, expertise, and unwavering commitment to your privacy.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyIdeologySection;
