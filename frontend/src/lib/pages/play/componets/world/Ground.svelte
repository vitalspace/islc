<script lang="ts">
  import { T } from "@threlte/core";
  import { AutoColliders } from "@threlte/rapier";
</script>

<T.Group>
  <AutoColliders shape="cuboid">
    <T.Mesh>
      <T.BoxGeometry args={[10, 1, 10]} />
      <T.MeshStandardMaterial />
    </T.Mesh>
  </AutoColliders>
</T.Group>
