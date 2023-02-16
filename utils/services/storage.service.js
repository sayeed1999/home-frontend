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

export const setChatUser = (user) => {
  if (user) localStorage.setItem("chatUser", JSON.stringify(user));
};

export const getChatUser = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("chatUser");
    if (!data) return null;
    return JSON.parse(data);
  }
  return undefined;
};

export const setJwtToken = (token) => {
  if (token) localStorage.setItem("jwtToken", token);
};

export const getJwtToken = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("jwtToken");
    if (!data) return null;
    return data;
  }
  return undefined;
};
