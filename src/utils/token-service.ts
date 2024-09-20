import { deleteCookie, getCookie } from "cookies-next";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = () => getCookie(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => getCookie(REFRESH_TOKEN_KEY);

export const removeTokens = () => {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
};
