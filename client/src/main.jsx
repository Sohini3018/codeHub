import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './context/user/UserContextProvider.jsx'
import RoomContextProvider from './context/room/RoomContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RoomContextProvider>
        <App />
      </RoomContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
