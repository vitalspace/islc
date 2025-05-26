<script lang="ts">
  import { T } from "@threlte/core";
  import { FakeGlowMaterial } from "@threlte/extras";
  import { AddEquation, CustomBlending, OneFactor } from "three";
</script>

<T.Group position={[0, 0, 0]}>
  <T.Mesh position={[0, -1.5, 0]} rotation.z={0}>
    <T.CylinderGeometry args={[0.7, 0, 1.5, 10]} />
    <T.MeshBasicMaterial
      color={[1.0, 0.4, 0.02]}
      transparent={true}
      opacity={0.5}
      blending={CustomBlending}
      blendDst={OneFactor}
      blendEquation={AddEquation}
    />
    <FakeGlowMaterial
      glowColor="red"
      falloff={0.1}
      glowInternalRadius={1}
      glowSharpness={5}
      depthTest={true}
    />
  </T.Mesh>
</T.Group>
