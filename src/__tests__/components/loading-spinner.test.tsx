import { render } from "@testing-library/react"
import { LoadingSpinner } from "@/src/components/loading-spinner"

describe("LoadingSpinner Component", () => {
  it("renders the spinner", () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector(".animate-spin")
    expect(spinner).toBeInTheDocument()
  })

  it("has correct styling", () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector(".animate-spin")
    expect(spinner).toHaveClass("rounded-full", "h-12", "w-12", "border-b-2")
  })
})
