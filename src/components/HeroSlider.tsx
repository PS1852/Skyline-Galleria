import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hero slide data – uses reliable, high-resolution Unsplash images
const SLIDES = [
    {
        image:
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop',
        title: 'Welcome to Skyline Galleria',
        subtitle: 'Your Ultimate Shopping Destination',
        cta: 'Explore Directory',
        link: '/directory',
    },
    {
        image:
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
        title: 'Discover Exquisite Dining',
        subtitle: 'From casual bites to fine dining experiences',
        cta: 'View Restaurants',
        link: '/directory',
    },
    {
        image:
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
        title: 'Unmatched Entertainment',
        subtitle: 'Catch the latest events and unforgettable moments',
        cta: 'See Events',
        link: '/events',
    },
];

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, AUTO_PLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [paused, next]);

    return (
        <section
            className="relative h-[85vh] w-full overflow-hidden bg-surface-dark"
            aria-label="Featured highlights slider"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <img
                        src={SLIDES[current].image}
                        alt={SLIDES[current].title}
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                    {/* Slide content */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <div className="max-w-3xl">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-primary-400 font-semibold tracking-widest uppercase text-sm mb-4 drop-shadow"
                            >
                                Skyline Galleria
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.8 }}
                                className="text-5xl md:text-7xl font-black text-white tracking-tight mb-5 drop-shadow-xl leading-tight"
                            >
                                {SLIDES[current].title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-xl md:text-2xl text-gray-200 font-light mb-10 drop-shadow-md"
                            >
                                {SLIDES[current].subtitle}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.85, duration: 0.8 }}
                            >
                                <Link
                                    to={SLIDES[current].link}
                                    className="inline-block px-9 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full shadow-lg shadow-primary-500/40 hover:shadow-primary-500/60 transition-all text-lg"
                                >
                                    {SLIDES[current].cta}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dot indicators */}
            <div
                role="tablist"
                aria-label="Slide indicators"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10"
            >
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        role="tab"
                        aria-selected={current === idx}
                        onClick={() => setCurrent(idx)}
                        className={`rounded-full transition-all duration-300 ${current === idx
                                ? 'w-8 h-3 bg-white'
                                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
