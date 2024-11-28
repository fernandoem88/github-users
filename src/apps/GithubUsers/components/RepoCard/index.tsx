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
    <Card elevation={0} component="article" sx={{ bgcolor: "grey.100" }}>
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
      <CardContent sx={{ py: 0, my: 0 }}>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};
