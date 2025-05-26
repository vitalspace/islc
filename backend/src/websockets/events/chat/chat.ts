import type { HandlerParams } from "../../types/types";

export const chat = ({ server, ws, data }: HandlerParams) => {
  server.publish(
    "main",
    JSON.stringify({ id: ws.id, type: "chat", message: data.message })
  );
};
