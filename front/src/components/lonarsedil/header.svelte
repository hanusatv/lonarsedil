<script>
    import { user} from "../../stores/store.js";
    let lonarfolk;

    const unsubscribe = user.subscribe(value => {
        lonarfolk = value;
        try {
		    lonarfolk = JSON.parse(value);
        } catch (e) {}
        return false;
        
	})
</script>

<div>
    <h2>{lonarfolk.Yvirskrift}</h2>
</div>
  
<div class="header1">
    <address>
        {lonarfolk.Navn}<br />
        {lonarfolk.Bydur}<br />
        {lonarfolk.Bustadur}<br />
        {lonarfolk.Mail}<br />
        {lonarfolk.Telefon}<br />
        {lonarfolk.Ptal}<br />
        {lonarfolk.Starvsheiti}<br />
        {lonarfolk.Fødingardagur}<br />
    </address>
</div>
<div class="header2">
    <address>
        {lonarfolk.Fyritoka}<br />
        <br />
        {lonarfolk.FyritokaAdressa}<br />
        {lonarfolk.FyritokaPostBydur}<br />
        {lonarfolk.FyritokaTelefon}<br />
        {lonarfolk.FyritokaEmail}<br />
    </address>
</div>
<style>
    .header1 {
        width: 50%;
        height: 30%;
        float: right;
        padding: 0 10px;
        margin-bottom: 15px;
        font-style: normal;
        text-align: right;
    }
    .header2 {
        width: 50%;
        height: 30%;
        float: left;
        padding: 0 10px;
        margin-bottom: 15px;
        font-style: normal;
        text-align: left;
    }
</style>