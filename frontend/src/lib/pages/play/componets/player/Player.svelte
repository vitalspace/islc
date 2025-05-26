<script lang="ts">
  import { type RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask, useThrelte } from "@threlte/core";
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import { CapsuleGeometry, Group, PerspectiveCamera, Vector3 } from "three";
  import { inputManager } from "../controls/inputManager";
  import { keyboardMapping } from "../controls/keyboardMapping";
  import { ThirdPersonControls } from "../controls/thirdPersonControls";
  import { canJump, player } from "../../stores/stores";
  import Cubes from "../world/Cubes.svelte";
  const { camera } = useThrelte();
  import Weapon from "./Weapon.svelte";
  import { Audio, AudioListener } from "@threlte/extras";

  const { playerInfo, webSocket } = $props();

  let mainGroupRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();
  let objectRef: Group | undefined = $state<Group>();
  let cameraRef: PerspectiveCamera | undefined = $state<PerspectiveCamera>();
  let controls: ThirdPersonControls | undefined;
  let position: [number, number, number] = $state([
    playerInfo.position.x,
    playerInfo.position.y,
    playerInfo.position.z,
  ]);
  let isInitialized = $state(false);

  $effect(() => {
    if (!isInitialized) {
      inputManager.activate();
      isInitialized = true;
      return () => {
        inputManager.deactivate();
      };
    }

    if ($player.object && cameraRef && mainGroupRef) {
      const isTouchDevice = "ontouchstart" in window;
      const canvas = document.querySelector("canvas");

      //@ts-ignore
      controls = new ThirdPersonControls($camera, mainGroupRef, {
        offset: new Vector3(0, 0.25, 0),
        targetRadius: 3,
      });

      if (!isTouchDevice && canvas) {
        canvas.addEventListener("click", () => {
          if (document.pointerLockElement !== canvas) {
            canvas.requestPointerLock();
          }
        });

        canvas.addEventListener("pointermove", (e) => {
          if (document.pointerLockElement === canvas) {
            controls?.update(e.movementX * 2, e.movementY * 2);
          }
        });
      }
    }
  });

  useTask(() => {
    if (!$player.body || !$player.object || !cameraRef || !controls) return;

    const v3 = new Vector3();
    const cameraDirection = cameraRef.getWorldDirection(v3);
    const thetaCamera = Math.atan2(cameraDirection.x, cameraDirection.z);
    const objectDirection = $player.object.getWorldDirection(v3);
    const thetaObject = Math.atan2(objectDirection.x, objectDirection.z);

    let deltaTheta = thetaCamera - thetaObject;
    if (deltaTheta > Math.PI) deltaTheta -= Math.PI * 2;
    if (deltaTheta < -Math.PI) deltaTheta += Math.PI * 2;

    const rotationSpeed = 10;
    const angularVelocityY = deltaTheta * rotationSpeed;
    const maxAngularVelocity = 15;
    const clampedAngularVelocity =
      Math.sign(angularVelocityY) *
      Math.min(Math.abs(angularVelocityY), maxAngularVelocity);

    $player.body.setAngvel({ x: 0, y: clampedAngularVelocity, z: 0 }, true);

    const pos = $player.body.translation();
    const rot = $player.body.rotation();

    position = [pos.x, pos.y, pos.z];

    if (keyboardMapping.isActionActive("moveForward")) {
      const currentVelocity = 4;
      const x = Math.sin(thetaCamera) * currentVelocity;
      const z = Math.cos(thetaCamera) * currentVelocity;
      const y = $player.body.linvel().y;
      $player.body.setLinvel({ x, y, z }, true);
    } else {
      // rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }

    if (keyboardMapping.isActionJustActivated("jump") && $canJump) {
      canJump.set(false);
      $player.body.applyImpulse({ x: 0, y: 1.2, z: 0 }, true);
    }

    inputManager.update();
    controls.update(0, 0);

    webSocket.send({
      type: "playerMove",
      position: { x: pos.x, y: pos.y, z: pos.z },
      rotation: { x: rot.x, y: rot.y, z: rot.z, w: rot.w },
    });
  });
</script>

<T.PerspectiveCamera makeDefault bind:ref={cameraRef}>
  <AudioListener />

</T.PerspectiveCamera>

<!-- Player -->
<T.Group {position} bind:ref={mainGroupRef} dispose={false}>
  <RigidBody
    bind:rigidBody={$player.body}
    enabledRotations={[false, true, false]}
    userData={{ name: "player" }}
  >
    <T.Group bind:ref={$player.object}>
      <AutoColliders shape="capsule">
        <T.Mesh>
          <T.Mesh geometry={new CapsuleGeometry(0.3, 1.2 - 0.3 * 2)} />
          <T.MeshStandardMaterial color="red" />
        </T.Mesh>
      </AutoColliders>
    </T.Group>
  </RigidBody>
</T.Group>

<Weapon position={[-0.4, 0.25, 0]} rotation={[0, Math.PI / 1.03, 0]} />

{#each [1, 2, 3, 4, 5] as i}
  <Cubes userRigidBody={$player.body} userRef={$player.object} />
{/each}
