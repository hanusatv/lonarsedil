<script>
    import { fly } from "svelte/transition";
    import { sineInOut, sineIn, sineOut, quadOut } from "svelte/easing";
    let toggle = false;
    let selected;
</script>

<div class="column-0" class:toggle style:width={toggle ? "15em" : "5em"}>
    <div
        class="menu-toggle"
        class:toggle
        style:width={toggle ? "13em" : "3em"}
        on:click={() => (toggle = !toggle)}
    />
    <ul>
        <li
            class:active={selected == "users"}
            on:click={() => (selected = "users")}
            on:keypress={() => (selected = "users")}
        >
            <a href="#">
                <img
                    src="/src/assets/icons/users.svg"
                    alt="users"
                    class="svg-color"
                />
                {#if toggle}
                    <span
                        class="text"
                        class:toggle
                        in:fly={{
                            x: -110,
                            duration: 500,
                            easing: sineOut,
                        }}
                        out:fly={{
                            x: -110,
                            duration: 500,
                            easing: quadOut,
                        }}>Løntakarar</span
                    >
                {/if}
            </a>
        </li>
        <li
            class:active={selected == "company"}
            on:click={() => (selected = "company")}
            on:keypress={() => (selected = "company")}
        >
            <a href="#">
                <img
                    src="/src/assets/icons/company.svg"
                    alt="company"
                    class="svg-color"
                    class:toggle
                />
                {#if toggle}
                    <span
                        class="text"
                        class:toggle
                        in:fly={{
                            x: -110,
                            duration: 500,
                            easing: sineOut,
                        }}
                        out:fly={{
                            x: -110,
                            duration: 500,
                            easing: quadOut,
                        }}>Fyritøka</span
                    >
                {/if}
            </a>
        </li>
    </ul>
</div>

<style>
    .column-0 {
        background-color: var(--primary-color);
        height: 100%;
        width: 5em;
        transition: 0.5s;
    }

    .menu-toggle {
        display: flex;
        padding: 1em;
        height: 4em;
        border-bottom: 1px solid var(--lines-color);
        cursor: pointer;
        transition: 0.5s;
    }

    .menu-toggle::before {
        position: absolute;
        content: "";
        height: 4px;
        width: 3em;
        background: var(--lines-color);
        transform: translateY(1em);
        transition: 0.5s;
        border-radius: 1em;
    }

    .toggle.menu-toggle::before {
        transform: translateY(2em) rotate(45deg);
    }
    .menu-toggle::after {
        position: absolute;
        content: "";
        height: 4px;
        width: 3em;
        background: var(--lines-color);
        box-shadow: 0 -1em 0 var(--lines-color);
        transform: translateY(3em);
        transition: 0.5s;
        border-radius: 1em;
    }
    .toggle.menu-toggle::after {
        transform: translateY(2em) rotate(-45deg);
        box-shadow: none;
    }

    ul {
        padding: 1em;
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    li {
        list-style: none;
        width: 3em;
        border: 1em solid red;
        border-radius: 1em;
        transition: 0.5s;
    }

    .active {
        transform: translateX(2em);
        border-color: var(--background-color);
        background-color: var(--background-color);
    }

    a {
        display: flex;
        align-items: center;
        gap: 2em;
        font-weight: bold;
    }

    .svg-color {
        filter: var(--svg-lines-color);
    }

    .svg-color:hover {
        filter: var(--svg-lines-color) drop-shadow(0 0 0.1em var(--hover-color));
        transition: 0.2s;
    }
</style>
