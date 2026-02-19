import { useState } from "react";
import Home from "./pages/Home";
import LoginModal from "./components/auth/LoginModal";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Home page is always rendered as base */}
      <Home onLoginClick={() => setShowLogin(true)} />

      {/* Login modal overlays on top when triggered */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
}

export default App;