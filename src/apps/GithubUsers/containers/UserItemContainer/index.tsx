import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import type { IGithubUser } from "../../../../libs/api/types";
import { useState } from "react";
import { useGetUserRepos } from "../../../../libs/api/hooks/useGetUserRepos";
import { RepoCard } from "../../components/RepoCard";
import { UserItemHeader } from "../../components/UserItemHeader";

interface Props {
  user: IGithubUser;
}

export const UserSearchItem = ({ user }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { login: username } = user;
  const doGetRepos = useGetUserRepos({ username, enabled: isExpanded });
  const repos = doGetRepos.data ?? [];

  const totalRepos = user.public_repos ?? repos.length;

  const isLoading = doGetRepos.isLoading;

  return (
    <Accordion
      expanded={isExpanded}
      onChange={(_, isExpanded) => setIsExpanded(isExpanded)}
    >
      <AccordionSummary
        sx={{
          bgcolor: isExpanded ? "grey.300" : undefined,
        }}
      >
        <UserItemHeader
          username={username}
          totalRepos={totalRepos}
          isExpanded={isExpanded}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2} component="section" pt={1}>
          {!totalRepos && isLoading && (
            <Typography variant="body2" textAlign="center">
              Loading...
            </Typography>
          )}
          {!totalRepos && !isLoading && (
            <Alert color="info">no repos found.</Alert>
          )}
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
