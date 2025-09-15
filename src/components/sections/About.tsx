import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Users, Briefcase } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../utils/animations';
import { PersonalInfo } from '../../types/portfolio';

interface AboutProps {
  data: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900"
                variants={fadeInUp}
              >
                About Me
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600"
                variants={fadeInUp}
              />
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {data.bio}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-gray-700"
            >
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{data.location}</span>
            </motion.div>

            {/* Quick Stats Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {data.stats.yearsExperience}+
                    </div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {data.stats.projectsCompleted}+
                    </div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {data.stats.clientsSatisfied}+
                    </div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Core Expertise</h3>
                <div className="space-y-3">
                  {[
                    'Flutter & Dart Development',
                    'Clean Architecture & BLoC',
                    'Firebase & AWS Integration',
                    'DevOps & CI/CD Pipelines',
                    'Linux Server Management',
                    'Mobile App Performance'
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;