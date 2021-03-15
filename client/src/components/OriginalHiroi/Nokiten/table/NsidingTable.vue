<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="2" class="text-left">N.Siding</th>
            <th class="text-left">0.161</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" colspan="2">Garage</th>
            <td colspan="2" class="text-center">
              {{ nokiten.siding.garage }}
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">Balcony</th>
            <td colspan="2" class="text-center">
              {{ nokiten.balconytotal }}
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">H. Wall</th>
            <td colspan="2" class="text-center">
              {{ nokiten.hangingwalltotal }}
            </td>
          </tr>
          <tr>
            <th scope="row">1F</th>
            <th scope="row" class="text-center">
              {{
                nokiten.siding.floorMinus[0] + nokiten.summary.floorDeduct[0]
              }}
            </th>
            <td class="text-center">
              {{ nokiten.partialEaves1F }}
            </td>
          </tr>

          <tr>
            <th scope="row">2F</th>
            <th scope="row" class="text-center">
              {{
                nokiten.siding.floorMinus[1] + nokiten.summary.floorDeduct[1]
              }}
            </th>
            <td class="text-center">
              {{ nokiten.partialEaves2F }}
            </td>
          </tr>

          <tr>
            <th scope="row">3F</th>
            <th scope="row" class="text-center">
              {{
                nokiten.siding.floorMinus[2] + nokiten.summary.floorDeduct[2]
              }}
            </th>
            <td class="text-center">
              {{ nokiten.partialEaves3F }}
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">All Eaves</th>
            <td class="text-center">{{ nokiten.totalEaves }}</td>
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
  created() {
    // console.log(nokiten)
    //this.nokiten.sliding.floorMinus[0] = -200
  },

  data() {
    return {
      Tr: [
        [
          {
            value: "No",
            rowspan: "2",
          },
          {
            value: "Length",
            colspan: "3",
          },
          {
            value: "Width",
            colspan: "2",
          },
          {
            value: "Description",
            rowspan: "2",
          },
          {
            value: "Area, sq.m.",
            rowspan: "2",
          },
        ],
        [
          {
            value: "Grid",
          },
          {
            value: "Eaves",
          },
          {
            value: "Eaves",
          },
          {
            value: "Grid",
          },
          {
            value: "Eaves",
          },
        ],
      ],
    };
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
