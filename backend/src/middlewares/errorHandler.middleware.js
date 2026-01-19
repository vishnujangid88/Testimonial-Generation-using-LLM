/**
 * Error Handler Middleware
 * Global error handling for the application
 */

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function errorHandler(err, req, res, next) {
    // Log error for debugging
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }

    if (err.message.includes('GEMINI_API_KEY')) {
        statusCode = 500;
        message = 'AI service configuration error';
    }

    if (err.message.includes('Failed to generate testimonial')) {
        statusCode = 503;
        message = 'AI service temporarily unavailable';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && {
                details: err.message,
                stack: err.stack,
            }),
        },
    });
}

/**
 * 404 Not Found handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            path: req.path,
        },
    });
}

module.exports = {
    errorHandler,
    notFoundHandler,
};
