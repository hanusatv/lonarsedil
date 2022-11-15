<script>
    import LontakariListBox from "../elements/LontakariListBox.svelte";

    let lonarfolk = [];
    async function HeintaOllLonarFolk() {
		const res = await fetch(`http://127.0.0.1:8000/lontakari/`);
        lonarfolk = await res.json();
		if (res.ok) {
			return lonarfolk;
		} else {
			throw new Error(lonarfolk);
		}
	}
    HeintaOllLonarFolk();
    const tableHeading = ["_id", "Navn", "Aldur", "Gøta","Býður"];
    
</script>
<ul class="employee-list">
    <li class="new employee-list-item">
        <img
            class="svg-icon svg-color"
            src="/src/assets/icons/new-pluss.svg"
            alt="New"
        />
    </li>
    <!-- koda her -->
    <tr>
        {#each tableHeading as heading}
          <th>{heading}</th>
        {/each}
    </tr>
    
    
    {#each lonarfolk as eittlonarfolk}
      <tr>
        <th scope="row">{eittlonarfolk._id}</th>
        <td>{eittlonarfolk.Navn}</td>
        <td>{eittlonarfolk.Aldur}</td>
        <td>{eittlonarfolk.Gøta}</td>
        <td>{eittlonarfolk.Býður}</td>
      </tr>
    {/each}
</ul>

<style>
    .employee-list {
        display: flex;
        flex-direction: column;
    }

    .new {
        background-color: var(--green-color);
        transition: background-color 0.2s;
    }

    .new:hover {
        cursor: pointer;
        background-color: var(--hover-green-color);
    }

    .employee-list-item {
        height: 3em;
        width: 100%;
        border-radius: 1em;
        display: flex;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .svg-icon {
        margin: auto;
        width: 2em;
        height: 2em;
    }
    td {
        
    }
</style>
