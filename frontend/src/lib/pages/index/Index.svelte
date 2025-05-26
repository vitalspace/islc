<script lang="ts">
  import Canvas from "./Canvas.svelte";
</script>

<main class="h-screen w-full font-sans justify-center items-center">
  <section
    class="mx-auto text-center absolute z-10 bottom-20 left-0 right-0 justify-center"
  >
    <div class="flex justify-center gap-4 text-center">
      <button
        class="cursor-pointer backdrop-blur-md text-white bg-white/10 px-2 py-2 rounded-md hover:bg-white/20 transition-colors"
        >Connect Wallet</button
      >
      <button
        class="cursor-pointer backdrop-blur-md text-white bg-green-400/30 px-2 py-2 rounded-md hover:bg-green-400/40 transition-colors"
        >Play Now!</button
      >
    </div>
  </section>

  <Canvas />
</main>
