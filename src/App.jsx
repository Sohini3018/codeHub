import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monaco from "./components/CodeEditor/Monaco";
import ChatBox from "./components/Chatbox/ChatBox"
import Editor from "./components/CodeEditor/Editor"
import { Whiteboard } from "./components/WhiteBoard/Whiteboard"
import LandingPage from "./components/LandingPage/LandingPage";
function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        
        <Route path="/" element = {<LandingPage />} />

        <Route path="/editor" element = {<Monaco/>} />

        <Route path="/chat" element = {<ChatBox />} />

        <Route path="/whiteboard" element = {<Whiteboard />} />
          
      </Routes>

    </BrowserRouter>
  )
}

export default App;
