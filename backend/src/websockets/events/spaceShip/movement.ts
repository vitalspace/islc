import type { HandlerParams } from "../../types/types";

export const turnOnSpaceship = ({ server, ws, data, gameState }: HandlerParams) => {
    const { physics } = gameState;
    if (!gameState.dinamicObjects.spaceShip) return;

    console.log("turnOnSpaceship");
    physics.spaceShipBody.setEnabled(true);
    physics.spaceShipBody.setLinvel({ x: 0, y: 0, z: 0 }, false);
    physics.spaceShipBody.setAngvel({ x: 0, y: 0, z: 0 }, false);
    physics.spaceShipBody.addForce({ x: 0, y: 0, z: 0 }, false);

    physics.spaceShipBody.addForce({ x: 0, y: 5000, z: 0 }, true);
    gameState.dinamicObjects.spaceShip.status = true;
    gameState.dinamicObjects.spaceShip.flames.status = true;

    server.publish("main", JSON.stringify({ type: "spaceShip", spaceShip: gameState.dinamicObjects["spaceShip"] }));

    server.publish("main", JSON.stringify({ type: "turnOnFlames", flames: gameState.dinamicObjects.spaceShip.flames.status }))
}