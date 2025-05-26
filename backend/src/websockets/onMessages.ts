import { serve } from "bun";
import { chat } from "./events/chat/chat";
import { playerMove } from "./events/player/movement";
import { turnOnSpaceship } from "./events/spaceShip/movement";
import type {
    CustomServerWebSocket,
    GameState,
    HandlerParams,
} from "./types/types";

const handles: Record<string, (params: HandlerParams) => void> = {
  chat: chat,
  playerMove: playerMove,
  turnOnSpaceship: turnOnSpaceship,
};

export const onMessages = (
  server: ReturnType<typeof serve>,
  ws: CustomServerWebSocket,
  message: string,
  gameState: GameState
) => {
  const data = JSON.parse(message);

  const params: HandlerParams = {
    server,
    ws,
    data,
    gameState,
  };

  const handler = handles[data.type];
  handler?.(params);
};
