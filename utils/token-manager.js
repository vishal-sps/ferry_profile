import isBrowser from "./is-browser";

export const setToken = (tokenName, token) => {
  return isBrowser() ? localStorage.setItem(tokenName, token) : "";
};

export const getToken = (tokenName) => {
  return isBrowser() ? localStorage.getItem(tokenName) : "";
};

export const crushToken = (tokenName) => {
  return isBrowser() ? localStorage.removeItem(tokenName) : "";
};
