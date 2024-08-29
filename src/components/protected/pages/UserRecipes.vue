<script>
import {mapState} from "pinia";
import useUserStore from "@/stores/userStore.js";
import MealCard from "@/components/protected/cards/MealCard.vue";

export default {
  name: "UserRecipes",
  components: {MealCard},
  computed:{
    ...mapState(useUserStore,["recipes"])
  }
}
</script>

<template>
  <div class="container" v-if="recipes.length">
    <MealCard v-for="recipe in recipes"
              :key="recipe.id"
              :meal="recipe"
              :save-button="false"
              :remove-button="true"/>
  </div>
  <div v-else>
      <p>No recipes found for this user.</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>