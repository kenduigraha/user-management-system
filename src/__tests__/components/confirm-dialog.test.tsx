"use client"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ConfirmDialog } from "@/src/components/confirm-dialog"
import { jest } from "@jest/globals"

describe("ConfirmDialog", () => {
  it("renders nothing when isOpen is false", () => {
    const { container } = render(
      <ConfirmDialog isOpen={false} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" />,
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders dialog when isOpen is true", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        title="Confirm Action"
        description="Are you sure?"
      />,
    )
    expect(screen.getByText("Confirm Action")).toBeInTheDocument()
    expect(screen.getByText("Are you sure?")).toBeInTheDocument()
  })

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirm = jest.fn<() => void>()
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={onConfirm}
        title="Confirm Action"
        confirmText="Confirm"
      />,
    )
    const confirmButton = screen.getByText("Confirm")
    fireEvent.click(confirmButton)
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled()
    })
  })

  it("calls onClose when cancel button is clicked", () => {
    const onClose = jest.fn()
    render(
      <ConfirmDialog isOpen={true} onClose={onClose} onConfirm={() => {}} title="Confirm Action" cancelText="Cancel" />,
    )
    const cancelButton = screen.getByText("Cancel")
    fireEvent.click(cancelButton)
    expect(onClose).toHaveBeenCalled()
  })

  it("disables buttons when isLoading is true", () => {
    render(
      <ConfirmDialog isOpen={true} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" isLoading={true} />,
    )
    const buttons = screen.getAllByRole("button")
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it("shows loading text when isLoading is true", () => {
    render(
      <ConfirmDialog isOpen={true} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" isLoading={true} />,
    )
    expect(screen.getByText("Processing...")).toBeInTheDocument()
  })

  it("applies dangerous styling when isDangerous is true", () => {
    const { container } = render(
      <ConfirmDialog isOpen={true} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" isDangerous={true} />,
    )
    const destructiveButton = container.querySelector(".bg-destructive")
    expect(destructiveButton).toBeInTheDocument()
  })
})
