<script>
    import LontakariListBox from "../elements/LontakariListBox.svelte";
    import { selectedRoute } from "../stores/store.js";
    selectedRoute.set("lontakarar");
    export let params;
    // var data;
    // const fetchLonarfolk = (async () => {
    //     const response = await fetch("http://127.0.0.1:8000/lontakari/637201ec7c40b90928fcbe09");
    //     return await response.json();
    // })();

    async function heintaLonarfolk() {
		const res = await fetch(`http://127.0.0.1:8000/lontakari/` + params.id);
		const text = await res.json();
        console.log(text);
		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

    let promise = heintaLonarfolk();
</script>


<main>
    {#await promise}
        <p>wait...</p>
    {:then lonarfolk}
            <ul>
                <li>
                    {lonarfolk.Fyritoka}
                    {lonarfolk.Navn}
                    {lonarfolk.Aldur}
                    {lonarfolk.Gøta}
                    {lonarfolk.Bydur}
                    {lonarfolk.PostNummar}
                    {lonarfolk.Land}
                    {lonarfolk.KontoNummar}
                    {lonarfolk.Løn}
                </li>
            </ul>
    {:catch error}
        <p style="color: red">{error}</p>
    {/await}
</main>

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
