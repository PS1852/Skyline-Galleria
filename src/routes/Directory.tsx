import { useState, useMemo } from 'react';
import { stores } from '../data/stores';
import StoreCard from '../components/StoreCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL = 'All';

export default function Directory() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(ALL);
    const [selectedFloor, setSelectedFloor] = useState(ALL);

    const categories = useMemo(
        () => [ALL, ...Array.from(new Set(stores.map((s) => s.category))).sort()],
        []
    );
    const floors = useMemo(
        () => [ALL, ...Array.from(new Set(stores.map((s) => s.floor))).sort()],
        []
    );

    const filteredStores = useMemo(() => {
        const query = search.toLowerCase();
        return stores.filter((s) => {
            const matchSearch =
                s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
            const matchCategory = selectedCategory === ALL || s.category === selectedCategory;
            const matchFloor = selectedFloor === ALL || s.floor === selectedFloor;
            return matchSearch && matchCategory && matchFloor;
        });
    }, [search, selectedCategory, selectedFloor]);

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-5xl font-black mb-4">Store Directory</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                    Explore over 200 premium brands, exciting dining options, and unmatched entertainment venues.
                </p>
            </motion.div>

            {/* Filters */}
            <div
                role="search"
                aria-label="Store search and filter"
                className="bg-white dark:bg-surface-card p-6 rounded-3xl shadow-sm mb-12 flex flex-col md:flex-row gap-6 items-center border border-gray-100 dark:border-gray-800"
            >
                {/* Search input */}
                <div className="relative flex-1 w-full">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={20}
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        placeholder="Search stores, brands, or categories…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search stores"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 text-base transition-shadow outline-none"
                    />
                </div>

                {/* Category & Floor selects */}
                <div className="flex gap-4 w-full md:w-auto">
                    {[
                        { label: 'Category', value: selectedCategory, options: categories, onChange: setSelectedCategory },
                        { label: 'Floor', value: selectedFloor, options: floors, onChange: setSelectedFloor },
                    ].map(({ label, value, options, onChange }) => (
                        <div key={label} className="relative flex-1 md:w-48">
                            <label className="sr-only">{label}</label>
                            <select
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                aria-label={`Filter by ${label}`}
                                className="w-full appearance-none pl-4 pr-10 py-4 rounded-xl bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 font-medium cursor-pointer outline-none text-gray-700 dark:text-gray-300"
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <SlidersHorizontal
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                                size={18}
                                aria-hidden="true"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
                {filteredStores.length > 0 ? (
                    <motion.div
                        key="results"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredStores.map((store) => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-24 text-gray-500"
                    >
                        <h2 className="text-2xl font-bold mb-2">No results found</h2>
                        <p>We couldn&apos;t find any stores matching your criteria.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
