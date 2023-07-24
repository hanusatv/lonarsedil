<script>
  import Router from "svelte-spa-router";
  import Navigationbar from "./elements/Navigationbar.svelte";
  import Home from "./routes/Home.svelte";
  import Fyritokur from "./routes/Fyritokur.svelte";
  import Fyritoka from "./routes/Fyritoka.svelte";
  import Lontakarar from "./routes/Lontakarar.svelte";
  import Lontakari from "./routes/Lontakari.svelte";
  import GerPdf from "./routes/GerPdf.svelte";
  import LoginButton from "./elements/LoginButton.svelte";

  let routes = {
    "/": Home,
    "/lontakarar": Lontakarar,
    "/lontakari/:id": Lontakari,
    "/fyritokur": Fyritokur,
    "/fyritoka/:id": Fyritoka,
    "/gerpdf/": GerPdf,
  };
</script>

<div class="header-container">
  <header>Lønarseðil</header>
  <LoginButton />
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
    justify-content: space-between;
    height: 4em;
    width: 100%;
    background-color: var(--primary-color);
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    padding: 0 1em;
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
    height: calc(100% - 4em);
  }
</style>
