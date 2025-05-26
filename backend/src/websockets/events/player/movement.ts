import type { HandlerParams } from "../../types/types";

export const playerMove = ({ server, ws, data, gameState }: HandlerParams) => {
  const { players } = gameState;

  //@ts-ignore
  players[ws.id].position = data.position;
  //@ts-ignore
  players[ws.id].rotation = data.rotation;
  ws.publish(
    //@ts-ignore
    players[ws.id]?.currentRoom,
    JSON.stringify({ type: "playerMove", player: players[ws.id] })
  );
};
