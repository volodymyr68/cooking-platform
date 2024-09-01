<script>
export default {
  name: "OpenDetailsButton",
  emits: ["toggleSave", "open-details"],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    openDetails() {
      this.$emit("open-details", this.id);
    },
  },
};
</script>

<template>
  <v-btn @click="openDetails" color="info">Open Details</v-btn>
</template>
