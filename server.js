const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create reusable transporter object using SMTP transport
let transporter;

// Initialize transporter based on environment variables
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS  // your email password or app password
    }
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'SMTP Server is running', port: PORT });
});

// Send email endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html, from } = req.body;

    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        error: 'Missing required fields: to, subject, and text/html are required'
      });
    }

    // Create transporter if not exists
    if (!transporter) {
      transporter = createTransporter();
    }

    // Email options
    const mailOptions = {
      from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Send bulk emails endpoint
app.post('/send-bulk', async (req, res) => {
  try {
    const { emails, subject, text, html, from } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        error: 'emails array is required and must not be empty'
      });
    }

    if (!subject || (!text && !html)) {
      return res.status(400).json({
        error: 'subject and text/html are required'
      });
    }

    // Create transporter if not exists
    if (!transporter) {
      transporter = createTransporter();
    }

    const results = [];

    for (const email of emails) {
      try {
        const mailOptions = {
          from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: subject,
          text: text,
          html: html
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({
          email: email,
          success: true,
          messageId: info.messageId
        });
      } catch (error) {
        results.push({
          email: email,
          success: false,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: 'Bulk email processing completed',
      results: results
    });

  } catch (error) {
    console.error('Error sending bulk emails:', error);
    res.status(500).json({
      error: 'Failed to send bulk emails',
      details: error.message
    });
  }
});

// Test email configuration endpoint
app.post('/test-config', async (req, res) => {
  try {
    if (!transporter) {
      transporter = createTransporter();
    }

    // Verify connection configuration
    await transporter.verify();

    res.json({
      success: true,
      message: 'SMTP configuration is valid and ready to send emails'
    });

  } catch (error) {
    console.error('SMTP configuration error:', error);
    res.status(500).json({
      error: 'SMTP configuration is invalid',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SMTP Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('Make sure to configure your .env file with SMTP credentials');
});