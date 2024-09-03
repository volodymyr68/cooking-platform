<script>
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";
import MealCard from "@/components/general/cards/MealCard.vue";
import RingLoader from "vue-spinner/src/MoonLoader.vue";

export default {
  name: "RandomMeal",
  data() {
    return {
      isLoaded: false,
    };
  },
  components: { MealCard, RingLoader },
  computed: {
    ...mapState(useApiStore, ["benchRandomMeals"]),
  },
  methods: {
    ...mapActions(useApiStore, ["getBenchRandomMeals"]),
  },
  async mounted() {
    this.isLoaded = false;
    await this.getBenchRandomMeals();
    this.isLoaded = true;
  },
};
</script>

<template>
  <RingLoader :loading="!isLoaded" color="black" size="100px"></RingLoader>
  <v-container v-if="isLoaded">
    <v-row dense>
      <v-col
        v-for="(meal, index) in benchRandomMeals"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        class="pa-1"
      > 
        <MealCard
          v-if="meal.idMeal"
          :meal="meal"
          :remove-button="false"
          :save-button="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
