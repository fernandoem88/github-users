import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserItemHeader } from "..";

describe("UserItemHeader Component", () => {
  test("renders username correctly", () => {
    render(<UserItemHeader username="Pippo" />);
    expect(screen.getByText("Pippo")).toBeInTheDocument();
  });

  test("renders totalRepos if provided", () => {
    render(<UserItemHeader username="Pippo" totalRepos={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("does not render totalRepos if not provided", () => {
    render(<UserItemHeader username="Pippo" />);
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });

  test("renders expand icon in correct orientation when collapsed", () => {
    render(<UserItemHeader username="Pippo" isExpanded={false} />);
    const expandIcon = screen.getByRole("button").querySelector("svg");
    expect(expandIcon).toHaveStyle("transform: rotate(0Deg);");
  });

  test("renders expand icon in correct orientation when expanded", () => {
    render(<UserItemHeader username="Pippo" isExpanded={true} />);
    const expandIcon = screen.getByRole("button").querySelector("svg");
    expect(expandIcon).toHaveStyle("transform: rotate(180Deg);");
  });

  test("handles icon button click", async () => {
    const user = userEvent.setup();
    render(<UserItemHeader username="Pippo" />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toBeInTheDocument();
  });
});
