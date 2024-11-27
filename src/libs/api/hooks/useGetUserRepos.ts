import { useQuery } from "@tanstack/react-query";
import { doGetUserRepos, type Params } from "../actions/getUserRepos";

interface Props extends Params {
  enabled?: boolean;
}

export const useGetUserRepos = ({ username, enabled = false }: Props) => {
  const queryKey = ["users-repos", username];
  const query = useQuery({
    enabled: !!username && enabled,
    queryKey,
    queryFn: () => doGetUserRepos({ username }),
  });

  return query;
};
