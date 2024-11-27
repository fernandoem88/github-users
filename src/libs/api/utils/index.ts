export const throwResponseError = async (response: Response) => {
  const { ok, statusText, status } = response;
  if (!ok || status >= 400) {
    const data = await response.json();
    throw { message: data.message, status, statusText };
  }
};
