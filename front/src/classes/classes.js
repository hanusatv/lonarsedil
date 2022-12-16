export class Lonarfolk {

    static async heintaOll() {
        const response = await fetch("http://localhost:8000/lontakari/");
        return await response.json();
    }

    static async heintaEin(id) {
        const response = await fetch("http://127.0.0.1:8000/lontakari/" + id);
        return await response.json();
    }
}