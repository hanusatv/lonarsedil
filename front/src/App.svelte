<script>
</script>

<div class="header-container">
  <header>Lønarseðil</header>
</div>
<div class="columns-container">
  <div class="column-0">
    <div class="menu-toggle">Toggle</div>
  </div>
  <div class="column-1">column-1</div>
</div>

<style>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4em;
    width: 100%;
    background-color: red;
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

  .column-0 {
    background-color: red;
    height: 100%;
    width: 5em;
  }

  .menu-toggle {
    position: absolute;
    height: 4em;
    border-bottom: 1px solid #e6d4e4;
  }

  .menu-toggle::before {
    position: absolute;
    content: "";
    height: 2px;
    width: 1em;
    background: black;
    transform: translateY(2em);
  }
</style>
