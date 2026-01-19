/**
 * Server Entry Point
 * Starts the Express server
 */

const createApp = require('./src/app');
const config = require('./src/config/app.config');
const logger = require('./src/utils/logger');

// Create Express app
const app = createApp();

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    logger.info(`🚀 Server is running on port ${PORT}`);
    logger.info(`📝 Environment: ${config.nodeEnv}`);
    logger.info(`🤖 AI Model: ${config.gemini.model}`);
    logger.info(`⏱️  Rate Limit: ${config.rateLimit.maxRequests} requests per ${config.rateLimit.windowMs / 1000} seconds`);

    if (config.nodeEnv === 'development') {
        logger.info(`🔗 API available at: http://localhost:${PORT}`);
        logger.info(`💚 Health check: http://localhost:${PORT}/api/health`);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
