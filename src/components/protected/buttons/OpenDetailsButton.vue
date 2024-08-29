<script>
export default {
  name: "OpenDetailsButton",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    openDetails() {
      this.$emit("open-details", this.id);
    }
  }
}
</script>

<template>
  <v-btn @click="openDetails" color="info">Open Details</v-btn>
</template>

<style scoped>
/* Добавьте стили, если необходимо */
</style>