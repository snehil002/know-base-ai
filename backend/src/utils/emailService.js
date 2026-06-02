const FormData = require("form-data"); // form-data v4.0.1
const Mailgun = require("mailgun.js"); // mailgun.js v11.1.0

const { 
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_FROM_EMAIL_VERIFY,
  MAILGUN_FROM_EMAIL_INVITE,
} = require("../config/env");

function handleUndeclaredEnvVars() {
  if (!MAILGUN_API_KEY) {
    throw new Error("MAILGUN_API_KEY environment variable is not set");
  }

  if (!MAILGUN_DOMAIN) {
    throw new Error("MAILGUN_DOMAIN environment variable is not set");
  }

  if (!MAILGUN_FROM_EMAIL_VERIFY) {
    throw new Error("MAILGUN_FROM_EMAIL_VERIFY environment variable is not set");
  }

  if (!MAILGUN_FROM_EMAIL_INVITE) {
    throw new Error("MAILGUN_FROM_EMAIL_INVITE environment variable is not set");
  }
}

async function sendEmail({
  from="My Company <noreply@example.com>",
  to="Full Name <user@example.com>", 
  subject="Hello User", 
  text="Congratulations User, you just sent an email! You are truly awesome!",
  html="<p>Congratulations User, you just sent an email! You are truly awesome!</p>"
}) {

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });

  return await mg.messages.create(MAILGUN_DOMAIN, {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html
  });

}

function generateVerifyEmailBody({ recipientUserName, magicLinkUrl, expirationMinutes }) {
  // Plain Text Version (No formatting, visible URLs)
  const text = `
Hello ${recipientUserName},

Use the link below to sign in to your account. This link will expire in ${expirationMinutes} minutes.

Sign in to your account:
${magicLinkUrl}

If you did not request this email, you can safely ignore it.
  `.trim();

  // HTML Version (Styled, matching structure, masked URLs)
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in to your account</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937; margin: 0; padding: 40px 20px; }
      .container { max-width: 500px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb; }
      h1 { font-size: 24px; font-weight: 700; color: #111827; margin-top: 0; }
      p { font-size: 16px; line-height: 1.5; color: #4b5563; }
      .btn-wrapper { margin: 28px 0; }
      .btn { background-color: #4f46e5; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; }
      .footer { margin-top: 32px; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px; }
      .fallback-link { word-break: break-all; color: #4f46e5; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Sign in to your account</h1>
      <p>Hello ${recipientUserName},</p>
      <p>Use the link below to sign in to your account. This link will expire in ${expirationMinutes} minutes.</p>
      
      <div class="btn-wrapper">
        <a href="${magicLinkUrl}" class="btn" target="_blank">Sign in to your account</a>
      </div>
      
      <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
      <p class="fallback-link">${magicLinkUrl}</p>
      
      <div class="footer">
        If you did not request this email, you can safely ignore it.
      </div>
    </div>
  </body>
</html>
  `.trim();

  return { text, html };
}

function generateInviteEmailBody({ recipientUserName, invitationUrl, inviterName, workspaceName }) {
  // Plain Text Version (No formatting, visible URLs)
  const text = `
Join ${workspaceName} on KnowBaseAi

Hello ${recipientUserName},

${inviterName} has invited you to join their workspace, ${workspaceName}, on KnowBaseAi.

Accept the invitation by clicking the link below:
${invitationUrl}

If you don't want to join this workspace, or if you don't recognize the person who invited you, you can safely ignore this email.
  `.trim();

  // HTML Version (Styled, matching structure, masked URLs)
  const html = `
<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Join ${workspaceName} on KnowBaseAi</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937; margin: 0; padding: 40px 20px; }
        .container { max-width: 500px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb; }
        h1 { font-size: 22px; font-weight: 700; color: #111827; margin-top: 0; line-height: 1.3; }
        p { font-size: 16px; line-height: 1.5; color: #4b5563; }
        .btn-wrapper { margin: 28px 0; }
        .btn { background-color: #059669; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; }
        .footer { margin-top: 32px; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px; line-height: 1.4; }
        .fallback-link { word-break: break-all; color: #059669; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Join <strong>${workspaceName}</strong> on KnowBaseAi</h1>
        <p>Hello ${recipientUserName},</p>
        <p><strong>${inviterName}</strong> has invited you to join their workspace, <strong>${workspaceName}</strong>, on KnowBaseAi.</p>
        
        <div class="btn-wrapper">
          <a href="${invitationUrl}" class="btn" target="_blank">Accept Invitation</a>
        </div>
        
        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p class="fallback-link">${invitationUrl}</p>
        
        <div class="footer">
          If you don't want to join this workspace, or if you don't recognize the person who invited you, you can safely ignore this email.
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return { text, html };
}

exports.sendVerifyEmail = async ({ recipientEmail, magicLinkUrl, expirationMinutes }) => {
  try {
    handleUndeclaredEnvVars();

    const recipientUserName = recipientEmail.split("@")[0];

    const { text, html } = generateVerifyEmailBody({ recipientUserName, magicLinkUrl, expirationMinutes });

    const messageData = {
      from: MAILGUN_FROM_EMAIL_VERIFY,
      to: recipientEmail,
      subject: "Sign in to your account",
      text: text,  // Plain text fallback
      html: html   // Rich HTML content
    };

    return await sendEmail(messageData);
    
  } catch (err) {
    err.forBackend = {
      message: "Failed to send verification email",
    };
    throw err;
  }
};

exports.sendInviteEmail = async ({ recipientEmail, invitationUrl, inviterName, workspaceName }) => {
  try {
    handleUndeclaredEnvVars();

    const recipientUserName = recipientEmail.split("@")[0];
    
    const { text, html } = generateInviteEmailBody({ recipientUserName, invitationUrl, inviterName, workspaceName });

    const messageData = {
      from: MAILGUN_FROM_EMAIL_INVITE,
      to: recipientEmail,
      subject: `${inviterName} invited you to join ${workspaceName} on KnowBaseAi`,
      text: text,  // Plain text fallback
      html: html   // Rich HTML content
    };

    return await sendEmail(messageData);
    
  } catch (err) {
    err.forBackend = {
      message: "Failed to send invitation email",
    }
    throw err;
  }
};
