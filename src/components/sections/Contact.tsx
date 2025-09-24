import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Send, Copy, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { ContactForm } from '../../types/portfolio';
import { PersonalInfo } from '../../types/portfolio';

interface ContactProps {
  data: PersonalInfo;
}

const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  honeypot: yup.string().notRequired().max(0, 'Bot detected'), // Spam protection - optional
});

const Contact: React.FC<ContactProps> = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema) as any,
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setEmailCopied(true);
      showToast('success', 'Email address copied to clipboard!');
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      showToast('error', 'Failed to copy email address');
    }
  };

  const onSubmit = async (formData: ContactForm) => {
    // Check honeypot for spam
    if (formData.honeypot) {
      showToast('error', 'Spam detected');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      showToast('error', 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Send Me a Message
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto" />
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your Flutter application to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Get In Touch
                </h3>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">Email</div>
                      <div className="text-gray-300">{data.email}</div>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="Copy email"
                    >
                      {emailCopied ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-gray-300">{data.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-300">{data.location}</div>
                    </div>
                  </div>
                </div>

                {/* Availability Notice */}
                <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-700">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-medium">Currently Available</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    I'm accepting new projects with a 2-3 week lead time. 
                    Response time: 24-48 hours.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInRight}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <input
                  {...register('honeypot')}
                  type="text"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Flutter app development project"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Tell me about your project, timeline, and requirements..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  leftIcon={<Send className="w-5 h-5" />}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>

                {/* Privacy Notice */}
                <p className="text-xs text-gray-400 text-center">
                  Your information is secure and will only be used to respond to your inquiry.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;