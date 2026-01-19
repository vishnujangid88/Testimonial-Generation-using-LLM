# Testimonial AI Generator - Frontend

Beautiful, modern testing UI for the AI Testimonial Generator API built with React, Vite, and Tailwind CSS.

## 🎨 Features

- **Premium Design**: Glassmorphism effects, gradient backgrounds, smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive Form**: Easy-to-use form with all testimonial options
- **Real-time Feedback**: Loading states, error handling, success messages
- **Multiple Versions**: View and compare 3 different testimonial versions
- **Copy to Clipboard**: One-click copy functionality
- **Character Counters**: Real-time character count for text fields
- **Validation**: Client-side validation before API calls

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- Backend API running on `http://localhost:3000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file should already exist with:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 🎯 How to Use

1. **Fill in the form:**
   - Enter the person's name (required)
   - Select your relationship
   - Choose key characteristics (at least 1 required)
   - Add optional details: achievements, memories, work context
   - Select tone: Professional, Friendly, or Heartfelt
   - Choose length: Short, Medium, or Long

2. **Generate testimonial:**
   - Click "Generate Testimonial"
   - Wait for AI to create your testimonial (usually 3-5 seconds)

3. **Review results:**
   - View the main version and 2 alternatives
   - Switch between versions using tabs
   - Copy your favorite version to clipboard

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TestimonialForm.jsx    # Input form component
│   │   └── TestimonialResult.jsx  # Results display component
│   ├── services/
│   │   └── api.js                 # API integration
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind styles
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue to Indigo gradient
- **Background**: Soft gradient from slate to blue to indigo
- **Cards**: Glassmorphism with backdrop blur

### Animations
- Fade-in on page load
- Slide-up for cards
- Smooth transitions on all interactions
- Loading spinner with emoji

### Components
- **Glass Cards**: Semi-transparent cards with blur effect
- **Gradient Buttons**: Eye-catching call-to-action buttons
- **Interactive Toggles**: Characteristic and option selectors
- **Tabs**: Clean tab interface for alternatives

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## 🐛 Troubleshooting

### "No response from server"
- Make sure the backend is running on port 3000
- Check that `VITE_API_URL` in `.env` is correct
- Verify CORS is configured in the backend

### Styles not loading
- Make sure Tailwind is properly configured
- Check that `index.css` is imported in `main.jsx`
- Try clearing cache and restarting dev server

### Build errors
- Delete `node_modules` and run `npm install` again
- Make sure all dependencies are installed
- Check Node.js version (should be v14+)

## 📱 Responsive Design

The UI is fully responsive and works on:
- **Desktop**: Full two-column layout
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single column, touch-friendly buttons

## 🎯 Integration with Backend

The frontend expects the backend API to be available at the URL specified in `VITE_API_URL`.

**API Endpoints Used:**
- `POST /api/generate-testimonial` - Generate testimonial
- `GET /api/health` - Health check (optional)

**Request Format:**
```javascript
{
  personName: string,
  relationship: string,
  characteristics: string[],
  achievements?: string,
  specificMemories?: string,
  workContext?: string,
  tone: 'professional' | 'friendly' | 'heartfelt',
  length: 'short' | 'medium' | 'long'
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`
4. Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Import project to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`

## 📄 License

ISC

## 🙏 Credits

Built with:
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

---

**Part of the AI Testimonial Generator project for MemoryBook platform**
