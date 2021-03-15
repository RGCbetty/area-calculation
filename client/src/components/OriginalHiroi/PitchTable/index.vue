<template>
  <v-container fluid class="pa-0">
    <v-card flat width="auto">
      <v-card-title style="color: black">{{ title }}</v-card-title>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <template
              v-for="(head, index) in header"
              class="text-center font-weight-light"
            >
              <th
                class="text-center"
                :key="index + 'bankin'"
                v-if="
                  title !== 'Solar Panel' &&
                  head == 'Roof Style' &&
                  title !== 'Pitch Table'
                "
              >
                {{ head }}
              </th>
              <th
                class="text-center"
                :key="index + 'bankin'"
                v-else-if="head !== 'Roof Style'"
              >
                {{ head }}
              </th>
            </template>
          </thead>
          <tbody>
            <tr v-for="(pitches, floor, index) in editedObj" :key="index + 'a'">
              <th class="text-center" style="width: 60px" v-if="floor !== 'PH'">
                {{ floor }}
              </th>
              <template v-for="(pitch, key, index) in pitches">
                <td
                  :key="index + 'pitch'"
                  v-if="floor !== 'PH' && key !== 'roofStyle'"
                >
                  <input
                    v-if="isEditable"
                    class="text-center"
                    type="text"
                    v-model="pitch.value"
                    @input="emitChanges()"
                  />
                  <div v-else class="text-center" v-text="pitch.value"></div>
                </td>
              </template>
              <td v-if="floor !== 'PH' && title == 'Main Roof'" class="pa-0">
                <select
                  v-if="isEditable"
                  class="select"
                  style="width: 100%"
                  v-model="pitches.roofStyle"
                  @change="emitChanges()"
                  name="district"
                >
                  <option value="0">Please select Roof Style</option>
                  <optgroup v-for="district in districts" :key="district.id">
                    <option
                      v-for="region in district.regions"
                      :key="region.id"
                      :value="region"
                    >
                      {{ region }}
                    </option>
                  </optgroup>
                </select>
                <div
                  v-else
                  class="text-center"
                  v-text="pitches.roofStyle"
                ></div>
              </td>
            </tr>
          </tbody>
          <tbody v-if="title == 'Main Roof'">
            <tr v-for="(pitches, floor, index) in editedObj" :key="index + 'a'">
              <th class="text-center" style="width: 60px" v-if="floor == 'PH'">
                {{ floor }}
              </th>
              <td :key="index + 'pitch'" v-if="floor == 'PH'" colspan="4">
                <input
                  v-if="isEditable"
                  class="text-center"
                  type="text"
                  v-model="pitches.value"
                  @input="emitChanges()"
                />
                <div v-else class="text-center" v-text="pitches.value"></div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
export default {
  props: {
    rows: Object,
    isEditable: Boolean,
    title: String,
  },
  data() {
    return {
      header: ['FL', 'P1', 'P2', 'P3', 'Roof Style'],
      districts: [{ district: 'x', regions: ['y-k', 'Yosemune', 'Kiritsuma'] }],
    }
  },
  watch: {
    // rows(val){
    //   if(val==true){
    //     this.initialize()
    //   }
    // }
  },
  created() {
    // this.editedObj = cloneDeep(this.rows)
    // this.editedObj = JSON.parse(JSON.stringify(this.rows));
    // if (this.title == 'Main Roof'){
    //   this.$store.commit('assignMr',this.rows)
    // }else{
    //   this.$store.commit('assignSp',this.rows)
    // }
  },
  computed: {
    editedObj() {
      return cloneDeep(this.rows)
    },
  },
  methods: {
    // initialize(){
    //   this.editedObj = JSON.parse(JSON.stringify(this.rows));
    //   // console.log(this.newMR)
    //   // console.log(this.newSP)
    //   // this.editedObj = this.newMR
    // },

    emitChanges() {
      // console.log(this.rows)
      this.$emit('update', this.editedObj, this.title)
      // if (this.title == 'Main Roof'){
      //   this.$store.commit('assignMr',this.editedObj)
      // }else{
      //   this.$store.commit('assignSp',this.editedObj)
      // }

      // console.log(this.areaData.standard.mr)

      // console.log( Object.keys(this.areaData.standard.mr) )
      // let res = {};
      // for(let floors in this.areaData.standard.mr){
      //   if(floors == `PH`) continue;
      //   console.log(this.areaData.standard.mr[floors])
      // }
      // for (let i = 1; i<=3; i++){
      //   console.log(this.areaData.standard.mr[`${i}F`])

      // }

      // console.log(pitch)
      // console.log(this.areaData.standard.mr)
    },
  },
}
</script>
<style scoped>
.select {
  -webkit-appearance: menulist !important; /* override vuetify style */
  -moze-appearance: menulist !important; /* override vuetify style */
  appearance: menulist !important; /* override vuetify style */
}
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
