import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';
import { fadeInUp, timelineItem } from '../../utils/animations';
import { TimelineItem as TimelineItemType } from '../../types/portfolio';

interface TimelineProps {
  data: TimelineItemType[];
}

const TimelineItem: React.FC<{ item: TimelineItemType; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />
      
      {/* Timeline Node */}
      <motion.div
        variants={timelineItem}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
      >
        <Briefcase className="w-6 h-6 text-white" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={timelineItem}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
        className={`w-full flex ${isEven ? 'justify-start' : 'justify-end'}`}
      >
        <div className={`w-full max-w-md ${isEven ? 'pr-8' : 'pl-8'} py-8`}>
          <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${
            !isEven ? 'text-right' : ''
          }`}>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{item.period}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {item.title}
            </h3>
            
            <p className="text-gray-600 font-medium mb-4">
              {item.company}
            </p>

            <ul className={`space-y-2 ${!isEven ? 'text-right' : ''}`}>
              {item.achievements.map((achievement, achievementIndex) => (
                <motion.li
                  key={achievementIndex}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
                  transition={{ delay: 0.3 + achievementIndex * 0.1 }}
                  className="text-sm text-gray-600 flex items-start gap-2"
                >
                  {isEven && <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />}
                  <span className="flex-1">{achievement}</span>
                  {!isEven && <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="timeline" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Timeline of Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A journey through my professional development and key achievements
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative space-y-0">
            {data.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;