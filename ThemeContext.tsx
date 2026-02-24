import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from './types';

interface ThemeContextType {
    theme: ThemeMode;
    activeTheme: 'light' | 'dark';
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('hunt_messenger_theme');
        return (saved as ThemeMode) || 'system';
    });

    const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const updateTheme = () => {
            if (theme === 'system') {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setActiveTheme(isDark ? 'dark' : 'light');
            } else {
                setActiveTheme(theme as 'light' | 'dark');
            }
        };

        updateTheme();

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => updateTheme();
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        localStorage.setItem('hunt_messenger_theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, activeTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
