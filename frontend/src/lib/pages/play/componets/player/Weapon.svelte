<script>
  import { T } from "@threlte/core";

  const { position, rotation } = $props();
</script>

<T.Group {position} {rotation}>
  <T.Mesh position={[0, 0, -0.5]}>
    <T.BoxGeometry args={[0.1, 0.1, 1]} />
    <T.MeshStandardMaterial color={"darkgray"} />
  </T.Mesh>

  <T.Mesh position={[0, -0.2, 0]}>
    <T.BoxGeometry args={[0.1, 0.3, 0.15]} />
    <T.MeshStandardMaterial color="black" />
  </T.Mesh>

  <T.Mesh position={[0, -0.05, 0.05]}>
    <T.BoxGeometry args={[0.05, 0.05, 0.05]} />
    <T.MeshStandardMaterial color="gray" />
  </T.Mesh>
</T.Group>
