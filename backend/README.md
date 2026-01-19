# Testimonial AI Generator - Backend

AI-powered testimonial generator API using Google Gemini 2.0 Flash for the MemoryBook platform.

## 🚀 Features

- **AI-Powered Generation**: Uses Google Gemini 2.0 Flash to generate authentic, personalized testimonials
- **Multiple Tones**: Professional, friendly, or heartfelt writing styles
- **Flexible Length**: Short (50-70 words), medium (100-150 words), or long (200-250 words)
- **Alternative Versions**: Generates 3 versions (1 main + 2 alternatives) for each request
- **Rate Limiting**: Built-in protection to stay within Gemini's free tier limits (15 RPM)
- **Input Validation**: Comprehensive validation using Joi
- **Error Handling**: Robust error handling with user-friendly messages
- **Security**: Helmet.js for security headers, CORS configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Gemini API key:
   ```env
   PORT=3000
   NODE_ENV=development
   GEMINI_API_KEY=your_actual_api_key_here
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX_REQUESTS=15
   ALLOWED_ORIGINS=http://localhost:5173,https://memorybook.com
   ```

## 🏃 Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Generate Testimonial

**POST** `/api/generate-testimonial`

Generate a personalized testimonial using AI.

**Request Body:**
```json
{
  "personName": "John Doe",
  "relationship": "teammate",
  "characteristics": ["hardworking", "creative", "supportive"],
  "achievements": "Led the Q4 project successfully",
  "tone": "professional",
  "length": "medium",
  "specificMemories": "Helped me debug a critical issue",
  "workContext": "We worked together for 2 years"
}
```

**Required Fields:**
- `personName` (string, 1-100 chars)
- `relationship` (string, 1-50 chars)
- `characteristics` (array of strings, min 1 item)

**Optional Fields:**
- `achievements` (string, max 500 chars)
- `specificMemories` (string, max 500 chars)
- `workContext` (string, max 500 chars)
- `tone` (enum: `professional`, `friendly`, `heartfelt`, default: `professional`)
- `length` (enum: `short`, `medium`, `long`, default: `medium`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "testimonial": "Generated testimonial text...",
    "alternatives": [
      "Alternative version 1...",
      "Alternative version 2..."
    ],
    "metadata": {
      "generatedAt": "2026-01-19T10:30:00Z",
      "model": "gemini-2.0-flash-exp",
      "tone": "professional",
      "length": "medium"
    }
  }
}
```

**Error Response (400 - Validation Error):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      "Person name is required",
      "At least one characteristic is required"
    ]
  }
}
```

**Error Response (429 - Rate Limit):**
```json
{
  "success": false,
  "error": {
    "message": "Too many requests from this IP, please try again later",
    "retryAfter": 60
  }
}
```

### Health Check

**GET** `/api/health`

Check API health status.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "Testimonial AI Generator",
    "timestamp": "2026-01-19T10:30:00Z",
    "uptime": 3600
  }
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Generate testimonial
curl -X POST http://localhost:3000/api/generate-testimonial \
  -H "Content-Type: application/json" \
  -d '{
    "personName": "Sarah Johnson",
    "relationship": "manager",
    "characteristics": ["inspiring", "supportive", "strategic"],
    "achievements": "Grew the team from 5 to 20 people",
    "tone": "heartfelt",
    "length": "medium"
  }'
```

### Using Postman

1. Create a new POST request to `http://localhost:3000/api/generate-testimonial`
2. Set header: `Content-Type: application/json`
3. Add request body (see example above)
4. Send request

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── app.config.js          # Application configuration
│   │   └── gemini.config.js       # Gemini AI configuration
│   ├── controllers/
│   │   └── testimonial.controller.js  # Request handlers
│   ├── services/
│   │   ├── ai.service.js          # Gemini AI integration
│   │   └── prompt.service.js      # Prompt generation
│   ├── middlewares/
│   │   ├── validator.middleware.js     # Input validation
│   │   ├── errorHandler.middleware.js  # Error handling
│   │   └── rateLimiter.middleware.js   # Rate limiting
│   ├── routes/
│   │   └── testimonial.routes.js  # API routes
│   ├── utils/
│   │   ├── logger.js              # Logging utility
│   │   └── responseFormatter.js   # Response formatting
│   └── app.js                     # Express app setup
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # Dependencies
├── server.js                      # Server entry point
└── README.md                      # This file
```

## 🔒 Security Features

- **Helmet.js**: Sets security-related HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse (15 requests/minute for testimonial generation)
- **Input Validation**: Joi schema validation for all inputs
- **Environment Variables**: Sensitive data stored in .env file

## 🚢 Deployment

See [DEPLOYMENT_GUIDE.md](../docs/DEPLOYMENT_GUIDE.md) for detailed deployment instructions for Render.com.

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"
- Make sure you've created a `.env` file
- Verify your API key is correctly set in the `.env` file
- Restart the server after updating `.env`

### Rate limit errors
- The API is limited to 15 requests per minute to stay within Gemini's free tier
- Wait 60 seconds before making more requests
- Consider upgrading to Gemini's paid tier for higher limits

### CORS errors
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart the server after updating CORS settings

## 📝 License

ISC

## 🤝 Contributing

This is a project for the MemoryBook platform. For questions or issues, please contact the development team.
