import { render, screen, fireEvent } from "@testing-library/react"
import { UserCard } from "@/src/components/user-card"
import { UserProvider } from "@/src/context/user-context"
import type { User } from "@/src/types/user"

const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  username: "johndoe",
  phone: "+1 (555) 000-0000",
  company: { name: "Acme Corp" },
}

describe("UserCard Component", () => {
  it("renders user information", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} />
      </UserProvider>,
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("john@example.com")).toBeInTheDocument()
    expect(screen.getByText("+1 (555) 000-0000")).toBeInTheDocument()
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
  })

  it("renders edit and delete buttons", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} />
      </UserProvider>,
    )

    expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument()
  })

  it("shows edit form when edit button is clicked", () => {
    render(
      <UserProvider>
        <UserCard user={mockUser} />
      </UserProvider>,
    )

    const editButton = screen.getByRole("button", { name: /Edit/i })
    fireEvent.click(editButton)

    expect(screen.getByText("Edit User")).toBeInTheDocument()
  })
})
