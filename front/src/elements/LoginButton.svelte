<script>
    import { onDestroy, onMount, tick } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "../classes/firebase.js";
    import firebase from "firebase/compat/app";
    import * as firebaseui from "firebaseui";
    import "firebaseui/dist/firebaseui.css";

    let ui;
    let showModal = false;

    // Create a Svelte writable store for signedIn
    let signedIn;

    const uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: "http://localhost:5173/",
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                var credential = authResult.credential;
                return true;
            },
        },
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

    onAuthStateChanged(auth, (user) => {
        signedIn = !!user;
        if (user) {
            console.log("Logged in as: " + user.displayName);
        } else {
            console.log("Logged out");
        }
    });

    async function runLogInModal() {
        showModal = true;
        await tick();
        ui.start("#firebaseui-auth-content", uiConfig);
    }

    onDestroy(() => {
        ui.delete();
        showModal = false;
    });
</script>

<!-- Subscribe to the signedIn store -->
{#if signedIn}
    <button on:click={() => auth.signOut()} class="button">Logga út</button>
{:else}
    <button on:click={runLogInModal} class="button">Logga á</button>
{/if}

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
