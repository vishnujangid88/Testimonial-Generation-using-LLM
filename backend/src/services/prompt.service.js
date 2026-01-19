/**
 * Prompt Service
 * Generates smart prompts for the Gemini AI based on user input
 */

/**
 * Generates a testimonial prompt based on user input
 * @param {Object} params - Testimonial parameters
 * @param {string} params.personName - Name of the person
 * @param {string} params.relationship - Relationship to the person
 * @param {Array<string>} params.characteristics - Key characteristics
 * @param {string} params.achievements - Notable achievements
 * @param {string} params.specificMemories - Specific memories
 * @param {string} params.workContext - Work context
 * @param {string} params.tone - Desired tone (professional/friendly/heartfelt)
 * @param {string} params.length - Desired length (short/medium/long)
 * @returns {string} Generated prompt for AI
 */
function generateTestimonialPrompt(params) {
    const {
        personName,
        relationship,
        characteristics,
        achievements,
        specificMemories,
        workContext,
        tone = 'professional',
        length = 'medium',
    } = params;

    // Define word count ranges
    const wordCounts = {
        short: '50-70',
        medium: '100-150',
        long: '200-250',
    };

    // Define tone guidelines
    const toneGuidelines = {
        professional: 'Use professional language while maintaining warmth. Focus on work accomplishments and professional qualities.',
        friendly: 'Use casual, warm language as if writing to a friend. Be conversational and genuine.',
        heartfelt: 'Use emotional, sincere language. Express genuine appreciation and personal connection.',
    };

    const prompt = `You are writing a testimonial for a colleague's memory book (not LinkedIn or a professional recommendation). This is a personal tribute that will be cherished.

PERSON DETAILS:
- Name: ${personName}
- Relationship: ${relationship}
${characteristics && characteristics.length > 0 ? `- Key characteristics: ${characteristics.join(', ')}` : ''}
${achievements ? `- Notable achievements: ${achievements}` : ''}
${specificMemories ? `- Specific memories: ${specificMemories}` : ''}
${workContext ? `- Work context: ${workContext}` : ''}

WRITING GUIDELINES:
- Tone: ${tone} - ${toneGuidelines[tone]}
- Length: ${wordCounts[length]} words
- Be authentic and specific - avoid generic corporate language
- Include concrete examples when possible
- Focus on personal impact and connection
- Make it memorable and heartfelt
- Avoid clichés like "team player" or "go-to person" unless backed by specific examples
- Write in first person (I/we worked with...)
- End with a meaningful closing thought

Write a testimonial that captures the essence of ${personName} and your experience working together. Make it personal, specific, and memorable.`;

    return prompt;
}

/**
 * Generates a prompt for alternative versions
 * @param {string} originalPrompt - The original prompt
 * @param {number} versionNumber - Version number (1 or 2)
 * @returns {string} Modified prompt for alternative version
 */
function generateAlternativePrompt(originalPrompt, versionNumber) {
    const variations = [
        '\n\nIMPORTANT: Create a different version with a slightly different angle or emphasis. Focus more on personal qualities and character.',
        '\n\nIMPORTANT: Create a different version with a slightly different angle or emphasis. Focus more on specific achievements and memorable moments.',
    ];

    return originalPrompt + variations[versionNumber - 1];
}

module.exports = {
    generateTestimonialPrompt,
    generateAlternativePrompt,
};
