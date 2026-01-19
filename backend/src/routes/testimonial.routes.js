/**
 * Testimonial Routes
 * Defines API routes for testimonial generation
 */

const express = require('express');
const { generateTestimonialHandler, healthCheckHandler } = require('../controllers/testimonial.controller');
const { validateTestimonialRequest } = require('../middlewares/validator.middleware');
const { testimonialRateLimiter } = require('../middlewares/rateLimiter.middleware');

const router = express.Router();

/**
 * POST /api/generate-testimonial
 * Generate a testimonial using AI
 */
router.post(
    '/generate-testimonial',
    testimonialRateLimiter,
    validateTestimonialRequest,
    generateTestimonialHandler
);

/**
 * GET /health
 * Health check endpoint
 */
router.get('/health', healthCheckHandler);

module.exports = router;
