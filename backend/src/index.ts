import { serve } from "bun";
import { gameState, updatePhysics } from "./websockets/gameState";
import { onMessages } from "./websockets/onMessages";
import { onPlayerConnect } from "./websockets/onPlayerConnect";
import { onPlayerDisconnect } from "./websockets/onPlayerDisconnect";
import type { CustomServerWebSocket } from "./websockets/types/types";

let server: ReturnType<typeof serve>;

server = serve({
  port: 4000,
  fetch(req: Request) {
    const { url, method } = req;
    const { pathname } = new URL(url);

    if (method == "GET" && pathname === "/v2/ws") {
      if (server.upgrade(req)) return;
      return new Response(null, { status: 400 });
    }

    return new Response(null, { status: 400 })
  },

  websocket: {
    open(ws: CustomServerWebSocket) {
      onPlayerConnect(ws, gameState);
    },
    message(ws: CustomServerWebSocket, message: string) {
      onMessages(server, ws, message, gameState);
    },
    close(ws: CustomServerWebSocket) {
      onPlayerDisconnect(ws, gameState);
    },
    drain() {

    }
  }
})

const gameLoop = () => {
  updatePhysics();

  const shipPosition = gameState.physics.spaceShipBody.translation();


  server.publish("main", JSON.stringify({
    type: "spaceShipUpdate",
    position: gameState.dinamicObjects?.spaceShip?.position,
  }));


  if (shipPosition && shipPosition.y >= 200) {
    gameState.physics.spaceShipBody.setEnabled(false);
    gameState.physics.spaceShipBody.resetForces(true);
    gameState.physics.spaceShipBody.setTranslation({ x: shipPosition.x, y: 4.5, z: shipPosition.z }, false);

    if (!gameState.dinamicObjects.spaceShip) return;

    gameState.dinamicObjects.spaceShip.status = false;
    gameState.dinamicObjects.spaceShip.flames.status = false;

    server.publish("main", JSON.stringify({
      type: "spaceShip",
      spaceShip: gameState.dinamicObjects?.spaceShip,
    }));
  }
  setTimeout(gameLoop, 16);
}

gameLoop();

console.log(`Server is running at http://localhost:` + server.port + "/v2/ws");