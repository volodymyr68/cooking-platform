<script>
import {mapActions, mapState} from "pinia";
import useUserStore from "@/stores/userStore.js";
import {useDbStore} from "@/stores/dbStore.js";

export default {
  name: "SaveRecipeButton",
  props:{
        recipe: {type: Object, required: true}
  },
  computed:{
    ...mapState(useUserStore,["recipes","selectedCategories","selectedAreas","selectedIngredients"]),
  },
  methods:{
    ...mapActions(useDbStore,["updateUserById"]),
    ...mapActions(useUserStore,["setRecipes"]),
    saveRecipe(){
      this.setRecipes(this.recipe);
      this.updateUserById(this.selectedCategories, this.selectedAreas, this.selectedIngredients, this.recipes);
    }
  }
}
</script>

<template>
  <v-btn class="v-btn" @click="saveRecipe">Save Recipe</v-btn>
</template>
