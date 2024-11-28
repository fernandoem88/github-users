import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";

interface Props {
  error?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
  isLoading?: boolean;
}

/** @description this component must execute the `loadMore` callback when it's in view */
export const InViewLoader = ({
  hasMore,
  loadMore,
  isLoading,
  error,
}: Props) => {
  const [anchor] = useInView({
    // rootMargin: "0px 0px -10px 0px",
    threshold: 0,
    onChange: (inView) => {
      if (isLoading) return;
      if (!inView) return;
      if (!hasMore) return;

      loadMore?.();
    },
  });

  const canBeShown = hasMore && !error;

  return (
    <Box minHeight={canBeShown ? 40 : 0} ref={anchor} textAlign="center">
      {canBeShown ? "Loading..." : ""}
    </Box>
  );
};
