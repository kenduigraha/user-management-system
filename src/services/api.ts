import type { User, UserFormData } from "@/src/types/user"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"
const STORAGE_KEY = "custom_users"

// Helper to get custom users from localStorage
function getCustomUsers(): User[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

// Helper to save custom users to localStorage
function saveCustomUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const userApi = {
  // Fetch all users (combines API users with custom users)
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`)
      const apiUsers = await response.json()
      const customUsers = getCustomUsers()
      // concat API users from jsonplaceholder with custom users from localStorage
      return [...customUsers, ...apiUsers]
    } catch (error) {
      console.error("Error fetching users:", error)
      return getCustomUsers()
    }
  },

  // Add a new user
  async addUser(userData: UserFormData): Promise<User> {
    const customUsers = getCustomUsers()
    const newUser: User = {
      id: Math.max(...customUsers.map((u) => u.id), 10) + 1,
      ...userData,
    }
    saveCustomUsers([...customUsers, newUser])
    return newUser
  },

  // Update a user
  async updateUser(id: number, userData: UserFormData): Promise<User> {
    const customUsers = getCustomUsers()
    const index = customUsers.findIndex((u) => u.id === id)
    if (index !== -1) {
      customUsers[index] = { id, ...userData }
      saveCustomUsers(customUsers)
      return customUsers[index]
    }
    throw new Error("User not found")
  },

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    const customUsers = getCustomUsers()
    const filtered = customUsers.filter((u) => u.id !== id)
    saveCustomUsers(filtered)
  },
}