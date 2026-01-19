/**
 * AI Service
 * Handles all interactions with Google Gemini AI
 */

const { initializeGemini } = require('../config/gemini.config');
const config = require('../config/app.config');
const { generateTestimonialPrompt, generateAlternativePrompt } = require('./prompt.service');

/**
 * Generates a testimonial using Gemini AI
 * @param {Object} params - Testimonial parameters
 * @returns {Promise<Object>} Generated testimonial data
 */
async function generateTestimonial(params) {
    try {
        const genAI = initializeGemini();
        const model = genAI.getGenerativeModel({
            model: config.gemini.model,
        });

        // Generate main testimonial
        const mainPrompt = generateTestimonialPrompt(params);
        const mainResult = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: mainPrompt }] }],
            generationConfig: {
                temperature: config.gemini.temperature,
                maxOutputTokens: config.gemini.maxOutputTokens,
            },
        });

        const mainTestimonial = mainResult.response.text().trim();

        // Generate alternative versions
        const alternatives = await generateAlternatives(model, mainPrompt);

        return {
            testimonial: mainTestimonial,
            alternatives,
            metadata: {
                generatedAt: new Date().toISOString(),
                model: config.gemini.model,
                tone: params.tone || 'professional',
                length: params.length || 'medium',
            },
        };
    } catch (error) {
        console.error('Error generating testimonial:', error);
        throw new Error(`Failed to generate testimonial: ${error.message}`);
    }
}

/**
 * Generates alternative versions of the testimonial
 * @param {Object} model - Gemini model instance
 * @param {string} originalPrompt - Original prompt
 * @returns {Promise<Array<string>>} Array of alternative testimonials
 */
async function generateAlternatives(model, originalPrompt) {
    const alternatives = [];

    try {
        // Generate 2 alternative versions
        for (let i = 1; i <= 2; i++) {
            const altPrompt = generateAlternativePrompt(originalPrompt, i);
            const altResult = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: altPrompt }] }],
                generationConfig: {
                    temperature: config.gemini.temperature + 0.1, // Slightly higher temperature for variety
                    maxOutputTokens: config.gemini.maxOutputTokens,
                },
            });

            alternatives.push(altResult.response.text().trim());
        }
    } catch (error) {
        console.error('Error generating alternatives:', error);
        // Return empty array if alternatives fail - main testimonial is still valid
    }

    return alternatives;
}

module.exports = {
    generateTestimonial,
};
