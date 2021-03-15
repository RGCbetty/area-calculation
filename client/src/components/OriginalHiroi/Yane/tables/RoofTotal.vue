<template >
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="5" class="text-center">Total Roof</th>
          </tr>
        </thead>
        <!-- <template v-if="trans.bool"> -->
        <tbody>
          <tr>
            <th style="width: 30px" class="text-center">
              {{ yane.totalmanual._flatRoof.name }}
            </th>
            <th style="width: 60px" class="text-center">
              {{
                yane.totalmanual._flatRoof.value
                  ? yane.totalmanual._flatRoof.value
                  : yane.total._flatRoof.value
              }}
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th style="width: 30px" class="text-center">
              {{ yane.totalmanual._slopeRoof.name }}
            </th>
            <th style="width: 60px" class="text-center">
              {{
                yane.totalmanual._slopeRoof.value
                  ? yane.totalmanual._slopeRoof.value
                  : yane.total._slopeRoof.value
              }}
            </th>
          </tr>
        </tbody>
        <!-- <tbody v-for="(item , index) in yane.total" :key="index +'a'">
                        <tr>
                            <th style="width:30px" class="text-center">{{item.name}}</th>
                             <th style="width:60px" class="text-center">{{item.value}}</th>
                        </tr>
                    </tbody>
                    </template>
                    <template v-else> 
                     <tbody v-for="(item , index) in yane.totalmanual" :key="index +'a'">
                        <tr>
                            <th style="width:30px" class="text-center">{{item.name}}</th>
                             <th style="width:60px" class="text-center">{{item.value}}</th>
                        </tr>
                    </tbody> -->
        <!-- </template> -->
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  props: {
    yane: Object,
  },
  name: 'TotalRoofTable',
  data: () => ({}),
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
  background-color: #4caf50;
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
.v-select > .dropdown-menu {
  text-align: center;
}
</style>
