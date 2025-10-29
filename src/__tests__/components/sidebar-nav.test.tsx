import { render, screen, fireEvent } from "@testing-library/react"
import { SidebarNav } from "@/src/components/sidebar-nav"
import jest from "jest" // Import jest to fix the undeclared variable error

describe("SidebarNav", () => {
  const mockItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  it("renders all navigation items", () => {
    render(<SidebarNav items={mockItems} activeItem="home" onItemClick={() => {}} />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("highlights active item", () => {
    const { container } = render(<SidebarNav items={mockItems} activeItem="about" onItemClick={() => {}} />)
    const activeButton = screen.getByText("About").closest("button")
    expect(activeButton).toHaveClass("bg-sidebar-primary")
  })

  it("calls onItemClick when item is clicked", () => {
    const onItemClick = jest.fn() // Declare jest here to fix the undeclared variable error
    render(<SidebarNav items={mockItems} activeItem="home" onItemClick={onItemClick} />)
    const aboutButton = screen.getByText("About")
    fireEvent.click(aboutButton)
    expect(onItemClick).toHaveBeenCalledWith("about")
  })

  it("renders title when provided", () => {
    render(<SidebarNav items={mockItems} activeItem="home" onItemClick={() => {}} title="Main Menu" />)
    expect(screen.getByText("Main Menu")).toBeInTheDocument()
  })

  it("renders icons when provided", () => {
    const itemsWithIcons = [
      { id: "home", label: "Home", icon: <span data-testid="home-icon">H</span> },
      { id: "about", label: "About", icon: <span data-testid="about-icon">A</span> },
    ]
    render(<SidebarNav items={itemsWithIcons} activeItem="home" onItemClick={() => {}} />)
    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
    expect(screen.getByTestId("about-icon")).toBeInTheDocument()
  })

  it("toggles sidebar on mobile when toggle button is clicked", () => {
    const { container } = render(<SidebarNav items={mockItems} activeItem="home" onItemClick={() => {}} />)
    const toggleButton = screen.getByLabelText("Toggle sidebar")
    fireEvent.click(toggleButton)
    const sidebar = container.querySelector("aside")
    expect(sidebar).toHaveClass("translate-x-0")
  })
})
