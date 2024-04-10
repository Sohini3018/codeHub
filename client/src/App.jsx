import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monaco from "./components/CodeEditor/Monaco";
import ChatBox from "./components/Chatbox/ChatBox";
import { Whiteboard } from "./components/WhiteBoard/Whiteboard";
import LandingPage from "./components/LandingPage/LandingPage";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Room from "./components/Room/Room";
import { Toaster } from 'react-hot-toast';
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <TopNavbar />
        <Toaster />

        <Routes>
          <Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
          <Route path="/editor" element={<PrivateRoute><Monaco /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><ChatBox /></PrivateRoute>} />
          <Route path="/whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
          <Route path="/roomjoin" element={<PrivateRoute><Room /></PrivateRoute>} />

          {/* public routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
