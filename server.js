const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

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



// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SMTP Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('Make sure to configure your .env file with SMTP credentials');
});