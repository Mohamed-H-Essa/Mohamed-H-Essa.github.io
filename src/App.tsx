import React from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Skills from './components/sections/Skills';
import FeaturedProjects from './components/sections/FeaturedProjects';
import WorkTogether from './components/sections/WorkTogether';
import Contact from './components/sections/Contact';
import { ToastProvider } from './hooks/useToast';
import portfolioData from './data/portfolio.json';
import { TimelineItem } from './types/portfolio';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <Layout logoUrl={portfolioData.personal.logo}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero data={portfolioData.personal} />
          <About data={portfolioData.personal} />
          <Projects data={portfolioData.projects} />
          <Timeline data={portfolioData.timeline as TimelineItem[]} />
          <Skills data={portfolioData.skills} />
          <FeaturedProjects data={portfolioData.projects} />
          <WorkTogether faqs={portfolioData.faqs} />
          <Contact data={portfolioData.personal} />
        </motion.div>
      </Layout>
    </ToastProvider>
  );
}

export default App;