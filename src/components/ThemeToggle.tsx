"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111954] border border-white/10 ${isDark ? "bg-gray-900" : "bg-gray-500"
                }`}
            aria-label="Toggle theme"
        >
            <span className="sr-only">Toggle theme</span>
            <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg"
                layout
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30
                }}
                initial={false}
                animate={{
                    x: isDark ? 24 : 0
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={isDark ? "dark" : "light"}
                        initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isDark ? (
                            <Moon className="h-4 w-4 text-[#111954]" />
                        ) : (
                            <Sun className="h-4 w-4 text-orange-500" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </button>
    )
}
