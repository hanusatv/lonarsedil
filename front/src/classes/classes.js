const baseUrl = "BASE_URL_BACK"

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
            return await response.json();
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
