// Client side code

import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useRoomContext } from "../../context/room/RoomContext.js";
import { Actions } from "../../utils/actions.js"
import { useUserContext } from "../../context/user/UserContext.js";

const Monaco = () => {
  const [fileName, setFileName] = useState("script.js");
  const editorRef = useRef(null);
  const [code, setCode] = useState({
    js: "// Write JS code here...",
    css: "/* Write CSS code here... */",
    html: "<!-- Write HTML code here... -->",
  });
  const { setEditorData, editorData, roomData, socketio, permission } = useRoomContext();
  const { userData } = useUserContext()

  let src = ` <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
        ${editorData?.html}
        </body>
        <style>${editorData?.css}</style>
        <script>${editorData?.js}</script>
        </html>`;

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: editorData.js,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: editorData.css,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: editorData.html,
    },
  };

  const file = files[fileName];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    // Fetch code data from the server when the component mounts
    fetchCodeData();
    socketio?.on(Actions.CODE_CHANGE, ({ updatedData }) => {
      console.log("permission", permission, roomData.admin)
      if (permission !== userData.username) {
        console.log("got data", editorData[fileName.split(".")[1]], fileName)
        setEditorData(updatedData)
      }
    })
    return () => {
      socketio?.off(Actions.CODE_CHANGE)
    }
  }, [editorData]);

  const fetchCodeData = async () => {
    try {
      const roomId = window.location.pathname.split("/").pop(); // Extract room ID from the URL
      const response = await fetch(`/api/code/get/${roomId}`);
      if (response.ok) {
        const data = await response.json();
        setEditorData(data.value);
      } else {
        throw new Error(`Error fetching code data: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveCode = async (updatedData) => {
    console.log("Updated Data:", updatedData);
    try {
      let response;
      if (updatedData && updatedData._id) {
        // If code exists, update it
        response = await fetch("http://localhost:5000/api/code/update", {
          method: "PATCH",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
      } else {
        // If code doesn't exist, create it
        response = await fetch("http://localhost:5000/api/code/create", {
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
      }
      if (!response.ok) {
        throw new Error(`Error saving code: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = () => {
    // Update local state when the code changes
    const updatedData = { ...editorData };

    if (fileName === "index.html") {
      updatedData.html = editorRef.current.getValue();
    } else if (fileName === "style.css") {
      updatedData.css = editorRef.current.getValue();
    } else {
      updatedData.js = editorRef.current.getValue();
    }

    // Save the code to the server
    setEditorData(updatedData);
    if (permission === userData.username) {
      saveCode(updatedData);
      socketio.emit(Actions.CODE_CHANGE, { updatedData })
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2">
        <div>
          <button
            className={`${fileName === "script.js" ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"}  text-white font-bold py-2 px-4 rounded my-3 mx-5`}
            disabled={fileName === "script.js"}
            onClick={() => setFileName("script.js")}
          >
            script.js
          </button>
          <button
            className={`${fileName === "style.css" ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded my-3 mx-5`}
            disabled={fileName === "style.css"}
            onClick={() => setFileName("style.css")}
          >
            style.css
          </button>
          <button
            className={`index-button ${fileName === "index.html" ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded my-3 mx-5`}
            disabled={fileName === "index.html"}
            onClick={() => setFileName("index.html")}
          >
            index.html
          </button>
        </div>
        <Editor
          theme="light"
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onMount={handleEditorDidMount}
          onChange={handleChange}
          value={editorData[fileName.split(".")[1]]}
        />
      </div>
      <div className="w-1/2 mt-4">
        <h1 className="text-4xl font-semibold text-blue-500">Output</h1>
        <iframe
          srcDoc={src}
          sandbox="allow-scripts allow-modals"
        />
      </div>
    </div>
  );
};

export default Monaco;
