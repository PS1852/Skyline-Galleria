import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stores } from '../data/stores';
import { Heart, MapPin, Clock, Phone, ArrowLeft, Star } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { motion } from 'framer-motion';

export default function StoreDetails() {
    const { id } = useParams<{ id: string }>();
    const store = stores.find((s) => s.id === id);
    const { isFavorite, toggleFavorite } = useFavorites();
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState<string[]>([]);

    if (!store) {
        return (
            <div className="pt-32 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold mb-4">Store Not Found</h1>
                <Link to="/directory" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 font-medium">
                    <ArrowLeft size={20} aria-hidden="true" /> Back to Directory
                </Link>
            </div>
        );
    }

    const fav = isFavorite(store.id);

    const handleReview = (e: FormEvent) => {
        e.preventDefault();
        if (review.trim()) {
            setReviews((prev) => [review.trim(), ...prev]);
            setReview('');
        }
    };

    return (
        <div className="pt-24 min-h-screen">
            {/* Hero banner */}
            <header className="relative h-96 w-full overflow-hidden">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-8 pb-8">
                    <Link
                        to="/directory"
                        className="text-white/80 hover:text-white flex items-center gap-2 mb-5 w-fit transition-colors"
                    >
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Directory
                    </Link>
                    <div className="flex justify-between items-end gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-3">
                                {store.category}
                            </span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-black text-white"
                            >
                                {store.name}
                            </motion.h1>
                        </div>
                        <button
                            onClick={() => toggleFavorite(store.id)}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all shrink-0"
                            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
                            aria-pressed={fav}
                        >
                            <Heart
                                size={28}
                                className={fav ? 'fill-red-500 text-red-500' : 'text-white'}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Description + reviews */}
                    <div className="md:col-span-2 space-y-10">
                        <section aria-labelledby="about-heading">
                            <h2 id="about-heading" className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                                About {store.name}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {store.description} This store is one of our premier partners, offering world-class
                                services and products designed for your lifestyle. Visit {store.name} on {store.floor} today!
                            </p>
                        </section>

                        {/* Leave a review */}
                        <section aria-labelledby="reviews-heading">
                            <h2 id="reviews-heading" className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                                Reviews
                            </h2>
                            <form onSubmit={handleReview} className="flex gap-3 mb-6">
                                <input
                                    type="text"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Leave a quick review…"
                                    aria-label="Write a review"
                                    className="flex-1 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 shrink-0"
                                >
                                    <Star size={16} aria-hidden="true" /> Post
                                </button>
                            </form>
                            {reviews.length > 0 ? (
                                <ul className="space-y-3">
                                    {reviews.map((r, i) => (
                                        <li key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl px-5 py-4 text-sm">
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
                            )}
                        </section>
                    </div>

                    {/* Info card */}
                    <aside>
                        <div className="bg-surface-light dark:bg-surface-card p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-28">
                            <h3 className="text-xl font-bold mb-6">Store Details</h3>
                            <ul className="space-y-6">
                                {[
                                    { Icon: MapPin, label: 'Location', value: store.floor },
                                    { Icon: Clock, label: 'Hours', value: store.hours },
                                    { Icon: Phone, label: 'Contact', value: store.phone },
                                ].map(({ Icon, label, value }) => (
                                    <li key={label} className="flex items-start gap-4">
                                        <Icon className="text-primary-500 shrink-0 mt-1" size={22} aria-hidden="true" />
                                        <div>
                                            <h4 className="font-semibold mb-0.5">{label}</h4>
                                            <p className="text-gray-500 text-sm">{value}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
