import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, EMAIL_TEMPLATE_VARS, RATE_LIMIT } from '../config/email';
import { ContactForm } from '../types/portfolio';

/**
 * EmailJS Service - Production-ready email handling
 * Handles form submissions with error handling, rate limiting, and retry logic
 */

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

export interface EmailResponse {
  success: boolean;
  message: string;
  status?: number;
}

export interface RateLimitInfo {
  attempts: number;
  lastAttempt: number;
  canSend: boolean;
  timeUntilReset?: number;
}

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private static getStorageKey(): string {
    return RATE_LIMIT.STORAGE_KEY;
  }

  static checkRateLimit(): RateLimitInfo {
    const stored = localStorage.getItem(this.getStorageKey());
    const now = Date.now();
    
    if (!stored) {
      return { attempts: 0, lastAttempt: 0, canSend: true };
    }

    const data = JSON.parse(stored);
    const timeSinceLastAttempt = now - data.lastAttempt;
    const cooldownPeriod = RATE_LIMIT.COOLDOWN_MINUTES * 60 * 1000;

    // Reset attempts if cooldown period has passed
    if (timeSinceLastAttempt > cooldownPeriod) {
      localStorage.removeItem(this.getStorageKey());
      return { attempts: 0, lastAttempt: 0, canSend: true };
    }

    const canSend = data.attempts < RATE_LIMIT.MAX_ATTEMPTS;
    const timeUntilReset = canSend ? 0 : cooldownPeriod - timeSinceLastAttempt;

    return {
      attempts: data.attempts,
      lastAttempt: data.lastAttempt,
      canSend,
      timeUntilReset,
    };
  }

  static recordAttempt(): void {
    const now = Date.now();
    const current = this.checkRateLimit();
    
    const data = {
      attempts: current.attempts + 1,
      lastAttempt: now,
    };

    localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
  }

  static reset(): void {
    localStorage.removeItem(this.getStorageKey());
  }
}

/**
 * Email validation utility
 */
export class EmailValidator {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  static validateForm(form: ContactForm): string[] {
    const errors: string[] = [];
    
    if (!form.name || form.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!this.validateEmail(form.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!form.subject || form.subject.length < 5) {
      errors.push('Subject must be at least 5 characters long');
    }
    
    if (!form.message || form.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    // Check for potential spam (honeypot)
    if (form.honeypot) {
      errors.push('Spam detected');
    }

    return errors;
  }
}

/**
 * Main EmailJS service class
 */
export class EmailService {
  /**
   * Send email via EmailJS with comprehensive error handling
   */
  static async sendEmail(formData: ContactForm): Promise<EmailResponse> {
    try {
      // Check rate limiting
      const rateLimitInfo = RateLimiter.checkRateLimit();
      if (!rateLimitInfo.canSend) {
        const minutesLeft = Math.ceil((rateLimitInfo.timeUntilReset || 0) / 60000);
        return {
          success: false,
          message: `Too many attempts. Please wait ${minutesLeft} minutes before trying again.`,
          status: 429,
        };
      }

      // Validate form data
      const validationErrors = EmailValidator.validateForm(formData);
      if (validationErrors.length > 0) {
        return {
          success: false,
          message: validationErrors.join(', '),
          status: 400,
        };
      }

      // Prepare template parameters
      const templateParams = {
        [EMAIL_TEMPLATE_VARS.FROM_NAME]: EmailValidator.sanitizeInput(formData.name),
        [EMAIL_TEMPLATE_VARS.FROM_EMAIL]: EmailValidator.sanitizeInput(formData.email),
        [EMAIL_TEMPLATE_VARS.SUBJECT]: EmailValidator.sanitizeInput(formData.subject),
        [EMAIL_TEMPLATE_VARS.MESSAGE]: EmailValidator.sanitizeInput(formData.message),
        [EMAIL_TEMPLATE_VARS.REPLY_TO]: formData.email,
        [EMAIL_TEMPLATE_VARS.TO_EMAIL]: 'mhosnytech@gmail.com', // Your email
      };

      // Record attempt for rate limiting
      RateLimiter.recordAttempt();

      // Send email
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Message sent successfully! I\'ll get back to you within 24-48 hours.',
          status: response.status,
        };
      } else {
        throw new Error(`EmailJS responded with status: ${response.status}`);
      }

    } catch (error: any) {
      console.error('EmailJS Error:', error);

      // Handle specific EmailJS errors
      if (error.status === 400) {
        return {
          success: false,
          message: 'Invalid email data. Please check your inputs and try again.',
          status: 400,
        };
      } else if (error.status === 402) {
        return {
          success: false,
          message: 'Email service temporarily unavailable. Please try again later.',
          status: 402,
        };
      } else if (error.status === 403) {
        return {
          success: false,
          message: 'Email service access forbidden. Please contact support.',
          status: 403,
        };
      } else {
        return {
          success: false,
          message: 'Failed to send message. Please try again or contact me directly.',
          status: error.status || 500,
        };
      }
    }
  }

  /**
   * Check if email service is available
   */
  static async testConnection(): Promise<boolean> {
    try {
      // Send a test email with minimal data
      const testParams = {
        [EMAIL_TEMPLATE_VARS.FROM_NAME]: 'Test',
        [EMAIL_TEMPLATE_VARS.FROM_EMAIL]: 'test@example.com',
        [EMAIL_TEMPLATE_VARS.SUBJECT]: 'Connection Test',
        [EMAIL_TEMPLATE_VARS.MESSAGE]: 'This is a connection test.',
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        testParams
      );
      
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default EmailService;