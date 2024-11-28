import { IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Folder from "@mui/icons-material/FolderOutlined";

interface Props {
  username: string;
  totalRepos?: number;
  isExpanded?: boolean;
}

export const UserItemHeader = ({ username, totalRepos, isExpanded }: Props) => {
  const rotate = isExpanded ? "180Deg" : "0Deg";
  return (
    <Stack
      display="grid"
      gridTemplateColumns="1fr auto auto"
      alignItems="center"
      width={1}
      gap={1}
    >
      <Typography
        component="div"
        sx={{
          width: "calc(100% - 16px)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          mr: "auto",
        }}
      >
        {username}
      </Typography>
      {!!totalRepos && (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography variant="body2">{totalRepos}</Typography>
          <Folder fontSize="small" />
        </Stack>
      )}
      <IconButton>
        <ExpandMoreIcon
          sx={{ transform: `rotate(${rotate})`, transition: "0.2s" }}
        />
      </IconButton>
    </Stack>
  );
};
