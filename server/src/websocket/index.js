import { WebSocketServer } from "ws";

const initWebSocketServer = (httpServer) => {
  const wsServer = new WebSocketServer({ server: httpServer });

  wsServer.on("connection", (ws) => {
    console.log("WebSocket client connected");

    // Handle WebSocket messages
    ws.on("message", (message) => {
      console.log("Received message:", message);
      // You can handle specific messages here if needed
    });

    // Handle WebSocket disconnection
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
};

export default initWebSocketServer;
