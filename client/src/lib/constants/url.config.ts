export const APIUrl = {
  base: import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000",
  auth: {
    login: "/auth/login",
  },
};
