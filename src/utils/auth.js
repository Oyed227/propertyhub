export const getAuth = () => {
  const authData = localStorage.getItem("propertyHubAuth");
  if (!authData) return null;

  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
};

export const getUser = () => getAuth()?.user || null;
export const getUserRole = () => getUser()?.role || null;
export const isAuthenticated = () => Boolean(getAuth()?.token);
export const isOwner = () => getUserRole() === "owner";
export const isAdmin = () => getUserRole() === "admin";
