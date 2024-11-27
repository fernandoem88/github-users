"use server";

const githubToken = process.env.NEXT_PUBLIC_GITHUB_KEY;

export const getDefaultHeaders = async () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${githubToken}`,
  };
};
