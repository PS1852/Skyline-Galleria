import { useState, useEffect } from 'react';
import { Car, ShieldCheck, Map, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

type ParkingLevel = {
    name: string;
    total: number;
    available: number;
    color: string;
};

const INITIAL_LEVELS: ParkingLevel[] = [
    { name: 'Level 1 – Premium', total: 200, available: Math.floor(Math.random() * 50 + 10), color: 'bg-red-500' },
    { name: 'Level 2 – Standard', total: 400, available: Math.floor(Math.random() * 150 + 30), color: 'bg-yellow-500' },
    { name: 'Level 3 – Standard', total: 400, available: Math.floor(Math.random() * 250 + 100), color: 'bg-green-500' },
    { name: 'Level 4 – Economy', total: 500, available: Math.floor(Math.random() * 350 + 100), color: 'bg-blue-500' },
];

const FEATURES = [
    { Icon: ShieldCheck, title: '24/7 Security', desc: 'Patrolled and monitored around the clock.' },
    { Icon: Map, title: 'Find My Car', desc: 'Use kiosk scanners to instantly locate your vehicle.' },
    { Icon: Smartphone, title: 'App Integration', desc: 'Reserve spots and pay seamlessly via mobile.' },
    { Icon: Car, title: 'EV Charging', desc: 'Superchargers available on Levels 1 & 2.' },
];

function getStatusLabel(available: number): string {
    if (available > 100) return 'Open';
    if (available > 20) return 'Filling';
    return 'Full';
}

function getStatusColor(available: number): string {
    if (available > 100) return 'bg-green-500';
    if (available > 20) return 'bg-yellow-500';
    return 'bg-red-500';
}

export default function Parking() {
    const [levels, setLevels] = useState<ParkingLevel[]>(INITIAL_LEVELS);

    // Simulate live parking updates every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLevels((prev) =>
                prev.map((level) => {
                    const change = Math.floor(Math.random() * 5) - 2;
                    return {
                        ...level,
                        available: Math.max(0, Math.min(level.total, level.available + change)),
                    };
                })
            );
        }, 3_000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl font-black mb-4">Live Parking Status</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                    Find the perfect spot with our real-time availability tracker.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Availability levels */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-800 pb-4">
                        Availability
                    </h2>
                    {levels.map((level, idx) => {
                        const fillPct = ((level.total - level.available) / level.total) * 100;
                        return (
                            <motion.article
                                key={level.name}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-surface-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
                                aria-label={`${level.name}: ${level.available} of ${level.total} spots available`}
                            >
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <span className="text-lg font-bold">{level.name}</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${getStatusColor(level.available)}`}
                                    >
                                        {getStatusLabel(level.available)}
                                    </span>
                                </div>
                                <div className="relative z-10 flex items-end gap-3">
                                    <span className="text-5xl font-black">{level.available}</span>
                                    <span className="text-gray-500 mb-1">/ {level.total} spots left</span>
                                </div>
                                <div className="mt-5 h-3 bg-gray-100 dark:bg-black rounded-full overflow-hidden relative z-10">
                                    <motion.div
                                        animate={{ width: `${fillPct}%` }}
                                        transition={{ duration: 0.8 }}
                                        className={`h-full ${level.color} opacity-80`}
                                    />
                                </div>
                                <Car
                                    size={140}
                                    className="absolute -bottom-8 -right-8 text-gray-50 dark:text-surface-dark opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 z-0"
                                    aria-hidden="true"
                                />
                            </motion.article>
                        );
                    })}
                </div>

                {/* Features grid */}
                <div className="space-y-8 lg:mt-16">
                    <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-800 pb-4">
                        Parking Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {FEATURES.map(({ Icon, title, desc }, idx) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-2xl flex flex-col items-center text-center gap-4 border border-primary-100 dark:border-primary-900/30 hover:shadow-md transition-shadow"
                            >
                                <div className="p-4 bg-white dark:bg-surface-card rounded-full text-primary-600 dark:text-primary-400 shadow-sm">
                                    <Icon size={28} aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{title}</h3>
                                    <p className="text-gray-500 text-sm">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
