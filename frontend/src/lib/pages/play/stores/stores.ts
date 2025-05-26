import { writable } from "svelte/store";
import { type RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
import { Group } from "three";

export const canJump = writable(true);
export const canPickUp = writable(false);
export const player = writable<{
    name: string;
    position: [number, number, number];
    body: RapierRigidBody | undefined;
    object: Group | undefined;
}>({
    name: "player",
    position: [0, 0, 0],
    body: undefined,
    object: undefined
});


