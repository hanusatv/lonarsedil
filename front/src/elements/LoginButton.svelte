<script>
    import { onMount, onDestroy } from "svelte";
    import {
        getAuth,
        signInWithPopup,
        GoogleAuthProvider,
    } from "firebase/auth";
    import firebase from "firebase/compat/app";
    import * as firebaseui from "firebaseui";
    import "firebaseui/dist/firebaseui.css";

    let auth;
    let provider;
    let ui;

    onMount(() => {
        auth = getAuth();
        provider = new GoogleAuthProvider();
        const uiConfig = {
            signInSuccessUrl: "localhost:5173/",
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                },
            ],
        };
        ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", uiConfig);
    });

    onDestroy(() => {
        ui.delete();
    });
</script>

<button id="firebaseui-auth-container" />
