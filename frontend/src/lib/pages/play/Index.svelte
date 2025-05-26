<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { Debug, World } from "@threlte/rapier";
  import Scene from "./Scene.svelte";

  let debug = $state(true);
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
