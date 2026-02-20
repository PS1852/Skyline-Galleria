import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages the application colour theme.
 * Reads from localStorage on init，falls back to OS preference.
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('sg_theme') as Theme | null;
        if (saved === 'light' || saved === 'dark') return saved;
        const prefersDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
        localStorage.setItem('sg_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}
