"use server";

import type { IUsersListResponse } from "../types";
import { throwResponseError } from "../utils";
import { getDefaultHeaders } from "../utils/getDefaultHeaders";
import qs from "qs";

export interface Params {
  q: string;
  page: number;
  perPage?: number;
}

// search = q=abc&sort=followers&order=desc&per_page=100&page=1
const ENDPOINT = "https://api.github.com/search/users";

export const doGetUsersList = async ({
  page,
  q,
  perPage: per_page,
}: Params) => {
  const search = qs.stringify(
    { page, q, per_page },
    { allowEmptyArrays: false, skipNulls: true }
  );
  const url = `${ENDPOINT}?${search}`;

  const response = await fetch(url, {
    headers: getDefaultHeaders(),
    next: { tags: ["users", "users-list"] },
  });

  await throwResponseError(response);
  const data = await response.json();
  return data as IUsersListResponse;
};
