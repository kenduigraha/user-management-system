"use client"

import type React from "react"
import { renderHook, act, waitFor } from "@testing-library/react"
import { UserProvider, useUser } from "@/src/context/user-context"
import * as userApi from "@/src/services/api"
import jest from "jest"

jest.mock("@/src/services/api")

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", username: "johndoe" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", username: "janesmith" },
]

describe("UserContext", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("provides initial state", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.users).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("fetches users successfully", async () => {
    ;(userApi.userApi.getUsers as jest.Mock).mockResolvedValue(mockUsers)

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>
    const { result } = renderHook(() => useUser(), { wrapper })

    act(() => {
      result.current.fetchUsers()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toEqual(mockUsers)
    expect(result.current.error).toBeNull()
  })

  it("handles fetch error", async () => {
    const error = new Error("Failed to fetch")
    ;(userApi.userApi.getUsers as jest.Mock).mockRejectedValue(error)

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>
    const { result } = renderHook(() => useUser(), { wrapper })

    act(() => {
      result.current.fetchUsers()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Failed to fetch")
    expect(result.current.users).toEqual([])
  })

  it("adds a user successfully", async () => {
    const newUser = { id: 3, name: "Bob Johnson", email: "bob@example.com", username: "bobjohnson" }
    ;(userApi.userApi.addUser as jest.Mock).mockResolvedValue(newUser)

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>
    const { result } = renderHook(() => useUser(), { wrapper })

    // Set initial users
    act(() => {
      result.current.users = mockUsers
    })

    act(() => {
      result.current.addUser({ name: "Bob Johnson", email: "bob@example.com", username: "bobjohnson" })
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toContainEqual(newUser)
  })

  it("deletes a user successfully", async () => {
    ;(userApi.userApi.deleteUser as jest.Mock).mockResolvedValue(undefined)

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>
    const { result } = renderHook(() => useUser(), { wrapper })

    // Set initial users
    act(() => {
      result.current.users = mockUsers
    })

    act(() => {
      result.current.deleteUser(1)
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toEqual([mockUsers[1]])
  })
})
