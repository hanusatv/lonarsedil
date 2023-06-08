<script>
    import { fly } from "svelte/transition";
    import { sineOut, quadOut } from "svelte/easing";
    import { selectedRoute } from "../stores/store.js";
    let toggle = false;
    let selected;
    selectedRoute.subscribe((route) => {
        selected = route;
    });

    const menuItems = [
        {
            name: "lontakarar",
            icon: "/src/assets/icons/users.svg",
            caption: "Løntakarar",
        },
        {
            name: "fyritoka",
            icon: "/src/assets/icons/company.svg",
            caption: "Fyritøka",
        },
    ];

    function handleClick(itemName) {
        toggle = false;
        selectedRoute.set(itemName);
    }
</script>

<div class="column-0" class:toggle>
    <div
        class="menu-toggle"
        class:toggle
        style:width={toggle ? "13em" : "3em"}
        on:click={() => (toggle = !toggle)}
        on:keypress={() => (toggle = !toggle)}
    />
    <ul class="items-container">
        {#each menuItems as menuItem}
            <a
                href="/#/{menuItem.name}"
                on:click={() => handleClick(menuItem.name)}
                on:keypress={() => (selected = menuItem.name)}
            >
                <li class:active={selected == menuItem.name}>
                    <span class="item-container">
                        <img
                            src={menuItem.icon}
                            alt={menuItem.icon}
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
                                }}>{menuItem.caption}</span
                            >
                        {/if}
                    </span>
                </li>
            </a>
        {/each}
    </ul>
</div>

<style>
    * {
        box-sizing: content-box;
    }
    .column-0 {
        background-color: var(--primary-color);
        height: 100%;
        width: 5em;
        transition: 0.5s;
        transition-timing-function: width ease;
    }

    .column-0.toggle {
        width: 15em;
    }

    /* Start of menu toggler */

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

    /* End of menu toggler */

    /* Start of navigation items */

    .items-container {
        margin-top: 1em;
        position: absolute;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    li {
        position: relative;
        width: 3em;
        border: 1em solid transparent;
        border-radius: 1em;
        transition: 0.5s;
    }

    li::before {
        content: " ";
        position: absolute;
        top: -2em;
        left: 4em;
        background: transparent;
        width: 1em;
        height: 1em;
        transition: 0.5s;
        transition-timing-function: ease;
    }

    li::after {
        content: " ";
        position: absolute;
        top: 4em;
        left: 4em;
        background: transparent;
        width: 1em;
        height: 1em;
        transition: 0.5s;
        transition-timing-function: ease;
    }

    /* End of navigation items */

    /* Start of navigation items toggled */
    .toggle li::before,
    .toggle li::after {
        transform: translateX(10em);
    }

    /* End of navigation items toggled */

    .active {
        transform: translateX(2em);
        border-color: var(--background-color);
        border-radius: 1em 0 0 1em;
        background-color: var(--background-color);
        transition: 0.5s;
    }

    li.active::before {
        left: 1em;
        border-bottom-right-radius: 1em;
        box-shadow: 0.2em 0.2em 0px 0.2em var(--background-color);
    }

    li.active::after {
        left: 1em;
        border-top-right-radius: 1em;
        box-shadow: 0.2em -0.2em 0px 0.2em var(--background-color);
    }

    .toggle .active {
        padding-right: 8em;
    }

    .item-container {
        display: flex;
        align-items: center;
        gap: 2em;
        font-weight: bold;
    }

    .item-container:hover {
        cursor: pointer;
    }
</style>
