import API from "../api";
import deepClone from "lodash.clonedeep";

export default class DB extends API {
  constructor() {
    super();
  }

  get apidb() {
    return `${this.api}/db`;
  }

  async saveToDB(exportData) {
    try {
      await this.axios.post(
        `${this.apidb}/areacalculation/computed`,
        deepClone(exportData)
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  getComputed() {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${this.apidb}/areacalculation/getdata/`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
