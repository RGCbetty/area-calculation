<template>
  <v-dialog 
    v-model="value" 
    persistent 
    max-width="300"
  >
    <v-card>
      <v-card-title class="headline" v-text="'Roof Type?'"/>
      <v-card-text>
        <v-radio-group 
          v-model="selectedRadio" 
          mandatory
        >
          <v-radio label="軽い屋根 (Karuiyane)" value="karuiyane" color="red darken-3"/>
          <v-radio label="重い屋根 (Omoiyane)" value="omoiyane" color="indigo darken-3"/>
        </v-radio-group>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="green darken-1" dark @click="ok()" v-text="'Ok'"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RoofTypeDialog',

  props: [
    "value",
  ],

  data: () => ({
    selectedRadio: ''
  }),

  methods: {
    ok(){
      this.$emit('close', this.selectedRadio)
    }
  }
}
</script>