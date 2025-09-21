// Example usage of the SMTP server
// Make sure the server is running: npm start

const BASE_URL = 'http://localhost:3001';

// Example 1: Send a simple email
async function sendWelcomeEmail() {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'customer@example.com',
        subject: 'Welcome to The Zone Fitness!',
        html: `
          <h1>Welcome to The Zone!</h1>
          <p>Thank you for joining our fitness community.</p>
          <p>Get ready to transform your health and fitness!</p>
          <a href="https://zone-fitness.com" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Get Started
          </a>
        `,
        text: 'Welcome to The Zone Fitness! Thank you for joining our community.'
      })
    });

    const result = await response.json();
    console.log('Welcome email sent:', result);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

// Example 2: Send class reminder emails
async function sendClassReminder() {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'member@example.com',
        subject: 'Class Reminder - CrossFit at 6:00 PM',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Class Reminder</h2>
            <p>Don't forget about your upcoming CrossFit class!</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Class Details:</h3>
              <p><strong>Class:</strong> CrossFit</p>
              <p><strong>Time:</strong> Today at 6:00 PM</p>
              <p><strong>Coach:</strong> Morne Maritz</p>
              <p><strong>Location:</strong> The Zone Health & Fitness</p>
            </div>
            <p>See you there!</p>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log('Class reminder sent:', result);
  } catch (error) {
    console.error('Error sending class reminder:', error);
  }
}

// Example 3: Send bulk newsletter
async function sendNewsletter() {
  try {
    const subscribers = [
      'member1@example.com',
      'member2@example.com',
      'member3@example.com'
    ];

    const response = await fetch(`${BASE_URL}/send-bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: subscribers,
        subject: 'Zone Fitness Monthly Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <header style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center;">
              <h1>THE ZONE</h1>
              <p>Health & Fitness Newsletter</p>
            </header>

            <div style="padding: 30px;">
              <h2>This Month's Highlights</h2>

              <div style="margin: 20px 0;">
                <h3>🏋️ New Hyrox Training Program</h3>
                <p>Join our new Hyrox preparation classes every Monday and Wednesday at 7:00 PM.</p>
              </div>

              <div style="margin: 20px 0;">
                <h3>🥗 Nutrition Workshop</h3>
                <p>Learn about meal planning and diet optimization this Saturday at 8:00 AM.</p>
              </div>

              <div style="margin: 20px 0;">
                <h3>📈 Member Spotlight</h3>
                <p>Congratulations to Sarah for completing her first CrossFit competition!</p>
              </div>

              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <h3>Ready to Level Up?</h3>
                <p>Book your next class today!</p>
                <a href="#" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Book Now
                </a>
              </div>
            </div>

            <footer style="background: #374151; color: white; padding: 20px; text-align: center;">
              <p>The Zone Health & Fitness</p>
              <p>Stay strong, stay motivated!</p>
            </footer>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log('Newsletter sent:', result);
  } catch (error) {
    console.error('Error sending newsletter:', error);
  }
}

// Example 4: Test server configuration
async function testConfiguration() {
  try {
    const response = await fetch(`${BASE_URL}/test-config`, {
      method: 'POST'
    });

    const result = await response.json();
    console.log('Configuration test:', result);
  } catch (error) {
    console.error('Error testing configuration:', error);
  }
}

// Example 5: Check server health
async function checkHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const result = await response.json();
    console.log('Server health:', result);
  } catch (error) {
    console.error('Error checking health:', error);
  }
}

// Run examples (uncomment the ones you want to test)
async function runExamples() {
  console.log('🚀 SMTP Server Examples\n');

  // Check if server is running
  await checkHealth();

  // Test configuration (make sure .env is set up)
  // await testConfiguration();

  // Send example emails (make sure to update email addresses)
  // await sendWelcomeEmail();
  // await sendClassReminder();
  // await sendNewsletter();
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

module.exports = {
  sendWelcomeEmail,
  sendClassReminder,
  sendNewsletter,
  testConfiguration,
  checkHealth
};