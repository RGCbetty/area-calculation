<template>
<v-container fill-height class="pa-0">
  <v-row align="center" justify="center"  no-gutters>
    <v-col cols="12" xs="12" sm="8" md="6" lg="4" xl="2">
      <v-card flat class="mt-n12" height="100%" color="#FAFAFA">
        <!-- <v-toolbar color="#FAFAFA" flat>
                        <v-row>
                            <v-col class="d-flex justify-space-around">
                                <v-toolbar-title
                                    class="justify-center font-weight-thin"
                                    style="
                                        font-family: Arial, Helvetica,
                                            sans-serif;
                                    "
                                    >Employee Login</v-toolbar-title
                                >
                            </v-col>
                        </v-row>
                    </v-toolbar> -->

        <v-card-title class="justify-center">
          <v-img
            :lazy-src="require('../assets/dtx.png')"
            max-height="200px"
            max-width="250px"
            :src="require('../assets/dtx.png')"
          >
          </v-img>
        </v-card-title>
        <v-form @submit.prevent="handleSubmit">
          <v-card-text class="justify-center">
            <v-text-field
              color="success"
              outlined
              autocomplete="disabled"
              label="Username"
              name="login"
              type="text"
              v-model="user.username"
              @keydown.enter.prevent
            />
            <v-text-field
              color="success"
              outlined
              autocomplete="current-password"
              id="password"
              label="Password"
              name="password"
              type="password"
              v-model="user.password"
            />
          </v-card-text>
          <v-card-actions class="pa-4 d-flex flex-column">
            <v-btn block dark color="#41B883" type="submit"
              >Login</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import User from "../models/user";
import MasterList from "../assets/class/db/masterlist";

export default {
  data() {
    return {
      user: new User("", ""),
      masterlist: new MasterList(),
      userName: "",
      passWord: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/original_hiroi/calculation");
    }
    // if (this.$store.state.users.status == "authenticated") {
    // this.$router.push('/original_hiroi/calculation');
    //   }
    //   console.log(this.$store.state.users.status)
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const payload = {
        userInfo: this.user,
        axios: this.$http,
      };
      if (this.user.username && this.user.password) {
        this.$store
          .dispatch("users/login", payload)
          .then((res) => {
            console.log(res)
            if(res.data.message == 'User not found'){
              alert('Login failed')
            } else {
              this.$router.push("/original_hiroi/calculation").then(() => {
              window.location.href = `http://${window.location.host}/dtx/original_hiroi/calculation`

              });
            }
          })
      }

      // this.masterlist.validateLogin(this.user).then( res => {
      //   this.$store.commit('users/CHANGE_USER_INFO', res)
      //   // this.CHANGE_USER_INFO(this.db.values)
      //   if(res == 'FAILED'){
      //     this.$store.commit('users/CHANGE_STATUS', 'guest')
      //   } else {
      //     this.$store.commit('users/CHANGE_STATUS', 'authenticated')
      //   }
      //   // this.CHANGE_STATUS('authenticated')
      //   this.$router.push('/original_hiroi/calculation')
      // })
    },
  },
};
</script>
<style scoped>

::v-deep input:-webkit-autofill
/* ::v-deep input:-webkit-autofill:hover, 
::v-deep input:-webkit-autofill:focus, 
::v-deep input:-webkit-autofill:active */
  {
  background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 50px#FAFAFA inset;
  
}

</style>