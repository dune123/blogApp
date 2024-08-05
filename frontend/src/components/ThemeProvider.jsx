import React from 'react';
import { useSelector } from 'react-redux';
import './ThemeProvider.css'; // Import the CSS file

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  // Adding a default theme in case theme is undefined
  const themeClass = theme ? theme : 'light'; // Assuming 'light' is a default theme

  return (
    <div className={themeClass}>
      <div className="theme-container">
        {children}
      </div>
    </div>
  );
}

