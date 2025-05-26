<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { World, Debug } from "@threlte/rapier";
  let debug = false;
</script>

<div class="h-screen">
  <Canvas>
    <World>
      {#if debug}
        <Debug />
      {/if}
      <Scene />
    </World>
  </Canvas>
</div>
