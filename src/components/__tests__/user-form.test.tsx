"use client"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { UserForm } from "../user-form"
import { UserProvider } from "@/src/context/user-context"
import jest from "jest" // Added import for jest

describe("UserForm", () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it("renders form fields", () => {
    render(
      <UserProvider>
        <UserForm userId={null} onClose={mockOnClose} />
      </UserProvider>,
    )

    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(
      <UserProvider>
        <UserForm userId={null} onClose={mockOnClose} />
      </UserProvider>,
    )

    const submitButton = screen.getByRole("button", { name: /add user/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument()
      expect(screen.getByText("Email is required")).toBeInTheDocument()
    })
  })

  it("validates email format", async () => {
    render(
      <UserProvider>
        <UserForm userId={null} onClose={mockOnClose} />
      </UserProvider>,
    )

    const nameInput = screen.getByPlaceholderText("John Doe")
    const emailInput = screen.getByPlaceholderText("john@example.com")

    fireEvent.change(nameInput, { target: { value: "John" } })
    fireEvent.change(emailInput, { target: { value: "invalid-email" } })

    const submitButton = screen.getByRole("button", { name: /add user/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument()
    })
  })
})
