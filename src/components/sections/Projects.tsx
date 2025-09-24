import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { Project } from '../../types/portfolio';

interface ProjectsProps {
  data: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');

  // Sort projects
  let filteredProjects = [...data];

  if (sortBy === 'featured') {
    filteredProjects = filteredProjects.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return (
    <section id="projects" className="py-20 bg-white">
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
              Projects Portfolio
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover my latest work in Flutter development, cloud architecture, and mobile solutions
            </p>
          </motion.div>

          {/* Sort Section */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-md">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
                <p className="text-sm text-gray-600">
                  {filteredProjects.length} projects showcasing my skills
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md min-w-[160px]"
                >
                  <option value="recent">📅 Most Recent</option>
                  <option value="featured">⭐ Featured First</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card hoverable className="h-full">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {project.role}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex gap-2">
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            aria-label="View demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            aria-label="View code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="space-y-4">
              <p className="text-gray-700">{selectedProject.details}</p>
              
              {selectedProject.metrics && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <h4 className="font-semibold">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {selectedProject.links.demo && (
                  <Button
                    variant="primary"
                    leftIcon={<ExternalLink className="w-4 h-4" />}
                    onClick={() => window.open(selectedProject.links.demo, '_blank')}
                  >
                    View Demo
                  </Button>
                )}
                {selectedProject.links.github && (
                  <Button
                    variant="outline"
                    leftIcon={<Github className="w-4 h-4" />}
                    onClick={() => window.open(selectedProject.links.github, '_blank')}
                  >
                    View Code
                  </Button>
                )}
                {selectedProject.links.case_study && (
                  <Button
                    variant="ghost"
                    onClick={() => window.open(selectedProject.links.case_study, '_blank')}
                  >
                    Case Study
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;