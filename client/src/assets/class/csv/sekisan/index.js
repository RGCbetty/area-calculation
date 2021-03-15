import CSV from "../index";

export default class SekisanCSV extends CSV {
    constructor() {
        super();
    }

    get apisekisan() {
        return `${this.apicsv}/sekisan`;
    }

    async getCommonArea(controlNumber) {
        try {
            let res = await this.axios.get(
                `${this.apisekisan}/getCommonArea?customerCode=${controlNumber}`
            );
            this.values = res.data;
            return res;
        } catch (err) {
            return err;
        }
    }
}
