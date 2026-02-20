import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { stores } from '../data/stores';
import StoreCard from '../components/StoreCard';
import { LogIn, LogOut, User as UserIcon, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'favorites' | 'settings';

const slideVariant = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export default function Account() {
    const { user, login, logout } = useAuth();
    const { favorites } = useFavorites();

    const [formData, setFormData] = useState({ name: '', email: '' });
    const [activeTab, setActiveTab] = useState<Tab>('favorites');

    const favoriteStores = stores.filter((s) => favorites.includes(s.id));

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (formData.name.trim() && formData.email.trim()) {
            login(formData.name.trim(), formData.email.trim());
        }
    };

    // ─── Login screen ──────────────────────────────────────────────────────────

    if (!user) {
        return (
            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-surface-card p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogIn size={32} aria-hidden="true" />
                        </div>
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-gray-500 mt-2">Join Skyline Galleria for a personalised experience.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5" noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                                placeholder="Jane Smith"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-black focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                                placeholder="jane@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all"
                        >
                            Initialize Account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-400 italic">
                        Simulation only – no data is sent to a server.
                    </p>
                </motion.div>
            </div>
        );
    }

    // ─── Authenticated dashboard ───────────────────────────────────────────────

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="flex flex-col md:flex-row gap-10">

                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white dark:bg-surface-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-32">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white shrink-0">
                                <UserIcon size={22} aria-hidden="true" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>

                        <nav aria-label="Account navigation" className="space-y-1">
                            {([['favorites', Heart, 'Favorites'], ['settings', Settings, 'Settings']] as const).map(
                                ([tab, Icon, label]) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab
                                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                        aria-current={activeTab === tab ? 'page' : undefined}
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                        {label}
                                    </button>
                                )
                            )}

                            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                >
                                    <LogOut size={18} aria-hidden="true" />
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {activeTab === 'favorites' ? (
                            <motion.div
                                key="favorites"
                                variants={slideVariant}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black mb-2">My Favourites</h1>
                                    <p className="text-gray-500 text-lg">Stores you&apos;ve saved for later.</p>
                                </div>

                                {favoriteStores.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {favoriteStores.map((store) => (
                                            <StoreCard key={store.id} store={store} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                                        <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" aria-hidden="true" />
                                        <h2 className="text-xl font-bold mb-2">No favourites yet</h2>
                                        <p className="text-gray-500 mb-6">
                                            Explore our directory and tap the heart icon to save your favourite spots!
                                        </p>
                                        <a
                                            href="/directory"
                                            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-all"
                                        >
                                            Browse Directory
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="settings"
                                variants={slideVariant}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black mb-2">Account Settings</h1>
                                    <p className="text-gray-500 text-lg">Manage your profile and preferences.</p>
                                </div>

                                <div className="bg-white dark:bg-surface-card rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h2 className="font-bold mb-4">Personal Info</h2>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Full Name', value: user.name },
                                                    { label: 'Email', value: user.email },
                                                ].map(({ label, value }) => (
                                                    <div key={label} className="p-4 bg-surface-light dark:bg-black rounded-xl">
                                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{label}</p>
                                                        <p className="font-medium">{value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="font-bold mb-4">Notifications</h2>
                                            <div className="space-y-3">
                                                {[
                                                    'Email me about new store openings',
                                                    'Weekly event highlights',
                                                    'SMS Parking alerts',
                                                ].map((label, i) => (
                                                    <label key={label} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={i < 2}
                                                            className="w-5 h-5 rounded accent-primary-600"
                                                        />
                                                        <span className="text-sm">{label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <button
                                            onClick={() => alert('Settings saved!')}
                                            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
