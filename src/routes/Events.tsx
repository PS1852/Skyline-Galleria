import { events } from '../data/events';
import EventCard from '../components/EventCard';
import Countdown from '../components/Countdown';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

export default function Events() {
    const [nextEvent, ...restEvents] = events;

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl font-black mb-4">Discover Events</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-10">
                    Experience the vibrant atmosphere of Skyline Galleria with our year-round events,
                    concerts, and exhibitions.
                </p>

                {/* Countdown to next event */}
                {nextEvent && (
                    <div className="inline-block bg-white dark:bg-surface-card p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <CalendarDays className="text-primary-500" size={20} />
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                                Next Big Event Starts In
                            </h3>
                        </div>
                        <Countdown targetDate={nextEvent.date} />
                        <p className="mt-4 font-semibold text-primary-600 dark:text-primary-400">
                            {nextEvent.title}
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Event list */}
            <div className="space-y-10">
                {[nextEvent, ...restEvents].map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <EventCard event={event} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
