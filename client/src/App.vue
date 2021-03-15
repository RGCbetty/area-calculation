<template>
  <v-app>
    <v-app-bar v-if="loggedIn" app elevation="1">
      <v-app-bar-nav-icon
        v-if="loggedIn"
        @click.stop="drawerState = !drawerState"
      />
      <v-toolbar-title class="pl-0">
        <v-img
          :lazy-src="require('./assets/dtxlogo.png')"
          max-height="150px"
          max-width="200px"
          :src="require('./assets/dtxlogo.png')"
        >
        </v-img>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text icon @click="logOut()" v-show="loggedIn">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-if="loggedIn"
      v-model="drawerState"
      :permanent="drawerState"
      floating
      dark
      :mini-variant.sync="mini"
    >
      <v-card tile elevation="0">
        <v-list color="#FFFFFF">
          <v-list-item>
            <v-list-item-action>
              <v-icon color="#424242" @click.stop="drawerState = !drawerState"
                >mdi-chevron-left</v-icon
              >
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <h3 class="font-weight-bold" style="color: #424242">
                  Welcome!
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-list-item class="px-2" @click="mini = !mini">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="overline text-truncate">{{
          $store.state.users.user.name
        }}</v-list-item-content>
        <v-btn icon small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <span>
              <v-icon color="success">{{ item.icon }}</v-icon>
            </span>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-light">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <transition :name="fade">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import DTXClient from "./assets/dtx-client/dtx-client";
import AreaData from "./assets/class/areadata";
export default {
  name: "App",
  data: () => ({
    // drawer: false,
    fade: null,
    mini: false,
    drawerItems: [
      {
        title: "Original Hiroi",
        icon: "mdi-alpha-o-box",
        to: "/original_hiroi/calculation",
      },
      {
        title: "Plan Application",
        icon: "mdi-alpha-p-box",
        to: "/plan_app",
      },
    ],
  }),
  mounted() {
    if (!this.loggedIn) {
      this.logOut();
    }
  },
  created() {
    this.$http.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        if (error.response.status == 403) {
          this.$store.dispatch("users/logout", this.$http).then(() => {
            this.$router.push("/login");
          });
        }
        if (error.response.status == 401) {
          console.clear()
        }

        return Promise.reject(error);
      }
    );

     if (this.loggedIn) {
      this.$store.commit("drawer", true);
      this.$store
        .dispatch("users/validateSession", this.$http)
        .catch((err) => alert(err));
      this.$http.interceptors.request.use((config) => {
        return config;
      });

      // console.log(this.$http.interceptors.request.use())
    } else {
      this.$store.commit("drawer", false);
    }
   
  },

  computed: {
    myState() {
      return this.$store.state.users.status;
    },
    loggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    },
    drawerState: {
      get() {
        return this.$store.state.drawer;
      },
      set(newVal) {
        this.$store.commit("drawer", newVal);
      },
    },
    //     loading() {
    //   return this.$store.getters["users/isLoggedIn"];
    // },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/login" || to.path == "/original_hiroi/calculation") {
        if (
          !from.path == "/original_hiroi/calculation" ||
          to.path == "/login"
        ) {
          this.fade = "fade";
        }
      }
    },
    loggedIn(newVal) {
      if (newVal) {
        this.$store.commit("drawer", true);
      } else {
        this.$store.commit("drawer", false);
      }
    },
  },
  methods: {
    logOut() {
      // this.CHANGE_STATUS('guest')
      // this.CHANGE_USER_INFO({})
      this.$store.dispatch("users/logout", this.$http).then(() => {
        this.$router.push("/login");
        this.$store.commit("setDTX", {
          dtx: new DTXClient(),
          area: new AreaData(),
        });
      });
      // this.$store.commit('users/CHANGE_STATUS', 'guest')
      // this.$store.commit('users/CHANGE_USER_INFO', {})
    },
  },
};
</script>

<style scoped>
div.v-application--wrap {
  min-height: calc(100vh - 64px) !important;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
/* .slide-leave-active {
        transition: opacity 0.2s ease;
        opacity: 0;
        animation: slide-out 0.2s ease-out forwards;
    }
 
    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }
 
    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }
 
    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }
 
    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    } */
</style>
