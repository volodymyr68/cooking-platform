<script>
export default {
  name: "Pagination",
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 8,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
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
  },
};
</script>

<template>
  <div class="pagination-container" v-if="paginatedItems?.length">
    <slot name="items" :items="paginatedItems" />

    <div class="pagination-elements">
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
    <p>No items found. Go to Profile</p>
  </div>
</template>
