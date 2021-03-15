import Base from "../base";

export default class HRDInformationService extends Base {
    constructor() {
        super();
    }

    async getBasicSpecificationDetails(customerCode) {
        try {
            return await this.axios.get(
                `${this.apidb}/hrdinformationservice/getBasicSpecificationDetails?customerCode=${customerCode}`
            );
        } catch (error) {
            console.log(error);
        }
    }
    async cadPlanDetails(customerCode, revNum) {
        try {
            return await this.axios.get(
                `${this.apidb}/hrdinformationservice/cadplandetails?customerCode=${customerCode}&revNum=${revNum}`
            );
        } catch (error) {
            console.log(error);
        }
    }
}
