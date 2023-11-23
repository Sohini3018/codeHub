import React, { useState } from 'react';
import { sendMsgToOpenAI } from './openai'; 

const ChatBox = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: 'user' },
    ]);
  
    
    const responseFromGPT = await sendMsgToOpenAI(userInput);
  
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: responseFromGPT, sender: 'chatbot' },
    ]);
  
    
    setUserInput('');
  };
  

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-end p-10 rounded-lg w-full h-full">
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded mb-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-r-md"
          >
            Send
          </button>
        </div>
        {/* Ensure there is enough space for the input box to be visible */}
        <div style={{ height: '50px' }}></div>
      </div>
    </div>
  );
};

export default ChatBox;
