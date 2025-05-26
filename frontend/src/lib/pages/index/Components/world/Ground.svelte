<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
  import ArrowUp_0_1 from 'lucide-svelte/icons/arrow-up-0-1';
</script>
<T.Group position={[0, -0.5, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[1000, 1,1000]} />
      <T.MeshStandardMaterial transparent={true} opacity={0} />
    </T.Mesh>
  </AutoColliders>
</T.Group>