import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/page";
import Login from "./app/(auth)/login/page";
import ResetPass from "./app/(auth)/reset-password/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
