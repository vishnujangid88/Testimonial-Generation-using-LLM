/**
 * Input Validation Middleware
 * Validates testimonial generation requests using Joi
 */

const Joi = require('joi');

/**
 * Validation schema for testimonial generation
 */
const testimonialSchema = Joi.object({
    personName: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Person name is required',
            'any.required': 'Person name is required',
            'string.max': 'Person name must not exceed 100 characters',
        }),

    relationship: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Relationship is required',
            'any.required': 'Relationship is required',
            'string.max': 'Relationship must not exceed 50 characters',
        }),

    characteristics: Joi.array()
        .items(Joi.string().max(50))
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one characteristic is required',
            'any.required': 'At least one characteristic is required',
        }),

    achievements: Joi.string()
        .max(500)
        .allow('')
        .optional()
        .messages({
            'string.max': 'Achievements must not exceed 500 characters',
        }),

    specificMemories: Joi.string()
        .max(500)
        .allow('')
        .optional()
        .messages({
            'string.max': 'Specific memories must not exceed 500 characters',
        }),

    workContext: Joi.string()
        .max(500)
        .allow('')
        .optional()
        .messages({
            'string.max': 'Work context must not exceed 500 characters',
        }),

    tone: Joi.string()
        .valid('professional', 'friendly', 'heartfelt')
        .default('professional')
        .messages({
            'any.only': 'Tone must be one of: professional, friendly, heartfelt',
        }),

    length: Joi.string()
        .valid('short', 'medium', 'long')
        .default('medium')
        .messages({
            'any.only': 'Length must be one of: short, medium, long',
        }),
});

/**
 * Middleware to validate testimonial request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateTestimonialRequest(req, res, next) {
    const { error, value } = testimonialSchema.validate(req.body, {
        abortEarly: false, // Collect all errors
        stripUnknown: true, // Remove unknown fields
    });

    if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                details: errorDetails,
            },
        });
    }

    // Replace request body with validated and sanitized data
    req.body = value;
    next();
}

module.exports = {
    validateTestimonialRequest,
};
