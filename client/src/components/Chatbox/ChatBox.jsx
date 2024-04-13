import React, { useState, useRef } from 'react';
import { sendMsgToOpenAI } from './openai';
import MessageTemplate from './MessageTemplate';

const ChatBox = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null)

  async function getResponse(userInput) {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-1.1-7b-it", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_ACCESS_TOKEN}`
        },
        method: "POST",
        body: JSON.stringify(userInput),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: 'user' },
    ]);


    // const responseFromGPT = await sendMsgToOpenAI(userInput);
    const responseFromModel = await getResponse({ inputs: userInput })
    console.log(responseFromModel)

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: responseFromModel[0].generated_text, sender: 'chatbot' },
    ]);

    setTimeout(() => {
      chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    setUserInput('');
  };


  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-end p-10 rounded-lg w-full h-full">
        <div className="flex flex-col flex-grow overflow-y-auto mb-4 gap-4" ref={chatRef}>
          {messages.map((message, index) => (
            message.sender === 'user' ? <MessageTemplate mode="user" text={message.text} /> : <MessageTemplate mode="bot" text={message.text} />
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
      </div>
    </div>
  );
};

export default ChatBox;
