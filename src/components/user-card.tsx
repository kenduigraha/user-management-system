"use client"

import { useState } from "react"
import { useUser } from "@/src/context/user-context"
import type { User } from "@/src/types/user"
import { UserEditForm } from "./user-edit-form"
import { ConfirmDialog } from "./confirm-dialog"

interface UserCardProps {
  user: User
  onEdit: (user: User) => void;
}

export function UserCard({ user }: UserCardProps) {
  const { deleteUser } = useUser()
  const [isEditingOpen, setIsEditingOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(user.id)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isEditingOpen) {
    return <UserEditForm user={user} onClose={() => setIsEditingOpen(false)} />
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-200 flex flex-col h-full">
        <div className="space-y-3 flex-1">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground line-clamp-2">{user.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
          </div>

          {user.phone && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          )}

          {user.company && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium">Company:</span> {user.company.name}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4 mt-4 border-t border-border">
          <button
            onClick={() => setIsEditingOpen(true)}
            className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-medium text-xs sm:text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-medium text-xs sm:text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        isDangerous={true}
      />
    </>
  )
}
