/**
 * Logger Utility
 * Simple logging utility for the application
 */

/**
 * Log levels
 */
const LogLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
};

/**
 * Formats log message with timestamp
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 * @returns {string} Formatted log message
 */
function formatLog(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${level}] ${message} ${metaStr}`;
}

/**
 * Logger object with different log levels
 */
const logger = {
    info: (message, meta = {}) => {
        console.log(formatLog(LogLevel.INFO, message, meta));
    },

    warn: (message, meta = {}) => {
        console.warn(formatLog(LogLevel.WARN, message, meta));
    },

    error: (message, meta = {}) => {
        console.error(formatLog(LogLevel.ERROR, message, meta));
    },

    debug: (message, meta = {}) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(formatLog(LogLevel.DEBUG, message, meta));
        }
    },
};

module.exports = logger;
