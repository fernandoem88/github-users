import getEnvVariable from "./getEnvironmentVariables";

export const getDefaultHeaders = () => {
  const githubToken = getEnvVariable("NEXT_PUBLIC_GITHUB_KEY");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${githubToken}`,
  };
};
