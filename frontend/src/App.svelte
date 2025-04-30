<script>
  import { Route, Router } from "svelte5-router";
  import Menu from "./lib/components/Menu.svelte";
  import About from "./routes/About.svelte";
  import Index from "./routes/Index.svelte";
  import Play from "./routes/Play.svelte";
</script>

<Router>
  <Menu />
  <div>
    <Route path="/" component={Index} />
    <Route path="/play" component={Play} />
    <Route path="/about" component={About} />
  </div>
</Router>
