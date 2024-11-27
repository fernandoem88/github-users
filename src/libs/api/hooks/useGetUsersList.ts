import { useInfiniteQuery } from "@tanstack/react-query";
import { doGetUsersList, type Params } from "../actions/doGetUsersList";

export const useGetUsersList = ({ q, perPage = 100 }: Omit<Params, "page">) => {
  const queryKey = ["users-list", perPage, q];

  const query = useInfiniteQuery({
    enabled: !!q,
    initialPageParam: 1,
    queryKey,
    queryFn: ({ pageParam }) => {
      return doGetUsersList({ q, perPage, page: pageParam });
    },
    getNextPageParam(prevPage, allPages) {
      const prevItems = prevPage.items.length;
      const count = allPages.length * perPage;
      const hasMoreItems =
        prevItems === perPage && count < prevPage.total_count;

      return hasMoreItems ? allPages.length + 1 : null;
    },
  });

  return query;
};
