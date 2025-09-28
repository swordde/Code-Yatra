# 📧 EmailJS Template (Simplified Version for EmailJS Dashboard)

Copy this into your EmailJS template editor:

**Subject Line:**
```
🚀 Code Yatra: New Contact from {{from_name}} - {{subject}}
```

**Template Content:**
```html
<div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000000;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 25px; text-align: center; border-bottom: 3px solid #FFD700;">
    <div style="color: #FFD700; font-size: 24px; font-weight: bold; margin-bottom: 10px;">
      &lt;/&gt; Code Yatra
    </div>
    <div style="color: #ffffff; font-size: 14px;">New Contact Form Submission</div>
  </div>

  <!-- Main Content -->
  <div style="padding: 30px; background: #000000;">
    
    <!-- Greeting -->
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; margin-bottom: 25px;">
      <h2 style="color: #FFD700; margin: 0 0 10px 0; font-size: 18px;">Hello Code Yatra Team! 👋</h2>
      <p style="color: #ffffff; margin: 0;">A message by <strong style="color: #FFD700;">{{from_name}}</strong> has been received.</p>
    </div>

    <!-- Message Details -->
    <div style="border: 2px solid #333333; border-radius: 8px; margin-bottom: 20px;">
      
      <!-- Contact Info Header -->
      <div style="background: #1a1a1a; color: #FFD700; padding: 15px; font-weight: bold; font-size: 16px;">
        👤 {{from_name}} • {{from_email}}
      </div>
      
      <!-- Message Content -->
      <div style="padding: 20px; background: #1a1a1a;">
        
        <!-- Subject -->
        <div style="background: #2a2a2a; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 3px solid #FFD700;">
          <div style="color: #FFD700; font-size: 12px; font-weight: bold; margin-bottom: 5px;">📝 SUBJECT</div>
          <div style="color: #ffffff; font-size: 16px; font-weight: 500;">{{subject}}</div>
        </div>
        
        <!-- Message -->
        <div style="background: #2a2a2a; padding: 15px; border-radius: 6px; border-left: 3px solid #FFD700;">
          <div style="color: #FFD700; font-size: 12px; font-weight: bold; margin-bottom: 8px;">💬 MESSAGE</div>
          <div style="color: #ffffff; font-size: 15px; line-height: 1.6;">{{message}}</div>
        </div>
        
      </div>
    </div>

    <!-- Quick Reply Button -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="mailto:{{from_email}}?subject=Re: {{subject}}" 
         style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); 
                color: #000000; 
                padding: 12px 25px; 
                text-decoration: none; 
                border-radius: 6px; 
                font-weight: bold; 
                display: inline-block;">
        📧 Reply to {{from_name}}
      </a>
    </div>

    <!-- Contact Details Table -->
    <table style="width: 100%; border: 1px solid #333333; border-radius: 6px; margin: 20px 0; background: #1a1a1a;">
      <tr style="background: #2a2a2a;">
        <td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #FFD700;">Contact Details</td>
        <td style="padding: 10px; border-bottom: 1px solid #333;"></td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; color: #cccccc; font-size: 14px;">Name:</td>
        <td style="padding: 8px 10px; color: #ffffff; font-weight: 500;">{{from_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; color: #cccccc; font-size: 14px;">Email:</td>
        <td style="padding: 8px 10px; color: #ffffff; font-weight: 500;">{{from_email}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; color: #cccccc; font-size: 14px;">Time:</td>
        <td style="padding: 8px 10px; color: #ffffff; font-weight: 500;">{{timestamp}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 10px; color: #cccccc; font-size: 14px;">Source:</td>
        <td style="padding: 8px 10px; color: #ffffff; font-weight: 500;">{{website_url}}</td>
      </tr>
    </table>

  </div>

  <!-- Footer -->
  <div style="background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 20px; text-align: center;">
    <div style="color: #FFD700; font-weight: bold; margin-bottom: 5px;">Code Yatra</div>
    <div style="color: #cccccc; font-size: 12px; margin-bottom: 10px;">Building Digital Experiences ✨</div>
    <div style="color: #888; font-size: 11px;">
      This message was sent via Code Yatra contact form<br>
      Security Token: {{security_token}}
    </div>
  </div>

</div>
```

---

## 🎨 Key Theme Elements Matched:

✅ **Black & Gold Color Scheme**
✅ **Code Yatra Logo with </>**  
✅ **Professional Typography**
✅ **Gradient Backgrounds**
✅ **Clean Card Layout**
✅ **Security Information**
✅ **Quick Reply Button**
✅ **Responsive Design**