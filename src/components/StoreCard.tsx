import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Store } from '../data/stores';
import { useFavorites } from '../hooks/useFavorites';
import { motion } from 'framer-motion';

type StoreCardProps = {
    store: Store;
};

export default function StoreCard({ store }: StoreCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(store.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="relative h-48 overflow-hidden">
                <Link to={`/directory/${store.id}`}>
                    <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(store.id); }}
                    className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                    aria-label="Toggle Favorite"
                >
                    <Heart size={20} className={fav ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'} />
                </button>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/directory/${store.id}`} className="hover:text-primary-500 transition-colors">
                        <h3 className="text-xl font-bold">{store.name}</h3>
                    </Link>
                    <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                        {store.floor}
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{store.category}</p>
                <p className="text-sm line-clamp-2">{store.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm">
                    <span className="text-gray-500">{store.hours}</span>
                    <Link to={`/directory/${store.id}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
