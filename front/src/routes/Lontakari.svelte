<script>
    import { selectedRoute } from "../stores/store.js";
    import { Lonarfolk } from "../classes/classes.js";
    import SveltyPicker from "svelty-picker";
    export let params;

    selectedRoute.set("lontakarar");

    let promise = Lonarfolk.heintaEin(params.id);

    // Delete button start
    document.querySelectorAll(".button").forEach((button) =>
        button.addEventListener("click", (e) => {
            if (!button.classList.contains("delete")) {
                button.classList.add("delete");
                setTimeout(() => button.classList.remove("delete"), 3200);
            }
            e.preventDefault();
        })
    );
    // Delete button end
</script>

<main>
    <!-- JS data -->
    {#await promise}
        <p>Bíða...</p>
    {:then lonarfolk}
        <h1>{lonarfolk.Navn}</h1>
        <div class="buttom-buttons-row1">
            <button class="button1">
                <a href="http://localhost:5173/#/GerPDF/">
                    <img
                        class="svg-icon svg-color"
                        src="/src/assets/icons/pdf.png"
                        alt="edit"
                    />
                    <span>Ger lønarseðil</span>
                </a></button
            >
        </div>
        <!-- Body1 -->
        <h2 class="input-group-heading">Adressa</h2>
        <hr />
        <form class="sub-group">
            <!-- Gøta -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Tinghúsvegur 1"
                    value={lonarfolk.Bustadur}
                />
                <label for="floatingInput">Gøtunavn</label>
            </div>
            <!-- Býur -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Tórshavn"
                    value={lonarfolk.Bydur}
                />
                <label for="floatingInput">Býur</label>
            </div>
            <!-- Postnummar -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="100"
                    value="Post koda"
                />
                <label for="floatingInput">Postnummar</label>
            </div>
            <!-- Land -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Føroyar"
                    value="Frøbjar"
                />
                <label for="floatingInput">Land</label>
            </div>
        </form>
        <!-- Body 2 -->
        <h2 class="input-group-heading">Kontakt</h2>
        <hr />
        <div class="sub-group">
            <!-- Teldupostur -->
            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="navn@dømi.fo"
                    value={lonarfolk.Mail}
                />
                <label for="floatingInput">Teldupostur</label>
            </div>
            <!-- Telefon nummar -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="311234"
                    value={lonarfolk.Telefon}
                />
                <label for="floatingInput">Telefon nummar</label>
            </div>
        </div>
        <h2 class="input-group-heading">Persónsupplýsingar</h2>
        <hr />
        <div class="sub-group">
            <!-- Navn -->
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="311234"
                    value={lonarfolk.Navn}
                />
                <label for="floatingInput">Navn</label>
            </div>
            <div class="form-floating">
                <SveltyPicker
                    inputClasses="form-control"
                    inputId="floatingInput"
                    format="dd-mm-yyyy"
                    placeholder=" "
                    todayBtn={false}
                    clearBtn={false}
                />
                <label for="floatingInput">Føðingardagur</label>
            </div>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="311234"
                    value={lonarfolk.Ptal}
                />
                <label for="floatingInput">P-tal</label>
            </div>
            <div class="form-floating">
                <SveltyPicker
                    inputClasses="form-control"
                    inputId="floatingInput"
                    format="dd-mm-yyyy"
                    placeholder=" "
                    todayBtn={false}
                    clearBtn={false}
                />
                <label for="floatingInput">Setanardagur</label>
            </div>
        </div>
        <div class="lontakari-info">
            Slag av inntøku:<br />
            <strong>{lonarfolk.Slagavinntøku}</strong>
        </div>
        <div class="lontakari-info">
            Løn brutto:<br />
            <strong>{lonarfolk.Løn}</strong>
        </div>
        <div class="lontakari-info">
            Rest feria:<br />
            <strong>{lonarfolk.Restferia} dagar</strong>
        </div>
        <label class="lontakari-info" for="lonar-tittleiki-dropdown"
            >Lønar títtleiki:</label
        >
        <div class="lonar-tittleiki-dropdown">
            <select>
                <option value="Option 1">Hvønn mánað</option>
                <option value="Option 2">Aðra hvørja viku</option>
                <option value="Option 3">Hvørja viku</option>
            </select>
        </div>
        <!-- Footer -->
        <div class="buttom-buttons-row">
            <button class="button">
                <div class="trash">
                    <div class="top">
                        <div class="paper" />
                    </div>
                    <div class="box" />
                    <div class="check">
                        <svg viewBox="0 0 8 6">
                            <polyline points="1 3.4 2.71428571 5 7 1" />
                        </svg>
                    </div>
                </div>
                <span>Strika løntakara</span>
            </button>
        </div>
    {:catch error}
        <p style="color: red">{error}</p>
    {/await}
</main>

<style>
    .input-group-heading {
        text-align: left;
    }

    hr {
        margin-top: 0;
    }
    .sub-group {
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 2em;
        margin-bottom: 2em;
    }
    .lontakari-info {
        margin: 10px;
        text-align: center;
    }

    /* Button Lonar tittleiki Start */
    .lonar-tittleiki-dropdown,
    .lonar-tittleiki-dropdown * {
        position: relative;
        box-sizing: border-box;
        color: white;
    }
    .lonar-tittleiki-dropdown {
        position: relative;
        background-color: #2b3044;
        border-radius: 4px;
    }
    .lonar-tittleiki-dropdown select {
        background-color: #2b3044;
        font-size: 1rem;
        font-weight: normal;
        max-width: 100%;
        padding: 8px 24px 8px 10px;
        border: none;
        background-color: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    .lonar-tittleiki-dropdown select:active,
    .lonar-tittleiki-dropdown select:focus {
        outline: none;
        box-shadow: none;
        background-color: #2b3044;
    }
    .lonar-tittleiki-dropdown:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 8px;
        width: 0;
        height: 0;
        margin-top: -2px;
        border-top: 5px solid #aaa;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
    }
    /* Button Lonar tittleiki end */
    /* Button sletta lønartakara Start */
    .button1 {
        --background: #2b3044;
        --background-hover: #1e2235;
        position: relative;
        border: none;
        outline: none;
        background: none;
        padding: 5px 24px;
        border-radius: 7px;
        min-width: 142px;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: flex;
        color: var(--text);
        background: var(--btn, var(--background));
        box-shadow: 0 var(--shadow-y, 4px) var(--shadow-blur, 8px) var(--shadow);
        transform: scale(var(--scale, 1));
        transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
        float: right;
    }
    .button {
        --background: #2b3044;
        --background-hover: #1e2235;
        --text: #fff;
        --shadow: rgba(0, 9, 61, 0.2);
        --paper: #5c86ff;
        --paper-lines: #fff;
        --trash: #e1e6f9;
        --trash-lines: #bbc1e1;
        --check: #fff;
        --check-background: #5c86ff;
        position: relative;
        border: none;
        outline: none;
        background: none;
        padding: 10px 24px;
        border-radius: 7px;
        min-width: 142px;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: flex;
        color: var(--text);
        background: var(--btn, var(--background));
        box-shadow: 0 var(--shadow-y, 4px) var(--shadow-blur, 8px) var(--shadow);
        transform: scale(var(--scale, 1));
        transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
        margin-top: 40px;
        float: right;
    }
    .button span {
        display: block;
        font-size: 14px;
        line-height: 25px;
        font-weight: 600;
        opacity: var(--span-opacity, 1);
        transform: translateX(var(--span-x, 0)) translateZ(0);
        transition: transform 0.4s ease var(--span-delay, 0.2s),
            opacity 0.3s ease var(--span-delay, 0.2s);
    }
    .button .trash {
        display: block;
        position: relative;
        left: -8px;
        transform: translate(var(--trash-x, 0), var(--trash-y, 1px))
            translateZ(0) scale(var(--trash-scale, 0.64));
        transition: transform 0.5s;
    }
    .button .trash:before,
    .button .trash:after {
        content: "";
        position: absolute;
        height: 8px;
        width: 2px;
        border-radius: 1px;
        background: var(--icon, var(--trash));
        bottom: 100%;
        transform-origin: 50% 6px;
        transform: translate(var(--x, 3px), 2px) scaleY(var(--sy, 0.7))
            rotate(var(--r, 0deg));
        transition: transform 0.4s, background 0.3s;
    }
    .button .trash:before {
        left: 1px;
    }
    .button .trash:after {
        right: 1px;
        --x: -3px;
    }
    .button .trash .top {
        position: absolute;
        overflow: hidden;
        left: -4px;
        right: -4px;
        bottom: 100%;
        height: 40px;
        z-index: 1;
        transform: translateY(2px);
    }
    .button .trash .top:before,
    .button .trash .top:after {
        content: "";
        position: absolute;
        border-radius: 1px;
        background: var(--icon, var(--trash));
        width: var(--w, 12px);
        height: var(--h, 2px);
        left: var(--l, 8px);
        bottom: var(--b, 5px);
        transition: background 0.3s, transform 0.4s;
    }
    .button .trash .top:after {
        --w: 28px;
        --h: 2px;
        --l: 0;
        --b: 0;
        transform: scaleX(var(--trash-line-scale, 1));
    }
    .button .trash .top .paper {
        width: 14px;
        height: 18px;
        background: var(--paper);
        left: 7px;
        bottom: 0;
        border-radius: 1px;
        position: absolute;
        transform: translateY(-16px);
        opacity: 0;
    }
    .button .trash .top .paper:before,
    .button .trash .top .paper:after {
        content: "";
        width: var(--w, 10px);
        height: 2px;
        border-radius: 1px;
        position: absolute;
        left: 2px;
        top: var(--t, 2px);
        background: var(--paper-lines);
        transform: scaleY(0.7);
        box-shadow: 0 9px 0 var(--paper-lines);
    }
    .button .trash .top .paper:after {
        --t: 5px;
        --w: 7px;
    }
    .button .trash .box {
        width: 20px;
        height: 25px;
        border: 2px solid var(--icon, var(--trash));
        border-radius: 1px 1px 4px 4px;
        position: relative;
        overflow: hidden;
        z-index: 2;
        transition: border-color 0.3s;
    }
    .button .trash .box:before,
    .button .trash .box:after {
        content: "";
        position: absolute;
        width: 4px;
        height: var(--h, 20px);
        top: 0;
        left: var(--l, 50%);
        background: var(--b, var(--trash-lines));
    }
    .button .trash .box:before {
        border-radius: 2px;
        margin-left: -2px;
        transform: translateX(-3px) scale(0.6);
        box-shadow: 10px 0 0 var(--trash-lines);
        opacity: var(--trash-lines-opacity, 1);
        transition: transform 0.4s, opacity 0.4s;
    }
    .button .trash .box:after {
        --h: 16px;
        --b: var(--paper);
        --l: 1px;
        transform: translate(-0.5px, -16px) scaleX(0.5);
        box-shadow: 7px 0 0 var(--paper), 14px 0 0 var(--paper),
            21px 0 0 var(--paper);
    }
    .button .trash .check {
        padding: 4px 3px;
        border-radius: 50%;
        background: var(--check-background);
        position: absolute;
        left: 2px;
        top: 24px;
        opacity: var(--check-opacity, 0);
        transform: translateY(var(--check-y, 0)) scale(var(--check-scale, 0.2));
        transition: transform var(--check-duration, 0.2s) ease
                var(--check-delay, 0s),
            opacity var(--check-duration-opacity, 0.2s) ease
                var(--check-delay, 0s);
    }
    .button .trash .check svg {
        width: 8px;
        height: 6px;
        display: block;
        fill: none;
        stroke-width: 1.5;
        stroke-dasharray: 9px;
        stroke-dashoffset: var(--check-offset, 9px);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--check);
        transition: stroke-dashoffset 0.4s ease var(--checkmark-delay, 0.4s);
    }

    .button.delete .trash .top .paper {
        animation: paper 1.5s linear forwards 0.5s;
    }
    .button.delete .trash .box:after {
        animation: cut 1.5s linear forwards 0.5s;
    }
    .button:hover {
        --btn: var(--background-hover);
        --shadow-y: 5px;
        --shadow-blur: 9px;
    }
    .button:active {
        --shadow-y: 2px;
        --shadow-blur: 5px;
        --scale: 0.94;
    }
    @keyframes paper {
        10%,
        100% {
            opacity: 1;
        }
        20% {
            transform: translateY(-16px);
        }
        40% {
            transform: translateY(0);
        }
        70%,
        100% {
            transform: translateY(24px);
        }
    }
    @keyframes cut {
        0%,
        40% {
            transform: translate(-0.5px, -16px) scaleX(0.5);
        }
        100% {
            transform: translate(-0.5px, 24px) scaleX(0.5);
        }
    }

    /* Button sletta lønartakara End */
</style>
