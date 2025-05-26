<script lang="ts">
  import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask } from "@threlte/core";
  import { useDraco, useGltf } from "@threlte/extras";
  import { Collider, RigidBody } from "@threlte/rapier";
  import { Group } from "three";
  import Flames from "./Flames.svelte";

  let {
    fallback = () => {},
    error = () => {},
    children = () => {},
    ref = $bindable(),
    ...props
  } = $props();

  const gltf = useGltf("/main-transformed.glb", { dracoLoader: useDraco() });

  let mainGroupRef: Group | undefined = $state<Group>();
  let objectRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();

  useTask(() => {
    if (!mainGroupRef || !objectRef || !rigidBody) return;

    const position = rigidBody.translation();

    if (position.y >= 500) {
      rigidBody.setEnabled(false);
      rigidBody.resetForces(true);
      rigidBody.resetTorques(true);
      rigidBody.setTranslation({ x: 47.98, y: 6, z: -41.01 }, true);
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.addTorque({ x: 0, y: 0, z: 0 }, true);
    }

    rigidBody.setEnabled(true);

    // Aplicar fuerza inicial solo después del reset
    if (position.y < 500) {
      rigidBody.addForce({ x: 0, y: 4, z: 0 }, true);
      rigidBody.addTorque({ x: 0, y: 0.1, z: 0 }, true);
    }
  });
</script>

{#await gltf}
  {@render fallback?.()}
{:then gltf}
  <T.Group
    bind:ref={mainGroupRef}
    position={[47.98, 1.2, -41.01]}
    scale={[1, 5, 1]}
  >
    <RigidBody bind:rigidBody type="dynamic">
      <Flames />
      <Collider shape="cuboid" args={[2, 1.2, 2]}>
        <T.Group bind:ref={objectRef}>
          <T.Mesh
            geometry={gltf.nodes.SpaceShip005.geometry}
            material={gltf.materials["Material.020"]}
          />
          <T.Mesh
            geometry={gltf.nodes.SpaceShip005_1.geometry}
            material={gltf.materials["Material.021"]}
          />
          <T.Mesh
            geometry={gltf.nodes.SpaceShip005_2.geometry}
            material={gltf.materials["Material.021"]}
          />
        </T.Group>
      </Collider>
    </RigidBody>
  </T.Group>
{/await}
