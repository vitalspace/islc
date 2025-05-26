import { type CustomServerWebSocket, type GameState } from "./types/types";

export const onPlayerDisconnect = (ws: CustomServerWebSocket, gameState: GameState) => {
    const { players, rooms } = gameState;

    const currentRoom = players[ws.id].currentRoom;

    delete players[ws.id];
    delete rooms[currentRoom][ws.id];

    ws.publish(currentRoom, JSON.stringify({ type: "currentPlayers", players: rooms[currentRoom] }));
    ws.publish(currentRoom, JSON.stringify({ type: "playerDisconnected", id: ws.id }));
    console.log("Player disconnected: ", ws.id);
}