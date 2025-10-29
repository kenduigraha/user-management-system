"use client"

import { useState } from "react"
import { UserList } from "./user-list"
import { UserForm } from "./user-form"
import { Header } from "./header"
import { SidebarNav } from "./sidebar-nav"
import { ModalDialog } from "./modal-dialog"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"list" | "add">("list")
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleUserAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
    setIsAddUserModalOpen(false)
    setActiveTab("list")
  }

  const navItems = [{ id: "list", label: "User List" }]

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={setIsMobileMenuOpen} />

      <div className="flex flex-col md:flex-row pt-24 md:pt-20">
        <SidebarNav
          items={navItems}
          activeItem={activeTab}
          onItemClick={(itemId) => itemId === "list" ? setActiveTab("list") : null}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-7xl w-full">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-semibold text-sm sm:text-base"
            >
              Add User Form
            </button>
          </div>
          <UserList key={refreshTrigger} />
        </main>
      </div>

      <ModalDialog
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add New User"
        description="Fill in the form below to add a new user to the system"
        size="md"
      >
        <UserForm onSuccess={handleUserAdded} />
      </ModalDialog>
    </div>
  )
}
