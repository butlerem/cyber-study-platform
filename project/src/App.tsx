import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ChallengePage from "./pages/ChallengePage";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0A0F1C] text-white relative">
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenge/:id" element={<ChallengePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
