// import axios from 'axios'
export default {
    namespaced: true,

    state: () => ({
        status: "guest",
        token: localStorage.getItem("token") || "",
        user: {}
    }),
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
        // userInfo: state=> state.user
    },
    //DISPATCH
    actions: {
        async login({ commit }, load) {
            try {
                commit("auth_request");
                let res = await load.axios({
                    method: "post",
                    url: `${process.env.VUE_APP_URL}/db/masterlist/auth/login`,
                    data: load.userInfo
                    // headers: {
                    //     "Content-type": "application/x-www-form-urlencoded"
                    // }
                });
                // let res = await load.axios.post(
                //     `${process.env.VUE_APP_URL}/db/masterlist/auth/login`,
                //     load.userInfo
                // );
                if (res.data.message !== "User not found") {
                    const payload = res.data;
                    localStorage.setItem("token", payload.accessToken);
                    load.axios.defaults.headers.common["x-access-token"] =
                        payload.accessToken;
                    commit("auth_success", payload);
                }
                return res;
            } catch (err) {
                commit("auth_error");
                localStorage.removeItem("token");
                return err;
                // alert(err)
            }
        },
        logout({ commit }, axios) {
            commit("logout");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["x-access-token"];
        },
        async validateSession({ commit }, axios) {
            try {
                let res = await axios.get(
                    `${process.env.VUE_APP_URL}/db/masterlist/auth/validate`
                );
                return res;
            } catch (err) {
                commit("auth_error");
            }
        }
    },
    //COMMIT
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success: (state, payload) => {
            state.status = "success";
            state.token = payload.accessToken;
            // state.user = Object.assign({}, state.user, payload.user)
            state.user = { ...state.user, ...payload.user };
        },
        SET_USER_DETAILS(state, user) {
            // console.log(user)
            state.user = { ...state.user, user };
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        },

        CHANGE_STATUS: (state, data) => {
            state.status = data;
        },

        CHANGE_USER_INFO: (state, data) => {
            state.userInfo = data;
        }
    }
};
