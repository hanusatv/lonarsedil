<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import SveltyPicker from "svelty-picker";
    import pdfMake from "pdfmake/build/pdfmake";
    import PdfHeader from '../components/lonarsedil/Header.svelte';
    import PdfBody from '../components/lonarsedil/Body.svelte';
    import PdfFooter from '../components/lonarsedil/Footer.svelte';
    import { user} from "../stores/store.js";

    
    let lonarfolk = JSON.parse(sessionStorage.getItem("Lonarfolk"));
    lonarfolk.Yvirskrift = "Lønarseðil";
    lonarfolk.FyritokaAdressa = "Postboks 1059";
    lonarfolk.FyritokaPostBydur = "110 Tórshavn";
    lonarfolk.FyritokaTelefon = "Tlf. 316767";
    lonarfolk.FyritokaEmail = "Lønarseðil@Lønarseðil.fo";


    user.set(lonarfolk);
    

    function handleChange() {
        // sessionStorage.setItem("Lonarfolk",JSON.stringify(lonarfolk));
        user.set(JSON.stringify(lonarfolk));
    }
    

</script> 
<div class="BodyTabs">
    <div class="body1">
        <Tabs>
            <TabList>
                <Tab>Persón upplýsingar</Tab>
                <Tab>Fyritøku upplýsingar</Tab>
                <Tab>Linjur</Tab>
            </TabList>
        
            <TabPanel>
                <h2>Persónsupplýsingar</h2>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Yvirskrift}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Yvirskrift</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Fyritoka}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text1</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Navn}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text2</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Bydur}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text3</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Bustadur}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text4</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Mail}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text5</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Telefon}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text6</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Ptal}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text7</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.Starvsheiti}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Text8</label>
                </div>
                
                
            </TabPanel>
        
            <TabPanel>
                <h2>Fyritøku upplýsingar</h2>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.FyritokaAdressa}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Adressa</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.FyritokaPostBydur}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Post Býður</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.FyritokaTelefon}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Telefon</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="311234"
                        bind:value={lonarfolk.FyritokaEmail}
                        on:keyup={handleChange}
                        on:change={handleChange}
                    />
                    <label for="floatingInput">Email</label>
                </div>
            </TabPanel>

            <TabPanel>
                <h2>Linjur</h2>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="20.000"
                        value={lonarfolk.lon}
                    />
                    <label for="floatingInput">Fráfreiðing</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="39"
                        value="39"
                    />
                    <label for="floatingInput">A-Skat</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="12.200"
                        value="12.000"
                    />
                    <label for="floatingInput">útbetaling</label>
                </div>
            </TabPanel>
        </Tabs>
        <div>
            <button class="button1">Send PDF Mail</button>
            <button class="button2">Goym PDF</button>
        </div>
    </div>
    <div class="body2">
        <h1>Lønarseðil PDF</h1>
        <div class="preview">
            <div id="invoice" class="a4-paper">
              <PdfHeader />
              <PdfBody />
              <PdfFooter />
            </div>
          </div>
    </div>
</div>


<style>
    .button1 {
        float: left;
        cursor: pointer;
        border-radius: 7px;
        padding: 5px 24px;
        border: none;
        outline: none;
        background: #2b3044;
        color: #a5aaff;
    }
    .button2 {
        float: right;
        cursor: pointer;
        border-radius: 7px;
        padding: 5px 24px;
        border: none;
        outline: none;
        background: #2b3044;
        color: #a5aaff;
    }
    .form-floating {
        padding: 4px 0px;
    }
    .body1 {
        float: left;
        width: 40%;
    }
    .body2 {
        float: left;
        width: 60%;
    }
    .preview {
        flex: auto;
        /* display: flex; */
        padding: 30px;
        overflow: auto;
        justify-content: center;
        align-items: center;
    }
    .a4-paper {
        width: 655px;
        /* height: 902px; */
        height: 882px;
        float: right;
        overflow: hidden;
        background: white;
        padding: 30px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        color: black;
    }
</style>
