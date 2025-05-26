import { randomUUIDv7, serve } from "bun";
import type { CustomServerWebSocket, GameState } from "./types/types";

export const onPlayerConnect = (
  ws: CustomServerWebSocket,
  gameState: GameState
) => {
  const { players, rooms, dinamicObjects } = gameState;

  ws.id = randomUUIDv7();
  ws.subscribe("main");

  players[ws.id] = {
    id: ws.id,
    position: {
      x: 0,
      y: 4,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
    health: 100,
    currentRoom: "main",
  };

  //@ts-ignore
  rooms["main"][ws.id] = players[ws.id];

  ws.send(JSON.stringify({ type: "playerId", id: ws.id }));
  //@ts-ignore
  ws.send(
    JSON.stringify({
      type: "currentPlayers",
      players: rooms[players[ws.id].currentRoom],
    })
  );

  ws.publish(
    "main",
    JSON.stringify({ type: "newPlayer", player: players[ws.id] })
  );

  // ws.publish("main", JSON.stringify({ type: "spawnSpaceShip", spaceShip: dinamicObjects["spaceShip"] }));
  ws.send(
    JSON.stringify({
      type: "spaceShip",
      spaceShip: dinamicObjects["spaceShip"],
    })
  );
  // console.log("New connection:", ws.id);

  console.log(dinamicObjects);
};
