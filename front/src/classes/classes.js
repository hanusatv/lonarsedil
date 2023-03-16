const baseUrl = "BASE_URL_BACK"

export class Lonarfolk {
    constructor() {
        // const yamlData = yaml.load(fs.readFileSync("../../../.env.yaml", 'utf8'));
        // console.log(yamlData)
    }


    static async heintaOll() {
        const response = await fetch(baseUrl + "/lontakari");
        return await response.json();
    }

    static async heintaEin(id) {
        const response = await fetch(baseUrl + "/lontakari/" + id);
        return await response.json();
    }

    static async dagfor(id, felt) {
        console.log(id, felt)
        const response = await fetch(baseUrl + "/lontakari/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(felt)
        });
        return await response.json();
    }
}
