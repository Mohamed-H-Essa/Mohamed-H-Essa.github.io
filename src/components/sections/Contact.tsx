import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Send, Copy, CheckCircle, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { ContactForm } from '../../types/portfolio';
import { PersonalInfo } from '../../types/portfolio';
import { EmailService, RateLimiter } from '../../services/emailService';
import { EMAIL_VALIDATION } from '../../config/email';

interface ContactProps {
  data: PersonalInfo;
}

const contactSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(EMAIL_VALIDATION.MIN_NAME_LENGTH, `Name must be at least ${EMAIL_VALIDATION.MIN_NAME_LENGTH} characters`)
    .max(EMAIL_VALIDATION.MAX_NAME_LENGTH, `Name must be less than ${EMAIL_VALIDATION.MAX_NAME_LENGTH} characters`),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  subject: yup.string()
    .required('Subject is required')
    .min(EMAIL_VALIDATION.MIN_SUBJECT_LENGTH, `Subject must be at least ${EMAIL_VALIDATION.MIN_SUBJECT_LENGTH} characters`)
    .max(EMAIL_VALIDATION.MAX_SUBJECT_LENGTH, `Subject must be less than ${EMAIL_VALIDATION.MAX_SUBJECT_LENGTH} characters`),
  message: yup.string()
    .required('Message is required')
    .min(EMAIL_VALIDATION.MIN_MESSAGE_LENGTH, `Message must be at least ${EMAIL_VALIDATION.MIN_MESSAGE_LENGTH} characters`)
    .max(EMAIL_VALIDATION.MAX_MESSAGE_LENGTH, `Message must be less than ${EMAIL_VALIDATION.MAX_MESSAGE_LENGTH} characters`),
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
  const [rateLimitInfo, setRateLimitInfo] = useState(() => RateLimiter.checkRateLimit());

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

    // ⚠️ TEMPORARILY DISABLED RATE LIMITING FOR DEBUGGING
    // TO RE-ENABLE: Uncomment the lines below and remove the comment
    /*
    // Check rate limiting before submission
    const currentRateLimit = RateLimiter.checkRateLimit();
    if (!currentRateLimit.canSend) {
      const minutesLeft = Math.ceil((currentRateLimit.timeUntilReset || 0) / 60000);
      showToast('error', `Too many attempts. Please wait ${minutesLeft} minutes before trying again.`);
      setRateLimitInfo(currentRateLimit);
      return;
    }
    */

    setIsSubmitting(true);

    try {
      const result = await EmailService.sendEmail(formData);
      
      if (result.success) {
        showToast('success', result.message);
        reset();
        // Reset rate limit display on successful send
        setRateLimitInfo(RateLimiter.checkRateLimit());
      } else {
        showToast('error', result.message);
        // Update rate limit info after failed attempt
        setRateLimitInfo(RateLimiter.checkRateLimit());
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showToast('error', 'An unexpected error occurred. Please try again or contact me directly.');
      setRateLimitInfo(RateLimiter.checkRateLimit());
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

                {/* Rate Limit Warning - TEMPORARILY HIDDEN FOR DEBUGGING */}
                {/* TO RE-ENABLE: Remove this comment block and uncomment the JSX below */}
                {/*
                {!rateLimitInfo.canSend && (
                  <div className="p-4 bg-red-900 bg-opacity-50 rounded-lg border border-red-700 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-300 font-medium mb-1">Too Many Attempts</div>
                      <p className="text-red-200 text-sm">
                        Please wait {Math.ceil((rateLimitInfo.timeUntilReset || 0) / 60000)} minutes before trying again.
                        You can also contact me directly via email or phone.
                      </p>
                    </div>
                  </div>
                )}
                */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  // disabled={!rateLimitInfo.canSend} // TEMPORARILY DISABLED FOR DEBUGGING
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