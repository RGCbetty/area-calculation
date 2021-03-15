<template>
  <v-container 
    align-center 
    fluid
  >
    <v-layout>
      <v-flex xs12>
        <v-card 
          flat
        >
          <v-card-title 
            v-text="'Rigidity'"
          />
          <v-card-subtitle>
            <a 
              :href="download"
              v-text="label"
            />
          </v-card-subtitle>
          <v-card-text>
            <v-tabs
              fixed-tabs
              v-model="tabs"
            >
              <v-tab 
                v-for="(tab, tab_i) in tabsHeader"
                :key="tab_i"
                v-text="tab.name"
              />
            </v-tabs>
            <v-tabs-items 
              v-model="tabs"
            >
              <v-tab-item>
                <x-table
                  :caption="tabsHeader[0].name"
                  :items="bwList[selected][1]"
                /> 
              </v-tab-item>
              <v-tab-item>
                <y-table
                  :caption="tabsHeader[1].name"
                  :items="bwList[selected][2]"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:[
    'selected',
    'download',
    'label'
  ],

  data:()=> ({
    tabs: null,
    tabsHeader: [
      {name: 'X-Axis'},
      {name: 'Y-Axis'}
    ]
  }),

  components: {
    'XTable': () => import('./RigidityTable.vue'),
    'YTable': () => import('./RigidityTable.vue')
  }
}
</script>

<style>

</style>