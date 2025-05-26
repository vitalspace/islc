<script lang="ts">
  import { T } from "@threlte/core";
  import { AutoColliders } from "@threlte/rapier";
  import { canJump } from "../../stores/stores";

  const handleCollisionEnter = (event: any) => {
    const { targetRigidBody } = event;
    const { userData } = targetRigidBody;

    if (userData.name === "player") canJump.set(true);
  };
</script>

<T.Group>
  <AutoColliders shape="cuboid" oncollisionenter={handleCollisionEnter}>
    <T.Mesh>
      <T.BoxGeometry args={[10, 1, 10]} />
      <T.MeshStandardMaterial />
    </T.Mesh>
  </AutoColliders>
</T.Group>
