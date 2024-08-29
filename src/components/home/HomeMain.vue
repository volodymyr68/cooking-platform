<script>
import "../../styles/home/home-view.css";
import TailorRecipes from "@/assets/TailorRecipes.png";

export default {
  name: "HomeMain",
  data() {
    return {
      TailorRecipes,
    };
  },
  methods: {
    navigateToAuthContent(value) {
      this.$router.push({
        path: "/auth-content",
        query: {homeView: value},
      });
    },
  },
};
</script>

<template>
  <v-main class="main">
    <v-container>
      <v-row class="text-center">
        <v-col>
          <h1 class="display-1 font-weight-bold">
            Welcome to Culinary Inspirations
          </h1>
          <p class="subtitle-1 mt-4">
            Discover new recipes, tailor your meals to your preferences, and
            share your culinary creations with our community!
          </p>
        </v-col>
      </v-row>
      <v-row class="mt-8" align="center">
        <v-col
            cols="12"
            md="4"
            @click="navigateToAuthContent('Profile')"
            v-hover="0.9"
        >
          <v-card class="pa-5" elevation="2">
            <v-img
                :src="TailorRecipes"
                alt="Tailored Recipes"
                height="200px"
            ></v-img>
            <v-card-title class="headline mt-4">Tailored Recipes</v-card-title>
            <v-card-text>
              Get recipe suggestions based on your preferences and available
              ingredients.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4"
            @click="navigateToAuthContent('Forum')"
            v-hover="0.9"
        >
          <v-card class="pa-5" elevation="2">
            <v-img
                :src="TailorRecipes"
                alt="Save & Share"
                height="200px"
            ></v-img>
            <v-card-title class="headline mt-4">Watch & Share</v-card-title>
            <v-card-text>
              Write your favorite recipes and share them with our growing
              community.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4"
            @click="navigateToAuthContent('RandMeal')"
            v-hover="0.9"
        >
          <v-card class="pa-5" elevation="2">
            <v-img
                :src="TailorRecipes"
                alt="Shopping List"
                height="200px"
            ></v-img>
            <v-card-title class="headline mt-4">Get random recipe</v-card-title>
            <v-card-text>
              Discover new culinary with a single click, bringing variety and
              excitement to your meals.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
