<script>
    import LontakariListBox from "../elements/LontakariListBox.svelte";
    import { selectedRoute } from "../stores/store.js";
    import { Fyritoka } from "../classes/classes";

    selectedRoute.set("fyritokur");

    const fyritokur = Fyritoka.heintaOll();

    //Write a function that calls Lonarfole.upaetta() and the redirect to the new employee page (lontakari.svelte) with the ID returned from the function
    function upraetta() {
        Fyritoka.upraetta()
            .then((res) => {
                window.location.href = `http://localhost:5173/#/fyritoka/${res._id}`;
            })
            .catch((err) => {
                alert(err);
            });
    }
</script>

<button class="new" on:click={upraetta}>
    <img
        class="svg-icon svg-color"
        src="/src/assets/icons/company.svg"
        alt="New"
    />
</button>

<div class="company-list-container">
    <ul class="company-list">
        {#await fyritokur}
            {#each Array(5) as _}
                <li>
                    <LontakariListBox />
                </li>
            {/each}
        {:then fyritokur}
            {#each fyritokur as fyritoka}
                <div class="company-row" id={fyritoka._id}>
                    <span class="company-name">
                        <a
                            href="http://localhost:5173/#/fyritoka/{fyritoka._id}"
                        >
                            {fyritoka.Navn}
                        </a>
                    </span>
                    <button class="company-button">
                        <a
                            href="http://localhost:5173/#/fyritoka/{fyritoka._id}"
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
            <p>{error.message}</p>
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

    .company-list-container {
        margin-top: 2em;
    }

    .company-list {
        display: flex;
        flex-direction: column;
    }

    .company-row {
        display: flex;
        height: 3em;
        border-bottom: 1px solid var(--lines-color);
    }

    .company-name {
        flex-grow: 1;
        align-self: center;
        text-align: left;
    }

    .company-button {
        background-color: transparent;
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
