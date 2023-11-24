import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const Monaco = () => {
  const [fileName, setFileName] = useState("script.js");
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

  return (
    <>
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
        height="50vh"
        theme="light"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </>
  );
};

export default Monaco;
