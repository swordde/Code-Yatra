# 🔐 EmailJS Security Improvements for Code Yatra

## Option 1: Environment Variables (Recommended)
Create a separate config file that's not committed to Git:

```javascript
// config/email-config.js (add to .gitignore)
const EMAIL_CONFIG = {
    publicKey: '6z2n46iyLDeBue3wDhyouractualEmailJSSpublickey',
    serviceId: 'service_bh1kf2ne',
    templateId: 'template_u9icttz'
};

// In main.js, reference the config
emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
```

## Option 2: Domain Restrictions (Easy Fix)
In your EmailJS dashboard:
1. Go to Account > Security
2. Add allowed domains:
   - https://yourdomain.com
   - https://yourname.github.io
   - http://localhost (for testing)
3. Block all other domains

## Option 3: Obfuscation (Basic Protection)
```javascript
// Simple string obfuscation
const keys = {
    pk: atob('NnoybkoxaXlMRGVCdWUzd0RoeW91cmFjdHVhbEVtYWlsSlNzcHVibGlja2V5'),
    sid: atob('c2VydmljZV9iaDFrZjJuZQ=='),
    tid: atob('dGVtcGxhdGVfdTlpY3R0eg==')
};
```

## Option 4: Server Proxy (Most Secure)
Create a backend endpoint:
```javascript
// Your backend handles EmailJS calls
fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify(formData)
});
// EmailJS keys stay on server only
```

## Option 5: Netlify Functions (Serverless)
```javascript
// netlify/functions/send-email.js
exports.handler = async (event, context) => {
    const emailjs = require('@emailjs/nodejs');
    // Keys stored as environment variables
    return emailjs.send(process.env.SERVICE_ID, ...);
};
```

## Option 6: Rate Limiting Headers
```javascript
// Add request headers for additional security
emailjs.send(serviceId, templateId, params, {
    'X-RateLimit-Domain': window.location.hostname,
    'X-Request-Source': 'CodeYatra-Contact-Form'
});
```