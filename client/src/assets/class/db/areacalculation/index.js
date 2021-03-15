import Base from "../base";

export default class AreaCalculation extends Base {
  static apidbAreaCalculation = `${this.apidb}/areacalculation`;

  constructor() {
    super();
  }

  get apidbAreaCalculation() {
    return `${this.apidb}/areacalculation`;
  }

  async getPlanInfo(controlNum) {
    try {
      return await this.axios.get(
        `${this.apidbAreaCalculation}/PlanInfoByPlanCode?planCode=${controlNum}`
      );
    } catch (err) {
      return err;
    }
  }

  async checkDate({ doc_id, payload }) {
    try {
      return await this.axios.post(
        `${this.apidbAreaCalculation}/checkdate?docID=${doc_id}`,
        payload
      );
    } catch (err) {
      return err;
    }
  }
  async deleteDoc({ doc_id, payload }) {
    try {
      return await this.axios.delete(
        `${this.apidbAreaCalculation}/document?docID=${doc_id}`,
        payload
      );
    } catch (err) {
      return err;
    }
  }

  static async getComputedItems(doc_id) {
    try {
      return await this.axios.get(
        `${this.apidbAreaCalculation}/ComputedItemsByDocID?docID=${doc_id}`
      );
    } catch (err) {
      return err;
    }
  }
  static async getItems(doc_id, title) {
    try {
      return await this.axios.get(
        `${this.apidbAreaCalculation}/items?docID=${doc_id}&title=${title}`
      );
    } catch (err) {
      return err;
    }
  }
  static async save(payload) {
    try {
      return await this.axios.post(
        `${this.apidbAreaCalculation}/areadata/${payload.title}`,
        payload
      );
    } catch (err) {
      return err;
    }
  }
  // getComputed() {
  //   return new Promise((resolve, reject) => {
  //     this.axios
  //       .get(`${this.apidb}/areacalculation/getdata/`)
  //       .then(res => {
  //         resolve(res.data)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // }
}
