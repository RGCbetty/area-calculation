import XLS from "./index";

export default class SolarTableXLS extends XLS {
    constructor() {
        super();
    }

    get apisolartable() {
        return `${this.apixls}/solartable`;
    }

    async getKwValue(controlnumber) {
        try {
            let res = await this.axios.get(
                `${this.apisolartable}/getKw?customerCode=${controlnumber}`
            );
            if (res.data.message) {
                throw false;
            } else {
                this.values = res.data.split("kW", 1);
                return res.data.split("kW", 1)[0];
            }
        } catch (err) {
            alert("Solar Panel KW not found! Please check Cadtsv01 server.");
            return err;

            // return err;
        }
    }
}
