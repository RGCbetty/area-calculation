<template>
  <v-container fluid>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr v-for="(tr, tr_i) in headerRows" :key="tr_i">
            <th
              v-for="(th, th_i) in tr"
              :key="th_i"
              :rowspan="th.rowspan"
              :colspan="th.colspan"
              class="text-center"
              v-text="th.value"
            />
          </tr>
        </thead>

        <tbody>
          <template v-if="!value">
            <tr
              class="text-center"
              v-for="(tr, tr_i) in areaData.sumimune.items"
              :key="tr_i"
            >
              <td v-text="tr.no" />
            <td>
                <input
                  class="text-center"
                  v-model="tr.floorName"
                  @input="compute(tr, tr_i)"
                /></td>
              <td><input
                  class="text-center"
                  v-model="tr.pitch"
                  @input="compute(tr, tr_i)"
                /></td>
              <td>
                <input
                  class="text-center"
                  v-model="tr.grids"
                  @input="compute(tr, tr_i)"
                />
              </td>
              <td>
                <input
                  class="text-center"
                  v-model="tr.eaves"
                  @input="compute(tr, tr_i)"
                />
              </td>
              <td>{{ tr.length ? Number(Math.round(tr.length + "e" + 3) + "e-" + 3) : tr.length }}</td>

              <!-- <td v-text="tr.length" /> -->
              <td v-text="tr.remarks" />
            </tr>
          </template>
          <template v-else>
            <tr
              class="text-center"
              v-for="(tr, tr_i) in areaDataDB.sumimune.items"
              :key="tr_i"
            >
              <td v-text="tr.no" />
              <td>
                <input
                  class="text-center"
                  v-model="tr.floorName"
                  @input="compute(tr, tr_i)"
                /></td>
              <td><input
                  class="text-center"
                  v-model="tr.pitch"
                  @input="compute(tr, tr_i)"
                /></td>
              <td>
                <input
                  class="text-center"
                  v-model="tr.grids"
                  @input="compute(tr, tr_i)"
                />
              </td>
              <td>
                <input
                  class="text-center"
                  v-model="tr.eaves"
                  @input="compute(tr, tr_i)"
                />
              </td>
              <td>{{ tr.length ? Number(Math.round(tr.length + "e" + 3) + "e-" + 3) : tr.length }}</td>
              <!-- <td v-text="tr.length" /> -->
              <td v-text="tr.remarks" />
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import AreaData from "../../assets/class/areadata";
import _cloneDeep from "lodash.clonedeep";
import _merge from "lodash.merge";
export default {
  props: {
    index: Number,
    selectedRow: Object,
    desc: Object,
    value: Boolean,
  },

  data() {
    return {
      temp: new AreaData(),

      headerRows: [
        [
          { value: "No" },
          { value: "FL" },
          { value: "Pitch" },
          { value: "Grids" },
          { value: "Eaves" },
          { value: "Length" },
          { value: "Remarks" },
        ],
      ],
      headers: [
        { text: "Floor", value: "no" },
        { text: "Floor", value: "floorName" },
        { text: "Floor", value: "pitch" },
        { text: "Floor", value: "grids" },
        { text: "Floor", value: "eaves" },
        { text: "Floor", value: "length" },
        { text: "Floor", value: "remarks" },
      ],
    };
  },
  watch: {
    desc(newVal) {
      this.areaDataDB.sumimune = _merge(
        _cloneDeep(this.areaDataDB.sumimune),
        newVal.sumimune
      );
      this.areaDataDB.standard = _merge(
        _cloneDeep(this.areaDataDB.standard),
        newVal.standard
      );
    },
  },
  // created() {
  //   if (this.areaData.sumimune.items.length === 0) {
  //     let sumimuneValues = Object.entries(this.dtx.yane.sumimune);
  //     console.log(this.dtx.yane);
  //     for (let sumimuneValue of sumimuneValues) {
  //       if (sumimuneValue[0] == "total") continue;

  //       let pitchValues = Object.entries(
  //         this.dtx.yane.sumimune[sumimuneValue[0]]
  //       );

  //       for (let pitchValue of pitchValues) {
  //         if (pitchValue[0] == "total") continue;

  //         for (let i = 0; i < pitchValue[1].values.length; i++) {
  //           this.areaData.sumimune.items.push({
  //             no: i + 1,
  //             floorName: sumimuneValue[0],
  //             pitch: pitchValue[0],
  //             grids: "",
  //             eaves: "",
  //             length: pitchValue[1].values[i],
  //             remarks: "auto compute",
  //           });
  //         }
  //       }
  //     }
  //   }
  // },

  methods: {
    compute(item) {
      if (item.grids == "" && item.eaves == "") {
        item.length = !this.value
          ? this.dtx.yane.sumimune[item.floorName][item.pitch].values[
              item.no - 1
            ]
          : this.desc.sumimune.items[item.no - 1].length;
        item.remarks = "Use auto compute";
      } else if (Number(item.grids) || Number(item.eaves)) {
        item.length =
          (Number(item.grids) *
            Number(
              !this.value
                ? this.areaData.sumimune.module
                : this.areaDataDB.sumimune.module
            ) +
            Number(item.eaves)) * Math.pow((item.pitch * item.pitch) / 100 + 2, 0.5)
        item.remarks = "Manually changed";
      }

      !this.value
        ? (this.areaData.sumimune.total =
            this.areaData.sumimune.items.reduce((acc, item) => {
              return acc + item.length;
            }, 0) * Math.pow((item.pitch * item.pitch) / 100 + 2, 0.5))
        : (this.areaDataDB.sumimune.total =
            this.areaDataDB.sumimune.items.reduce((acc, item) => {
              return acc + item.length;
            }, 0) * Math.pow((item.pitch * item.pitch) / 100 + 2, 0.5));
      //summation process

      // this.areaData.sumimune.remarks = item.remarks;
      // this.areaData.items[this.index].remarks = this.areaData.sumimune.remarks;
    },
  },
};
</script>

<style scoped>
table {
  border: solid 1px #e8e4c9;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  table-layout: fixed;
  width: 100%;
}

thead th {
  background-color: #4caf50;
  border: solid 1px;
  border-color: #424242;
  color: white !important;
  padding: 10px;
  text-align: left;
  /* text-shadow: 1px 1px 1px #fff; */
}
tbody td {
  border: solid 1px gray;
  color: #333;
  text-shadow: 1px 1px 1px #fff;
  height: 1vh;
}
tbody th {
  border: solid 1px gray;
  background-color: #424242;
  color: white;
  /* text-shadow: 1px 1px 1px #fff; */
  height: 1vh;
}
table td {
  position: relative;
}
table td input {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  border: none;
  padding: 10px;
  box-sizing: border-box;
}
</style>