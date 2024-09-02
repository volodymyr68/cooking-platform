<script>
import SaveRecipeButton from "@/components/general/buttons/SaveRecipeButton.vue";
import RemoveRecipeButton from "@/components/general/buttons/RemoveRecipeButton.vue";
import OpenDetailsButton from "@/components/general/buttons/OpenDetailsButton.vue";
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";

export default {
  name: "MealCard",
  data() {
    return {
      details: null,
      showDetails: false,
      save: true,
      remove: false,
    };
  },
  components: { OpenDetailsButton, RemoveRecipeButton, SaveRecipeButton },
  props: {
    meal: {
      type: Object,
      required: true,
    },
    saveButton: {
      type: Boolean,
      required: true,
      default: true,
    },
    removeButton: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    ...mapState(useApiStore, ["mealDetails"]),
    ingredients() {
      return Array.from({ length: 20 }, (_, i) => i + 1)
        .map((i) => ({
          name: this.meal[`strIngredient${i}`],
          measure: this.meal[`strMeasure${i}`],
        }))
        .filter((ingredient) => ingredient.name && ingredient.name.trim());
    },
  },
  methods: {
    ...mapActions(useApiStore, ["fetchRecipeById"]),

    setButtons() {
      this.remove = this.removeButton;
      this.save = this.saveButton;
    },
    handleToggleRemove() {
      this.$notify({
        title: "Success",
        text: "Recipe removed successfully",
        duration: 3000,
        type: "error",
      });
      this.remove = false;
      this.save = true;
    },
    handleToggleSave() {
      this.$notify({
        title: "Success",
        text: "Recipe saved successfully",
        duration: 3000,
        type: "success",
      });
      this.remove = true;
      this.save = false;
    },
    async handleOpenDetails() {
      const response = await this.fetchRecipeById(this.meal.idMeal);
      console.log(response);
      this.details = this.mealDetails;
      console.log("details", this.details);
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
    },
  },
  created() {
    this.setButtons();
  },
};
</script>

<template>
  <v-card class="meal-card">
    <v-img :src="meal.strMealThumb" class="meal-img" alt="Meal Image"></v-img>

    <v-card-title class="meal-title">
      {{ meal.strMeal }}
    </v-card-title>

    <v-card-actions class="meal-actions">
      <SaveRecipeButton
        v-if="save"
        :recipe="meal"
        @toggle-save="handleToggleSave"
      />
      <RemoveRecipeButton
        v-if="remove"
        :recipe="meal"
        @toggleRemove="handleToggleRemove"
      />
      <OpenDetailsButton :id="meal.idMeal" @open-details="handleOpenDetails" />
    </v-card-actions>

    <v-dialog v-if="showDetails" v-model="showDetails" max-width="500">
      <v-card v-if="details">
        <v-card-title>
          <span class="headline">{{ details.strMeal }}</span>
        </v-card-title>
        <v-card-text>
          <v-img
            :src="details.strMealThumb"
            height="200px"
            class="mb-4"
          ></v-img>
          <p><strong>Category:</strong> {{ details.strCategory }}</p>
          <p><strong>Area:</strong> {{ details.strArea }}</p>
          <p><strong>Instructions:</strong> {{ details.strInstructions }}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            <li v-for="(ingredient, index) in ingredients" :key="index">
              {{ ingredient.measure }} {{ ingredient.name }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDetails">Close</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-text>
          <p>Details not available.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDetails">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
