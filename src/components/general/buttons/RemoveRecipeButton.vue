<script>
import { mapActions, mapState } from "pinia";
import useUserStore from "@/stores/userStore.js";
import { useDbStore } from "@/stores/dbStore.js";

export default {
  name: "RemoveRecipeButton",
  props: {
    recipe: { type: Object, required: true },
  },
  emits: ["toggleRemove"],
  computed: {
    ...mapState(useUserStore, [
      "recipes",
      "selectedCategories",
      "selectedAreas",
      "selectedIngredients",
    ]),
  },
  methods: {
    ...mapActions(useDbStore, ["deleteUserRecipe"]),
    ...mapActions(useUserStore, ["setRecipes"]),
    deleteRecipe() {
      this.deleteUserRecipe(this.recipe);
      this.$emit("toggle-remove", false);
    },
  },
};
</script>

<template>
  <v-btn class="v-btn" @click="deleteRecipe">Remove Recipe</v-btn>
</template>
