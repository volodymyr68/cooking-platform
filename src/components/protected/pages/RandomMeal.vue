<script>
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";
import MealCard from "@/components/protected/cards/MealCard.vue";

export default {
  name: "RandomMeal",
  components: {MealCard},
  computed: {
    ...mapState(useApiStore, ["meals"]),
    randomMealData() {
      return this.meals[0] || {};
    },
  },
  methods: {
    ...mapActions(useApiStore, ["randomMeal"]),
  },
  mounted() {
    this.randomMeal();
  },
};
</script>

<template>
    <MealCard class="test" v-if="randomMealData.idMeal" :meal="randomMealData"
    :remove-button="false"
    :save-button="true"/>
</template>

<style scoped>
.test{
  width:100%;
}
</style>