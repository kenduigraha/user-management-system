"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { User, UserFormData } from "@/src/types/user"
import { userApi } from "@/src/services/api"

interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<User, "id">) => Promise<void>
  updateUser: (id: number, user: UserFormData) => Promise<void>
  deleteUser: (id: number) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userApi.getUsers()
      setUsers(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const addUser = useCallback(async (user: Omit<User, "id">) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await userApi.addUser(user)
      setUsers((prev) => [...prev, newUser])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateUser = useCallback(async (id: number, updates: UserFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updatedUser = await userApi.updateUser(id, updates)
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteUser = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await userApi.deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
