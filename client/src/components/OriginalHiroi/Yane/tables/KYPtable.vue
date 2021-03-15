<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <th class="text-center" scope="row" style="width: 120px">Total</th>
            <td style="width: 120px" class="text-center">
              {{
                yane.mainroof.area.total
                  ? yane.mainroof.area.total
                  : yane.mr.area.total
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="row">Yosemune</th>
            <td class="text-center">
              {{
                yane.mainroof.kiritsuma.yosemune.total
                  ? yane.mainroof.kiritsuma.yosemune.total
                  : yane.mr.kiritsuma.yosemune.total
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="row">Kiritsuma</th>
            <td class="text-center">
              {{
                yane.mainroof.kiritsuma.kiritsuma.total
                  ? yane.mainroof.kiritsuma.kiritsuma.total
                  : yane.mr.kiritsuma.kiritsuma.total
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="row">Perimeter1</th>
            <td class="text-center">
              {{
                yane.mainroof.perimeter.p1.value
                  ? yane.mainroof.perimeter.p1.value
                  : yane.mr.perimeter.p1.value
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="row">Perimeter2</th>
            <td class="text-center">
              {{
                yane.mainroof.perimeter.p2.value
                  ? yane.mainroof.perimeter.p2.value
                  : yane.mr.perimeter.p2.value
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="row">Perimeter3</th>
            <td class="text-center">
              {{
                yane.mainroof.perimeter.p3.value
                  ? yane.mainroof.perimeter.p3.value
                  : yane.mr.perimeter.p3.value
              }}
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
    yane: Object,
  },
}
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
