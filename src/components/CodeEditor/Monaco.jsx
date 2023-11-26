import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

const Monaco = () => {
  const [fileName, setFileName] = useState("script.js");
  const editorRef = useRef(null)
  const [code, setCode] = useState({
    js: "// Write JS code here...",
    css: "/* Write CSS code here... */",
    html: "<!-- Write HTML code here... -->",
  })
  let src = ` <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${code?.title}</title>
        </head>
        <body>
        ${code?.html}
        </body>
        <style>${code?.css}</style>
        <script>${code?.js}</script>
        </html>`
  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "// Write JS code here...",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: "/* Write CSS code here... */",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<!-- Write HTML code here... -->",
    },
  };

  const file = files[fileName];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  }

  const handleChange = () => {
    if (fileName === "index.html") {
      setCode({ ...code, html: editorRef.current.getValue() })
    } else if (fileName === "style.css") {
      setCode({ ...code, css: editorRef.current.getValue() })
    } else {
      setCode({ ...code, js: editorRef.current.getValue() })
    }
    console.log(code);
  }

  return (
    <div className="flex w-screen">
      <div className="w-1/2 h-screen">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 mx-5"
          disabled={fileName === "script.js"}
          onClick={() => setFileName("script.js")}
        >
          script.js
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 mx-5"
          disabled={fileName === "style.css"}
          onClick={() => setFileName("style.css")}
        >
          style.css
        </button>
        <button
          className="index-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 mx-5"
          disabled={fileName === "index.html"}
          onClick={() => setFileName("index.html")}
        >
          index.html
        </button>
        <Editor
          height="90vh"
          theme="light"
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onMount={handleEditorDidMount}
          onChange={handleChange}
        />
      </div>
      <iframe
        srcDoc={src}
        sandbox="allow-scripts allow-modals"
        className="w-1/2 h-screen"
      />
    </div>
  );
};

export default Monaco;
