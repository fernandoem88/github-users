export const throwResponseError = async (response: Response) => {
  const { ok, statusText, status } = response;
  if (!ok || status >= 400) {
    const data = await response.json();

    const message = data.message || statusText;
    throw new Error(`${status} Error: ${message}`);
  }
};
