<script>
import Forum from "@/components/protected-pages/Forum.vue";
import RecipeFeed from "@/components/protected-pages/RecipeFeed.vue";
import UserRecipes from "@/components/protected-pages/UserRecipes.vue";
import UserPreferences from "@/components/protected-pages/UserPreferences.vue";
import RandomMeal from "@/components/protected-pages/RandomMeal.vue";
import ProtectedMain from "@/components/protected-pages/ProtectedMain.vue";
import ProtectedNavigation from "@/components/protected-pages/ProtectedNavigation.vue";
import { mapActions } from "pinia";
import { useDbStore } from "@/stores/dbStore.js";

export default {
  name: "AuthContent",
  components: {
    Forum,
    RecipeFeed,
    UserRecipes,
    UserPreferences,
    RandomMeal,
    ProtectedMain,
    ProtectedNavigation,
  },
  data() {
    return {
      currentView: "Profile",
    };
  },
  props: {
    homeView: {
      type: String,
      default: "Profile",
    },
  },
  methods: {
    ...mapActions(useDbStore, ["getUserById"]),
    updateView(view) {
      this.currentView = view;
    },
  },
  async created() {
    this.currentView = this.homeView;
    await this.getUserById();
  },
};
</script>

<template>
  <v-card class="auth-main-wrapper">
    <v-layout class="auth-main-layout">
      <ProtectedNavigation @update-view="updateView" />
      <ProtectedMain :current-view="currentView">
        <template v-slot:Profile>
          <UserPreferences />
        </template>
        <template v-slot:RecipeFeed>
          <RecipeFeed />
        </template>
        <template v-slot:Forum>
          <Forum />
        </template>
        <template v-slot:RandMeal>
          <RandomMeal />
        </template>
        <template v-slot:Recipes>
          <UserRecipes />
        </template>
      </ProtectedMain>
    </v-layout>
  </v-card>
</template>
