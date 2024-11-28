import getEnvVariable from "./getEnvironmentVariables";

/** @description need to be used only in server actions */
export const getDefaultHeaders = async () => {
  const githubToken = getEnvVariable("NEXT_PUBLIC_GITHUB_KEY");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${githubToken}`,
  };
};
