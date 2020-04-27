export const setSession = (name, params) => {
  window.sessionStorage.setItem(name, JSON.stringify(params));
};
export const getSession = (name) => {
  return JSON.parse(window.sessionStorage.getItem(name));
};
export const removeSession = (name) => {
  window.sessionStorage.removeItemv(name, params);
};
export const removeAll = () => {
  window.sessionStorage.clear();
};
