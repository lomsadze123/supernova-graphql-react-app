import { useEffect } from "react";
import { connectWebSocket, closeWebSocket } from "../../utils/webSocket";

const WebSocketComponent = () => {
  useEffect(() => {
    const ws = connectWebSocket("ws://localhost:3001");

    // Handle WebSocket open event
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    // Handle WebSocket close event
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      closeWebSocket(ws);
    };
  }, []);

  return null;
};

export default WebSocketComponent;
