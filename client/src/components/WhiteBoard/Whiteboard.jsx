import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useRef } from "react";
import { useRoomContext } from "../../context/room/RoomContext.js"

export const Whiteboard = () => {
  const excalidrawRef = useRef(null);
  const { boardData } = useRoomContext()

  const extractExcalidrawContent = async () => {
    const excalidrawInstance = excalidrawRef.current;
    if (excalidrawInstance) {
      const sceneElements = excalidrawInstance.getSceneElementsIncludingDeleted();
      boardData.current = { content: sceneElements, _id: boardData.current._id }
      console.log(sceneElements, boardData.current)
      try {
        const response = await fetch("http://localhost:5000/api/board/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: JSON.stringify(sceneElements),
            boardId: boardData.current._id,
          }),
        });
        if (response.ok) {
          // const responseData = await response.json();
          // console.log("Excalidraw content saved successfully:", responseData);
        } else {
          console.error("Failed to save Excalidraw content");
        }
      } catch (error) {
        console.error("Error saving Excalidraw content:", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen">
      <Excalidraw ref={excalidrawRef} onChange={extractExcalidrawContent} initialData={{ elements: boardData.current.content }} />
    </div>
  );
};
