<script>
import SaveRecipeButton from "@/components/protected/buttons/SaveRecipeButton.vue";
import RemoveRecipeButton from "@/components/protected/buttons/RemoveRecipeButton.vue";
import OpenDetailsButton from "@/components/protected/buttons/OpenDetailsButton.vue";
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";

export default {
  name: "MealCard",
  data() {
    return {
      details: null,
      showDetails: false,
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
      default: true,
    },
    removeButton: {
      type: Boolean,
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
};
</script>

<template>
  <v-card class="meal-card">
    <v-img :src="meal.strMealThumb" class="meal-img" alt="Meal Image"></v-img>

    <v-card-title class="meal-title">
      {{ meal.strMeal }}
    </v-card-title>

    <v-card-actions class="meal-actions">
      <SaveRecipeButton v-if="saveButton" :recipe="meal" />
      <RemoveRecipeButton v-if="removeButton" :recipe="meal" />
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

<style scoped>
.meal-card {
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.meal-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.meal-title,
.meal-subtitle,
.meal-text,
.meal-actions {
  width: 100%;
  text-align: center;
}

.meal-title {
  font-size: 18px;
  font-weight: bold;
}

.meal-subtitle {
  font-size: 14px;
  color: #757575;
}

.meal-text {
  flex-grow: 1;
  text-align: left;
  margin-top: 10px;
}

.meal-actions {
  margin-top: 10px;
  justify-content: center;
}

.meal-card ul {
  padding-left: 20px;
  text-align: left;
}
</style>
