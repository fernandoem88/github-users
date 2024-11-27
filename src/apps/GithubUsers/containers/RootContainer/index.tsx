"use client";

import { Alert, Container, Stack } from "@mui/material";
import { useState } from "react";
import { useGetUsersList } from "../../../../libs/api/hooks/useGetUsersList";
import { UserSearchForm } from "../../components/UserSearchForm";
import { UserSearchItem } from "../UserItemContainer";

export const GithubUser = () => {
  const [search, setUsername] = useState("");

  const doGetUsersList = useGetUsersList({ q: search });

  const totalCount = doGetUsersList.data?.pages[0].total_count ?? 0;
  const usersList = doGetUsersList.data?.pages.flatMap((data) => data.items);

  const isLoading = doGetUsersList.isLoading;

  const resultCaption = `${totalCount} results for ${search}`;

  return (
    <Container sx={{ height: "100vh" }}>
      <Stack width={540} maxWidth={1} mx="auto" gap={2}>
        <UserSearchForm
          isLoading={isLoading}
          onSubmit={setUsername}
          errorMessage={doGetUsersList.error?.message}
        />
        {!!search && <Alert>{resultCaption}</Alert>}
        <Stack>
          {usersList?.map((user) => (
            <UserSearchItem key={user.id} user={user} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
