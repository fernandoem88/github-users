import { Box, SxProps } from "@mui/material";
import { type ReactNode, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children: NonNullable<ReactNode>;
  sx?: SxProps;
  component?: keyof JSX.IntrinsicElements;
}

export const classNames = {
  outOfView: "in-view-placeholder__out-of-view",
  inView: "in-view-placeholder__in-view",
};

/**
 * @description this component renders mount its children when it appears in view.
 * meanwhile it renders an empty placeholder when the element is out of the view port
 * */
export const InViewPlaceholder = ({ children, sx, component }: Props) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const [setAnchor, isInView] = useInView();

  const getContainerStyle = () => {
    if (isInView || !ref.current) return {};
    return { height: ref.current.offsetHeight };
  };

  const handleRefChange = (node: HTMLLIElement) => {
    setAnchor(node);
    ref.current = node;
  };

  return (
    <Box
      data-testid="in-view-placeholder"
      component={component || "div"}
      className={isInView ? classNames.inView : classNames.outOfView}
      ref={handleRefChange}
      sx={{
        ...sx,
        listStyle: "none",
        "& *": { display: isInView ? undefined : "none" },
        ...getContainerStyle(),
      }}
    >
      {isInView ? children : null}
    </Box>
  );
};
