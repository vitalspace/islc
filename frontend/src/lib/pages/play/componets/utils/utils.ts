import { canJump } from "../../stores/stores";

export const handleJump = (event: any) => {
    const { targetRigidBody } = event;
    const { userData } = targetRigidBody;
    if (userData.name === "player") canJump.set(true);
};