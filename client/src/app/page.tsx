import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}

export default App;
