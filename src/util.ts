export const getAuthHeader = (
  oauthUsername: string,
  oauthPassword: string
): string => {
  if (isBrowser()) {
    // for browser env
    return btoa(oauthUsername + ":" + oauthPassword);
  }
  //for  node env
  return Buffer.from(`${oauthUsername}:${oauthPassword}`, "utf-8").toString(
    "base64"
  );
};

export const isBrowser = (): boolean => typeof window !== `undefined`;
