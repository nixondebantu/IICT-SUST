import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./app/(auth)/login/page";
import ResetPass from "./app/(auth)/reset-password/page";
import Blog from "./app/(protected)/dashboard/blog/page";
import Carousel from "./app/(protected)/dashboard/carousel/page";
import News from "./app/(protected)/dashboard/news/page";
import Dashboard from "./app/(protected)/dashboard/page";
import NotFound from "./app/not-found";
import Home from "./app/page";
import Navbar from "./components/layout/navbar";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import { AuthProvider } from "./lib/context/AuthContext";
import Footer from "./components/layout/footer";
import AboutPage from "./app/about/page";
import ProgramsPage from "./app/programs/page";
import ContactPage from "./app/contact/page";
import Notices from "./app/(protected)/dashboard/notices/page";
import DirectorMessagePage from "./app/(protected)/dashboard/director_message/page";
import NoticePage from "./app/notices/page";
import NoticeDetailsPage from "./app/notices/[id]/page";
import CreateNoticePage from "./app/(protected)/dashboard/notices/new/page";
import EditNoticePage from "./app/(protected)/dashboard/notices/[id]/page";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <AboutPage /> },
      { path: "programs", element: <ProgramsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "notices", element: <NoticePage /> },
      { path: "notices/:id", element: <NoticeDetailsPage /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPass /> },

      {
        path: "dashboard",
        element: <ProtectedLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "carousel", element: <Carousel /> },
          { path: "news", element: <News /> },
          { path: "blog", element: <Blog /> },
          { path: "notices", element: <Notices /> },
          { path: "notices/new", element: <CreateNoticePage /> },
          { path: "notices/:id", element: <EditNoticePage /> },
          { path: "director_message", element: <DirectorMessagePage /> }, // Placeholder for Director's Message
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
