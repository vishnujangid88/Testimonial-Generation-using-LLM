/**
 * Response Formatter Utility
 * Standardizes API responses
 */

/**
 * Formats a success response
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted response
 */
function successResponse(data, statusCode = 200) {
    return {
        statusCode,
        body: {
            success: true,
            data,
        },
    };
}

/**
 * Formats an error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Array|Object} details - Additional error details
 * @returns {Object} Formatted error response
 */
function errorResponse(message, statusCode = 500, details = null) {
    return {
        statusCode,
        body: {
            success: false,
            error: {
                message,
                ...(details && { details }),
            },
        },
    };
}

module.exports = {
    successResponse,
    errorResponse,
};
