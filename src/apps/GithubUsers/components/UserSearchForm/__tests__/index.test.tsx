import { render, screen, fireEvent } from "@testing-library/react";
import { EMPTY_SEARCH_MESSAGE, UserSearchForm } from "..";

const mockOnSubmit = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});
describe("UserSearchForm", () => {
  it("renders the form with input and button", () => {
    render(<UserSearchForm onSubmit={mockOnSubmit} isLoading={false} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    const errorMessage = "Oooooooopsy, try later.";
    render(
      <UserSearchForm
        onSubmit={mockOnSubmit}
        errorMessage={errorMessage}
        isLoading={false}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("displays 'Loading...' when loading", () => {
    render(<UserSearchForm onSubmit={mockOnSubmit} isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("alerts if the username is empty", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<UserSearchForm onSubmit={mockOnSubmit} isLoading={false} />);

    const input = screen.getByLabelText(/username/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(alertSpy).toHaveBeenCalledWith(EMPTY_SEARCH_MESSAGE);
    alertSpy.mockRestore();
  });

  it("calls onSubmit with the correct value", () => {
    render(<UserSearchForm onSubmit={mockOnSubmit} isLoading={false} />);
    const searchText = "test1234";
    const input = screen.getByLabelText(/username/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: searchText } });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith(searchText);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not submit if the form is loading", () => {
    render(<UserSearchForm onSubmit={mockOnSubmit} isLoading={true} />);

    const input = screen.getByLabelText(/username/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "ahahahah" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
