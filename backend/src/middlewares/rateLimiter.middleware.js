/**
 * Rate Limiter Middleware
 * Protects API from excessive requests
 */

const rateLimit = require('express-rate-limit');
const config = require('../config/app.config');

/**
 * Rate limiter for testimonial generation endpoint
 * Limits requests to stay within Gemini's free tier limits (15 RPM)
 */
const testimonialRateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
        success: false,
        error: {
            message: 'Too many requests, please try again later',
            retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
        },
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many requests from this IP, please try again later',
                retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
            },
        });
    },
});

/**
 * General API rate limiter (more lenient)
 */
const generalRateLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 30, // 30 requests per minute
    message: {
        success: false,
        error: {
            message: 'Too many requests, please slow down',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    testimonialRateLimiter,
    generalRateLimiter,
};
