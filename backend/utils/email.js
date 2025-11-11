const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Fallback to nodemailer
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendOTP = async (email, otp) => {
  const subject = 'Kode OTP Mie Yamin Loyalty';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #FF6B35;">Verifikasi Email Mie Yamin</h2>
      <p>Halo!</p>
      <p>Kode OTP Anda untuk verifikasi email adalah:</p>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="color: #FF6B35; font-size: 32px; margin: 0;">${otp}</h1>
      </div>
      <p>Kode ini akan kadaluarsa dalam 10 menit.</p>
      <p>Jika Anda tidak meminta kode ini, abaikan email ini.</p>
      <br>
      <p>Salam,<br>Tim Mie Yamin</p>
    </div>
  `;

  try {
    if (process.env.SENDGRID_API_KEY) {
      // Use SendGrid
      const msg = {
        to: email,
        from: process.env.FROM_EMAIL || 'noreply@mieyamin.com',
        subject,
        html
      };
      await sgMail.send(msg);
    } else {
      // Use nodemailer
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@mieyamin.com',
        to: email,
        subject,
        html
      });
    }
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOTP };
