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

<style>
    address {
        width: 50%;
        float: right;
        padding: 0 10px;
        margin-bottom: 15px;
        font-style: normal;
        text-align: right;
    }
</style>
  
<address>
    {lonarfolk.Fyritoka}<br />
    <br />
    {lonarfolk.Navn}<br />
    {lonarfolk.Bydur}<br />
    {lonarfolk.Bustadur}<br />
    {lonarfolk.Mail}<br />
    {lonarfolk.Telefon}<br />
    {lonarfolk.Ptal}<br />
    {lonarfolk.Starvsheiti}<br />
    {lonarfolk.Fødingardagur}<br />

</address>