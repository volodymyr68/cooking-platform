<script>
import { mapActions, mapState } from "pinia";
import { useApiStore } from "@/stores/apiStore.js";
import MealCard from "@/components/protected/cards/MealCard.vue";

export default {
  name: "RecipeFeed",
  components: { MealCard },
  data() {
    return {
      allMeal: [],
      currentPage: 1,
      itemsPerPage: 8,
      maxVisiblePages: 5,
    };
  },
  computed: {
    ...mapState(useApiStore, ["categoryMeal", "ingredientsMeal", "areasMeal"]),

    paginatedMeals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allMeal.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.allMeal.length / this.itemsPerPage);
    },
    visiblePages() {
      const start = Math.max(
          1,
          this.currentPage - Math.floor(this.maxVisiblePages / 2),
      );
      const end = Math.min(start + this.maxVisiblePages - 1, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    ...mapActions(useApiStore, [
      "fetchMealByCategory",
      "fetchMealByArea",
      "fetchMealByMainIngredient",
    ]),

    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async loadAllMeals() {
      await this.fetchMealByCategory();
      await this.fetchMealByArea();
      await this.fetchMealByMainIngredient();

      this.allMeal = [
        ...this.categoryMeal.flat(),
        ...this.ingredientsMeal.flat(),
        ...this.areasMeal.flat(),
      ];
    },
  },
  async created() {
    await this.loadAllMeals();
  },
};
</script>

<template>
  <div class="container" v-if="paginatedMeals.length">
    <MealCard
        v-for="meal in paginatedMeals"
        :key="meal.idMeal"
        :save-button="true"
        :remove-button="false"
        :meal="meal"
    />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>

      <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>

      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
  <div v-else>
    <p>No meals found. Go to Profile</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
