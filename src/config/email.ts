/**
 * EmailJS Configuration
 * Production-ready email service configuration
 */

export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_wo1p20i',
  TEMPLATE_ID: 'template_zivripf',
  PUBLIC_KEY: 'KK9CNmByU7-_SaXSf',
} as const;

// Email template variable mapping
export const EMAIL_TEMPLATE_VARS = {
  FROM_NAME: 'from_name',
  FROM_EMAIL: 'from_email', 
  SUBJECT: 'subject',
  MESSAGE: 'message',
  TO_EMAIL: 'to_email',
  REPLY_TO: 'reply_to',
} as const;

// Rate limiting configuration
export const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  COOLDOWN_MINUTES: 5,
  STORAGE_KEY: 'email_attempts',
} as const;

// Validation rules
export const EMAIL_VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_SUBJECT_LENGTH: 5,
  MAX_SUBJECT_LENGTH: 200,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 5000,
} as const;