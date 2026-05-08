const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export const apiUrl = (path = "") => {
  const normalizedBase = API_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
};
