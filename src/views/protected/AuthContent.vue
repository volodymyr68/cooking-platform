<script>
import "../../styles/protected/AuthMain.css"
import ProtectedNavigation from "@/components/protected/pages/ProtectedNavigation.vue";
import ProtectedMain from "@/components/protected/pages/ProtectedMain.vue";
import RandomMeal from "@/components/protected/pages/RandomMeal.vue";
import UserPreferences from "@/components/protected/pages/UserPreferences.vue";
import UserRecipes from "@/components/protected/pages/UserRecipes.vue";
import RecipeFeed from "@/components/protected/pages/RecipeFeed.vue";
import Forum from "@/components/protected/pages/Forum.vue";

export default {
  name: "AuthContent",
  components: {Forum, RecipeFeed, UserRecipes, UserPreferences, RandomMeal, ProtectedMain, ProtectedNavigation},
  data() {
    return {
      currentView: "Profile",
    };
  },
  methods: {
    updateView(view) {
      this.currentView = view;
    }
  }
}
</script>

<template>
  <v-card class="wrapper">
    <v-layout class="layout">
      <ProtectedNavigation @update-view="updateView"/>
      <ProtectedMain :current-view="currentView">
        <template v-slot:Profile>
          <UserPreferences/>
        </template>
        <template v-slot:RecipeFeed>
          <RecipeFeed/>
        </template>
        <template v-slot:Forum>
          <Forum/>
        </template>
        <template v-slot:RandMeal>
          <RandomMeal/>
        </template>
        <template v-slot:Recipes>
          <UserRecipes/>
        </template>
      </ProtectedMain>
    </v-layout>
  </v-card>
</template>