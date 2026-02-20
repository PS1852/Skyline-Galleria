import { Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUICK_LINKS = ['Home', 'Directory', 'Events', 'Parking'];

const CONTACT_INFO = [
    { Icon: MapPin, text: '1200 Galleria Blvd., Metropolis, NY 10001', href: null },
    { Icon: Phone, text: '+1 212-555-0176', href: 'tel:+12125550176' },
    { Icon: Mail, text: 'info@skylinegalleria.com', href: 'mailto:info@skylinegalleria.com' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-surface-dark text-gray-300 pt-16 pb-8 mt-20 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
                            SKYLINE<span className="text-primary-500 font-light">GALLERIA</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Discover a world of luxury and convenience. Skyline Galleria is your premier destination
                            for shopping, dining, and endless entertainment.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 tracking-wider uppercase text-sm">Quick Links</h3>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map((label) => (
                                <li key={label}>
                                    <Link
                                        to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                                        className="text-gray-400 hover:text-primary-400 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4 tracking-wider uppercase text-sm">Contact Us</h3>
                        <ul className="space-y-4">
                            {CONTACT_INFO.map(({ Icon, text, href }) => (
                                <li key={text} className="flex items-start gap-3">
                                    <Icon size={20} className="text-primary-500 shrink-0 mt-0.5" />
                                    {href ? (
                                        <a href={href} className="text-sm hover:text-primary-400 transition-colors">
                                            {text}
                                        </a>
                                    ) : (
                                        <span className="text-sm">{text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {year} Skyline Galleria. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center text-white transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
