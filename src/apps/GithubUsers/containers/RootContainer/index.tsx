"use client";

import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useGetUsersList } from "../../../../libs/api/hooks/useGetUsersList";

export const GithubUser = () => {
  const [search, setUsername] = useState("");

  const doGetUsersList = useGetUsersList({ q: search });

  const totalCount = doGetUsersList.data?.pages[0].total_count ?? 0;
  const usersList = doGetUsersList.data?.pages.flatMap((data) => data.items);

  const isLoading = doGetUsersList.isLoading;

  const handleSubmitsearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const validation = z.string().safeParse(formData.get("username"));
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }
    setUsername(validation.data);
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Stack width={540} maxWidth={1} mx="auto">
        <Stack
          gap={2}
          component="form"
          onSubmit={handleSubmitsearch}
          position="sticky"
          top={0}
          bgcolor="white"
          zIndex={1}
          pt={2}
        >
          <TextField
            label="username"
            name="username"
            error={!!doGetUsersList.error}
            helperText={
              isLoading ? "Loading..." : doGetUsersList.error?.message
            }
          />
          <Button variant="contained" type="submit" disabled={isLoading}>
            Search
          </Button>
        </Stack>
        <Stack>
          {!!search && (
            <Alert>
              {totalCount} results for&nbsp;
              <Typography component="span" fontWeight={600}>
                {search}
              </Typography>
            </Alert>
          )}
          {usersList?.map((user) => (
            <Typography key={user.id}>{user.login}</Typography>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
