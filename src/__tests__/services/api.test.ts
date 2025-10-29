import { userApi } from "@/src/services/api"
import { jest } from "@jest/globals"

global.fetch = jest.fn()

describe("User API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches users successfully", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    })

    const users = await userApi.getUsers()

    expect(users).toEqual(mockUsers)
    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users")
  })

  it("creates a user successfully", async () => {
    const newUser = { id: 1, name: "John Doe", email: "john@example.com", username: "johndoe" }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => newUser,
    })

    const result = await userApi.addUser({
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
    })

    expect(result).toEqual(newUser)
    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
      }),
    })
  })

  it("updates a user successfully", async () => {
    const updatedUser = { id: 1, name: "Jane Doe", email: "jane@example.com", username: "janedoe" }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedUser,
    })

    const result = await userApi.updateUser(1, { name: "Jane Doe" })

    expect(result).toEqual(updatedUser)
    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Jane Doe" }),
    })
  })

  it("deletes a user successfully", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    })

    await userApi.deleteUser(1)

    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1", {
      method: "DELETE",
    })
  })

  it("handles fetch errors", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    })

    await expect(userApi.getUsers()).rejects.toThrow("Failed to fetch users: Not Found")
  })
})
