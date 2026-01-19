# API Documentation

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.onrender.com`

## Authentication

Currently, the API does not require authentication. This can be added in future versions.

## Rate Limiting

- **Testimonial Generation**: 15 requests per minute per IP
- **General API**: 30 requests per minute per IP

Rate limit headers are included in responses:
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Requests remaining in current window
- `RateLimit-Reset`: Time when the rate limit resets

## Endpoints

### 1. Generate Testimonial

Generate a personalized testimonial using AI.

**Endpoint**: `POST /api/generate-testimonial`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| `personName` | string | Yes | Name of the person | 1-100 characters |
| `relationship` | string | Yes | Your relationship to the person | 1-50 characters |
| `characteristics` | array | Yes | Key characteristics of the person | Min 1 item, each max 50 chars |
| `achievements` | string | No | Notable achievements | Max 500 characters |
| `specificMemories` | string | No | Specific memories or moments | Max 500 characters |
| `workContext` | string | No | Context of working together | Max 500 characters |
| `tone` | string | No | Writing tone | `professional`, `friendly`, or `heartfelt` (default: `professional`) |
| `length` | string | No | Testimonial length | `short`, `medium`, or `long` (default: `medium`) |

**Example Request**:
```json
{
  "personName": "Sarah Johnson",
  "relationship": "manager",
  "characteristics": ["inspiring", "supportive", "strategic", "empathetic"],
  "achievements": "Grew the team from 5 to 20 people while maintaining culture",
  "specificMemories": "She stayed late to help me prepare for my first client presentation",
  "workContext": "Worked together at TechCorp for 3 years",
  "tone": "heartfelt",
  "length": "medium"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "testimonial": "Working with Sarah Johnson was one of the most transformative experiences of my career. As my manager at TechCorp, Sarah demonstrated an incredible ability to inspire and support her team while making strategic decisions that propelled us forward. I'll never forget when she stayed late to help me prepare for my first client presentation – that's just who Sarah is. Under her leadership, our team grew from 5 to 20 people, yet she never lost sight of maintaining the culture that made us special. Her empathetic approach to leadership created an environment where everyone felt valued and empowered to do their best work. Sarah didn't just manage; she mentored, guided, and genuinely cared about each person's growth and success.",
    "alternatives": [
      "Alternative version focusing more on personal qualities...",
      "Alternative version emphasizing specific achievements..."
    ],
    "metadata": {
      "generatedAt": "2026-01-19T10:30:00.000Z",
      "model": "gemini-2.0-flash-exp",
      "tone": "heartfelt",
      "length": "medium"
    }
  }
}
```

**Error Responses**:

**400 Bad Request** - Validation Error:
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

**429 Too Many Requests** - Rate Limit Exceeded:
```json
{
  "success": false,
  "error": {
    "message": "Too many requests from this IP, please try again later",
    "retryAfter": 60
  }
}
```

**503 Service Unavailable** - AI Service Error:
```json
{
  "success": false,
  "error": {
    "message": "AI service temporarily unavailable"
  }
}
```

---

### 2. Health Check

Check the API health status.

**Endpoint**: `GET /api/health`

**Headers**: None required

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "Testimonial AI Generator",
    "timestamp": "2026-01-19T10:30:00.000Z",
    "uptime": 3600.5
  }
}
```

---

### 3. Root Endpoint

Get API information.

**Endpoint**: `GET /`

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Testimonial AI Generator API",
  "version": "1.0.0",
  "endpoints": {
    "generateTestimonial": "POST /api/generate-testimonial",
    "health": "GET /api/health"
  }
}
```

---

## Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 400 | Bad Request | Invalid input data, missing required fields |
| 404 | Not Found | Invalid endpoint |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server configuration error |
| 503 | Service Unavailable | AI service error, API key issues |

---

## Response Format

All API responses follow this structure:

**Success**:
```json
{
  "success": true,
  "data": { ... }
}
```

**Error**:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": "Additional error information (optional)"
  }
}
```

---

## Tone Guidelines

### Professional
- Formal language
- Focus on work accomplishments
- Professional qualities emphasized
- Suitable for corporate memory books

### Friendly
- Casual, warm language
- Conversational tone
- Personal anecdotes welcome
- Suitable for team memory books

### Heartfelt
- Emotional, sincere language
- Deep appreciation expressed
- Personal connection emphasized
- Suitable for farewell or tribute books

---

## Length Guidelines

| Length | Word Count | Best For |
|--------|------------|----------|
| Short | 50-70 words | Quick tributes, card messages |
| Medium | 100-150 words | Standard memory book entries |
| Long | 200-250 words | Detailed tributes, special occasions |

---

## Integration Example

### JavaScript/Node.js
```javascript
async function generateTestimonial(data) {
  try {
    const response = await fetch('https://your-api.onrender.com/api/generate-testimonial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  } catch (error) {
    console.error('Failed to generate testimonial:', error);
    throw error;
  }
}

// Usage
const testimonialData = {
  personName: 'John Doe',
  relationship: 'teammate',
  characteristics: ['hardworking', 'creative'],
  tone: 'professional',
  length: 'medium',
};

generateTestimonial(testimonialData)
  .then(result => {
    console.log('Main testimonial:', result.testimonial);
    console.log('Alternatives:', result.alternatives);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Python
```python
import requests
import json

def generate_testimonial(data):
    url = 'https://your-api.onrender.com/api/generate-testimonial'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    
    if not result['success']:
        raise Exception(result['error']['message'])
    
    return result['data']

# Usage
testimonial_data = {
    'personName': 'John Doe',
    'relationship': 'teammate',
    'characteristics': ['hardworking', 'creative'],
    'tone': 'professional',
    'length': 'medium'
}

try:
    result = generate_testimonial(testimonial_data)
    print('Main testimonial:', result['testimonial'])
    print('Alternatives:', result['alternatives'])
except Exception as e:
    print('Error:', e)
```

---

## Best Practices

1. **Provide Context**: Include as many optional fields as possible for better results
2. **Be Specific**: Specific memories and achievements lead to more authentic testimonials
3. **Handle Rate Limits**: Implement retry logic with exponential backoff
4. **Cache Results**: Cache generated testimonials to avoid redundant API calls
5. **Error Handling**: Always handle errors gracefully and show user-friendly messages
6. **Validate Input**: Validate input on the client side before sending to API

---

## Changelog

### Version 1.0.0 (2026-01-19)
- Initial release
- Gemini 2.0 Flash integration
- Support for 3 tones and 3 lengths
- Rate limiting implementation
- Input validation with Joi
- Alternative versions generation
