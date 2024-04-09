import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monaco from "./components/CodeEditor/Monaco";
import ChatBox from "./components/Chatbox/ChatBox";
import { Whiteboard } from "./components/WhiteBoard/Whiteboard";
import LandingPage from "./components/LandingPage/LandingPage";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <TopNavbar />
        <Toaster/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/editor" element={<Monaco />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
