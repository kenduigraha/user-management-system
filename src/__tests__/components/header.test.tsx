import { render, screen } from "@testing-library/react"
import { Header } from "@/src/components/header"

describe("Header Component", () => {
  it("renders the header title", () => {
    render(<Header />)
    const title = screen.getByText("User Management System")
    expect(title).toBeInTheDocument()
  })

  it("renders the header description", () => {
    render(<Header />)
    const description = screen.getByText("Manage and organize your users efficiently")
    expect(description).toBeInTheDocument()
  })

  it("has correct styling classes", () => {
    const { container } = render(<Header />)
    const header = container.querySelector("header")
    expect(header).toHaveClass("bg-gradient-to-r", "from-primary", "to-primary/80")
  })
})
