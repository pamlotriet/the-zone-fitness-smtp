# Simple SMTP Email Server

A lightweight Node.js SMTP server for sending emails with a simple REST API.

## Features

- ✅ Send single emails
- ✅ Send bulk emails
- ✅ HTML and text email support
- ✅ CORS enabled for web apps
- ✅ Environment-based configuration
- ✅ Health check endpoint
- ✅ SMTP configuration testing

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure email credentials**
   ```bash
   cp .env.example .env
   # Edit .env with your email credentials
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Configuration (.env file)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
PORT=3001
```

### Gmail Setup
1. Enable 2-factor authentication
2. Generate an App Password: Google Account > Security > App passwords
3. Use the app password as `SMTP_PASS`

## API Endpoints

### Health Check
```bash
GET /health
```

### Test Configuration
```bash
POST /test-config
```

### Send Single Email
```bash
POST /send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Hello World",
  "text": "Plain text message",
  "html": "<h1>HTML message</h1>",
  "from": "sender@example.com"  // optional
}
```

### Send Bulk Emails
```bash
POST /send-bulk
Content-Type: application/json

{
  "emails": ["user1@example.com", "user2@example.com"],
  "subject": "Newsletter",
  "text": "Newsletter content",
  "html": "<h1>Newsletter</h1>",
  "from": "newsletter@example.com"  // optional
}
```

## Usage Examples

### JavaScript/Fetch
```javascript
// Send single email
const response = await fetch('http://localhost:3001/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'customer@example.com',
    subject: 'Welcome to The Zone Fitness!',
    html: '<h1>Welcome!</h1><p>Thanks for joining our fitness community.</p>'
  })
});

const result = await response.json();
console.log(result);
```

### cURL
```bash
# Send email
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "text": "This is a test email from SMTP server"
  }'

# Test configuration
curl -X POST http://localhost:3001/test-config
```

### Python
```python
import requests

url = 'http://localhost:3001/send-email'
data = {
    'to': 'customer@example.com',
    'subject': 'Zone Fitness Update',
    'html': '<h1>New Classes Available!</h1>'
}

response = requests.post(url, json=data)
print(response.json())
```

## Response Format

### Success Response
```json
{
  "success": true,
  "messageId": "<message-id>",
  "message": "Email sent successfully"
}
```

### Error Response
```json
{
  "error": "Failed to send email",
  "details": "Error message details"
}
```

## Common Email Providers

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

## Deployment

### Local Development
```bash
npm start
```

### Production (PM2)
```bash
npm install -g pm2
pm2 start server.js --name smtp-server
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Security Notes

- Never commit your `.env` file
- Use app passwords instead of regular passwords
- Consider rate limiting for production
- Use HTTPS in production
- Validate and sanitize all inputs

## Troubleshooting

1. **Authentication failed**: Check your email/password
2. **Connection timeout**: Verify SMTP host and port
3. **App password required**: Enable 2FA and generate app password
4. **Blocked by provider**: Check provider's security settings