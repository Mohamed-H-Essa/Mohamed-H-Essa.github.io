# Email Integration - Production Ready EmailJS Setup

## Overview
This portfolio uses EmailJS for handling contact form submissions in a production-ready manner with comprehensive error handling, rate limiting, and validation.

## Features
- ✅ **Rate Limiting**: Prevents spam with 3 attempts per 5-minute window
- ✅ **Input Validation**: Client-side and server-side validation
- ✅ **Error Handling**: Comprehensive error messages and retry logic
- ✅ **Security**: Honeypot spam protection and input sanitization
- ✅ **User Experience**: Loading states, success/error feedback
- ✅ **TypeScript**: Full type safety and interfaces

## EmailJS Template Setup

In your EmailJS template, use these variables:

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Message</title>
</head>
<body>
    <h2>New message from your portfolio</h2>
    
    <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    
    <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
        {{message}}
    </div>
    
    <hr>
    <p><strong>Reply to:</strong> {{reply_to}}</p>
    <p><strong>Sent to:</strong> {{to_email}}</p>
    <p><small>Sent from mecodes.live portfolio</small></p>
</body>
</html>
```

## Configuration

### Current Setup
- **Service ID**: `service_wo1p20i`
- **Template ID**: `template_zivripf`
- **Public Key**: `KK9CNmByU7-_SaXSf`

### File Structure
```
src/
├── config/
│   └── email.ts           # Email configuration and constants
├── services/
│   └── emailService.ts    # EmailJS service with error handling
└── components/sections/
    └── Contact.tsx        # Updated contact form component
```

## Rate Limiting
- **Max Attempts**: 3 per session
- **Cooldown**: 5 minutes
- **Storage**: localStorage (client-side)
- **Behavior**: Shows warning and disables form when limit reached

## Error Handling
The service handles various error scenarios:
- ✅ Network connectivity issues
- ✅ EmailJS service errors (400, 402, 403, etc.)
- ✅ Rate limiting
- ✅ Form validation errors
- ✅ Spam detection (honeypot)

## Security Features
1. **Input Sanitization**: Removes potentially harmful characters
2. **Email Validation**: Comprehensive email format checking
3. **Honeypot Protection**: Hidden field to catch bots
4. **Rate Limiting**: Prevents form submission abuse
5. **HTTPS Only**: Email service requires secure connection

## Testing
The EmailJS integration includes connection testing capabilities:

```typescript
import { EmailService } from './services/emailService';

// Test if EmailJS is properly configured
const isWorking = await EmailService.testConnection();
```

## Monitoring
- All email attempts are logged to console
- Rate limiting data is stored in localStorage
- Success/error states are tracked and displayed to users

## Troubleshooting

### Common Issues
1. **"Email service access forbidden"** - Check EmailJS public key
2. **"Invalid email data"** - Verify template variable names
3. **"Service temporarily unavailable"** - EmailJS quota exceeded

### Debug Mode
To enable debug logging, open browser console and check for EmailJS-related messages.

## Production Considerations
- EmailJS free tier: 200 emails/month
- Consider upgrading for higher volume
- Monitor delivery rates in EmailJS dashboard
- Set up email notifications for form submissions
- Consider backup contact methods (direct email, phone)

## Dependencies
- `@emailjs/browser`: EmailJS client library
- `react-hook-form`: Form management
- `yup`: Form validation
- `@hookform/resolvers`: Yup resolver for react-hook-form