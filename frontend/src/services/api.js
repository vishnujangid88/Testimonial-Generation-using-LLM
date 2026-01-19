/**
 * API Service
 * Handles communication with the testimonial generator backend
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Generate a testimonial using the AI API
 * @param {Object} data - Testimonial request data
 * @returns {Promise<Object>} Generated testimonial data
 */
export async function generateTestimonial(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/generate-testimonial`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with error
            throw new Error(error.response.data.error?.message || 'Failed to generate testimonial');
        } else if (error.request) {
            // Request made but no response
            throw new Error('No response from server. Make sure the backend is running.');
        } else {
            // Something else happened
            throw new Error('Failed to send request');
        }
    }
}

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/health`);
        return response.data;
    } catch (error) {
        throw new Error('Backend is not responding');
    }
}
