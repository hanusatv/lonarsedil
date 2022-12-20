const baseUrl = "BASE_URL_BACK"

export class Lonarfolk {
    constructor() {
        // const yamlData = yaml.load(fs.readFileSync("../../../.env.yaml", 'utf8'));
        // console.log(yamlData)
    }


    static async heintaOll() {
        const response = await fetch(baseUrl + "/lontakari");
        console.log(baseUrl)
        return await response.json();
    }

    static async heintaEin(id) {
        const response = await fetch(baseUrl + "/lontakari/" + id);
        return await response.json();
    }
}