import { useState } from 'react';
import { generateTestimonial } from './services/api';
import TestimonialForm from './components/TestimonialForm';
import TestimonialResult from './components/TestimonialResult';

function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (formData) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await generateTestimonial(formData);

            if (response.success) {
                setResult(response.data);
            } else {
                setError(response.error?.message || 'Failed to generate testimonial');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        🤖 AI Testimonial Generator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Create authentic, personalized testimonials for your colleagues using AI.
                        Perfect for memory books, farewell cards, and appreciation events.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="animate-slide-up">
                        <TestimonialForm
                            onGenerate={handleGenerate}
                            loading={loading}
                            onReset={handleReset}
                        />
                    </div>

                    {/* Result Section */}
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <TestimonialResult
                            result={result}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Powered by Google Gemini 2.0 Flash • Built for MemoryBook Platform</p>
                </div>
            </div>
        </div>
    );
}

export default App;
