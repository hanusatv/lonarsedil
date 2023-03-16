const baseUrl = "BASE_URL_BACK"

export class Lonarfolk {
    static async heintaOll() {
        const response = await fetch(`${baseUrl}/lontakari`);
        return await response.json();
    }

    static async heintaEin(id) {
        const response = await fetch(`${baseUrl}/lontakari/${id}`);
        return await response.json();
    }

    static async dagfor(id, felt) {
        const response = await fetch(`${baseUrl}/lontakari/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(felt)
        });
        return await response.json();
    }

    static async upraetta(felt) {
        const response = await fetch(`${baseUrl}/lontakari/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(felt)
        });
        return await response.json();
    }

    static async sletta(id) {
        const response = await fetch(`${baseUrl}/lontakari/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
        return await response.json();
    }
}
