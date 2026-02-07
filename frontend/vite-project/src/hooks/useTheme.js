import { useState, useEffect } from 'react';

export default function useTheme() {
  // 1. Check local storage or default to 'light'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // 2. Whenever 'theme' changes, update the HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both to prevent conflicts
    root.classList.remove('light', 'dark');
    
    // Add the current theme
    root.classList.add(theme);
    
    // Save to storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. The toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}