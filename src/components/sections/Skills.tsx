import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download } from 'lucide-react';
import SkillBar from '../ui/SkillBar';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { SkillCategory } from '../../types/portfolio';

interface SkillsProps {
  data: SkillCategory;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categoryColors = {
    Frontend: 'from-blue-500 to-blue-600',
    Backend: 'from-green-500 to-green-600',
    Cloud: 'from-purple-500 to-purple-600',
    Databases: 'from-yellow-500 to-yellow-600',
    DevOps: 'from-red-500 to-red-600',
    Tools: 'from-indigo-500 to-indigo-600',
  };

  return (
    <section id="skills" className="py-20 bg-white">
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
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Object.entries(data).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'} flex items-center justify-center mb-4`}>
                    <span className="text-white font-bold text-lg">
                      {category[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category}
                  </h3>
                  <div className="w-12 h-0.5 bg-gray-200" />
                </div>

                <div className="space-y-4">
                  {skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Download Skills Matrix */}
          <motion.div variants={fadeInUp} className="text-center">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Download className="w-5 h-5" />}
              onClick={() => window.open('/skills-matrix.pdf', '_blank')}
            >
              Download Detailed Skills Matrix
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;