"use client"

import { useState } from "react"

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    onMenuToggle?.(newState)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-primary/80 border-b border-border shadow-md h-24 md:h-20">
      <div className="container mx-auto px-4 py-3 sm:py-4 max-w-7xl h-full flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground text-balance">
            User Management System
          </h1>
          <p className="text-primary-foreground/80 text-xs sm:text-sm hidden sm:block">
            Manage and organize your users efficiently
          </p>
        </div>

        <button
          onClick={handleMenuToggle}
          className="md:hidden ml-4 p-2 bg-primary-foreground/20 text-primary-foreground rounded-lg hover:bg-primary-foreground/30 transition-all"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
