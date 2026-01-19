/**
 * Testimonial Controller
 * Handles testimonial generation requests
 */

const { generateTestimonial } = require('../services/ai.service');
const logger = require('../utils/logger');

/**
 * Generate testimonial handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function generateTestimonialHandler(req, res, next) {
    try {
        logger.info('Testimonial generation request received', {
            personName: req.body.personName,
            tone: req.body.tone,
            length: req.body.length,
        });

        // Generate testimonial using AI service
        const result = await generateTestimonial(req.body);

        logger.info('Testimonial generated successfully', {
            personName: req.body.personName,
            alternativesCount: result.alternatives.length,
        });

        // Send success response
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        logger.error('Failed to generate testimonial', {
            error: error.message,
            personName: req.body.personName,
        });
        next(error);
    }
}

/**
 * Health check handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function healthCheckHandler(req, res) {
    res.status(200).json({
        success: true,
        data: {
            status: 'healthy',
            service: 'Testimonial AI Generator',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
    });
}

module.exports = {
    generateTestimonialHandler,
    healthCheckHandler,
};
