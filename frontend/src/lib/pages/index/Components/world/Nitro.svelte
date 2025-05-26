<script lang="ts">
  import { T } from "@threlte/core";
  import { AddEquation, CustomBlending, OneFactor } from "three";
  import type { Group } from "three";
  // let groupRefNitro = $state<Group | undefined>(undefined);

</script>

<T.Group  position.z={0}>
  <T.Mesh position={[0.5, -1.9, -5.8]} rotation.x={Math.PI * 0.5}>
    <T.CylinderGeometry args={[0.2, 0, 4, 20]} />
    <T.MeshBasicMaterial
      color={[1.0, 0.4, 0.02]}
      transparent={true}
      opacity={0.5}
      blending={CustomBlending}
      blendDst={OneFactor}
      blendEquation={AddEquation}
    />
  </T.Mesh>

  <T.Mesh position={[-0.5, -1.9, -5.8]} rotation.x={Math.PI * 0.5}>
    <T.CylinderGeometry args={[0.2, 0, 4, 20]} />
    <T.MeshBasicMaterial
      color={[1.0, 0.4, 0.02]}
      transparent={true}
      opacity={0.5}
      blending={CustomBlending}
      blendDst={OneFactor}
      blendEquation={AddEquation}
    />
  </T.Mesh>
</T.Group>
