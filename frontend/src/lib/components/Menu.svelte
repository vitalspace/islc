<script>
  import { Dices, FileText, Store } from "lucide-svelte";
</script>

<div class="absolute z-10 w-full text-white py-10">
  <div class="container mx-auto px-20 flex justify-between items-center">
    <div>
      <a href="/" title="Island Club">
        <img
          class="w-14 h-14 border border-transparent hover:border-white rounded-full transition-colors"
          src="/island.png"
          alt=""
        />
      </a>
    </div>

    <div class="flex gap-4">
      <a class="flex items-center gap-2" href="/play">
        <Dices class="h-5 w-5" /> Play
      </a>

      <a class="flex items-center gap-2" href="/marketplace">
        <Store class=" h-5 w-5" />
        Market</a
      >
      <a class="flex items-center gap-2" href="/whitepaper">
        <FileText class=" h-5 w-5" />
        White paper</a
      >
    </div>
  </div>
</div>
