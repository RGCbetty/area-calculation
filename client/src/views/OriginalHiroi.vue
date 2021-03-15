<template>
  <div>
    <v-card style="min-height: calc(100vh - 64px)">
      <v-card-title>
        <v-toolbar dense flat>
          <v-toolbar-title class="display-1 font-weight-thin">Area Calculation</v-toolbar-title>
          <template v-slot:extension>
            <v-tabs v-model="tabs" grow color="success">
              <v-tabs-slider color="success"></v-tabs-slider>
              <v-tab keep-alive to="/original_hiroi/calculation">Register</v-tab>
              <v-tab keep-alive to="/original_hiroi/monitoring">Monitoring</v-tab>
              <!-- <v-tab>Users</v-tab>
              <v-tab>Settings</v-tab>-->
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-card-text>
    </v-card>
    <!-- <div class="text-xs-center"> -->

    <!-- <LoadScreen :loadState="loading" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    drawer: true,
    tabs: null,
  }),
  methods: {
    // toRegister(){
    //   this.$router.push('/original_hiroi/calculation')
    // }
  },
}
</script>   
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
.flexcard .v-toolbar {
  flex: 0;
}
</style>