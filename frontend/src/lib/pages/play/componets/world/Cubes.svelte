<script lang="ts">
  import { type RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask } from "@threlte/core";
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import { Group, Vector3 } from "three";
  import { canPickUp } from "../../stores/stores";
  import { keys } from "../../stores/keyStores";

  let { userRigidBody, userRef } = $props();

  // Agregamos una variable global para rastrear si el jugador está sosteniendo algo
  let isHoldingObject = $state(false);
  let holding = false;
  let mainGroupRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();
  let objectRef: Group | undefined = $state<Group>();

  const canPickUpCube = () => {
    if (!userRigidBody || !userRef) return false;

    // Si el jugador ya está sosteniendo un objeto, no puede recoger otro
    if (isHoldingObject) return false;

    const p = userRigidBody.translation();
    const c = rigidBody!.translation();
    const dx = p.x - c.x,
      dy = p.y - c.y,
      dz = p.z - c.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) < 2;
  };

  const playerForward = new Vector3();
  let playerShotPos: Vector3;

  useTask(() => {
    if (!rigidBody || !objectRef) return;

    // Si acaba de presionar E, no está sosteniendo nada y puede recoger el cubo
    if ($keys.e.isPressed && !isHoldingObject && canPickUpCube()) {
      isHoldingObject = true;
      holding = true;
    }

    // Si está sosteniendo este objeto, actualizamos su posición
    if (holding && isHoldingObject && rigidBody) {
      const cannoWorldPosition = new Vector3();
      userRef!.getWorldPosition(cannoWorldPosition);

      const cannonDirection = new Vector3();
      userRef!.getWorldDirection(cannonDirection);

      const offsetDistance = 1;
      const offsetHeight = 0.5;

      playerShotPos = cannoWorldPosition.clone();
      playerShotPos.add(cannonDirection.clone().multiplyScalar(offsetDistance));
      playerShotPos.y += offsetHeight;

      cannonDirection.multiplyScalar(100);

      rigidBody.setTranslation(playerShotPos, true);
    }

    // Al soltar la tecla E mientras sostiene un objeto, lo lanza
    if (!$keys.e.isPressed && holding) {
      holding = false;
      isHoldingObject = false;

      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody!.setBodyType(0, true);
      rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);

      userRef!.getWorldDirection(playerForward);
      rigidBody!.applyImpulse(
        {
          x: playerForward.x * 0.02,
          y: 0.02,
          z: playerForward.z * 0.02,
        },
        true,
      );
    }
  });
</script>

<T.Group bind:ref={mainGroupRef}>
  <RigidBody bind:rigidBody enabledRotations={[false, false, false]}>
    <T.Group bind:ref={objectRef}>
      <AutoColliders shape="cuboid">
        <T.Mesh>
          <T.BoxGeometry args={[0.2, 0.2, 0.2]} />
          <T.MeshStandardMaterial color="blue" />
        </T.Mesh>
      </AutoColliders>
    </T.Group>
  </RigidBody>
</T.Group>
