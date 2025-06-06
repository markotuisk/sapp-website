import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const CCTVCTASection = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [serviceName, setServiceName] = useState('');

  const handleScheduleConsultation = () => {
    setContactMessage('I would like to schedule a free consultation for CCTV and access control systems. Please contact me to arrange a site survey and security assessment.');
    setServiceName('CCTV Consultation');
    setIsContactDialogOpen(true);
    console.log('Schedule consultation clicked');
  };

  const handleRequestQuote = () => {
    setContactMessage('I would like to request a detailed quote for CCTV and access control systems. Please provide pricing for both Verkada and Ubiquiti solutions.');
    setServiceName('CCTV Quote Request');
    setIsContactDialogOpen(true);
    console.log('Request quote clicked');
  };

  const handleCallExpert = () => {
    // For now, open contact form with phone call request
    setContactMessage('I would like to speak directly with a security specialist about CCTV and access control systems. Please call me at your earliest convenience.');
    setServiceName('Expert Consultation Call');
    setIsContactDialogOpen(true);
    console.log('Call expert clicked');
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-sapp-dark via-slate-800 to-sapp-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <h3 className="text-sm font-medium text-white/90 tracking-wider">NEXT STEPS</h3>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Secure Your Environment?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Our certified security experts are ready to design and deploy the perfect CCTV and access control solution for your specific requirements.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Consultation Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-8 h-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Free Consultation</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      Schedule a comprehensive security assessment with our certified engineers. We'll evaluate your requirements and recommend the optimal solution.
                    </p>
                    <ul className="text-sm text-white/70 space-y-2 mb-8">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Site survey and risk assessment
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Technology recommendation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Detailed proposal and timeline
                      </li>
                    </ul>
                    <Button 
                      onClick={handleScheduleConsultation}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3"
                    >
                      Book Free Consultation
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8 h-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Instant Quote</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      Get a detailed quote based on your specific requirements. Our system generates accurate pricing for both Verkada and Ubiquiti solutions.
                    </p>
                    <ul className="text-sm text-white/70 space-y-2 mb-8">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Itemised hardware pricing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Installation and configuration costs
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Ongoing service options
                      </li>
                    </ul>
                    <Button 
                      onClick={handleRequestQuote}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3"
                    >
                      Request Detailed Quote
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-8 h-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Expert Support</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      Speak directly with our security specialists. Get immediate answers to your questions and guidance on the best approach for your project.
                    </p>
                    <ul className="text-sm text-white/70 space-y-2 mb-8">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Immediate technical support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Platform comparison guidance
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Implementation planning
                      </li>
                    </ul>
                    <Button 
                      onClick={handleCallExpert}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3"
                    >
                      Call Security Expert
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: Shield, label: 'Certified Installers', value: 'Verkada & Ubiquiti' },
                  { icon: CheckCircle, label: 'Successful Projects', value: '500+' },
                  { icon: Phone, label: 'Support Response', value: '<4 Hours' },
                  { icon: Calendar, label: 'Warranty Coverage', value: 'Up to 10 Years' }
                ].map(({ icon: Icon, label, value }, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{value}</div>
                    <div className="text-sm text-white/70">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-sapp-blue to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Ready to Make Your Decision?</h3>
                <p className="text-blue-100 mb-6">
                  As certified installers for both platforms, we can help you choose and deploy the perfect solution for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="bg-white text-sapp-blue hover:bg-gray-100 font-semibold px-8 py-3 transition-all duration-300"
                  >
                    Schedule Consultation
                  </Button>
                  <Button 
                    onClick={handleRequestQuote}
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sapp-blue font-semibold px-8 py-3 transition-all duration-300"
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactFormDialog 
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        defaultMessage={contactMessage}
        serviceName={serviceName}
      />
    </>
  );
};

export default CCTVCTASection;
