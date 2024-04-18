import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useEffect, useRef, useState } from "react";
import { useRoomContext } from "../../context/room/RoomContext.js"
import { Actions } from "../../utils/actions.js";
import { useUserContext } from "../../context/user/UserContext.js";

export const Whiteboard = () => {
  const excalidrawRef = useRef(null);
  const { boardData, socketio, permission } = useRoomContext()
  const { userData } = useUserContext()
  const [excalidrawApi, setExcalidrawApi] = useState(null)

  const extractExcalidrawContent = async () => {
    const sceneElements = excalidrawApi?.getSceneElements()
    console.log(sceneElements)
    // const sceneElements = excalidrawInstance.getSceneElementsIncludingDeleted();
    boardData.current = { content: sceneElements, _id: boardData.current._id }
    console.log(userData.username, permission)
    if (userData.username === permission) {
      socketio.emit(Actions.BOARD_CHANGE, { boardData: sceneElements })
    }
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
  };

  useEffect(() => {
    if (!excalidrawApi) {
      return
    }
    excalidrawApi.readyPromise.then((api) => {
      socketio.on(Actions.BOARD_CHANGE, ({ boardData }) => {
        if (userData.username !== permission) {
          api.updateScene({ elements: boardData })
        }
      })
    })
  }, [excalidrawApi])

  return (
    <div className="w-full h-screen z-10">
      <Excalidraw ref={api => setExcalidrawApi(api)} onChange={extractExcalidrawContent} initialData={{ elements: boardData.current.content }} />
    </div>
  );
};
