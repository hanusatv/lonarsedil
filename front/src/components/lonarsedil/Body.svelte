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

<table class="invoice">
    <tr class="header">
      <th class="fragreiding">Frágreiðing</th>
      <th>Nøgd</th>
      <th>Satsur</th>
      <th class="ialt">Tilsamans</th>
    </tr>

    <tr class="footer footer-total">
      <th colspan="3">í Alt:</th>
      <th colspan="3">10000,00 DKK</th>
      
    </tr>
  </table>

  <style>
    .header {
        border-bottom: 1px solid black;
        height: 20px;
    }
    .invoice {
        width: 100%;
        height: 50%;
        float: right;
        padding: 0 10px;
        margin-bottom: 15px;
        font-style: normal;
        text-align: right;
        font-size: 15px;
    }
    .fragreiding {
        text-align: left;
    }
    .ialt {
        text-align: right;
    }
</style>