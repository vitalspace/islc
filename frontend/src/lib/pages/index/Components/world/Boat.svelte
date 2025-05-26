<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import {
    FakeGlowMaterial,
    Sky,
    Text3DGeometry,
    useDraco,
    useGltf,
    Outlines,
    Edges,
  } from "@threlte/extras";
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import { Group, Quaternion, Vector3 } from "three";
  import Nitro from "./Nitro.svelte";

  let {
    fallback = () => {},
    error = () => {},
    children = () => {},
    ref = $bindable(),
    ...props
  } = $props();

  const gltf = useGltf("/main-transformed.glb", { dracoLoader: useDraco() });

  let position: [number, number, number] = $state<[number, number, number]>([
    -4.6, 2.1, 24,
  ]);

  let mainGroupRef: Group | undefined = $state<Group>();
  let objectRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();

  const waypoints = $state([
    { x: -4.6, z: 65 },
    { x: 39, z: 35 },
    { x: 30, z: 10 },
    { x: 39, z: -10 },
    { x: 75, z: -40 },
    { x: 55, z: -60 },
    { x: 40, z: -82 },
    { x: 10.9909, z: -66.7698 },
    { x: -9.45752, z: -49.3887 },
    { x: -29.9059, z: -29.1447 },
    { x: -29.4969, z: -8.90075 },
    { x: -55.0574, z: -29.5537 },
    { x: -80.209, z: 0 },
    { x: -50.3543, z: 20 },
    { x: -36.6538, z: 6 },
    { x: -32.7686, z: 20.3405 },
    { x: -81.0269, z: 30.1558 },
    { x: -50.5587, z: 60.4195 },
  ]);

  let currentWaypointIndex = $state(0);
  let movementSpeed = 5; // Unidades por segundo
  let rotationSpeed = 2; // Velocidad de rotación
  let reachedThreshold = 0.5; // Distancia para considerar llegado a waypoint
  let targetDirection = $state(new Vector3());
  let currentVelocity = $state(new Vector3());

  // Función para calcular la rotación hacia la dirección
  const calculateRotation = (direction: Vector3) => {
    const angle = Math.atan2(direction.x, direction.z);
    return new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angle);
  };

  useTask((delta) => {
    if (!rigidBody || !objectRef || !mainGroupRef) return;

    // Obtener posición actual
    const currentPosition = rigidBody.translation();

    // Calcular dirección al waypoint actual
    const target = waypoints[currentWaypointIndex];
    targetDirection
      .set(target.x - currentPosition.x, 0, target.z - currentPosition.z)
      .normalize();

    // Mover hacia el waypoint
    currentVelocity.copy(targetDirection.multiplyScalar(movementSpeed * delta));

    // Actualizar posición
    const newPosition = new Vector3(
      currentPosition.x + currentVelocity.x,
      currentPosition.y,
      currentPosition.z + currentVelocity.z
    );

    rigidBody.setTranslation(newPosition, true);

    // Calcular y aplicar rotación
    const targetQuaternion = calculateRotation(targetDirection);
    rigidBody.setRotation(targetQuaternion, true);

    // Verificar si se alcanzó el waypoint
    const distanceToTarget = Math.sqrt(
      Math.pow(target.x - newPosition.x, 2) +
        Math.pow(target.z - newPosition.z, 2)
    );

    if (distanceToTarget < reachedThreshold) {
      currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.length;
    }

    // Actualizar posición para renderizado
    position = [newPosition.x, newPosition.y, newPosition.z];
  });
</script>

{#await gltf}
  {@render fallback?.()}
{:then gltf}
  <T.Group bind:ref={mainGroupRef} {position} scale={1.5}>
    <RigidBody bind:rigidBody>
      <Nitro />
      <T.Group bind:ref={objectRef}>
        <T.Mesh
          geometry={gltf.nodes.Plane045.geometry}
          material={gltf.materials["Material.023"]}
        />
        <AutoColliders shape="cuboid">
          <T.Mesh
            geometry={gltf.nodes.Plane045_1.geometry}
            material={gltf.materials["Material.063"]}
          />
        </AutoColliders>
        <T.Mesh
          geometry={gltf.nodes.Plane045_2.geometry}
          material={gltf.materials["border oro.001"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_3.geometry}
          material={gltf.materials["Material.064"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_4.geometry}
          material={gltf.materials["Material.006"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_5.geometry}
          material={gltf.materials["Material.066"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_6.geometry}
          material={gltf.materials["Material.067"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_7.geometry}
          material={gltf.materials["Material.068"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_8.geometry}
          material={gltf.materials["Material.069"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_9.geometry}
          material={gltf.materials["Material.063"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_10.geometry}
          material={gltf.materials["Material.070"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_11.geometry}
          material={gltf.materials["Material.006"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_12.geometry}
          material={gltf.materials["Material.075"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_13.geometry}
          material={gltf.materials["Material.076"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_14.geometry}
          material={gltf.materials["Material.063"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Plane045_15.geometry}
          material={gltf.materials["Material.063"]}
        />
      </T.Group>
    </RigidBody>
  </T.Group>
{/await}
