"use server";

import { IGithubRepo } from "../types";
import { throwResponseError } from "../utils";
import { getDefaultHeaders } from "../utils/getDefaultHeaders";

const ENDPOINT = "https://api.github.com/users/:username/repos";

interface Params {
  search: string;
}

export const doGetUserRepos = async ({ search }: Params) => {
  const url = ENDPOINT.replace(":username", search);

  const response = await fetch(url, {
    headers: await getDefaultHeaders(),
  });

  await throwResponseError(response);

  const data = await response.json();
  return data as IGithubRepo;
};
