import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, BarChart3, Users, Award } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { Project } from '../../types/portfolio';

interface FeaturedProjectsProps {
  data: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = data.filter(project => project.featured);

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'users':
      case 'consultations':
        return Users;
      case 'rating':
      case 'satisfaction':
        return Award;
      default:
        return BarChart3;
    }
  };

  return (
    <section id="featured-projects" className="py-20 bg-gray-50">
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
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flagship projects showcasing advanced Flutter development, cloud architecture, and scalable solutions
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Project Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Card className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover"
                      loading="lazy"
                    />
                  </Card>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Featured
                  </div>
                </div>

                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                        {project.role}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Object.entries(project.metrics).map(([key, value]) => {
                        const IconComponent = getMetricIcon(key);
                        return (
                          <div key={key} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <IconComponent className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900">{value}</div>
                            <div className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 6).map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        +{project.tech.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {project.links.demo && (
                      <Button
                        variant="primary"
                        leftIcon={<ExternalLink className="w-4 h-4" />}
                        onClick={() => window.open(project.links.demo, '_blank')}
                      >
                        Live Demo
                      </Button>
                    )}
                    {project.links.github && (
                      <Button
                        variant="outline"
                        leftIcon={<Github className="w-4 h-4" />}
                        onClick={() => window.open(project.links.github, '_blank')}
                      >
                        View Code
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedProject(project)}
                    >
                      Case Study
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Case Study Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={`${selectedProject?.title} - Case Study`}
        size="xl"
      >
        {selectedProject && (
          <div className="space-y-8">
            {/* Hero Image */}
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* Project Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Project Overview</h3>
                <p className="text-gray-700">{selectedProject.details}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">My Role:</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedProject.role}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Key Achievements</h3>
                {selectedProject.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedProject.tech.map(tech => (
                  <div key={tech} className="p-3 bg-gray-50 rounded-lg text-center">
                    <span className="text-sm font-medium text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              {selectedProject.links.demo && (
                <Button
                  variant="primary"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => window.open(selectedProject.links.demo, '_blank')}
                >
                  View Live Demo
                </Button>
              )}
              {selectedProject.links.github && (
                <Button
                  variant="outline"
                  leftIcon={<Github className="w-4 h-4" />}
                  onClick={() => window.open(selectedProject.links.github, '_blank')}
                >
                  View Source Code
                </Button>
              )}
              {selectedProject.links.case_study && (
                <Button
                  variant="ghost"
                  onClick={() => window.open(selectedProject.links.case_study, '_blank')}
                >
                  Full Case Study
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default FeaturedProjects;