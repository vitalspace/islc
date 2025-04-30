<script>
  import { T } from "@threlte/core";
  import { Sky } from "@threlte/extras";
  import Ground from "./componets/world/Ground.svelte";
</script>

<Sky elevation={0.5} azimuth={130} />
<Ground />

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0);
  }}
/>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh position={[0, 1, 0]}>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="blue" />
</T.Mesh>
