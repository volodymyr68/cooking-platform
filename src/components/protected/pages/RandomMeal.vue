<script>
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";
import MealCard from "@/components/protected/cards/MealCard.vue";

export default {
  name: "RandomMeal",
  data() {
    return {
      firstMeal: "",
      secondMeal: "",
      thirdMeal: "",
      fourthMeal: "",
      fifthMeal: "",
      sixMeal: "",
    };
  },
  components: { MealCard },
  computed: {
    ...mapState(useApiStore, ["meals"]),
  },
  methods: {
    ...mapActions(useApiStore, ["randomMeal"]),
  },
  async mounted() {
    this.firstMeal = await this.randomMeal();
    this.secondMeal = await this.randomMeal();
    this.thirdMeal = await this.randomMeal();
    this.fourthMeal = await this.randomMeal();
    this.fifthMeal = await this.randomMeal();
    this.sixMeal = await this.randomMeal();
  },
};
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col
          v-for="(meal, index) in [
          firstMeal,
          secondMeal,
          thirdMeal,
          fourthMeal,
          fifthMeal,
          sixMeal,
        ]"
          :key="index"
          cols="12"
          md="6"
          lg="4"
          class="pa-1"
      >
        <MealCard
            class="test"
            v-if="meal.idMeal"
            :meal="meal"
            :remove-button="false"
            :save-button="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.test {
  width: 100%;
}
</style>
