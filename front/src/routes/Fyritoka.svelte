<script>
    import LontakariListBox from "../elements/LontakariListBox.svelte";
    import { selectedRoute } from "../stores/store.js";
    selectedRoute.set("fyritoka");

    let lonarfolk2 = [];
    const HeintaOllLonarFolk = (async () => {
        const response = await fetch("http://127.0.0.1:8000/fyritoka/");
        lonarfolk2 = await response.json();
        return await response.json();
    })();
    const tableHeading = ["ID", "Navn", "Gøta", "Býður", "Post Nummar", "Land"];
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
    <div>
        <tr>
            {#each tableHeading as heading}
                <th>{heading}</th>
            {/each}
        </tr>

        {#await lonarfolk2}
            {#each Array(5) as _}
                <li>
                    <LontakariListBox />
                </li>
            {/each}
        {:then lonarfolk2}
            {#each lonarfolk2 as eittlonarfolk}
                <tr>
                    <th scope="row">{eittlonarfolk._id}</th>
                    <td>{eittlonarfolk.Navn}</td>
                    <td>{eittlonarfolk.Gøta}</td>
                    <td>{eittlonarfolk.Bydur}</td>
                    <td>{eittlonarfolk.postNummar}</td>
                    <td>{eittlonarfolk.Land}</td>
                </tr>
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>
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
        padding: 0;
        margin: 0;
    }

    .svg-icon {
        margin: auto;
        width: 2em;
        height: 2em;
    }
</style>
