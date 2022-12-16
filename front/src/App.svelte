<script>
  import Router from "svelte-spa-router";
  import Navigationbar from "./elements/Navigationbar.svelte"; 
  import Fyritoka from "./routes/Fyritoka.svelte";
  import Home from "./routes/Home.svelte";
  import Lontakarar from "./routes/Lontakarar.svelte";
  import Lontakari from "./routes/Lontakari.svelte";
  import GerPdf from "./routes/GerPdf.svelte";

  let routes = {
    "/": Home,
    "/lontakarar": Lontakarar,
    "/fyritoka": Fyritoka,
    "/lontakari/:id": Lontakari,
    "/gerpdf/": GerPdf,
  };
</script>

<div class="header-container">
  <header>Lønarseðil</header>
</div>
<div class="columns-container">
  <Navigationbar />
  <div class="column-1">
    <main>
      <Router {routes} />
    </main>
  </div>
</div>

<style>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4em;
    width: 100%;
    background-color: var(--primary-color);
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }

  .columns-container {
    position: fixed;
    display: flex;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .column-1 {
    flex-grow: 1;
    padding: 2em 5em;
    overflow: auto;
  }
</style>
