<script lang="ts">
  import { type RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";
  import { T, useTask, useThrelte } from "@threlte/core";
  import { AutoColliders, RigidBody } from "@threlte/rapier";
  import { CapsuleGeometry, Group, PerspectiveCamera, Vector3, Object3D } from "three";
  import { ThirdPersonControls } from "../controls/thirdPersonControls";

  let mainGroupRef: Group | undefined = $state<Group>();
  let rigidBody: RapierRigidBody | undefined = $state<RapierRigidBody>();
  let objectRef: Group | undefined = $state<Group>();
  let cameraRef: PerspectiveCamera | undefined = $state<PerspectiveCamera>();
  let controls: ThirdPersonControls | undefined;

  let position: [number, number, number] = $state([0, 1, 0]);
  let originalCubeParent: Object3D | null = null; // Nueva variable para guardar el padre original

  let holding = false;
  let cubeBody: RapierRigidBody | undefined = $state<RapierRigidBody>();
  let cubeGroup: Group | undefined = $state<Group>();
  
  const holdOffset = new Vector3(0, 0.8, 0.5);
  const { camera } = useThrelte();

  const keys = {
    a: { isPressed: false },
    d: { isPressed: false },
    w: { isPressed: false },
    s: { isPressed: false },
    space: { isPressed: false },
    e: { isPressed: false },
  };

  const press = (e: Event, isDown: boolean) => {
    e.preventDefault();
    //@ts-ignore
    const { keyCode } = e;
    switch (keyCode) {
      case 65: keys.a.isPressed = isDown; break;
      case 68: keys.d.isPressed = isDown; break;
      case 87: keys.w.isPressed = isDown; break;
      case 83: keys.s.isPressed = isDown; break;
      case 32: keys.space.isPressed = isDown; break;
      case 69: keys.e.isPressed = isDown; break;
    }
  };

  document.addEventListener("keydown", (e) => press(e, true));
  document.addEventListener("keyup", (e) => press(e, false));

  const canPickUp = () => {
    if (!rigidBody || !cubeBody) return false;
    const p = rigidBody.translation();
    const c = cubeBody.translation();
    const dx = p.x - c.x, dy = p.y - c.y, dz = p.z - c.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) < 2;
  };

  $effect(() => {
    if (objectRef && cameraRef && mainGroupRef) {
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

  const v3 = new Vector3();
  const cubePosition = new Vector3();
  const playerForward = new Vector3();

  useTask(() => {
    if (!rigidBody || !objectRef || !cameraRef || !controls) return;

    const cameraDirection = cameraRef.getWorldDirection(v3);
    const thetaCamera = Math.atan2(cameraDirection.x, cameraDirection.z);
    const objectDirection = objectRef.getWorldDirection(v3);
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

    rigidBody.setAngvel({ x: 0, y: clampedAngularVelocity, z: 0 }, true);

    const pos = rigidBody.translation();
    position = [pos.x, pos.y, pos.z];

    if (keys.w.isPressed) {
      const currentVelocity = 4;
      const x = Math.sin(thetaCamera) * currentVelocity;
      const z = Math.cos(thetaCamera) * currentVelocity;
      rigidBody.setLinvel({ x, y: 0, z }, true);
    } else {
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }

    // Lógica para recoger el cubo
    if (keys.e.isPressed && !holding && canPickUp()) {
      holding = true;
      originalCubeParent = cubeGroup!.parent; // Guardar padre original
      cubeBody!.setBodyType(2, true);
      
      // Guardar posición y rotación mundial actual
      const worldPos = new Vector3();
      cubeGroup!.getWorldPosition(worldPos);
      
      objectRef!.add(cubeGroup!);
      cubeGroup!.position.set(0, 1, 0.5);
      cubeGroup!.rotation.set(0, 0, 0);
      
      // Actualizar física
      const newWorldPos = new Vector3();
      cubeGroup!.getWorldPosition(newWorldPos);
      cubeBody!.setTranslation(
        { x: newWorldPos.x, y: newWorldPos.y, z: newWorldPos.z },
        true
      );
    }
    
    // Actualizar posición del cubo mientras se sostiene
    if (holding && cubeBody && objectRef) {
      const worldPos = new Vector3();
      cubeGroup!.getWorldPosition(worldPos);
      cubeBody.setTranslation(
        { x: worldPos.x, y: worldPos.y, z: worldPos.z },
        true
      );
    }

    // Lógica para soltar el cubo
    if (!keys.e.isPressed && holding) {
      holding = false;
      
      const worldPos = new Vector3();
      cubeGroup!.getWorldPosition(worldPos);
      objectRef!.remove(cubeGroup!);

      // Restaurar padre original
      if (originalCubeParent) {
        originalCubeParent.add(cubeGroup!);
        // Convertir posición mundial a coordenadas locales del padre original
        const localPos = worldPos.clone();
        originalCubeParent.worldToLocal(localPos);
        cubeGroup!.position.copy(localPos);
      }

      cubeBody!.setTranslation(
        { x: worldPos.x, y: worldPos.y, z: worldPos.z },
        true
      );
      cubeBody!.setBodyType(0, true);
      
      objectRef!.getWorldDirection(playerForward);
      cubeBody!.applyImpulse(
        { 
          x: playerForward.x * 0.01, 
          y: 0.01, 
          z: playerForward.z * 0.01 
        }, 
        true
      );
    }

    controls.update(0, 0);
  });
</script>

<T.PerspectiveCamera makeDefault bind:ref={cameraRef} />

<!-- Player -->
<T.Group {position} bind:ref={mainGroupRef} dispose={false}>
  <RigidBody bind:rigidBody enabledRotations={[false, true, false]}>
    <T.Group bind:ref={objectRef}>
      <AutoColliders shape="capsule">
        <T.Mesh>
          <T.Mesh geometry={new CapsuleGeometry(0.3, 1.2 - 0.3 * 2)} />
          <T.MeshStandardMaterial color="red" />
        </T.Mesh>
      </AutoColliders>
    </T.Group>
  </RigidBody>
</T.Group>

<!-- Cubo modificado con posición inicial correcta -->
<T.Group dispose={false} position={[0, 2, 0]}>
  <RigidBody bind:rigidBody={cubeBody} enabledRotations={[false, true, false]}>
    <T.Group bind:ref={cubeGroup}>
      <AutoColliders shape="cuboid">
        <T.Mesh>
          <T.BoxGeometry args={[0.2, 0.2, 0.2]} />
          <T.MeshStandardMaterial color="blue" />
        </T.Mesh>
      </AutoColliders>
    </T.Group>
  </RigidBody>
</T.Group>