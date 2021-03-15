<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="3" class="text-center">Brillart Kiroyoke</th>
          </tr> 
        </thead>
        <tbody>
          <tr> 
            <th scope="row" class="text-center" style="width: 240px;">Pitch</th>
            <td colspan="2" class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px;">1F Area</th>
            <td colspan="2" class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px;">2F Area</th>
            <td colspan="2" class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px;">3F Area</th>
            <td colspan="2" class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px;">Total</th>
            <td colspan="2" class="text-center"></td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px;">Perimeter</th>
            <td colspan="2" class="text-center"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  

}
</script>
<style scoped>
table {
  border: solid 1px #e8e4c9;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  /* table-layout:fixed; */
  width: 50%;

}

thead th {
  background-color: #4CAF50;
  border: solid 1px;
  border-color: #424242;  
  color: white !important;
  height: 1vh !important;
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
.v-select>.dropdown-menu { text-align: center; }
</style>
