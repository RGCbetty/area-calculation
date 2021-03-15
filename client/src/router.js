import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

// const UserHome = { template: '<div>Home</div>' }
// const UserProfile = { template: '<div>Profile</div>' }
// const UserPosts = { template: '<div>Posts</div>' }
let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    // base: process.env.
    routes: [
        {
            path: "/",
            component: () => import("./views/About")
        },

        {
            path: "/about",
            component: () => import("./views/About")
        },

        {
            path: "/login",
            component: () => import("./views/LoginPage"),
            meta: {
                title: "Area Calculation - Login",
                requiresAuth: false
            }
        },

        {
            path: "/plan_app",
            component: () => import("./components/PlanApplication/Calculation"),
            children: [
                {
                    path: "calculation",
                    component: () =>
                        import("./components/PlanApplication/Calculation"),
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },

        {
            path: "/original_hiroi",
            component: () => import("./views/OriginalHiroi"),
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "calculation",
                    component: () =>
                        import("./components/OriginalHiroi/Calculation"),
                    meta: {
                        title: "Area Calculation - Home",
                        requiresAuth: true
                    }
                },
                {
                    path: "monitoring",
                    component: () =>
                        import("./components/OriginalHiroi/Monitoring"),
                    meta: {
                        title: "Area Calculation - Monitoring",
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: "/*",
            component: () => import("./views/Page404")
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "DTX System";
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters["users/isLoggedIn"]) {
            next();
            return;
        } else {
            next({
                path: "/login",
                params: { nextUrl: to.fullPath }
            });
        }
    } else {
        if (store.getters["users/isLoggedIn"]) {
            next({ path: "/original_hiroi/calculation" });
        } else {
            next();
        }
        next();
    }
});

export default router;
