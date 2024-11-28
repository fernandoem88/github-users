import { act, render, screen } from "@testing-library/react";
import { InViewLoader } from "..";
import { useInView } from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const useInViewMock = useInView as jest.Mock;

describe("InViewLoader", () => {
  it("calls loadMore after 1.5 seconds when component is in view", async () => {
    const mockLoadMore = jest.fn();
    const anchorRef = (_ref: HTMLDivElement) => {};
    const isInView = true;

    useInViewMock.mockImplementation(({ onChange }: any) => {
      setTimeout(() => onChange(isInView), 1500);
      return [anchorRef];
    });

    render(
      <InViewLoader
        hasMore={true}
        loadMore={mockLoadMore}
        isLoading={false}
        error={false}
      />
    );

    const loader = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1600);
    });

    expect(mockLoadMore).toHaveBeenCalled();
  });
});
