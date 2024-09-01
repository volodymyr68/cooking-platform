import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import useUserStore from "@/stores/userStore.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "Signup",
      path: "/signup",
      component: import("@/views/Signup.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "SignIn",
      path: "/signin",
      component: import("@/views/SignIn.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "AuthContent",
      path: "/auth-content",
      component: import("@/views/AuthContent.vue") ,
      props: (route) => ({ homeView: route.query.homeView || "Profile" }),
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "NotFound",
      path: "/:notFound(.*)",
      component: NotFound,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const userStore = useUserStore();
  if (requiresAuth && !userStore.isLoggedIn) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
