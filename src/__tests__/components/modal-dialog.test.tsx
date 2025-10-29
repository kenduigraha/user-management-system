"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { ModalDialog } from "@/src/components/modal-dialog"
import jest from "jest"

describe("ModalDialog", () => {
  it("renders nothing when isOpen is false", () => {
    const { container } = render(
      <ModalDialog isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Content</div>
      </ModalDialog>,
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders modal when isOpen is true", () => {
    render(
      <ModalDialog isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Content</div>
      </ModalDialog>,
    )
    expect(screen.getByText("Test Modal")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn()
    render(
      <ModalDialog isOpen={true} onClose={onClose} title="Test Modal">
        <div>Content</div>
      </ModalDialog>,
    )
    const closeButton = screen.getByLabelText("Close dialog")
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn()
    const { container } = render(
      <ModalDialog isOpen={true} onClose={onClose} title="Test Modal">
        <div>Content</div>
      </ModalDialog>,
    )
    const backdrop = container.querySelector(".bg-black/50")
    if (backdrop) {
      fireEvent.click(backdrop)
    }
    expect(onClose).toHaveBeenCalled()
  })

  it("renders description when provided", () => {
    render(
      <ModalDialog isOpen={true} onClose={() => {}} title="Test Modal" description="Test description">
        <div>Content</div>
      </ModalDialog>,
    )
    expect(screen.getByText("Test description")).toBeInTheDocument()
  })

  it("renders footer when provided", () => {
    render(
      <ModalDialog isOpen={true} onClose={() => {}} title="Test Modal" footer={<button>Footer Button</button>}>
        <div>Content</div>
      </ModalDialog>,
    )
    expect(screen.getByText("Footer Button")).toBeInTheDocument()
  })

  it("applies correct size classes", () => {
    const { container } = render(
      <ModalDialog isOpen={true} onClose={() => {}} title="Test Modal" size="lg">
        <div>Content</div>
      </ModalDialog>,
    )
    const modal = container.querySelector(".max-w-lg")
    expect(modal).toBeInTheDocument()
  })
})
