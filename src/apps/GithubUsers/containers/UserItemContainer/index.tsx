import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
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

  const totalRepos = repos.length;
  return (
    <Accordion
      expanded={isExpanded}
      onChange={(_, isExpanded) => setIsExpanded(isExpanded)}
    >
      <AccordionSummary
        sx={{
          bgcolor: isExpanded ? "#f6f6f6" : undefined,
        }}
      >
        <UserItemHeader username={username} totalRepos={totalRepos} />
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2} component="section">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
