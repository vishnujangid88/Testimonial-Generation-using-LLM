/**
 * Express Application Setup
 * Configures and exports the Express app
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/app.config');
const testimonialRoutes = require('./routes/testimonial.routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler.middleware');
const { generalRateLimiter } = require('./middlewares/rateLimiter.middleware');
const logger = require('./utils/logger');

/**
 * Initialize Express application
 * @returns {Object} Configured Express app
 */
function createApp() {
    const app = express();

    // Security middleware
    app.use(helmet());

    // CORS configuration
    app.use(cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            if (config.cors.allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }));

    // Body parser middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // General rate limiting
    app.use(generalRateLimiter);

    // Request logging
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.path}`, {
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });
        next();
    });

    // API routes
    app.use('/api', testimonialRoutes);

    // Root endpoint
    app.get('/', (req, res) => {
        res.json({
            success: true,
            message: 'Testimonial AI Generator API',
            version: '1.0.0',
            endpoints: {
                generateTestimonial: 'POST /api/generate-testimonial',
                health: 'GET /api/health',
            },
        });
    });

    // 404 handler
    app.use(notFoundHandler);

    // Global error handler (must be last)
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
