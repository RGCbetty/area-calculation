<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="8" class="text-center">Underlayer Check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">Fujoshitsu</td>
            <td colspan="6" class="text-center pa-0" style="width: 120px">
              <v-select
                class="pa-0"
                v-model="selected"
                @change="toAreaData"
                :items="options"
                single-line
                solo
                hide-details
              ></v-select>
            </td>
          </tr>
          <tr>
            <td style="background-color: #a9a9a9" colspan="2"></td>
            <td colspan="3" class="text-center">1st Floor</td>
            <td colspan="3" class="text-center">2nd Floor</td>
          </tr>
          <tr>
            <td colspan="2">Balcony</td>
            <td colspan="3" class="text-center">
              {{ nokiten.underlayer.balconyFloors[0] }}
            </td>
            <td colspan="3" class="text-center">
              {{ nokiten.underlayer.balconyFloors[1] }}
            </td>
          </tr>
          <tr>
            <td style="background-color: #a9a9a9" colspan="2"></td>
            <td colspan="2" class="text-center">1st Floor</td>
            <td colspan="2" class="text-center">2nd Floor</td>
            <td colspan="2" class="text-center">3rd Floor</td>
          </tr>
          <tr>
            <td colspan="2">H.Wall</td>
            <td>GT</td>
            <td>
              {{ nokiten.underlayer.h_wallFloors[0] }}
            </td>
            <td>GT</td>
            <td>
              {{ nokiten.underlayer.h_wallFloors[1] }}
            </td>
            <td>GT</td>
            <td>
              {{ nokiten.underlayer.h_wallFloors[2] }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  props: {
    nokiten: Object,
  },
  data() {
    return {
      selected: "",
      options: ["✔", "-"],
    };
  },
  methods: {
    toAreaData() {
      this.areaData.nokiten.selected = this.selected;
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
.v-select > .dropdown-menu {
  text-align: center;
}
</style>
