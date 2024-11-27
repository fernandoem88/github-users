import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

import type { IGithubRepo } from "../../../../libs/api/types";

interface Props {
  repo: IGithubRepo;
}

export const RepoCard = ({ repo }: Props) => {
  const { stargazers_count, name, description } = repo;
  return (
    <Card component="article" sx={{ bgcolor: "#f6f6f6" }}>
      <CardHeader
        title={name}
        titleTypographyProps={{
          fontSize: 18,
          fontWeight: 600,
          maxWidth: "calc(100% - 80px)",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        action={
          !!stargazers_count && (
            <Stack direction="row" alignItems="center">
              {stargazers_count}
              <StarIcon fontSize="small" />
            </Stack>
          )
        }
      />
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};
