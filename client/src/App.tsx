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
