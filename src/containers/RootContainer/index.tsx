"use client";

import { Alert, Container, Stack } from "@mui/material";
import { useState } from "react";
import { useGetUsersList } from "@/libs/api/hooks/useGetUsersList";
import { UserSearchForm } from "@/components/UserSearchForm";
import { InViewLoader } from "@/components/InViewLoader";

import { UserItemContainer } from "../UserItemContainer";
import { GENERIC_ERROR_MESSAGE } from "./constants";

export const GithubUsersRootContainer = () => {
  const [search, setUsername] = useState("");

  const doGetUsersList = useGetUsersList({ q: search });

  const totalCount = doGetUsersList.data?.pages[0].total_count ?? 0;
  const usersList = doGetUsersList.data?.pages.flatMap((data) => data.items);

  const isLoading = doGetUsersList.isLoading;
  const resultCaption = `${totalCount} results for ${search}`;
  const hasError = !!doGetUsersList.error;

  return (
    <Container>
      <Stack
        height="100vh"
        width={540}
        maxWidth={1}
        mx="auto"
        gap={2}
        overflow="auto"
      >
        <UserSearchForm
          isLoading={isLoading}
          onSubmit={setUsername}
          errorMessage={hasError ? GENERIC_ERROR_MESSAGE : undefined}
        />
        {!!search && <Alert>{resultCaption}</Alert>}
        <Stack px={2} component="ul" gap="1px">
          {usersList?.map((user) => (
            <UserItemContainer key={user.id} user={user} />
          ))}
        </Stack>
        <InViewLoader
          hasMore={doGetUsersList.hasNextPage}
          isLoading={isLoading}
          loadMore={doGetUsersList.fetchNextPage}
          error={hasError}
        />
      </Stack>
    </Container>
  );
};
