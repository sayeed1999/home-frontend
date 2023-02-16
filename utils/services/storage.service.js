export const setUser = (user) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("user");
    if (!data) return null;
    return JSON.parse(data);
  }
  return undefined;
};
