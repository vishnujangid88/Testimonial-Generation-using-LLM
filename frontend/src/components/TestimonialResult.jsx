import { useState } from 'react';

export default function TestimonialResult({ result, loading, error }) {
    const [activeTab, setActiveTab] = useState('main');
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                    </div>
                </div>
                <p className="mt-6 text-gray-600 font-medium">Generating your testimonial...</p>
                <p className="mt-2 text-sm text-gray-500">This may take a few seconds</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card p-8 min-h-[400px]">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
                    <p className="text-gray-600 text-center">{error}</p>
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            <strong>Troubleshooting:</strong>
                        </p>
                        <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
                            <li>Make sure the backend server is running</li>
                            <li>Check that your Gemini API key is set</li>
                            <li>Verify you haven't exceeded rate limits</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-5xl">📝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Generate</h3>
                <p className="text-gray-600 text-center max-w-md">
                    Fill in the form on the left and click "Generate Testimonial" to create a personalized testimonial using AI.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">3</p>
                        <p className="text-xs text-gray-600 mt-1">Tones</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">3</p>
                        <p className="text-xs text-gray-600 mt-1">Lengths</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">3</p>
                        <p className="text-xs text-gray-600 mt-1">Versions</p>
                    </div>
                </div>
            </div>
        );
    }

    const testimonials = [
        { id: 'main', label: 'Main Version', text: result.testimonial },
        ...(result.alternatives || []).map((alt, idx) => ({
            id: `alt${idx + 1}`,
            label: `Alternative ${idx + 1}`,
            text: alt
        }))
    ];

    const activeTestimonial = testimonials.find(t => t.id === activeTab);

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Generated Testimonial</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {result.metadata?.tone}
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                        {result.metadata?.length}
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {testimonials.map(testimonial => (
                    <button
                        key={testimonial.id}
                        onClick={() => setActiveTab(testimonial.id)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${activeTab === testimonial.id
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {testimonial.label}
                    </button>
                ))}
            </div>

            {/* Testimonial Content */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4 min-h-[200px]">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {activeTestimonial?.text}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                    <span>
                        {activeTestimonial?.text.split(' ').length} words
                    </span>
                    <span>
                        Generated at {new Date(result.metadata?.generatedAt).toLocaleTimeString()}
                    </span>
                </div>
            </div>

            {/* Copy Button */}
            <button
                onClick={() => handleCopy(activeTestimonial?.text)}
                className="w-full btn-primary"
            >
                {copied ? (
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied to Clipboard!
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to Clipboard
                    </span>
                )}
            </button>

            {/* Metadata */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold mb-2">AI Model Information</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                        <span className="font-medium">Model:</span> {result.metadata?.model}
                    </div>
                    <div>
                        <span className="font-medium">Versions:</span> {testimonials.length}
                    </div>
                </div>
            </div>
        </div>
    );
}
