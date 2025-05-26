<script lang="ts">
  import { type RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask } from "@threlte/core";
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import { CapsuleGeometry, Group } from "three";
  import { HTML } from "@threlte/extras";

  const { playerInfo } = $props();

  let mainGroupRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();
  let objectRef: Group | undefined = $state<Group>();
  let position: [number, number, number] = $state([
    playerInfo.position.x,
    playerInfo.position.y,
    playerInfo.position.z,
  ]);

  useTask(() => {
    if (!rigidBody || !objectRef || !mainGroupRef) return;
    position = [
      playerInfo.position.x,
      playerInfo.position.y,
      playerInfo.position.z,
    ];

    rigidBody.setTranslation(
      {
        x: playerInfo.position.x,
        y: playerInfo.position.y,
        z: playerInfo.position.z,
      },
      true,
    );
    rigidBody.setRotation(
      {
        x: playerInfo.rotation.x,
        y: playerInfo.rotation.y,
        z: playerInfo.rotation.z,
        w: playerInfo.rotation.w,
      },
      true,
    );
  });
</script>

<!-- Player -->
<T.Group {position} bind:ref={mainGroupRef} dispose={false}>
  <RigidBody
    bind:rigidBody
    enabledRotations={[false, true, false]}
    userData={{ name: "player" }}
  >
    <T.Group bind:ref={objectRef}>
      <HTML transform position={[0, 1, 0]} rotation={[0, Math.PI / 1, 0]}>
        <div class="text-center">
          <div class="text-white text-[4px]">{playerInfo.id}</div>
          <div class="text-white text-[4px]">Life: {playerInfo.health}</div>
        </div>
      </HTML>

      <AutoColliders shape="capsule">
        <T.Mesh>
          <T.Mesh geometry={new CapsuleGeometry(0.3, 1.2 - 0.3 * 2)} />
          <T.MeshStandardMaterial color="red" />
        </T.Mesh>
      </AutoColliders>
    </T.Group>
  </RigidBody>
</T.Group>
