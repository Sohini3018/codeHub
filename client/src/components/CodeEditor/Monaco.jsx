import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useRoomContext } from "../../context/room/RoomContext.js"

const Monaco = () => {
  const [fileName, setFileName] = useState("script.js");
  const editorRef = useRef(null)
  const [code, setCode] = useState({
    js: "// Write JS code here...",
    css: "/* Write CSS code here... */",
    html: "<!-- Write HTML code here... -->",
  })
  const { setEditorData, editorData, roomData } = useRoomContext()

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
        </html>`

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
  }

  const handleChange = () => {
    if (fileName === "index.html") {
      setEditorData({ ...editorData, html: editorRef.current.getValue() })
    } else if (fileName === "style.css") {
      setEditorData({ ...editorData, css: editorRef.current.getValue() })
    } else {
      setEditorData({ ...editorData, js: editorRef.current.getValue() })
    }
    console.log(code);
  }

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
