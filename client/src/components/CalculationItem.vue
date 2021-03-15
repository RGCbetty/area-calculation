<template>
  
  <v-col 
    cols="6"  
  >
    <v-card
      v-if="value>0"
      outlined
      dense
    >
      <v-list-item>
        <v-list-item-icon>
          <v-icon
            @click="detailInfo()"  
            v-text="iconName"
          />
        </v-list-item-icon>

        <v-list-item-title 
          class="title"
          v-text="caption"
        />

        <v-list-item-action-text 
          class="title" 
          style="color:black" 
          v-roundTo="[value, 3]"
        />
    
      </v-list-item>

      <v-expand-transition>
        <div 
          v-show="isShow"
        >
          <v-divider></v-divider>
          
          <v-card-text>
            <slot></slot>
          </v-card-text>
          
        </div >
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import roundTo from '../plugins/roundto';

export default {
  name: 'calculation-item',

  props: [
    'value',
    'caption',
    'detail'
  ],

  data () {
    return {
      showComponent: 'mdi-square-small',
      iconName: ''
    }

  },

  methods: {
    detailInfo(){
       if (this.detail == 'true'){
        return this.showComponent = 'mdi-square-small' 
      }else{
        return this.showComponent == 'mdi-chevron-down' ? 'mdi-chevron-up' : 'mdi-chevron-down'
      }
      // this.showComponent = !this.showComponent
    }
  },

  computed: {
    isShow(){
      return this.value > 0
    }
  },

  mixins: [
    roundTo
  ]
}
</script>

<style>

</style>
