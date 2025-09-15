import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FAQ } from '../../types/portfolio';

interface WorkTogetherProps {
  faqs: FAQ[];
}

const WorkTogether: React.FC<WorkTogetherProps> = ({ faqs }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const trustSignals = [
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: '90%+ code coverage and rigorous testing standards',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: '99% on-time project completion rate',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden costs, clear project scoping',
    },
    {
      icon: Users,
      title: 'Proven Experience',
      description: '25+ satisfied clients across various industries',
    },
  ];

  return (
    <section id="work-together" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to transform your ideas into powerful Flutter applications? 
              I bring expertise in Clean Architecture, cloud integration, and scalable mobile solutions 
              to help your project succeed.
            </p>
          </motion.div>

          {/* Value Proposition */}
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Why Choose My Flutter Development Services?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <signal.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {signal.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {signal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="shadow-xl hover:shadow-2xl"
            >
              Start Your Project Today
            </Button>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about working together
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkTogether;