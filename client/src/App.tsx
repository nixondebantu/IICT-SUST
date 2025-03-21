import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./app/(auth)/login/page";
import ResetPass from "./app/(auth)/reset-password/page";
import Carousel from "./app/(protected)/dashboard/carousel/page";
import DashboardLayout from "./app/(protected)/dashboard/layout";
import Dashboard from "./app/(protected)/dashboard/page";
import NotFound from "./app/not-found";
import Home from "./app/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "carousel",
        element: <Carousel />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
