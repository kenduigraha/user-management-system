import { render, screen, fireEvent } from "@testing-library/react"
import { Pagination } from "@/src/components/pagination"
import { jest } from "@jest/globals"

describe("Pagination", () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it("renders pagination controls", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    expect(screen.getByText("Showing 1 to 10 of 50 users")).toBeInTheDocument()
  })

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const prevButton = screen.getByLabelText("Previous page")
    expect(prevButton).toBeDisabled()
  })

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const nextButton = screen.getByLabelText("Next page")
    expect(nextButton).toBeDisabled()
  })

  it("calls onPageChange with correct page number", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const page2Button = screen.getByText("2")
    fireEvent.click(page2Button)
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange when next button is clicked", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const nextButton = screen.getByLabelText("Next page")
    fireEvent.click(nextButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange when previous button is clicked", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const prevButton = screen.getByLabelText("Previous page")
    fireEvent.click(prevButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it("shows correct item range", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    expect(screen.getByText("Showing 21 to 30 of 50 users")).toBeInTheDocument()
  })

  it("highlights current page", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} itemsPerPage={10} />,
    )
    const currentPageButton = screen.getByText("2")
    expect(currentPageButton).toHaveClass("bg-primary")
  })
})
