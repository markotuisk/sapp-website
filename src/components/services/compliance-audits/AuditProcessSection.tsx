
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Eye, RotateCcw, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

const AuditProcessSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const auditStages = [
    {
      stage: 'Stage 1',
      title: 'Readiness Audit',
      icon: FileText,
      duration: '1-2 weeks',
      description: 'We review your ISMS documentation and processes to confirm readiness for certification, identifying any gaps in physical security controls.',
      activities: [
        'Document review and gap analysis',
        'Policy framework assessment',
        'Initial compliance evaluation',
        'Readiness report with recommendations'
      ],
      color: 'emerald'
    },
    {
      stage: 'Stage 2',
      title: 'Certification Audit',
      icon: Search,
      duration: '2-4 weeks',
      description: 'A comprehensive evaluation of your ISMS, including physical security controls, to verify compliance with ISO27001 requirements.',
      activities: [
        'On-site physical security assessment',
        'Staff interviews and competency checks',
        'Control effectiveness testing',
        'Comprehensive audit report'
      ],
      color: 'blue'
    },
    {
      stage: 'Ongoing',
      title: 'Surveillance Audits',
      icon: Eye,
      duration: 'Annual',
      description: 'Conducted annually to ensure ongoing compliance and continual improvement of your ISMS.',
      activities: [
        'Annual compliance verification',
        'Process improvement assessment',
        'Change management review',
        'Continuous monitoring support'
      ],
      color: 'purple'
    },
    {
      stage: 'Every 3 Years',
      title: 'Recertification Audit',
      icon: RotateCcw,
      duration: '2-3 weeks',
      description: 'Performed every three years to reaffirm certification, assessing all ISO27001 requirements, including physical security.',
      activities: [
        'Complete ISMS reassessment',
        'Three-year performance review',
        'Updated risk assessment',
        'Certification renewal process'
      ],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, active: boolean = false) => {
    const colorMap = {
      emerald: active ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600',
      blue: active ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-600',
      purple: active ? 'bg-purple-500 text-white' : 'bg-purple-500/10 text-purple-600',
      orange: active ? 'bg-orange-500 text-white' : 'bg-orange-500/10 text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up" className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">AUDIT METHODOLOGY</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Our Structured Audit Process
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto text-lg">
            We follow the internationally recognized ISO 27001 audit methodology, 
            ensuring thorough and effective assessments at every stage.
          </p>
        </Animated>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-8">
            {auditStages.map((stage, index) => {
              const StageIcon = stage.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveStage(index)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeStage === index
                      ? 'bg-sapp-blue text-white shadow-lg'
                      : 'bg-slate-100 text-sapp-gray hover:bg-slate-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StageIcon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{stage.stage}</div>
                    <div className="text-xs opacity-80">{stage.title}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`rounded-full p-3 ${getColorClasses(auditStages[activeStage].color, true)}`}>
                    {React.createElement(auditStages[activeStage].icon, { className: "h-6 w-6" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-sapp-dark">{auditStages[activeStage].title}</h3>
                    <div className="flex items-center gap-4 text-sm text-sapp-gray">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{auditStages[activeStage].duration}</span>
                      </div>
                      <span className="bg-sapp-blue/10 text-sapp-blue px-2 py-1 rounded">
                        {auditStages[activeStage].stage}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sapp-gray mb-6">{auditStages[activeStage].description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sapp-dark mb-4">Key Activities:</h4>
                <div className="space-y-3">
                  {auditStages[activeStage].activities.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sapp-gray">{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Animated animation="fade-up" delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="bg-emerald-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-emerald-500" />
              </div>
              <h4 className="font-semibold text-sapp-dark mb-2">Structured Approach</h4>
              <p className="text-sm text-sapp-gray">
                Follow international best practices for consistent, reliable audit outcomes
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="bg-sapp-blue/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-sapp-blue" />
              </div>
              <h4 className="font-semibold text-sapp-dark mb-2">Ongoing Support</h4>
              <p className="text-sm text-sapp-gray">
                Continuous compliance monitoring and improvement recommendations
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="bg-purple-500/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="font-semibold text-sapp-dark mb-2">Certification Ready</h4>
              <p className="text-sm text-sapp-gray">
                Prepare your organisation for successful ISO 27001 certification
              </p>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default AuditProcessSection;
