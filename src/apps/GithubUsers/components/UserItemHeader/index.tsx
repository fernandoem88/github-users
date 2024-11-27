import { Box, Stack, Typography } from "@mui/material";

interface Props {
  username: string;
  totalRepos?: number;
}

export const UserItemHeader = ({ username, totalRepos }: Props) => {
  return (
    <Stack direction="row" alignItems="center" width={1}>
      <Typography
        mr="auto"
        sx={{
          maxWidth: 320,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {username}
      </Typography>
      {!!totalRepos && <Box>{totalRepos}</Box>}
    </Stack>
  );
};
