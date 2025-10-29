"use client"

import type React from "react"

interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface SidebarNavProps {
  items: NavItem[]
  activeItem: string
  onItemClick: (itemId: string) => void
  title?: string
  isOpen?: boolean
  onClose?: () => void
}

export function SidebarNav({ items, activeItem, onItemClick, isOpen = false, onClose }: SidebarNavProps) {
  return (
    <>
      {/* Sidebar Backdrop (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-30 top-24" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-24 md:top-20 left-0 h-[calc(100vh-6rem)] md:h-auto w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 md:z-0 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full md:h-auto">
          {/* Navigation Items */}
          <nav className="flex-1 md:flex-none p-4 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onItemClick(item.id)
                  onClose?.()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left font-medium ${
                  activeItem === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {item.icon && <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
