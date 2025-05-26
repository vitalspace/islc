<script lang="ts">
  import { T } from "@threlte/core";
  import { FakeGlowMaterial } from "@threlte/extras";
  import { AddEquation, CustomBlending, OneFactor } from "three";
  import type { Group } from "three";
  // let groupRefNitro = $state<Group | undefined>(undefined);

  let { flamesRef = $bindable() } = $props();
</script>

<T.Group bind:ref={flamesRef} >
  <T.Mesh position={[0, 0, 0]} rotation.z={0}>
    <T.CylinderGeometry args={[0.7, 0, 4, 20]} />
    <T.MeshBasicMaterial
      color={[1.0, 0.4, 0.02]}
      transparent={true}
      opacity={0.5}
      blending={CustomBlending}
      blendDst={OneFactor}
      blendEquation={AddEquation}
    />
    <FakeGlowMaterial glowColor="red" falloff={.1} glowInternalRadius={1} glowSharpness={5} depthTest={true} />
  </T.Mesh>
</T.Group>
