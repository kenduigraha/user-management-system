import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { UserForm } from "@/src/components/user-form"
import { UserProvider } from "@/src/context/user-context"
import * as userApi from "@/src/services/api"
import jest from "jest"

jest.mock("@/src/services/api")

describe("UserForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders form fields", () => {
    render(
      <UserProvider>
        <UserForm />
      </UserProvider>,
    )

    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("johndoe")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("+1 (555) 000-0000")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(
      <UserProvider>
        <UserForm />
      </UserProvider>,
    )

    const submitButton = screen.getByRole("button", { name: /Add User/i })
    expect(submitButton).toBeInTheDocument()
  })

  it("updates form fields on input change", () => {
    render(
      <UserProvider>
        <UserForm />
      </UserProvider>,
    )

    const nameInput = screen.getByPlaceholderText("John Doe") as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: "Test User" } })

    expect(nameInput.value).toBe("Test User")
  })

  it("submits form with valid data", async () => {
    ;(userApi.userApi.addUser as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
    })

    const onSuccess = jest.fn()

    render(
      <UserProvider>
        <UserForm onSuccess={onSuccess} />
      </UserProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Test User" } })
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), {
      target: { value: "test@example.com" },
    })

    const submitButton = screen.getByRole("button", { name: /Add User/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
