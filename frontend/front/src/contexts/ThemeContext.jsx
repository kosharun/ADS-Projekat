"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create the theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
})

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

// Theme provider component
export function ThemeProvider({ children }) {
  // Check if theme is stored in localStorage, default to light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "light"
  })

  // Update theme in localStorage and document when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme)

    // Update the document's data-theme attribute
    document.documentElement.setAttribute("data-theme", theme)

    // Also add/remove the dark class for Tailwind dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
