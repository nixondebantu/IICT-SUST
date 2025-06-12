export const APIUrl = {
  base: import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000",
  auth: {
    login: "/auth/login",
  },
  carousel: {
    getSlides: "/carousel",
    getSlideById: (id: string) => `/carousel/${id}`,
    createSlide: "/carousel",
    updateSlide: (id: string) => `/carousel/${id}`,
    deleteSlide: (id: string) => `/carousel/${id}`,
  },
};
