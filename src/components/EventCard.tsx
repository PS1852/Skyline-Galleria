import { useState } from 'react';
import type { GalleriaEvent } from '../data/events';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

type EventCardProps = {
    event: GalleriaEvent;
};

/** Displays a single event with RSVP toggle. */
export default function EventCard({ event }: EventCardProps) {
    const [rsvp, setRsvp] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row"
        >
            {/* Image */}
            <div className="sm:w-1/3 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {event.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                    <ul className="space-y-2 mb-6 text-sm text-gray-500 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary-500 shrink-0" aria-hidden="true" />
                            <time dateTime={event.date}>
                                {format(new Date(event.date), "MMM do, yyyy '·' h:mm a")}
                            </time>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} className="text-primary-500 shrink-0" aria-hidden="true" />
                            <span>{event.location}</span>
                        </li>
                    </ul>
                </div>

                {/* RSVP button */}
                <button
                    onClick={() => setRsvp((p) => !p)}
                    aria-pressed={rsvp}
                    className={`self-start px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${rsvp
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                        }`}
                >
                    {rsvp ? (
                        <>
                            <CheckCircle size={18} aria-hidden="true" />
                            RSVP Confirmed
                        </>
                    ) : (
                        'RSVP Now'
                    )}
                </button>
            </div>
        </motion.article>
    );
}
