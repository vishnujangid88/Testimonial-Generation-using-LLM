# 🤖 AI Testimonial Generator

An AI-powered testimonial generator API built with Node.js and Google Gemini 2.0 Flash, designed for the MemoryBook platform to help users write authentic, personalized testimonials about their colleagues.

## ✨ Features

- **AI-Powered Generation**: Leverages Google Gemini 2.0 Flash for intelligent testimonial creation
- **Multiple Writing Styles**: Choose from professional, friendly, or heartfelt tones
- **Flexible Lengths**: Generate short (50-70 words), medium (100-150 words), or long (200-250 words) testimonials
- **Alternative Versions**: Get 3 unique versions (1 main + 2 alternatives) for every request
- **Smart Prompting**: Context-aware prompts that incorporate relationship details, achievements, and memories
- **Rate Limiting**: Built-in protection to stay within Gemini's free tier (15 requests/minute)
- **Input Validation**: Comprehensive validation using Joi schemas
- **Robust Error Handling**: User-friendly error messages and detailed logging
- **Security**: Helmet.js security headers, CORS configuration, environment variable protection

## 🏗️ Project Structure

```
testimonial-ai-generator/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic (AI, prompts)
│   │   ├── middlewares/       # Validation, errors, rate limiting
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utilities (logger, formatter)
│   │   └── app.js             # Express app setup
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Dependencies
│   ├── server.js              # Server entry point
│   └── README.md              # Backend documentation
├── frontend/                   # Optional React testing UI
│   └── (to be implemented)
├── docs/                       # Documentation
│   ├── API_DOCUMENTATION.md   # Complete API reference
│   └── DEPLOYMENT_GUIDE.md    # Deployment instructions
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- npm or yarn
- Google Gemini API key ([Get one free](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishnujangid88/Testimonial-Generation-using-LLM.git
   cd Testimonial-Generation-using-LLM/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the API**
   ```bash
   curl http://localhost:3000/api/health
   ```

## 📡 API Usage

### Generate a Testimonial

```bash
curl -X POST http://localhost:3000/api/generate-testimonial \
  -H "Content-Type: application/json" \
  -d '{
    "personName": "Sarah Johnson",
    "relationship": "manager",
    "characteristics": ["inspiring", "supportive", "strategic"],
    "achievements": "Grew the team from 5 to 20 people",
    "specificMemories": "Stayed late to help me with my first presentation",
    "tone": "heartfelt",
    "length": "medium"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "testimonial": "Working with Sarah Johnson was transformative...",
    "alternatives": [
      "Alternative version 1...",
      "Alternative version 2..."
    ],
    "metadata": {
      "generatedAt": "2026-01-19T10:30:00Z",
      "model": "gemini-2.0-flash-exp",
      "tone": "heartfelt",
      "length": "medium"
    }
  }
}
```

## 📚 Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete API reference with examples
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Step-by-step deployment to Render.com
- **[Backend README](backend/README.md)** - Backend-specific documentation

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Model**: Google Gemini 2.0 Flash
- **Validation**: Joi
- **Security**: Helmet.js, CORS
- **Rate Limiting**: express-rate-limit

### Deployment
- **Platform**: Render.com (free tier)
- **CI/CD**: Automatic deployment on git push

## 🎯 Use Cases

This API is designed for the **MemoryBook platform** but can be used for:

- Corporate memory books
- Team farewell books
- Employee recognition programs
- Retirement tributes
- Colleague appreciation events
- LinkedIn recommendations (with tone adjustments)

## 🔐 Security & Privacy

- **No Data Storage**: The API does not store any testimonials or user data
- **Environment Variables**: All sensitive data (API keys) stored securely
- **Rate Limiting**: Prevents abuse and stays within API quotas
- **Input Validation**: All inputs sanitized and validated
- **CORS Protection**: Only allowed origins can access the API

## 📊 Rate Limits

- **Testimonial Generation**: 15 requests/minute per IP
- **General API**: 30 requests/minute per IP

These limits align with Gemini's free tier (15 RPM, 1,500 RPD).

## 🚢 Deployment

### Deploy to Render.com (Free)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set environment variables
5. Deploy!

See the [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for detailed instructions.

### Environment Variables

Required:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `NODE_ENV` - `development` or `production`
- `PORT` - Server port (default: 3000)

Optional:
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 60000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 15)

## 🧪 Testing

### Manual Testing

Use the provided cURL examples or Postman collection.

### Test Cases

- ✅ Valid request with all fields
- ✅ Valid request with only required fields
- ✅ Invalid request (missing required fields)
- ✅ Different tones (professional, friendly, heartfelt)
- ✅ Different lengths (short, medium, long)
- ✅ Rate limiting (20+ requests in 1 minute)
- ✅ Alternative versions generation
- ✅ Error responses
- ✅ CORS from different origins
- ✅ Health check endpoint

## 🔌 Integration with MemoryBook

```javascript
// Example integration
async function generateTestimonialWithAI(formData) {
  const response = await fetch('https://your-api.onrender.com/api/generate-testimonial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personName: formData.personName,
      relationship: formData.relationship,
      characteristics: formData.selectedCharacteristics,
      achievements: formData.achievements,
      tone: formData.preferredTone,
      length: 'medium'
    })
  });
  
  const data = await response.json();
  return data.success ? data.data.testimonial : null;
}
```

## 🐛 Troubleshooting

### Common Issues

**"GEMINI_API_KEY is not set"**
- Verify `.env` file exists and contains your API key
- Restart the server after updating `.env`

**Rate limit errors**
- Wait 60 seconds before making more requests
- Consider upgrading to Gemini's paid tier for higher limits

**CORS errors**
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart the server after updating CORS settings

See [Backend README](backend/README.md) for more troubleshooting tips.

## 📈 Future Enhancements

- [ ] Frontend testing UI (React + Vite + Tailwind)
- [ ] Authentication and API keys
- [ ] Usage analytics and monitoring
- [ ] Support for multiple languages
- [ ] Testimonial templates library
- [ ] Batch generation endpoint
- [ ] Webhook support for async generation
- [ ] Caching layer for common requests

## 🤝 Contributing

This is a project for the MemoryBook platform. For questions or contributions, please contact the development team.

## 📄 License

ISC

## 🙏 Acknowledgments

- **Google Gemini** for providing the AI model
- **Render.com** for free hosting
- **MemoryBook team** for the project requirements

---

**Built with ❤️ for the MemoryBook platform**

For detailed API documentation, see [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

For deployment instructions, see [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
