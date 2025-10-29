import { render, screen, fireEvent } from "@testing-library/react"
import { UserCard } from "../user-card"
import { UserProvider } from "@/src/context/user-context"
import type { User } from "@/src/types/user"
import jest from "jest" // Import jest to fix the undeclared variable error

const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "example.com",
  company: { name: "Acme Corp" },
}

const mockOnEdit = jest.fn()

describe("UserCard", () => {
  it("renders user information correctly", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} onEdit={mockOnEdit} />
      </UserProvider>,
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
  })

  it("calls onEdit when edit button is clicked", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} onEdit={mockOnEdit} />
      </UserProvider>,
    )

    const editButton = screen.getByRole("button", { name: /edit/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalled()
  })

  it("displays all user contact information", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} onEdit={mockOnEdit} />
      </UserProvider>,
    )

    expect(screen.getByText("123-456-7890")).toBeInTheDocument()
    expect(screen.getByText("example.com")).toBeInTheDocument()
  })
})
