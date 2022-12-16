<script>
    import LontakariListBox from "../elements/LontakariListBox.svelte";
    import { selectedRoute } from "../stores/store.js";
    import { Lonarfolk } from "../classes/classes";

    selectedRoute.set("lontakarar");

    const fetchLonarfolk = Lonarfolk.heintaOll();
</script>

<button class="new">
    <img
        class="svg-icon svg-color"
        src="/src/assets/icons/person-add.svg"
        alt="New"
    />
</button>

<!-- koda her -->
<div class="employee-list-container">
    <ul class="employee-list">
        {#await fetchLonarfolk}
            {#each Array(5) as _}
                <li>
                    <LontakariListBox />
                </li>
            {/each}
        {:then lonarfolk}
            {#each lonarfolk as eittlonarfolk}
                <div class="employee-row" id={eittlonarfolk._id}>
                    <span class="employee-name">
                        <a
                            href="http://localhost:5173/#/lontakari/{eittlonarfolk._id}"
                        >
                            {eittlonarfolk.Navn}
                        </a>
                    </span>
                    <button class="employee-button">
                        <a
                            href="http://localhost:5173/#/lontakari/{eittlonarfolk._id}"
                        >
                            <img
                                class="svg-icon svg-color"
                                src="/src/assets/icons/create.svg"
                                alt="edit"
                            />
                        </a>
                    </button>
                </div>
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </ul>
</div>

<style>
    .new {
        background-color: var(--green-color);
        transition: background-color 0.2s;
        height: 3em;
        width: 100%;
        border-radius: 1em;
        display: flex;
    }

    .new:hover {
        cursor: pointer;
        background-color: var(--hover-green-color);
    }

    .employee-list-container {
        margin-top: 2em;
    }

    .employee-list {
        display: flex;
        flex-direction: column;
    }

    .employee-row {
        display: flex;
        height: 3em;
        border-bottom: 1px solid var(--lines-color);
    }

    .employee-name {
        flex-grow: 1;
        align-self: center;
        text-align: left;
    }

    .employee-button {
        background-color: transparent;
    }

    .svg-icon {
        margin: auto;
        width: 2em;
        height: 2em;
    }
</style>
