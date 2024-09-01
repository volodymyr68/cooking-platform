<script>
import { ref, computed, onMounted } from "vue";
import { useApiStore } from "@/stores/apiStore.js";
import MealCard from "@/components/general/cards/MealCard.vue";
import Pagination from "@/components/general/pagination/Pagination.vue";
import RingLoader from "vue-spinner/src/MoonLoader.vue";

export default {
  name: "RecipeFeed",
  components: { Pagination, MealCard, RingLoader },
  setup() {
    const apiStore = useApiStore();

    const allMeal = ref([]);
    const isLoaded = ref(false);

    const allPreferenceMeal = computed(() => apiStore.allPreferenceMeal);

    const getAllMeal = async () => {
      isLoaded.value = false;
      await apiStore.getAllMeal();
      isLoaded.value = true;
    };

    onMounted(() => {
      getAllMeal();
    });

    return {
      allMeal,
      isLoaded,
      allPreferenceMeal,
    };
  },
};
</script>

<template>
  <RingLoader :loading="!isLoaded" color="black" size="100px"></RingLoader>
  <Pagination
      :items="allPreferenceMeal"
      v-if="isLoaded && allPreferenceMeal?.length"
  >
    <template v-slot:items="{ items }">
      <MealCard
          v-for="meal in items"
          :key="meal.idMeal"
          :save-button="true"
          :remove-button="false"
          :meal="meal"
      />
    </template>
  </Pagination>
  <div v-else>
    <p>No items found. Go to Profile</p>
  </div>
</template>