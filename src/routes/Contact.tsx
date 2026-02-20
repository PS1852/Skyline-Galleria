import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.name.trim()) errors.name = 'Name is required.';
    if (!data.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!data.subject.trim()) errors.subject = 'Subject is required.';
    if (!data.message.trim()) errors.message = 'Message is required.';
    return errors;
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitted(true);
    };

    const handleChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const inputClass = (field: keyof FormData) =>
        `w-full px-5 py-4 rounded-2xl border ${errors[field] ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
        } bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 outline-none transition-all`;

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl font-black mb-4">Contact Us</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                    Have a question or feedback? We&apos;d love to hear from you.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Info sidebar */}
                <aside className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-surface-card p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
                        <ul className="space-y-7">
                            {[
                                { Icon: MapPin, label: 'Our Location', content: '1200 Galleria Blvd., Metropolis, NY 10001', href: null },
                                { Icon: Phone, label: 'Phone Number', content: '+1 212-555-0176', href: 'tel:+12125550176' },
                                { Icon: Mail, label: 'Email Address', content: 'info@skylinegalleria.com', href: 'mailto:info@skylinegalleria.com' },
                            ].map(({ Icon, label, content, href }) => (
                                <li key={label} className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl shrink-0">
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">{label}</h3>
                                        {href ? (
                                            <a href={href} className="text-gray-500 text-sm hover:text-primary-500 transition-colors">
                                                {content}
                                            </a>
                                        ) : (
                                            <p className="text-gray-500 text-sm">{content}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-primary-600 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">Mall Hours</h3>
                            <dl className="space-y-2 text-primary-100 text-sm">
                                {[
                                    ['Mon – Fri', '10:00 AM – 9:00 PM'],
                                    ['Saturday', '10:00 AM – 10:00 PM'],
                                    ['Sunday', '11:00 AM – 8:00 PM'],
                                ].map(([day, hours]) => (
                                    <div key={day} className="flex justify-between gap-4">
                                        <dt>{day}</dt>
                                        <dd>{hours}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                    </div>
                </aside>

                {/* Form / Success */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-surface-card p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center min-h-[400px] flex flex-col items-center justify-center"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={40} aria-hidden="true" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                                <p className="text-gray-500 text-lg mb-8 max-w-sm">
                                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => { setSubmitted(false); setFormData(INITIAL_FORM); }}
                                    className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white dark:bg-surface-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                            >
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
                                    {([['name', 'Full Name', 'text', 'Jane Smith'],
                                    ['email', 'Email Address', 'email', 'jane@example.com']] as const).map(([field, label, type, placeholder]) => (
                                        <div key={field}>
                                            <label htmlFor={field} className="block text-sm font-semibold mb-2">{label}</label>
                                            <input
                                                id={field}
                                                type={type}
                                                placeholder={placeholder}
                                                value={formData[field]}
                                                onChange={handleChange(field)}
                                                aria-describedby={errors[field] ? `${field}-err` : undefined}
                                                className={inputClass(field)}
                                            />
                                            {errors[field] && (
                                                <p id={`${field}-err`} role="alert" className="text-red-500 text-xs mt-1">
                                                    {errors[field]}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                    <div className="md:col-span-2">
                                        <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</label>
                                        <input
                                            id="subject"
                                            type="text"
                                            placeholder="Feedback about a store"
                                            value={formData.subject}
                                            onChange={handleChange('subject')}
                                            aria-describedby={errors.subject ? 'subject-err' : undefined}
                                            className={inputClass('subject')}
                                        />
                                        {errors.subject && (
                                            <p id="subject-err" role="alert" className="text-red-500 text-xs mt-1">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message</label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            placeholder="How can we help you?"
                                            value={formData.message}
                                            onChange={handleChange('message')}
                                            aria-describedby={errors.message ? 'message-err' : undefined}
                                            className={`${inputClass('message')} resize-none`}
                                        />
                                        {errors.message && (
                                            <p id="message-err" role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 pt-2">
                                        <button
                                            type="submit"
                                            className="w-full md:w-auto px-12 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/20 flex items-center justify-center gap-3 transition-all"
                                        >
                                            <Send size={20} aria-hidden="true" /> Send Message
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
