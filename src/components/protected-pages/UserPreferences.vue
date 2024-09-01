<script>
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";
import { useDbStore } from "@/stores/dbStore.js";
import useUserStore from "@/stores/userStore.js";
import RingLoader from "vue-spinner/src/MoonLoader.vue";

export default {
  name: "UserPreferences",
  components: { RingLoader },
  data() {
    return {
      formSelectedCategories: [],
      formSelectedIngredients: [],
      formSelectedAreas: [],
      isLoaded: false,
    };
  },
  computed: {
    ...mapState(useUserStore, [
      "getFullName",
      "selectedCategories",
      "selectedAreas",
      "selectedIngredients",
    ]),
    ...mapState(useApiStore, ["categories", "areas", "ingredients"]),
  },
  methods: {
    ...mapActions(useApiStore, ["fetchMealData"]),
    ...mapActions(useDbStore, ["getUserById", "updateUserById"]),
    savePreferences() {
      this.updateUserById(
          this.formSelectedCategories,
          this.formSelectedAreas,
          this.formSelectedIngredients,
      );
    },
    initializePreferences() {
      this.formSelectedCategories = this.selectedCategories;
      this.formSelectedIngredients = this.selectedIngredients;
      this.formSelectedAreas = this.selectedAreas;
    },
  },
  async mounted() {
    this.isLoaded = false;
    await this.fetchMealData();
    this.initializePreferences();
    this.isLoaded = true;
  },
};
</script>

<template>
  <RingLoader :loading="!isLoaded" color="black" size="100px"></RingLoader>
  <v-container fluid class="pa-4" v-if="isLoaded">
    <v-card-title>Hello {{ getFullName }}</v-card-title>
    <v-card class="pa-4">
      <v-card-title>Customize Your Preferences</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
              v-model="formSelectedCategories"
              :items="categories"
              item-text="strCategory"
              item-value="strCategory"
              label="Select Categories"
              multiple
              chips
          ></v-select>

          <v-select
              v-model="formSelectedIngredients"
              :items="ingredients"
              item-text="strIngredient"
              item-value="strIngredient"
              label="Select Ingredients"
              multiple
              chips
          ></v-select>

          <v-select
              v-model="formSelectedAreas"
              :items="areas"
              item-text="strArea"
              item-value="strArea"
              label="Select Areas"
              multiple
              chips
          ></v-select>

          <v-btn @click="savePreferences" color="primary" class="mt-4">
            Save Preferences
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
