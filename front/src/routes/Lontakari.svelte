<script>
    import { selectedRoute } from "../stores/store.js";
    import { Lonarfolk } from "../classes/classes.js";
    import SveltyPicker from "svelty-picker";
    export let params;
    import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
    import { onMount } from "svelte";

    selectedRoute.set("lontakarar");

    const promise = Lonarfolk.heintaEin(params.id);

    function handleChange(e) {
        let key = e.target.getAttribute("data-key");
        let value = e.target.value;
        Lonarfolk.dagfor(params.id, { [key]: value });
    }

    function lonarfolkDelete() {
        console.log(params.id);
        Lonarfolk.sletta(params.id);
        window.location.href = "#/lontakarar";
    }

    // PDF Start
    let generatedPdfUrl = null;

    async function generatePDF(lonarfolk) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        var currentDate = new Date();
        var year = currentDate.getFullYear();

        // Set font styles
        const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Title
        page.drawText("Lønarseðil " + year, {
            x: 200,
            y: height - 50,
            size: 24,
            font: titleFont,
            color: rgb(0, 0.53, 0.71),
        });

        // Company Information
        const CompinfoX = 400;
        const CompinfoYStart = height - 100;
        const CompinfoLineHeight = 20;

        const CompInfo = [
            { label: "", value: "C3IT" },
            { label: "", value: "Adressa" },
            { label: "", value: "2300 København S" },
            { label: "", value: "C3@IT.DK" },
            { label: "", value: "31676767" },
            { label: "", value: "123456-123" },
        ];

        CompInfo.forEach((info, index) => {
            const yPos = CompinfoYStart - index * CompinfoLineHeight;
            page.drawText(`${info.label} ${info.value}`, {
                x: CompinfoX,
                y: yPos,
                size: 14,
                font: regularFont,
            });
        });

        // Employee Information
        const infoX = 30;
        const infoYStart = height - 100;
        const infoLineHeight = 20;

        const employeeInfo = [
            { label: "", value: lonarfolk.data.Navn },
            { label: "", value: lonarfolk.data.Bydur },
            { label: "", value: lonarfolk.data.Bustadur },
            { label: "", value: lonarfolk.data.Mail },
            { label: "", value: lonarfolk.data.Fødingardagur },
            { label: "", value: lonarfolk.data.Telefon },
        ];

        employeeInfo.forEach((info, index) => {
            const yPos = infoYStart - index * infoLineHeight;
            page.drawText(`${info.label} ${info.value}`, {
                x: infoX,
                y: yPos,
                size: 14,
                font: regularFont,
            });
        });

        page.drawText("Frágreiðing", {
            x: 30,
            y: height - 400,
            size: 14,
            font: titleFont,
        });

        page.drawText("Tímar", {
            x: 330,
            y: height - 400,
            size: 14,
            font: titleFont,
        });

        page.drawText("Løn", {
            x: 500,
            y: height - 400,
            size: 14,
            font: titleFont,
        });

        // Draw additional lines
        const lineYStart = height - 220;
        const lineYEnd = height - 600;
        const lineXStart = 30;
        const lineXEnd = width - 30;

        page.drawLine({
            start: { x: lineXStart, y: lineYStart },
            end: { x: lineXEnd, y: lineYStart },
            thickness: 2,
            color: rgb(0.5, 0.5, 0.5),
        });

        page.drawLine({
            start: { x: lineXStart, y: 440 },
            end: { x: lineXEnd, y: 440 },
            thickness: 2,
            color: rgb(0.5, 0.5, 0.5),
        });

        // Draw additional lines with description, quantity, and salary
        const lineInfoX = 30;
        const lineInfoYStart = height - 420;
        const lineInfoLineHeight = 20;

        const lineDetails = [
            {
                description: lonarfolk.data.Desc,
                quantity: lonarfolk.data.Tímar,
                salary: lonarfolk.data.Løn,
            },
            // Add more line details as needed
        ];

        lineDetails.forEach((line, index) => {
            const yPos = lineInfoYStart - index * lineInfoLineHeight;
            page.drawText(`${line.description}`, {
                x: lineInfoX,
                y: yPos,
                size: 14,
                font: regularFont,
            });
            page.drawText(`${line.quantity}`, {
                x: lineInfoX + 300,
                y: yPos,
                size: 14,
                font: regularFont,
            });
            page.drawText(`${line.salary}`, {
                x: lineInfoX + 450,
                y: yPos,
                size: 14,
                font: regularFont,
            });
        });

        // Feria
        page.drawText("Rest Feria", {
            x: 30,
            y: 150,
            size: 14,
            font: titleFont,
        });
        page.drawLine({
            start: { x: lineXStart, y: 140 },
            end: { x: lineXEnd, y: 140 },
            thickness: 2,
            color: rgb(0.5, 0.5, 0.5),
        });

        page.drawText(lonarfolk.data.Restferia + " dagar", {
            x: 30,
            y: 120,
            size: 14,
            font: regularFont,
        });

        // Save and display the PDF
        const pdfBytes = await pdfDoc.save();
        const pdfUrl = URL.createObjectURL(
            new Blob([pdfBytes], { type: "application/pdf" })
        );
        generatedPdfUrl = pdfUrl;
    }

    onMount(() => {
        return () => {
            if (generatedPdfUrl) {
                URL.revokeObjectURL(generatedPdfUrl);
            }
        };
    });
</script>

<main>
    <!-- JS data -->
    <div class="split-screen">
        {#await promise}
            <p>Bíða...</p>
        {:then lonarfolk}
            <div class="left-side">
                <h1>{lonarfolk.data.Navn}</h1>
                <!-- Body1 -->
                <h2 class="input-group-heading">Adressa</h2>
                <hr />
                <form class="sub-group">
                    <!-- Gøta -->
                    <div class="form-floating">
                        <input
                            on:change={handleChange}
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="Tinghúsvegur 1"
                            value={lonarfolk.data.Bustadur}
                            data-key="Bustadur"
                        />
                        <label for="floatingInput">Gøtunavn</label>
                    </div>
                    <!-- Býur -->
                    <div class="form-floating">
                        <input
                            on:change={handleChange}
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="Tórshavn"
                            value={lonarfolk.data.Bydur}
                            data-key="Bydur"
                        />
                        <label for="floatingInput">Býur</label>
                    </div>
                    <h2 class="input-group-heading">Lønupplýsningar</h2>
                    <hr />
                    <div class="sub-group">
                        <!-- Løn Frágreiding -->
                        <div class="form-floating">
                            <input
                                on:change={handleChange}
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="Fyri DD-MM-YYYY til DD-MM-YYYY"
                                value={lonarfolk.data.Desc}
                                data-key="Desc"
                            />
                            <label for="floatingInput">Frágreiðing</label>
                        </div>
                        <!-- Løn Tímar -->
                        <div class="form-floating">
                            <input
                                on:change={handleChange}
                                type="number"
                                class="form-control"
                                id="floatingInput"
                                placeholder="160"
                                value={lonarfolk.data.Tímar}
                                data-key="Tímar"
                            />
                            <label for="floatingInput">Tímar</label>
                        </div>
                        <!-- Løn at betala -->
                        <div class="form-floating">
                            <input
                                on:change={handleChange}
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="3000,00"
                                value={lonarfolk.data.Løn}
                                data-key="Løn"
                            />
                            <label for="floatingInput">Løn brutto</label>
                        </div>
                        <!-- Feria -->
                        <div class="form-floating">
                            <input
                                on:change={handleChange}
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="0"
                                value={lonarfolk.data.Restferia}
                                data-key="Restferia"
                            />
                            <label for="floatingInput">Rest feria</label>
                        </div>
                    </div>
                    <!-- Telefon nummar -->
                    <div class="form-floating">
                        <input
                            on:change={handleChange}
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="311234"
                            value={lonarfolk.data.Telefon}
                            data-key="Telefon"
                        />
                        <label for="floatingInput">Telefon nummar</label>
                    </div>
                </form>
            </div>
            <h2 class="input-group-heading">Persónsupplýsingar</h2>
            <hr />
            <div class="sub-group">
                <!-- Navn -->
                <div class="form-floating">
                    <input
                        on:change={handleChange}
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="Petur Petersen"
                        value={lonarfolk.data.Navn}
                        data-key="Navn"
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
                        on:change={handleChange}
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        value={lonarfolk.data.Ptal}
                        data-key="Ptal"
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
                <strong>{lonarfolk.data.Slagavinntøku}</strong>
            </div>
            <div class="lontakari-info">
                Løn brutto:<br />
                <strong>{lonarfolk.data.Løn}</strong>
            </div>
            <div class="lontakari-info">
                Rest feria:<br />
                <strong>{lonarfolk.data.Restferia} dagar</strong>
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
                <button on:click={lonarfolkDelete} class="button">
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
                <div class="button">
                    <button
                        on:click={generatePDF(lonarfolk)}
                        class="generate-pdf-button"
                    >
                        <span>Ger PDF</span>
                    </button>
                </div>
            </div>
            <div class="right-side">
                <div class="pdf-container">
                    {#if generatedPdfUrl}
                        <iframe src={generatedPdfUrl} frameborder="0" />
                    {/if}
                </div>
            </div>
        {:catch error}
            <p style="color: red">{error}</p>
        {/await}
    </div>
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
    .split-screen {
        display: flex;
        width: 100%;
    }

    .pdf-container iframe {
        width: 100%;
        height: calc(100vh - 100px);
        border: none;
    }

    .left-side {
        width: 50%;
        padding-right: 1em;
    }
    .right-side {
        width: 50%;
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
