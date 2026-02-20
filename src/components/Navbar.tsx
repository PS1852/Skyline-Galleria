import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';

const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/directory' },
    { name: 'Events', path: '/events' },
    { name: 'Parking', path: '/parking' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const { user } = useAuth();

    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navbarClass = scrolled
        ? 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md shadow-md py-3'
        : 'bg-transparent py-5';

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" aria-label="Skyline Galleria Home">
                        <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-500 transition-colors">
                            <ShoppingBag className="text-white" size={24} />
                        </div>
                        <span
                            className={`text-2xl font-black tracking-tight ${!scrolled && isHome ? 'text-white drop-shadow-md' : 'text-surface-dark dark:text-white'
                                }`}
                        >
                            SKYLINE<span className="text-primary-600 dark:text-primary-400 font-light">GALLERIA</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm tracking-wide font-medium transition-colors hover:text-primary-500 ${pathname === link.path
                                        ? 'text-primary-600 dark:text-primary-400 font-bold'
                                        : !scrolled && isHome
                                            ? 'text-white/90 hover:text-white'
                                            : 'text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-gray-300 dark:border-gray-700">
                            <ThemeToggle />
                            <Link
                                to="/account"
                                className={`p-2 rounded-full transition-colors ${!scrolled && isHome
                                        ? 'bg-white/20 hover:bg-white/30 text-white'
                                        : 'bg-surface-light dark:bg-surface-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
                                    }`}
                                aria-label="User account"
                            >
                                <User size={20} className={user ? 'text-primary-500' : ''} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg ${!scrolled && isHome ? 'text-white' : 'text-surface-dark dark:text-gray-300'
                                }`}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-surface-dark shadow-xl border-t border-gray-100 dark:border-gray-800">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-3 py-3 rounded-lg text-base font-medium ${pathname === link.path
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/account"
                            className="flex items-center gap-2 px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <User size={18} />
                            {user ? `Account (${user.name})` : 'Sign In'}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
