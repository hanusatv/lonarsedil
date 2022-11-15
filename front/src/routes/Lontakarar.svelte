<script>
    import { each } from "svelte/internal";
    import LontakariListBox from "../elements/LontakariListBox.svelte";
</script>

<ul class="employee-list">
    <li class="new employee-list-item">
        <img
            class="svg-icon svg-color"
            src="/src/assets/icons/new-pluss.svg"
            alt="New"
        />
    </li>
    {#each Array(5) as _}
        <li>
            <LontakariListBox />
        </li>
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
</style>
