"use server";

import { IGithubUser } from "../types";
import { throwResponseError } from "../utils";
import { getDefaultHeaders } from "../utils/getDefaultHeaders";

export interface Params {
  username: string;
}

const ENDPOINT = "https://api.github.com/users/:username";

export const doGetUser = async ({ username }: Params) => {
  const url = ENDPOINT.replace(":username", username);

  const response = await fetch(url, {
    headers: await getDefaultHeaders(),
    next: { tags: ["users", "users/" + username] },
  });

  await throwResponseError(response);
  const data = await response.json();
  return data as IGithubUser;
};
