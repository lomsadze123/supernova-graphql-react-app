export const connectWebSocket = (url: string) => {
  return new WebSocket(url);
};

export const closeWebSocket = (ws: WebSocket) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
};
