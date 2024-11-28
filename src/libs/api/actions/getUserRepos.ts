"use server";

import { IGithubRepo } from "../types";
import { throwResponseError } from "../utils";
import { getDefaultHeaders } from "../utils/getDefaultHeaders";

const ENDPOINT = "https://api.github.com/users/:username/repos";

export interface Params {
  username: string;
}

export const doGetUserRepos = async ({ username }: Params) => {
  const url = ENDPOINT.replace(":username", username);

  const response = await fetch(url, {
    headers: getDefaultHeaders(),
    next: { tags: ["user-repos", `user-repos/${username}`] },
  });

  await throwResponseError(response);

  const data = await response.json();
  return data as IGithubRepo[];
};
