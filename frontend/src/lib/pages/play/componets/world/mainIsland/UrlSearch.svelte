<script lang="ts">
  let { url = $bindable() } = $props();
</script>

<div class=" bg-black text-white">
  <input type="text" placeholder="Url" onkeydown={(e) => e.stopPropagation()} />
</div>
