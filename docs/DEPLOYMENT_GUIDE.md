# Deployment Guide - Render.com

This guide will walk you through deploying the Testimonial AI Generator API to Render.com's free tier.

## Prerequisites

- GitHub account
- Render.com account ([Sign up here](https://render.com))
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Testimonial AI Generator"
   git branch -M main
   git remote add origin https://github.com/yourusername/testimonial-ai-generator.git
   git push -u origin main
   ```

2. **Verify your repository structure**:
   ```
   testimonial-ai-generator/
   ├── backend/
   │   ├── src/
   │   ├── .env.example
   │   ├── .gitignore
   │   ├── package.json
   │   ├── server.js
   │   └── README.md
   └── docs/
   ```

3. **Important**: Make sure `.env` is in your `.gitignore` file (it should be)

## Step 2: Create a Web Service on Render

1. **Log in to Render.com**
   - Go to [https://render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create a New Web Service**
   - Click "New +" button in the top right
   - Select "Web Service"

3. **Connect Your Repository**
   - Click "Connect account" if you haven't connected GitHub yet
   - Find and select your `testimonial-ai-generator` repository
   - Click "Connect"

## Step 3: Configure Your Web Service

Fill in the following settings:

### Basic Settings

| Field | Value |
|-------|-------|
| **Name** | `testimonial-ai-generator` (or your preferred name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Instance Type

- Select **Free** (this gives you 750 hours/month free)

## Step 4: Add Environment Variables

In the "Environment Variables" section, add the following:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `GEMINI_API_KEY` | Your actual Gemini API key |
| `RATE_LIMIT_WINDOW_MS` | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | `15` |
| `ALLOWED_ORIGINS` | Your frontend URLs (comma-separated) |

**Example ALLOWED_ORIGINS**:
```
https://memorybook.com,https://www.memorybook.com,http://localhost:5173
```

### How to Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into the `GEMINI_API_KEY` field

## Step 5: Deploy

1. **Click "Create Web Service"**
   - Render will start building your application
   - This may take 2-5 minutes

2. **Monitor the deployment**
   - You'll see build logs in real-time
   - Wait for "Build successful" message
   - Then wait for "Your service is live" message

3. **Get your API URL**
   - Once deployed, you'll see your URL at the top
   - Format: `https://testimonial-ai-generator.onrender.com`
   - Copy this URL for testing

## Step 6: Test Your Deployment

### Test Health Check

```bash
curl https://your-app-name.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "Testimonial AI Generator",
    "timestamp": "2026-01-19T10:30:00.000Z",
    "uptime": 123.45
  }
}
```

### Test Testimonial Generation

```bash
curl -X POST https://your-app-name.onrender.com/api/generate-testimonial \
  -H "Content-Type: application/json" \
  -d '{
    "personName": "Test User",
    "relationship": "colleague",
    "characteristics": ["helpful", "creative"],
    "tone": "professional",
    "length": "short"
  }'
```

## Step 7: Configure Custom Domain (Optional)

1. **In Render Dashboard**:
   - Go to your service settings
   - Click "Custom Domain"
   - Add your domain (e.g., `api.memorybook.com`)

2. **Update DNS Settings**:
   - Add CNAME record pointing to your Render URL
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update CORS Settings**:
   - Add your custom domain to `ALLOWED_ORIGINS` environment variable
   - Redeploy the service

## Important Notes About Free Tier

### Limitations
- **Sleeps after 15 minutes of inactivity**
  - First request after sleep takes ~30 seconds to wake up
  - Subsequent requests are fast
- **750 hours/month** (enough for one service running 24/7)
- **Shared CPU and 512MB RAM**

### Keeping Your Service Awake (Optional)

If you want to prevent sleeping, you can:

1. **Use a monitoring service** (e.g., UptimeRobot)
   - Set up a ping every 10 minutes to `/api/health`
   - Free tier available

2. **Upgrade to paid tier** ($7/month)
   - No sleeping
   - More resources
   - Better performance

## Troubleshooting

### Build Fails

**Error**: `npm install` fails
- **Solution**: Check that `package.json` is in the `backend` folder
- **Solution**: Verify "Root Directory" is set to `backend`

**Error**: Module not found
- **Solution**: Make sure all dependencies are in `package.json`
- **Solution**: Run `npm install` locally to verify

### Service Crashes on Start

**Error**: "GEMINI_API_KEY is not set"
- **Solution**: Add `GEMINI_API_KEY` to environment variables
- **Solution**: Verify the key is correct

**Error**: Port binding error
- **Solution**: Make sure `PORT` environment variable is set to `3000`
- **Solution**: Verify your code uses `process.env.PORT`

### API Returns Errors

**Error**: CORS errors
- **Solution**: Add your frontend URL to `ALLOWED_ORIGINS`
- **Solution**: Make sure URLs don't have trailing slashes

**Error**: 503 Service Unavailable
- **Solution**: Check Gemini API key is valid
- **Solution**: Verify you haven't exceeded Gemini's free tier limits
- **Solution**: Check Render logs for detailed error messages

### Viewing Logs

1. Go to your service in Render dashboard
2. Click "Logs" tab
3. View real-time logs
4. Look for error messages

## Updating Your Deployment

### Automatic Deployment

Render automatically deploys when you push to your connected branch:

```bash
git add .
git commit -m "Update API"
git push origin main
```

Render will automatically:
1. Detect the push
2. Build your application
3. Deploy the new version
4. Zero-downtime deployment

### Manual Deployment

1. Go to Render dashboard
2. Click "Manual Deploy"
3. Select "Deploy latest commit"

## Monitoring

### Built-in Monitoring

Render provides:
- **Metrics**: CPU, memory, bandwidth usage
- **Logs**: Real-time application logs
- **Events**: Deployment history

Access these in your service dashboard.

### External Monitoring (Recommended)

Set up external monitoring for better visibility:

1. **UptimeRobot** (Free)
   - Monitor uptime
   - Get alerts when service is down
   - Ping every 5 minutes

2. **Better Stack** (Free tier available)
   - Log aggregation
   - Error tracking
   - Performance monitoring

## Security Best Practices

1. **Never commit `.env` file**
   - Always use environment variables in Render
   - Keep API keys secret

2. **Update ALLOWED_ORIGINS**
   - Only allow your actual frontend domains
   - Remove `localhost` from production

3. **Monitor API usage**
   - Check Render metrics regularly
   - Watch for unusual traffic patterns

4. **Rotate API keys periodically**
   - Update Gemini API key every few months
   - Update in Render environment variables

## Cost Optimization

### Free Tier Strategy

- **One service**: Use free tier for API
- **Multiple services**: Upgrade to paid tier or use different platforms

### Upgrading

When to upgrade from free tier:
- Need 24/7 availability (no sleeping)
- Exceed 750 hours/month
- Need more resources (CPU/RAM)
- Want faster response times

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Test all endpoints
3. 📱 Deploy frontend (optional)
4. 🔗 Integrate with MemoryBook platform
5. 📊 Set up monitoring
6. 🚀 Go live!

## Support

- **Render Documentation**: [https://render.com/docs](https://render.com/docs)
- **Render Community**: [https://community.render.com](https://community.render.com)
- **Gemini API Docs**: [https://ai.google.dev/docs](https://ai.google.dev/docs)

## Checklist

Before going live, verify:

- [ ] API is deployed and accessible
- [ ] Health check endpoint works
- [ ] Testimonial generation works
- [ ] Rate limiting is active
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Logs show no errors
- [ ] External monitoring is set up
- [ ] Frontend can connect to API
- [ ] Error handling works as expected

---

**Congratulations! Your Testimonial AI Generator is now live! 🎉**
