<script>
import { auth } from "@/main.js";
import authMixin from "@/mixins/authMixin.js";
import { mapActions, mapState } from "pinia";
import useUserStore from "@/stores/userStore.js";


export default {
  name: "App",
  methods: {
    auth() {
      return auth;
    },
    ...mapActions(useUserStore, ["setLogin"]),
  },
  mixins: [authMixin],
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),  
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app color="grey">
      <v-app-bar-title>
        <router-link :to="{ name: 'Home' }" v-hover class="mr-5">
          <v-btn color="white" class="mr-2 text-h4 white--text" v-hover
          >Food Forum</v-btn
          >
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link
          v-if="!isLoggedIn"
          :to="{ name: 'Signup' }"
          v-hover="0.1"
          class="mr-5"
      >
        <v-btn color="white" class="mr-2 w-100" v-hover>Sign up</v-btn>
      </router-link>
      <router-link
          v-if="!isLoggedIn"
          :to="{ name: 'SignIn' }"
          v-hover="0.1"
          class="mr-10"
      >
        <v-btn v-if="!isLoggedIn" color="white" class="mr-2 w-100" v-hover
        >Sign in
        </v-btn>
      </router-link>
      <v-btn
          v-if="isLoggedIn"
          @click="logOut(auth())"
          color="white"
          class="mr-2"
          v-hover
      >Logout</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  <Notifications position="bottom left"></Notifications>
</template>
