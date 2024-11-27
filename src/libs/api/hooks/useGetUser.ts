import { useQuery } from "@tanstack/react-query";
import { doGetUser, type Params } from "../actions/getUser";

export const useGetUser = ({ username }: Params) => {
  const queryKey = ["users", username];
  const query = useQuery({
    enabled: !!username,
    queryKey,
    queryFn: () => doGetUser({ username }),
  });

  return query;
};
