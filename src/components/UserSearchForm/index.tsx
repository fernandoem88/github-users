"use client";

import { Button, Stack, TextField } from "@mui/material";
import { FormEvent } from "react";
import { z } from "zod";

interface Props {
  onSubmit: (value: string) => void;
  errorMessage?: string;
  isLoading: boolean;
}

export const EMPTY_SEARCH_MESSAGE = "please enter some search text";

export const UserSearchForm = ({
  onSubmit,
  errorMessage,
  isLoading,
}: Props) => {
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validation = z.string().safeParse(formData.get("username"));

    if (!validation.success) {
      alert(validation.error.issues[0]?.message ?? "400: wrong search value");
      return;
    }

    if (!validation.data) {
      alert(EMPTY_SEARCH_MESSAGE);
      return;
    }

    onSubmit(validation.data);
  };

  return (
    <Stack
      gap={2}
      component="form"
      onSubmit={handleSubmitSearch}
      position="sticky"
      top={0}
      bgcolor="white"
      zIndex={1}
      pt={2}
    >
      <TextField
        label="username"
        name="username"
        error={!!errorMessage}
        helperText={isLoading ? "Loading..." : errorMessage}
      />
      <Button variant="contained" type="submit" disabled={isLoading}>
        Search
      </Button>
    </Stack>
  );
};
