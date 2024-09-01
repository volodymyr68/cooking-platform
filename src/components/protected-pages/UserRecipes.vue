<script>
import { mapState } from "pinia";
import useUserStore from "@/stores/userStore.js";
import MealCard from "@/components/general/cards/MealCard.vue";
import Pagination from "@/components/general/pagination/Pagination.vue";

export default {
  name: "UserRecipes",
  components: { Pagination, MealCard },
  computed: {
    ...mapState(useUserStore, ["recipes"]),
  },
};
</script>

<template>
  <Pagination :items="recipes" v-if="recipes.length">
    <template v-slot:items="{ items }">
      <MealCard
          v-for="meal in items"
          :key="meal.idMeal"
          :save-button="false"
          :remove-button="true"
          :meal="meal"
      />
    </template>
  </Pagination>
  <div class="user-recipes-container" v-else>
    <p>No recipes found for this user.</p>
  </div>
</template>
