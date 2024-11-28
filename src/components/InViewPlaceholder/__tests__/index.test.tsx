import React from "react";
import { render, screen } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { classNames, InViewPlaceholder } from "..";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

const useInViewMock = useInView as jest.Mock;

describe("InViewPlaceholder", () => {
  it("renders the placeholder with no children when out of view", () => {
    useInViewMock.mockReturnValue([jest.fn(), false]);

    render(
      <InViewPlaceholder>
        <div>Child Content</div>
      </InViewPlaceholder>
    );

    const placeholder = screen.queryByTestId("in-view-placeholder");
    expect(placeholder).toHaveClass(classNames.outOfView);
    expect(placeholder?.children.length).toBe(0);
  });

  it("renders the children when in view", () => {
    useInViewMock.mockReturnValue([jest.fn(), true]);

    render(
      <InViewPlaceholder>
        <div>Child Content</div>
      </InViewPlaceholder>
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();

    const placeholder = screen.queryByTestId("in-view-placeholder");
    expect(placeholder).toHaveClass(classNames.inView);
  });
});
