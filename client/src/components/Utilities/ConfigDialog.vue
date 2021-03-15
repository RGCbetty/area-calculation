<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      max-width="1000"
      no-click-animation
      persistent
    >
      <v-card>
        <slot name="header"></slot>

        <slot name="specification"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      dialog: false
    }
  },
  props:{
    value: Boolean
  },
  watch:{
    value(newVal){
      console.log(newVal)
      this.dialog = newVal
    }
  },

}
</script>

<style>

</style>