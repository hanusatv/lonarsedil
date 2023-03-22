const baseUrl = "BASE_URL_BACK"

class LonarfolkData {
    constructor(data) {
        this.data = {
            _id: "",
            Fyritoka: "",
            Navn: "",
            Bydur: "",
            Løn: "",
            Bustadur: "",
            Fødingardagur: "",
            Mail: "",
            Ptal: "",
            Restferia: "",
            Slagavinntøku: "",
            Starvsetanardagur: "",
            Starvsheiti: "",
            Telefon: "",
            Aldur: "",
            Gøta: "",
            KontoNummar: "",
            Land: "",
            PostNummar: "",
            løn: "",
        };
        //Iterate over the data, which is an JSON object, and replace the values in the data object with the values from the JSON object
        for (const [key, value] of Object.entries(data)) {
            this.data[key] = value;
        }
    }
}


export class Lonarfolk {

    static async heintaOll() {
        try {
            const response = await fetch(`${baseUrl}/lontakari`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async heintaEin(id) {
        try {
            const response = await fetch(`${baseUrl}/lontakari/${id}`);
            //Pass the response to the LontakariData class, which will create a new object with the data from the response
            return new LonarfolkData(await response.json());
        } catch (error) {
            console.log(error);
        }
    }

    static async dagfor(id, felt) {
        try {
            const response = await fetch(`${baseUrl}/lontakari/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(felt)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async upraetta(felt) {
        try {
            const response = await fetch(`${baseUrl}/lontakari/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(felt)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async sletta(id) {
        try {
            const response = await fetch(`${baseUrl}/lontakari/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}
