import { type ServerWebSocket, serve } from "bun";
import RAPIER from "@dimforge/rapier3d-compat";

export interface CustomServerWebSocket extends ServerWebSocket {
  id: string;
}

export interface Player {
  id: string,
  position: {
    x: number,
    y: number,
    z: number
  }
  rotation: {
    x: number,
    y: number,
    z: number,
    w: number
  }
  health: number,
  currentRoom: string;
}

export interface DinamicObject {
  id: string,
  status: boolean,
  flames: {
    status: boolean,
  },
  position: {
    x: number,
    y: number,
    z: number
  },
  rotation: {
    x: number,
    y: number,
    z: number,
    w: number
  },
  velocity: {
    x: number,
    y: number,
    z: number
  }
}

export interface GameState {
  players: Record<string, Player>;
  rooms: Record<string, Record<string, Player>>;
  dinamicObjects: Record<string, DinamicObject>;
  physics: {
    world: RAPIER.World;
    spaceShipBody: RAPIER.RigidBody;
    ground: RAPIER.RigidBody;
  }
}

export interface HandlerParams {
  server: ReturnType<typeof serve>;
  ws: CustomServerWebSocket,
  data: any,
  gameState: GameState
}