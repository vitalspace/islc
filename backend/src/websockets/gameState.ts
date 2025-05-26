import { randomUUIDv7 } from "bun";
import RAPIER from "@dimforge/rapier3d-compat";
import { type GameState } from "./types/types";

await RAPIER.init();
const world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });

const ground = world.createRigidBody(
  RAPIER.RigidBodyDesc.fixed().setTranslation(52.86, 0, -40.67)
);

world.createCollider(RAPIER.ColliderDesc.cuboid(25, 0.1, 25), ground);

const spaceShipBody = world.createRigidBody(
  RAPIER.RigidBodyDesc.dynamic()  
    .setTranslation(48.06, 5, -41.64)
    .setRotation({ x: Math.PI / 2, y: Math.PI / 2, z: 0, w: 0 }) // Rotar 90 grados sobre X
);

world.createCollider(RAPIER.ColliderDesc.cuboid(4.5, 5, 2), spaceShipBody);

export let gameState: GameState = {
  players: {},
  rooms: {
    main: {},
  },
  dinamicObjects: {
    spaceShip: {
      id: randomUUIDv7(),
      status: false,
      flames: {
        status: false,
      },
      position: {
        x: spaceShipBody.translation().x,
        y: spaceShipBody.translation().y,
        z: spaceShipBody.translation().z,
      },
      rotation: {
        x: spaceShipBody.rotation().x,
        y: spaceShipBody.rotation().y,
        z: spaceShipBody.rotation().z,
        w: spaceShipBody.rotation().w,
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  },
  physics: {
    world,
    spaceShipBody,
    ground,
  },
};

export function updatePhysics() {
  world.step();

  const pos = spaceShipBody.translation();
  spaceShipBody.setTranslation({ x: 48.06, y: pos.y, z: -41.64 }, true);

  if (!gameState.dinamicObjects.spaceShip) return;

  gameState.dinamicObjects.spaceShip.position = spaceShipBody.translation();
  // gameState.dinamicObjects.spaceShip.rotation = spaceShipBody.rotation();
}
