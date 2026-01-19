/**
 * Google Gemini AI Configuration
 * Initializes and exports the Gemini AI client
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./app.config');

/**
 * Initialize Gemini AI client
 * @returns {GoogleGenerativeAI} Configured Gemini AI instance
 */
function initializeGemini() {
    if (!config.gemini.apiKey) {
        throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    return new GoogleGenerativeAI(config.gemini.apiKey);
}

module.exports = { initializeGemini };
