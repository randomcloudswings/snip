# EmailJS Setup Guide

This guide will walk you through setting up EmailJS for the contact form in your portfolio website.

## Why EmailJS?

EmailJS allows you to send emails directly from client-side JavaScript without needing a backend server. It's perfect for portfolio websites and static sites.

## Step-by-Step Setup

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal portfolios)
   - **Outlook**
   - **Yahoo**
   - Or any other supported service
4. Follow the connection instructions:
   - For Gmail: You'll need to allow less secure apps or use an App Password
   - For Outlook: Enter your credentials
5. Click **Create Service**
6. **Copy the Service ID** (e.g., `service_xxxxxx`)

### 3. Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Name your template (e.g., "Portfolio Contact Form")
4. Configure the template:

   **Subject Line:**
   ```
   New Contact from {{from_name}}
   ```

   **Content:**
   ```
   You have received a new message from your portfolio contact form.

   From: {{from_name}}
   Email: {{from_email}}

   Message:
   {{message}}

   ---
   This message was sent from your portfolio website contact form.
   ```

5. **Template Settings:**
   - **To Email**: Your email address where you want to receive messages
   - **From Name**: `{{from_name}}` (the sender's name)
   - **Reply To**: `{{from_email}}` (allows you to reply directly to the sender)

6. Click **Save**
7. **Copy the Template ID** (e.g., `template_xxxxxx`)

### 4. Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. **Copy the Public Key** (e.g., `xxxxxxxxxxxxxx`)

### 5. Configure Environment Variables

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
   ```

3. Replace the placeholder values with your actual IDs

### 6. Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox for the test message

## Template Variable Reference

The contact form sends these variables to your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's name from the form | "John Doe" |
| `{{from_email}}` | Sender's email address | "john@example.com" |
| `{{message}}` | The message content | "I'd like to discuss..." |
| `{{to_name}}` | Your name (recipient) | "Portfolio Owner" |

## Advanced Template Customization

### Add Auto-Reply

1. Create a second template for auto-replies
2. Configure it to send to `{{from_email}}`
3. Add a friendly thank you message
4. Update the Contact component to send two emails (one to you, one auto-reply)

### HTML Template

You can use HTML in your template for better formatting:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>From:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
  </div>
  
  <div style="background: white; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
    <h3 style="margin-top: 0;">Message:</h3>
    <p style="white-space: pre-wrap;">{{message}}</p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
  <p style="color: #666; font-size: 12px;">
    This message was sent from your portfolio website.
  </p>
</div>
```

## Troubleshooting

### "EmailJS is not configured" Error

**Problem**: You see an error dialog saying EmailJS is not configured.

**Solution**: 
- Check that your `.env` file exists in the project root
- Verify all three environment variables are set
- Restart your development server after adding/changing `.env`

### Emails Not Being Received

**Problem**: Form submits successfully but no email arrives.

**Solutions**:
1. **Check spam folder**: EmailJS emails might be filtered as spam initially
2. **Verify email service**: Make sure your email service is properly connected in EmailJS dashboard
3. **Check template**: Ensure the "To Email" in your template is correct
4. **Test in EmailJS dashboard**: Use the "Test it" button in your template to verify it works

### Rate Limiting

**Problem**: Getting rate limit errors.

**Solution**:
- Free EmailJS accounts have limits (200 emails/month)
- Upgrade to a paid plan if needed
- Implement client-side rate limiting to prevent spam

## Security Best Practices

1. **Never commit `.env` to version control**
   - It's already in `.gitignore`
   - Only commit `.env.example` with placeholder values

2. **Use EmailJS captcha** (optional)
   - Enable reCAPTCHA in EmailJS dashboard for spam protection

3. **Rate limiting**
   - Consider adding a cooldown period between submissions
   - Track submissions in localStorage

4. **Email validation**
   - The form already validates email format with Zod
   - EmailJS will reject invalid email addresses

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 3 email templates
- Standard support

For production sites with high traffic, consider upgrading to a paid plan.

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [Template Variables Guide](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/)

## Support

If you encounter issues:
1. Check the [EmailJS FAQ](https://www.emailjs.com/docs/faq/)
2. Review browser console for error messages
3. Test your template in the EmailJS dashboard
4. Contact EmailJS support for service-specific issues
