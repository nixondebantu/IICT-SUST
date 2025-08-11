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
  notice: {
    getNotices: "/notices",
    getNoticeById: (id: string) => `/notices/${id}`,
    createNotice: "/notices",
    updateNotice: (id: string) => `/notices/${id}`,
    deleteNotice: (id: string) => `/notices/${id}`,
  },
  directorMessage: {
    getMessages: "/director-messages",
    getMessageById: (id: string) => `/director-messages/${id}`,
    createMessage: "/director-messages",
    updateMessage: (id: string) => `/director-messages/${id}`,
    deleteMessage: (id: string) => `/director-messages/${id}`,
  },
  tag: {
    getTags: "/tags",
    createTag: "/tags",
  },
  event: {
    getEvents: "/events",
    getEventById: (id: string) => `/events/${id}`,
    createEvent: "/events",
    updateEvent: (id: string) => `/events/${id}`,
    deleteEvent: (id: string) => `/events/${id}`,
  },
};
