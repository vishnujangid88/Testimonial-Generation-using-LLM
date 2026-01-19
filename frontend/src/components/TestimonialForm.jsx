import { useState } from 'react';

const CHARACTERISTICS_OPTIONS = [
    'Hardworking', 'Creative', 'Supportive', 'Inspiring', 'Strategic',
    'Empathetic', 'Innovative', 'Reliable', 'Collaborative', 'Visionary',
    'Dedicated', 'Passionate', 'Mentoring', 'Problem-solver', 'Leader'
];

const RELATIONSHIP_OPTIONS = [
    'Teammate', 'Manager', 'Direct Report', 'Mentor', 'Mentee',
    'Colleague', 'Project Partner', 'Team Lead', 'Peer'
];

export default function TestimonialForm({ onGenerate, loading, onReset }) {
    const [formData, setFormData] = useState({
        personName: '',
        relationship: 'Teammate',
        characteristics: [],
        achievements: '',
        specificMemories: '',
        workContext: '',
        tone: 'professional',
        length: 'medium',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCharacteristicToggle = (characteristic) => {
        setFormData(prev => ({
            ...prev,
            characteristics: prev.characteristics.includes(characteristic)
                ? prev.characteristics.filter(c => c !== characteristic)
                : [...prev.characteristics, characteristic]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(formData);
    };

    const handleClear = () => {
        setFormData({
            personName: '',
            relationship: 'Teammate',
            characteristics: [],
            achievements: '',
            specificMemories: '',
            workContext: '',
            tone: 'professional',
            length: 'medium',
        });
        onReset();
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonial Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Person Name */}
                <div>
                    <label className="label-text">
                        Person's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="personName"
                        value={formData.personName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., Sarah Johnson"
                        required
                    />
                </div>

                {/* Relationship */}
                <div>
                    <label className="label-text">
                        Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        className="input-field"
                        required
                    >
                        {RELATIONSHIP_OPTIONS.map(rel => (
                            <option key={rel} value={rel}>{rel}</option>
                        ))}
                    </select>
                </div>

                {/* Characteristics */}
                <div>
                    <label className="label-text">
                        Key Characteristics <span className="text-red-500">*</span>
                        <span className="text-gray-500 font-normal ml-2">
                            (Select at least 1)
                        </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {CHARACTERISTICS_OPTIONS.map(char => (
                            <button
                                key={char}
                                type="button"
                                onClick={() => handleCharacteristicToggle(char)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${formData.characteristics.includes(char)
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {char}
                            </button>
                        ))}
                    </div>
                    {formData.characteristics.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                            Selected: {formData.characteristics.length}
                        </p>
                    )}
                </div>

                {/* Achievements */}
                <div>
                    <label className="label-text">Notable Achievements</label>
                    <textarea
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleChange}
                        className="input-field resize-none"
                        rows="3"
                        placeholder="e.g., Led the Q4 project successfully, increased team productivity by 30%"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.achievements.length}/500 characters
                    </p>
                </div>

                {/* Specific Memories */}
                <div>
                    <label className="label-text">Specific Memories</label>
                    <textarea
                        name="specificMemories"
                        value={formData.specificMemories}
                        onChange={handleChange}
                        className="input-field resize-none"
                        rows="3"
                        placeholder="e.g., Helped me debug a critical issue at 2 AM before the demo"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.specificMemories.length}/500 characters
                    </p>
                </div>

                {/* Work Context */}
                <div>
                    <label className="label-text">Work Context</label>
                    <textarea
                        name="workContext"
                        value={formData.workContext}
                        onChange={handleChange}
                        className="input-field resize-none"
                        rows="2"
                        placeholder="e.g., We worked together in the engineering team for 2 years"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.workContext.length}/500 characters
                    </p>
                </div>

                {/* Tone */}
                <div>
                    <label className="label-text">Tone</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['professional', 'friendly', 'heartfelt'].map(tone => (
                            <button
                                key={tone}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, tone }))}
                                className={`py-3 px-4 rounded-lg font-medium capitalize transition-all duration-200 ${formData.tone === tone
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                                    }`}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Length */}
                <div>
                    <label className="label-text">Length</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['short', 'medium', 'long'].map(length => (
                            <button
                                key={length}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, length }))}
                                className={`py-3 px-4 rounded-lg font-medium capitalize transition-all duration-200 ${formData.length === length
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                                    }`}
                            >
                                {length}
                                <span className="block text-xs mt-1 opacity-80">
                                    {length === 'short' && '50-70 words'}
                                    {length === 'medium' && '100-150 words'}
                                    {length === 'long' && '200-250 words'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading || !formData.personName || formData.characteristics.length === 0}
                        className="btn-primary flex-1"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </span>
                        ) : (
                            '✨ Generate Testimonial'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="btn-secondary"
                        disabled={loading}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}
