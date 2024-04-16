import React, { useState, useRef, useEffect } from 'react';
import { sendMsgToOpenAI } from './openai';
import MessageTemplate from './MessageTemplate';
import { useParams } from "react-router-dom"
import { useRoomContext } from "../../context/room/RoomContext.js"
import { Actions } from '../../utils/actions.js';

const ChatBox = () => {
  const [userInput, setUserInput] = useState('');
  // const [messages, setMessages] = useState([]);
  const chatRef = useRef(null)
  const { roomId } = useParams()
  const { chatsData: messages, setChatsData: setMessages, socketio } = useRoomContext()

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

  const saveMessages = async (senderType, content) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat/create", {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content,
          senderType,
          roomId
        })
      })
      const data = await response.json()
      if (!data.success) {
        console.log(data.data.message)
      }
    } catch (error) {
      console.log("ERROR IN SAVE MESSAGES FUNCTION", error.message)
    }
  }

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: userInput, senderType: 'USER' },
    ]);
    // 
    socketio?.emit(Actions.CHAT_SEND, { content: userInput, senderType: "USER" })

    saveMessages("USER", userInput)

    // const responseFromGPT = await sendMsgToOpenAI(userInput);
    const responseFromModel = await getResponse({ inputs: userInput })
    console.log(responseFromModel)

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: responseFromModel[0].generated_text, senderType: 'BOT' },
    ]);
    saveMessages("BOT", responseFromModel[0].generated_text)
    socketio?.emit(Actions.CHAT_SEND, { content: responseFromModel[0].generated_text, senderType: "BOT" })

    setTimeout(() => {
      chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    setUserInput('');
  };

  useEffect(() => {
    if (socketio) {
      socketio?.on(Actions.CHAT_SEND, ({ content, senderType }) => {
        console.log({ content, senderType })
        setMessages((pre) => [...pre, { content, senderType }])
      })
    }

    return () => {
      socketio?.off(Actions.CHAT_SEND)
    }
  }, [])


  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-end p-10 rounded-lg w-full h-full">
        <div className="flex flex-col flex-grow overflow-y-auto mb-4 gap-4" ref={chatRef}>
          {messages && messages.map((message, index) => (
            message.senderType === 'USER' ? <MessageTemplate mode="user" text={message.content} /> : <MessageTemplate mode="bot" text={message.content} />
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
