import HeroSlider from '../components/HeroSlider';
import { stores } from '../data/stores';
import { events } from '../data/events';
import StoreCard from '../components/StoreCard';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FEATURED_STORES = stores.slice(0, 3);
const UPCOMING_EVENTS = events.slice(0, 2);

export default function Home() {
    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            <HeroSlider />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-32 space-y-32">

                {/* Featured Destinations */}
                <section aria-labelledby="featured-heading">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <motion.h2
                                id="featured-heading"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-extrabold tracking-tight"
                            >
                                Featured Destinations
                            </motion.h2>
                            <p className="text-gray-500 mt-2 text-lg">Discover the best of Skyline Galleria</p>
                        </div>
                        <Link
                            to="/directory"
                            className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all hover:text-primary-700"
                            aria-label="View full store directory"
                        >
                            View Directory <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURED_STORES.map((store) => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </div>
                </section>

                {/* Upcoming Events */}
                <section
                    aria-labelledby="events-heading"
                    className="bg-surface-light dark:bg-surface-card rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-end mb-12">
                        <div>
                            <motion.h2
                                id="events-heading"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-extrabold tracking-tight"
                            >
                                Upcoming Events
                            </motion.h2>
                            <p className="text-gray-500 mt-2 text-lg">Join us for unforgettable moments</p>
                        </div>
                        <Link
                            to="/events"
                            className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all hover:text-primary-700"
                            aria-label="View all events"
                        >
                            All Events <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {UPCOMING_EVENTS.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>

                {/* Newsletter */}
                <section aria-labelledby="newsletter-heading" className="text-center max-w-2xl mx-auto">
                    <h2 id="newsletter-heading" className="text-3xl font-extrabold mb-4">Stay Connected</h2>
                    <p className="text-gray-500 mb-8">
                        Sign up for exclusive deals, new store openings, and VIP event updates.
                    </p>
                    <form
                        className="flex flex-col sm:flex-row gap-4"
                        onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            className="px-6 py-4 flex-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow shadow-sm"
                            aria-label="Email address"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
