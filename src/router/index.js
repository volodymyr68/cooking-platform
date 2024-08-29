import { createRouter, createWebHistory } from "vue-router";
import SignupView from "@/views/auth-forms/Signup.vue";
import signIn from "@/views/auth-forms/SignIn.vue";
import HomeView from "@/views/HomeView.vue";
import AuthMain from "@/views/protected/AuthContent.vue";
import useUserStore from "@/stores/userStore.js";
import RandomMeal from "@/components/protected/pages/RandomMeal.vue";
import NotFound from "@/views/NotFound.vue";

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
      component: SignupView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "SignIn",
      path: "/signin",
      component: signIn,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "AuthContent",
      path: "/auth-content",
      component: AuthMain,
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
