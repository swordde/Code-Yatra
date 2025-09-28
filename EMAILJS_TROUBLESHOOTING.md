# 🚨 EmailJS 400 Error Troubleshooting Guide

## Quick Debugging Steps

### 1. Open Browser Console
Press `F12` → Go to `Console` tab → Try sending a message again

### 2. Run Debug Function
In the console, type:
```javascript
debugEmailJS()
```
This will show your current configuration.

### 3. Check the Error Details
Look for the detailed error message that now appears in console.

## Common 400 Error Fixes

### ❌ **Issue 1: Invalid Public Key**
**Symptoms:** Error status 400, "Invalid public key"

**Fix:**
1. Go to your EmailJS dashboard → Account
2. Copy the EXACT Public Key
3. Update in main.js:
```javascript
pk: ['YOUR_ACTUAL_PUBLIC_KEY_HERE'].join(''),
```

### ❌ **Issue 2: Wrong Service ID**
**Symptoms:** Error status 404, "Service not found"

**Fix:**
1. Go to EmailJS dashboard → Email Services
2. Find your Gmail service
3. Copy the exact Service ID (looks like: `service_abc123`)
4. Update in main.js:
```javascript
sid: ['YOUR_ACTUAL_SERVICE_ID'].join(''),
```

### ❌ **Issue 3: Wrong Template ID**
**Symptoms:** Error status 404, "Template not found"

**Fix:**
1. Go to EmailJS dashboard → Email Templates
2. Find your contact form template
3. Copy the exact Template ID (looks like: `template_abc123`)
4. Update in main.js:
```javascript
tid: ['YOUR_ACTUAL_TEMPLATE_ID'].join(''),
```

### ❌ **Issue 4: Template Variables Mismatch**
**Symptoms:** Error status 400, "Template error"

**Fix:** Make sure your EmailJS template includes these variables:
- `{{from_name}}`
- `{{from_email}}`
- `{{subject}}`
- `{{message}}`
- `{{to_name}}`
- `{{timestamp}}`
- `{{website_url}}`
- `{{user_agent}}`
- `{{security_token}}`

### ❌ **Issue 5: Domain Restrictions**
**Symptoms:** Error status 403, "Access denied"

**Fix:**
1. Go to EmailJS dashboard → Account → Security
2. Add your domain to allowed origins:
   - `http://localhost:3000`
   - `https://yourusername.github.io`
   - Your custom domain if any

## Quick Test Fix

**Try this simplified configuration first:**

```javascript
// Temporary simple config for testing
const emailConfig = {
    pk: 'YOUR_ACTUAL_PUBLIC_KEY_HERE',
    sid: 'YOUR_ACTUAL_SERVICE_ID_HERE', 
    tid: 'YOUR_ACTUAL_TEMPLATE_ID_HERE'
};
```

## Step-by-Step Fix Process

### Step 1: Get Fresh Credentials
1. Log into EmailJS dashboard
2. Go to Account → Copy Public Key
3. Go to Email Services → Copy Service ID
4. Go to Email Templates → Copy Template ID

### Step 2: Create Simple Template
Create a basic EmailJS template with this content:
```html
New message from {{from_name}}

Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from: {{website_url}}
Time: {{timestamp}}
```

### Step 3: Test with Simple Code
Replace the emailConfig section with:
```javascript
const emailConfig = {
    pk: 'paste_your_public_key_here',
    sid: 'paste_your_service_id_here',
    tid: 'paste_your_template_id_here'
};
```

### Step 4: Remove Extra Options
Temporarily comment out these lines:
```javascript
// blockHeadless: true,
// blockList: { ... },
// limitRate: { ... }
```

## Verification Checklist

- [ ] EmailJS library loaded (check Network tab)
- [ ] Public Key is correct and active
- [ ] Service ID exists and is connected
- [ ] Template ID exists and has required variables
- [ ] Domain is allowed in EmailJS dashboard
- [ ] No rate limiting issues
- [ ] Browser console shows no JavaScript errors

## Still Not Working?

### Last Resort Fixes:

1. **Create New EmailJS Service**
   - Delete old service, create fresh one
   - Use new Service ID

2. **Create New Template**
   - Use minimal template content
   - Add variables one by one

3. **Test with Different Email**
   - Try different Gmail account
   - Check if current email has restrictions

4. **Use Browser Incognito Mode**
   - Test in private/incognito window
   - Clears any cached issues

## Contact Form Alternative (Temporary)

If EmailJS continues to fail, you can temporarily use this fallback:

```javascript
// Temporary mailto fallback
const mailtoLink = `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
window.open(mailtoLink);
```

---

**Need more help?** Check the browser console for the detailed error message after implementing the enhanced error handling!