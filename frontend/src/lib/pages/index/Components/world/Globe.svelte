<script lang="ts">
  import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask } from "@threlte/core";
  import { FakeGlowMaterial, useDraco, useGltf } from "@threlte/extras";
  import { Collider, RigidBody } from "@threlte/rapier";
  import { Group, Quaternion, Euler,  } from "three";

  let {
    fallback = () => {},
    error = () => {},
    children = () => {},
    ref = $bindable(),
    ...props
  } = $props();
  const gltf = useGltf("/main-transformed.glb", { dracoLoader: useDraco() });

  let currentColor = $state({ h: 180, s: 100, l: 50 });
  let colorInterval = $state<any>();

  let mainGroupRef: Group | undefined = $state<Group>();
  let objectRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();

  $effect(() => {
    colorInterval = setInterval(() => {
      currentColor.h = (currentColor.h + 60) % 360;
    }, 2000);
    return () => {
      clearInterval(colorInterval);
    };
  });

  useTask((delta) => {
    if (!mainGroupRef || !objectRef || !rigidBody) return;

    // Movimiento oscilante dentro de límites
    const speed = 0.5;
    const newX = rigidBody.translation().x + Math.sin(Date.now() * 0.001) * speed * delta;
    const newZ = rigidBody.translation().z + Math.cos(Date.now() * 0.001) * speed * delta;
    
    // Limitar movimiento a área 20x20
    rigidBody.setTranslation({
      x: Math.min(Math.max(newX, -50), 50),
      y: rigidBody.translation().y,
      z: Math.min(Math.max(newZ, -50), 50)
    }, true);

    // Rotación suave con slerp
    const targetRotation = new Quaternion().setFromEuler(
      new Euler(0, rigidBody.rotation().y + 0.01 * delta, 0)
    );
    // rigidBody.setRotation(
    //   rigidBody.rotation().slerp(targetRotation, 0.1),
    //   true
    // );
  });
</script>

{#await gltf}
  {@render fallback?.()}
{:then gltf}
  <T.Group
    bind:ref={mainGroupRef}
    position={[0, .6, -0.2]}
    rotation={[Math.PI / 2, 0, .2]}
    scale={38.22}
  >
    <RigidBody bind:rigidBody type="kinematicPosition">
      <Collider shape="cuboid" args={[0.3, 0.1, 0.1]}>
        <T.Group bind:ref={objectRef} position={[0, .1, 0]}>
          <T.Mesh geometry={gltf.nodes.Sui003_1.geometry}>
            <FakeGlowMaterial
              glowColor={`hsl(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%)`}
              falloff={1}
              glowInternalRadius={1}
              glowSharpness={0.5}
              depthTest={true}
            />
          </T.Mesh>
          <T.Mesh
            geometry={gltf.nodes.Sui003_2.geometry}
            material={gltf.materials["Material.023"]}
          ></T.Mesh>
          <T.Mesh
            geometry={gltf.nodes.Sui003_3.geometry}
            material={gltf.materials["Material.023"]}
          ></T.Mesh>
        </T.Group>
      </Collider>
    </RigidBody>
  </T.Group>
{/await}
