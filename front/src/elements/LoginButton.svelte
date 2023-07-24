<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { auth } from "../classes/firebase.js"; // import auth from firebase.js
    import firebase from "firebase/compat/app"; // import firebase from the compat version
    import * as firebaseui from "firebaseui"; // import the entire firebaseui
    import "firebaseui/dist/firebaseui.css"; // import the firebase css

    let ui;
    let showModal = false;

    // FirebaseUI config.
    const uiConfig = {
        signInSuccessUrl: "localhost:5173/",
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            },
        ],
    };

    onMount(() => {
        ui = new firebaseui.auth.AuthUI(auth);
    });

    async function runLogInModal() {
        showModal = true;
        await tick();
        ui.start("#firebaseui-auth-content", uiConfig);
    }

    onDestroy(() => {
        ui.delete();
    });
</script>

<button on:click={runLogInModal} class="button">Logga á</button>

{#if showModal}
    <div id="firebaseui-auth-container" on:click={() => (showModal = false)}>
        <div id="firebaseui-auth-content" />
    </div>
{/if}

<style>
    #firebaseui-auth-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
        z-index: 1000; /* Make sure the modal appears above all other content */
    }

    #firebaseui-auth-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
    }
</style>
