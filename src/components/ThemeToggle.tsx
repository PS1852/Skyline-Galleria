import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

/** Toggles between light and dark theme. */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface-card text-surface-dark dark:text-surface-light border border-gray-200 dark:border-gray-800 transition-colors shadow-sm hover:shadow-md"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
